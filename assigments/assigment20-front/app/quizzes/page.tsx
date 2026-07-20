"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { QuizCard } from "@/components/QuizCard";
import { useApp } from "@/components/providers/AppProvider";
import { EmptyState, ErrorState, PageSkeleton } from "@/components/ui/PageState";
import { api, getErrorMessage } from "@/lib/api";
import { getAllQuizResults } from "@/lib/storage";
import type { QuizResult, QuizSummary } from "@/types";

export default function QuizzesPage() {
  const { currentUser, language } = useApp();
  const ka = language === "ka";
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadQuizzes = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setQuizzes(await api.getQuizzes());
    } catch (requestError) {
      setError(getErrorMessage(requestError, language));
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => { void loadQuizzes(); }, [loadQuizzes]);
  useEffect(() => {
    setResults(currentUser ? getAllQuizResults(currentUser._id) : []);
  }, [currentUser]);

  const topics = useMemo(
    () => ["All", ...Array.from(new Set(quizzes.map((quiz) => quiz.topic)))],
    [quizzes],
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return quizzes.filter((quiz) => {
      const matchesTopic = topic === "All" || quiz.topic === topic;
      const matchesSearch = !query || `${quiz.title} ${quiz.topic}`.toLowerCase().includes(query);
      return matchesTopic && matchesSearch;
    });
  }, [quizzes, search, topic]);

  return (
    <div className="page-wrap section-pad">
      <div className="container">
        <div className="page-heading">
          <div><div className="eyebrow"><SlidersHorizontal size={15} /> {ka ? "10 თემა • 100 კითხვა" : "10 topics • 100 questions"}</div><h1>{ka ? "აირჩიე შენი გამოწვევა" : "Choose your challenge"}</h1><p>{ka ? "იპოვე საინტერესო თემა და შეამოწმე რამდენად შორს შეგიძლია წასვლა." : "Find a topic you enjoy and discover how far your knowledge can take you."}</p></div>
        </div>

        <div className="filter-bar glass-panel">
          <label className="search-field">
            <Search size={18} />
            <span className="sr-only">{ka ? "ქვიზის ძიება" : "Search quizzes"}</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={ka ? "მოძებნე ქვიზი ან თემა..." : "Search a quiz or topic..."} />
          </label>
          <div className="topic-filters" role="group" aria-label={ka ? "თემის ფილტრი" : "Topic filter"}>
            {topics.map((item) => (
              <button key={item} className={topic === item ? "active" : ""} onClick={() => setTopic(item)}>
                {item === "All" ? ka ? "ყველა" : "All" : item}
              </button>
            ))}
          </div>
        </div>

        {loading ? <PageSkeleton /> : error ? <ErrorState message={error} retry={loadQuizzes} /> : filtered.length === 0 ? (
          <EmptyState title={ka ? "ქვიზი ვერ მოიძებნა" : "No quizzes found"} description={ka ? "შეცვალე საძიებო სიტყვა ან ფილტრი." : "Try another search term or filter."} />
        ) : (
          <div className="quiz-grid">
            {filtered.map((quiz) => (
              <QuizCard key={quiz._id} quiz={quiz} result={results.find((result) => result.quizId === quiz._id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
