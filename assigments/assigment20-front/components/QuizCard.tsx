"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock3, Gauge, Layers3 } from "lucide-react";
import { getQuizMeta } from "@/lib/quiz-meta";
import { getQuizTitle } from "@/lib/quiz-meta";
import { useApp } from "@/components/providers/AppProvider";
import type { QuizResult, QuizSummary } from "@/types";

export function QuizCard({ quiz, result }: { quiz: QuizSummary; result?: QuizResult }) {
  const { language } = useApp();
  const ka = language === "ka";
  const meta = getQuizMeta(quiz.topic, language);
  const { Icon } = meta;

  return (
    <article className={`quiz-card accent-${meta.accent}`}>
      <div className="quiz-card-top">
        <span className="quiz-icon"><Icon size={22} /></span>
        <span className="topic-pill">{quiz.topic}</span>
        {result && <span className="completion-pill"><CheckCircle2 size={13} /> {ka ? "დასრულებული" : "Completed"}</span>}
      </div>
      <h3>{getQuizTitle(quiz.topic, quiz.title, language)}</h3>
      <p>{meta.description}</p>
      <div className="quiz-facts">
        <span><Layers3 size={15} /> {ka ? "10 კითხვა" : "10 questions"}</span>
        <span><Gauge size={15} /> {meta.difficulty}</span>
        <span><Clock3 size={15} /> ~{meta.minutes} {ka ? "წთ" : "min"}</span>
      </div>
      {result && (
        <div className="best-result">
          <span>{ka ? "ბოლო შედეგი" : "Last score"}</span>
          <strong>{result.percentage}%</strong>
        </div>
      )}
      <Link href={`/quizzes/${quiz._id}`} className="card-link">
        {result ? ka ? "შედეგის ნახვა" : "View result" : ka ? "ქვიზის დაწყება" : "Start quiz"}
        <ArrowUpRight size={17} />
      </Link>
    </article>
  );
}
