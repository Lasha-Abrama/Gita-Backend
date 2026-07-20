"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Gauge, ListChecks, Trophy, UserRound } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { ErrorState, Loader } from "@/components/ui/PageState";
import { api, getErrorMessage } from "@/lib/api";
import { getQuizMeta, getQuizTitle } from "@/lib/quiz-meta";
import { getQuizResult } from "@/lib/storage";
import type { QuizDetail, QuizResult } from "@/types";

export default function QuizIntroPage() {
  const params = useParams<{ id: string }>();
  const { currentUser, language, openAuth } = useApp();
  const ka = language === "ka";
  const [quiz, setQuiz] = useState<QuizDetail | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadQuiz = useCallback(async () => {
    setLoading(true);
    setError("");
    try { setQuiz(await api.getQuiz(params.id)); }
    catch (requestError) { setError(getErrorMessage(requestError, language)); }
    finally { setLoading(false); }
  }, [language, params.id]);

  useEffect(() => { void loadQuiz(); }, [loadQuiz]);
  useEffect(() => {
    setResult(currentUser ? getQuizResult(currentUser._id, params.id) : null);
  }, [currentUser, params.id]);

  if (loading) return <div className="center-page"><Loader label={ka ? "ქვიზი იტვირთება..." : "Loading quiz..."} /></div>;
  if (error || !quiz) return <div className="page-wrap section-pad"><div className="container narrow"><ErrorState message={error || "Quiz not found"} retry={loadQuiz} /></div></div>;

  const meta = getQuizMeta(quiz.topic, language);
  const { Icon } = meta;
  const answeredCount = currentUser
    ? quiz.questions.filter((question) => currentUser.answeredQuestions.includes(question._id)).length
    : 0;

  return (
    <div className="page-wrap section-pad intro-page">
      <div className="container narrow">
        <Link href="/quizzes" className="back-link"><ArrowLeft size={17} /> {ka ? "ყველა ქვიზი" : "All quizzes"}</Link>
        <div className={`quiz-intro-card accent-${meta.accent}`}>
          <div className="intro-icon"><Icon size={32} /></div>
          <span className="topic-pill">{quiz.topic}</span>
          <h1>{getQuizTitle(quiz.topic, quiz.title, language)}</h1>
          <p className="intro-description">{meta.description}</p>

          <div className="intro-facts">
            <div><ListChecks /><span>{ka ? "კითხვები" : "Questions"}<strong>{quiz.totalQuestions}</strong></span></div>
            <div><Clock3 /><span>{ka ? "დრო" : "Time"}<strong>~{meta.minutes} {ka ? "წუთი" : "min"}</strong></span></div>
            <div><Gauge /><span>{ka ? "სირთულე" : "Difficulty"}<strong>{meta.difficulty}</strong></span></div>
            <div><Trophy /><span>{ka ? "მაქს. ქულა" : "Max score"}<strong>100</strong></span></div>
          </div>

          <div className="rules-panel">
            <h2>{ka ? "სანამ დაიწყებ" : "Before you begin"}</h2>
            <ul>
              <li><CheckCircle2 /> {ka ? "თითო კითხვაზე მხოლოდ ერთი პასუხის გაგზავნა შეგიძლია." : "You can submit only one answer per question."}</li>
              <li><CheckCircle2 /> {ka ? "სწორი პასუხი 10 ქულას მოგიტანს." : "Every correct answer earns 10 points."}</li>
              <li><CheckCircle2 /> {ka ? "პასუხის შემდეგ შედეგს და სწორ ვარიანტს მაშინვე ნახავ." : "You will see the result and correct option immediately."}</li>
              <li><CheckCircle2 /> {ka ? "შენი ქულა live leaderboard-ზე ავტომატურად განახლდება." : "Your score updates on the live leaderboard automatically."}</li>
            </ul>
          </div>

          {currentUser ? (
            <div className="player-ready">
              <div className="user-avatar">{currentUser.name.charAt(0).toUpperCase()}</div>
              <div><span>{ka ? "თამაშობს" : "Playing as"}</span><strong>{currentUser.name}</strong></div>
              <div className="player-progress"><span>{answeredCount}/{quiz.totalQuestions} {ka ? "პასუხი" : "answered"}</span>{result && <b>{ka ? "საუკეთესო" : "Best"}: {result.percentage}%</b>}</div>
            </div>
          ) : (
            <div className="player-warning"><UserRound /><div><strong>{ka ? "შედი ანგარიშში" : "Sign in to play"}</strong><span>{ka ? "ქულის შესანახად საჭიროა ანგარიში." : "An account is required to save your score."}</span></div><button onClick={() => openAuth("sign-in")}>{ka ? "შესვლა" : "Sign in"}</button></div>
          )}

          <div className="intro-actions">
            <Link href="/quizzes" className="button secondary"><ArrowLeft size={17} /> {ka ? "უკან" : "Back"}</Link>
            {currentUser && (
              <Link href={result ? `/quizzes/${quiz._id}/results` : `/quizzes/${quiz._id}/play`} className="button primary">
                {result ? ka ? "შედეგის ნახვა" : "View result" : answeredCount > 0 ? ka ? "გაგრძელება" : "Continue" : ka ? "დაწყება" : "Start"} <ArrowRight size={17} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
