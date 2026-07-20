"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Lightbulb,
  LoaderCircle,
  Trophy,
  X,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { ErrorState, Loader } from "@/components/ui/PageState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ApiError, api, getErrorMessage } from "@/lib/api";
import { getQuizResult, saveLatestQuizResult, saveQuizResult } from "@/lib/storage";
import { localizeQuestion } from "@/lib/quiz-questions-en";
import { getQuizTitle } from "@/lib/quiz-meta";
import type { AnswerRecord, QuizDetail, QuizResult } from "@/types";

type StoredSession = {
  currentIndex: number;
  answers: AnswerRecord[];
};

const optionLetters = ["A", "B", "C", "D"];

export default function QuizPlayPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const practice = searchParams.get("practice") === "1";
  const { currentUser, refreshCurrentUser, notify, language, openAuth } = useApp();
  const ka = language === "ka";
  const [quiz, setQuiz] = useState<QuizDetail | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [feedback, setFeedback] = useState<AnswerRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const sessionKey = useMemo(
    () => currentUser ? `quibly:session:${currentUser._id}:${params.id}` : "",
    [currentUser, params.id],
  );

  const loadQuiz = useCallback(async () => {
    setLoading(true);
    setError("");
    try { setQuiz(await api.getQuiz(params.id)); }
    catch (requestError) { setError(getErrorMessage(requestError, language)); }
    finally { setLoading(false); }
  }, [language, params.id]);

  useEffect(() => { void loadQuiz(); }, [loadQuiz]);

  useEffect(() => {
    if (!quiz || !currentUser) return;

    if (practice) {
      const previousResult = getQuizResult(currentUser._id, quiz._id);
      if (!previousResult) {
        notify(ka ? "Practice რეჟიმისთვის ჯერ ქვიზი ერთხელ უნდა დაასრულო." : "Complete the quiz once before starting practice mode.", "error");
        router.replace(`/quizzes/${quiz._id}`);
        return;
      }
      setAnswers([]);
      setCurrentIndex(0);
      setSelectedOption(null);
      setFeedback(null);
      return;
    }

    const raw = sessionKey ? localStorage.getItem(sessionKey) : null;
    let saved: StoredSession | null = null;
    try { saved = raw ? JSON.parse(raw) : null; } catch { saved = null; }

    const savedAnswers = saved?.answers || [];
    const firstUnanswered = quiz.questions.findIndex(
      (question) => !currentUser.answeredQuestions.includes(question._id),
    );
    const nextIndex = saved?.currentIndex ?? (firstUnanswered >= 0 ? firstUnanswered : 0);
    const safeIndex = Math.min(nextIndex, quiz.questions.length - 1);
    const existing = savedAnswers.find((item) => item.questionId === quiz.questions[safeIndex]._id) || null;

    setAnswers(savedAnswers);
    setCurrentIndex(safeIndex);
    setSelectedOption(existing?.selectedOption ?? null);
    setFeedback(existing);
  }, [currentUser, ka, notify, practice, quiz, router, sessionKey]);

  useEffect(() => {
    if (!sessionKey || practice || !quiz) return;
    localStorage.setItem(sessionKey, JSON.stringify({ currentIndex, answers } satisfies StoredSession));
  }, [answers, currentIndex, practice, quiz, sessionKey]);

  if (loading) return <div className="center-page"><Loader label={ka ? "კითხვები მზადდება..." : "Preparing questions..."} /></div>;
  if (error || !quiz) return <div className="page-wrap section-pad"><div className="container narrow"><ErrorState message={error || "Quiz not found"} retry={loadQuiz} /></div></div>;
  if (!currentUser) return (
    <div className="page-wrap section-pad"><div className="container narrow"><ErrorState message={ka ? "ქვიზის დასაწყებად ჯერ ანგარიშში შედი." : "Sign in before starting a quiz."} /><button onClick={() => openAuth("sign-in")} className="button primary state-followup">{ka ? "ანგარიშში შესვლა" : "Sign in"}</button></div></div>
  );

  const activeQuiz = quiz;
  const activeUser = currentUser;
  const question = localizeQuestion(activeQuiz.topic, currentIndex, activeQuiz.questions[currentIndex], language);
  const progress = ((currentIndex + (feedback ? 1 : 0)) / activeQuiz.questions.length) * 100;
  const sessionScore = answers.reduce((sum, answer) => sum + answer.earnedPoints, 0);

  function applyAnswer(record: AnswerRecord) {
    const nextAnswers = [...answers.filter((item) => item.questionId !== record.questionId), record];
    setAnswers(nextAnswers);
    setFeedback(record);
    return nextAnswers;
  }

  async function submitAnswer() {
    if (selectedOption === null || feedback || submitting) return;
    setSubmitting(true);

    try {
      if (practice) {
        const previous = getQuizResult(activeUser._id, activeQuiz._id);
        const key = previous?.answers.find((item) => item.questionId === question._id);
        if (!key) throw new Error("Answer key unavailable");
        const isCorrect = selectedOption === key.correctOption;
        applyAnswer({
          questionId: question._id,
          selectedOption,
          correctOption: key.correctOption,
          isCorrect,
          earnedPoints: isCorrect ? question.points : 0,
        });
      } else {
        const response = await api.submitAnswer({
          quizId: activeQuiz._id,
          questionId: question._id,
          selectedOption,
        });
        applyAnswer({
          questionId: question._id,
          selectedOption,
          correctOption: response.result.correctOption,
          isCorrect: response.result.isCorrect,
          earnedPoints: response.result.earnedPoints,
        });
      }
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 409) {
        const known = answers.find((item) => item.questionId === question._id)
          || getQuizResult(activeUser._id, activeQuiz._id)?.answers.find((item) => item.questionId === question._id);
        if (known) setFeedback(known);
        notify(ka ? "ამ კითხვაზე პასუხი უკვე გაგზავნილია — შეგიძლია შემდეგზე გადახვიდე." : "You already answered this question — continue to the next one.", "info");
      } else {
        notify(getErrorMessage(requestError, language), "error");
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function goNext() {
    if (!feedback) return;
    if (currentIndex < activeQuiz.questions.length - 1) {
      const nextIndex = currentIndex + 1;
      const existing = answers.find((item) => item.questionId === activeQuiz.questions[nextIndex]._id) || null;
      setCurrentIndex(nextIndex);
      setSelectedOption(existing?.selectedOption ?? null);
      setFeedback(existing);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const correct = answers.filter((answer) => answer.isCorrect).length;
    const result: QuizResult = {
      quizId: activeQuiz._id,
      quizTitle: getQuizTitle(activeQuiz.topic, activeQuiz.title, language),
      userId: activeUser._id,
      correct,
      incorrect: activeQuiz.questions.length - correct,
      score: answers.reduce((sum, answer) => sum + answer.earnedPoints, 0),
      percentage: Math.round((correct / activeQuiz.questions.length) * 100),
      completedAt: new Date().toISOString(),
      answers,
    };
    saveLatestQuizResult(result);
    if (!practice) saveQuizResult(result);
    if (sessionKey && !practice) localStorage.removeItem(sessionKey);
    await refreshCurrentUser();
    router.push(`/quizzes/${activeQuiz._id}/results`);
  }

  return (
    <div className="quiz-play-page">
      <div className="container quiz-play-container">
        <div className="play-topbar">
          <Link href={`/quizzes/${activeQuiz._id}`} className="icon-button" aria-label={ka ? "ქვიზიდან გასვლა" : "Leave quiz"}><ArrowLeft /></Link>
          <div><span>{practice ? "Practice mode" : activeQuiz.topic}</span><strong>{activeQuiz.title}</strong></div>
          <div className="score-preview"><Trophy size={17} /><span>{practice ? "Practice" : ka ? "ქულა" : "Score"}</span><strong>{sessionScore}</strong></div>
        </div>

        <div className="play-progress">
          <div><span>{ka ? "კითხვა" : "Question"} {currentIndex + 1} / {activeQuiz.questions.length}</span><span>{Math.round(progress)}% {ka ? "დასრულდა" : "complete"}</span></div>
          <ProgressBar value={progress} />
        </div>

        <section className="question-card">
          <div className="question-label"><Lightbulb size={16} /> {ka ? "აირჩიე ერთი პასუხი" : "Choose one answer"}</div>
          <h1>{question.question}</h1>

          <div className="answer-grid">
            {question.options.map((option, index) => {
              const selected = selectedOption === index;
              const correct = feedback?.correctOption === index;
              const wrong = Boolean(feedback && selected && !feedback.isCorrect);
              return (
                <button
                  key={option}
                  className={`answer-option ${selected ? "selected" : ""} ${correct && feedback ? "correct" : ""} ${wrong ? "wrong" : ""}`}
                  onClick={() => setSelectedOption(index)}
                  disabled={Boolean(feedback) || submitting}
                >
                  <span className="option-letter">{optionLetters[index]}</span>
                  <span>{option}</span>
                  <span className="option-status">
                    {correct && feedback ? <Check size={18} /> : wrong ? <X size={18} /> : selected ? <span className="selected-dot" /> : null}
                  </span>
                </button>
              );
            })}
          </div>

          {feedback && (
            <div className={`answer-feedback ${feedback.isCorrect ? "correct" : "wrong"}`} role="status">
              {feedback.isCorrect ? <CheckCircle2 /> : <XCircle />}
              <div><strong>{feedback.isCorrect ? ka ? "სწორია! შესანიშნავი პასუხია." : "Correct! Great answer." : ka ? "არასწორია — შემდეგზე უკეთ გამოვა." : "Not quite — the next one will be better."}</strong><span>{feedback.isCorrect ? ka ? `+${feedback.earnedPoints} ქულა დაემატა.` : `+${feedback.earnedPoints} points added.` : ka ? `სწორი პასუხია: ${question.options[feedback.correctOption]}` : `Correct answer: ${question.options[feedback.correctOption]}`}</span></div>
            </div>
          )}

          <div className="question-actions">
            {!feedback ? (
              <button className="button primary" onClick={submitAnswer} disabled={selectedOption === null || submitting}>
                {submitting ? <><LoaderCircle className="spin" size={17} /> {ka ? "იგზავნება..." : "Submitting..."}</> : <>{ka ? "პასუხის დადასტურება" : "Submit answer"} <Check size={17} /></>}
              </button>
            ) : (
              <button className="button primary" onClick={goNext}>
                {currentIndex === activeQuiz.questions.length - 1 ? ka ? "შედეგის ნახვა" : "View results" : ka ? "შემდეგი კითხვა" : "Next question"} <ArrowRight size={17} />
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
