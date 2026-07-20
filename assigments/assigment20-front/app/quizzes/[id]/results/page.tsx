"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, CheckCircle2, RotateCcw, Sparkles, Target, Trophy, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { EmptyState } from "@/components/ui/PageState";
import { getLatestQuizResult, getQuizResult } from "@/lib/storage";
import type { Language, QuizResult } from "@/types";

function performanceCopy(percentage: number, language: Language) {
  if (language === "en") {
    if (percentage >= 90) return { title: "Fantastic result!", text: "You know this topic exceptionally well — the leaderboard deserves your attention." };
    if (percentage >= 70) return { title: "Great game!", text: "A strong result. A little practice will take you close to a perfect score." };
    if (percentage >= 50) return { title: "A good start!", text: "You have the foundation — give it another try in practice mode." };
    return { title: "Every attempt is progress", text: "Review your answers and improve your result in practice mode." };
  }
  if (percentage >= 90) return { title: "ფანტასტიკური შედეგია!", text: "ამ თემას შესანიშნავად ფლობ — ლიდერბორდი შენს ყურადღებას იმსახურებს." };
  if (percentage >= 70) return { title: "ძალიან კარგი თამაში!", text: "ძლიერი შედეგია. ცოტა პრაქტიკა და იდეალურ ქულასთან იქნები." };
  if (percentage >= 50) return { title: "კარგი დასაწყისია!", text: "საფუძველი გაქვს — practice რეჟიმში კიდევ ერთხელ სცადე." };
  return { title: "ყოველი ცდა პროგრესია", text: "პასუხებს გადახედე და practice რეჟიმში უკეთესი შედეგი დააფიქსირე." };
}

export default function QuizResultsPage() {
  const params = useParams<{ id: string }>();
  const { currentUser, language } = useApp();
  const ka = language === "ka";
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    setResult(
      currentUser
        ? getLatestQuizResult(currentUser._id, params.id)
          || getQuizResult(currentUser._id, params.id)
        : null,
    );
  }, [currentUser, params.id]);

  if (!result) {
    return <div className="page-wrap section-pad"><div className="container narrow"><EmptyState title={ka ? "შედეგი ჯერ არ არის" : "No result yet"} description={ka ? "ჯერ დაასრულე ქვიზი და შედეგი აქ გამოჩნდება." : "Complete the quiz first and your result will appear here."} action={<Link href={`/quizzes/${params.id}`} className="button primary">{ka ? "ქვიზზე დაბრუნება" : "Back to quiz"}</Link>} /></div></div>;
  }

  const copy = performanceCopy(result.percentage, language);
  const circumference = 2 * Math.PI * 68;
  const dashOffset = circumference - (result.percentage / 100) * circumference;

  return (
    <div className="results-page section-pad">
      {result.percentage >= 80 && <div className="celebration" aria-hidden="true"><i /><i /><i /><i /><i /></div>}
      <div className="container narrow">
        <div className="results-card">
          <div className="results-eyebrow"><Sparkles size={16} /> {ka ? "ქვიზი დასრულებულია" : "Quiz completed"}</div>
          <h1>{copy.title}</h1>
          <p>{copy.text}</p>

          <div className="score-ring-wrap">
            <svg className="score-ring" viewBox="0 0 160 160" aria-label={`${result.percentage}%`}>
              <circle className="ring-bg" cx="80" cy="80" r="68" />
              <circle className="ring-value" cx="80" cy="80" r="68" strokeDasharray={circumference} strokeDashoffset={dashOffset} />
            </svg>
            <div className="score-ring-label"><strong>{result.percentage}%</strong><span>{result.score}/100 {ka ? "ქულა" : "points"}</span></div>
          </div>

          <h2>{result.quizTitle}</h2>
          <div className="result-stats">
            <div className="success"><CheckCircle2 /><span>{ka ? "სწორი პასუხი" : "Correct"}</span><strong>{result.correct}</strong></div>
            <div className="danger"><XCircle /><span>{ka ? "არასწორი პასუხი" : "Incorrect"}</span><strong>{result.incorrect}</strong></div>
            <div><Target /><span>{ka ? "სიზუსტე" : "Accuracy"}</span><strong>{result.percentage}%</strong></div>
            <div><Trophy /><span>{ka ? "მიღებული ქულა" : "Points earned"}</span><strong>{result.score}</strong></div>
          </div>

          <div className="results-note">
            <strong>Practice retry</strong>
            <span>{ka ? "ხელახლა ცდა leaderboard-ის ქულას აღარ შეცვლის — შეგიძლია თავისუფლად ივარჯიშო." : "Retrying will not change your leaderboard score, so you can practice freely."}</span>
          </div>

          <div className="results-actions">
            <Link href={`/quizzes/${result.quizId}/play?practice=1`} className="button secondary"><RotateCcw size={17} /> {ka ? "ხელახლა ცდა" : "Try again"}</Link>
            <Link href="/quizzes" className="button secondary">{ka ? "სხვა ქვიზები" : "Other quizzes"}</Link>
            <Link href="/leaderboard" className="button primary"><Trophy size={17} /> {ka ? "ლიდერბორდი" : "Leaderboard"} <ArrowRight size={17} /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
