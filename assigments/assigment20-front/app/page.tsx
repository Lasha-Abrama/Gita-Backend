"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  MousePointerClick,
  Radio,
  Sparkles,
  Trophy,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { QuizCard } from "@/components/QuizCard";
import { useApp } from "@/components/providers/AppProvider";
import { OnlineUsersBadge } from "@/components/ui/OnlineUsersBadge";
import { api } from "@/lib/api";
import { getAllQuizResults } from "@/lib/storage";
import type { QuizResult, QuizSummary } from "@/types";

export default function HomePage() {
  const { currentUser, language, openAuth, t } = useApp();
  const ka = language === "ka";
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
  const [results, setResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    api.getQuizzes().then(setQuizzes).catch(() => setQuizzes([]));
  }, []);

  useEffect(() => {
    setResults(currentUser ? getAllQuizResults(currentUser._id) : []);
  }, [currentUser]);

  return (
    <>
      <section className="hero section-pad">
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> {ka ? "ყოველდღე ერთი ნაბიჯით მეტი" : "One step smarter every day"}</div>
            <h1>{ka ? "გამოსცადე ცოდნა." : "Test your knowledge."}<br /><span>{ka ? "აიწიე რეიტინგში." : "Climb the ranking."}</span></h1>
            <p>
              {ka ? "აირჩიე შენთვის საინტერესო თემა, უპასუხე სწრაფად და ნახე როგორ იცვლება ლიდერბორდი რეალურ დროში." : "Choose a topic, answer quickly, and watch the leaderboard change in real time."}
            </p>
            <div className="hero-actions">
              {currentUser ? <Link href="/quizzes" className="button primary large">{ka ? "დაიწყე ქვიზი" : "Start a quiz"} <ArrowRight size={18} /></Link> : <><button onClick={() => openAuth("sign-up")} className="button primary large">{t("auth.signUp")} <ArrowRight size={18} /></button><button onClick={() => openAuth("sign-in")} className="button secondary large">{t("auth.signIn")}</button></>}
              <Link href="/leaderboard" className="button secondary large">
                <Trophy size={18} /> {t("nav.leaderboard")}
              </Link>
            </div>
            <div className="hero-trust">
              <span><CheckCircle2 size={15} /> {ka ? "უფასო წვდომა" : "Free access"}</span>
              <span><CheckCircle2 size={15} /> {ka ? "მყისიერი შედეგი" : "Instant results"}</span>
              <OnlineUsersBadge />
            </div>
          </div>

          <div className="hero-visual" aria-label="Quibly live quiz preview">
            <div className="visual-glow" />
            <div className="live-card">
              <div className="live-card-head">
                <span className="category-symbol"><BrainCircuit size={22} /></span>
                <span>General Knowledge</span>
                <span className="question-counter">07 / 10</span>
              </div>
              <div className="mini-progress"><span /></div>
              <p className="live-question">{ka ? "რომელია დედამიწის ბუნებრივი თანამგზავრი?" : "What is Earth's natural satellite?"}</p>
              <div className="live-options">
                <span>A <b>{ka ? "მარსი" : "Mars"}</b></span>
                <span className="selected">B <b>{ka ? "მთვარე" : "Moon"}</b><CheckCircle2 size={17} /></span>
                <span>C <b>{ka ? "ვენერა" : "Venus"}</b></span>
                <span>D <b>{ka ? "მზე" : "Sun"}</b></span>
              </div>
              <div className="live-card-foot">
                <span><Radio size={14} /> Live answer</span>
                <strong>+10 pts</strong>
              </div>
            </div>
            <div className="floating-rank"><Trophy size={18} /><span>New rank</span><strong>#3</strong></div>
            <div className="floating-score"><BarChart3 size={18} /><span>Accuracy</span><strong>86%</strong></div>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="container stats-grid">
          <div><strong>10</strong><span>{ka ? "განსხვავებული თემა" : "different topics"}</span></div>
          <div><strong>100</strong><span>{ka ? "საინტერესო კითხვა" : "engaging questions"}</span></div>
          <div><strong>Live</strong><span>{ka ? "რეალურ დროში შედეგები" : "real-time results"}</span></div>
          <div><strong>∞</strong><span>{ka ? "სწავლის შესაძლებლობა" : "ways to learn"}</span></div>
        </div>
      </section>

      <section className="section-pad featured-section">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <div className="eyebrow"><BrainCircuit size={15} /> {ka ? "გამოიწვიე საკუთარი თავი" : "Challenge yourself"}</div>
              <h2>{ka ? "პოპულარული ქვიზები" : "Popular quizzes"}</h2>
              <p>{ka ? "დაიწყე გამორჩეული თემებით ან დაათვალიერე სრული კოლექცია." : "Start with a featured topic or explore the complete collection."}</p>
            </div>
            <Link href="/quizzes" className="text-link">{ka ? "ყველა ქვიზი" : "All quizzes"} <ArrowRight size={17} /></Link>
          </div>
          <div className="quiz-grid featured-grid">
            {quizzes.slice(0, 3).map((quiz) => (
              <QuizCard
                key={quiz._id}
                quiz={quiz}
                result={results.find((result) => result.quizId === quiz._id)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad how-section">
        <div className="container">
          <div className="section-heading centered-heading">
            <div className="eyebrow"><Sparkles size={15} /> {ka ? "მარტივი პროცესი" : "A simple process"}</div>
            <h2>{ka ? "როგორ მუშაობს Quibly?" : "How does Quibly work?"}</h2>
            <p>{ka ? "სამი ნაბიჯი ცოდნიდან ლიდერბორდამდე." : "Three steps from knowledge to the leaderboard."}</p>
          </div>
          <div className="steps-grid">
            <article><span className="step-number">01</span><span className="step-icon"><UsersRound /></span><h3>{ka ? "შექმენი ანგარიში" : "Create your account"}</h3><p>{ka ? "დარეგისტრირდი და შენი პროგრესი ყოველთვის შენთან დარჩება." : "Sign up once and keep your progress wherever you play."}</p></article>
            <article><span className="step-number">02</span><span className="step-icon"><MousePointerClick /></span><h3>{ka ? "უპასუხე 10 კითხვას" : "Answer 10 questions"}</h3><p>{ka ? "აირჩიე თემა, მიჰყევი პროგრესს და მიიღე მყისიერი შედეგი." : "Choose a topic, track your progress, and get instant feedback."}</p></article>
            <article><span className="step-number">03</span><span className="step-icon"><Trophy /></span><h3>{ka ? "დაიკავე შენი ადგილი" : "Claim your place"}</h3><p>{ka ? "ყველა პასუხზე live leaderboard ავტომატურად განახლდება." : "The live leaderboard updates after every submitted answer."}</p></article>
          </div>
        </div>
      </section>

      <section className="section-pad cta-section">
        <div className="container cta-card">
          <div><div className="eyebrow light"><Sparkles size={15} /> {ka ? "მზად ხარ?" : "Ready?"}</div><h2>{ka ? "შენი შემდეგი საუკეთესო შედეგი აქ იწყება." : "Your next personal best starts here."}</h2><p>{ka ? "100 კითხვა გელოდება — აირჩიე თემა და დაიწყე ახლავე." : "100 questions are waiting — choose a topic and begin."}</p></div>
          {currentUser ? <Link href="/quizzes" className="button light large">{ka ? "ქვიზების ნახვა" : "Explore quizzes"} <ArrowRight size={18} /></Link> : <button onClick={() => openAuth("sign-up")} className="button light large">{t("auth.signUp")} <ArrowRight size={18} /></button>}
        </div>
      </section>
    </>
  );
}
