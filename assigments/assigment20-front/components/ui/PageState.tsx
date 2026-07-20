"use client";

import { AlertTriangle, Inbox, LoaderCircle, RefreshCw } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";

export function Loader({ label }: { label?: string }) {
  const { language } = useApp();
  return (
    <div className="page-state compact-state" role="status">
      <LoaderCircle className="spin" size={24} />
      <span>{label || (language === "ka" ? "იტვირთება..." : "Loading...")}</span>
    </div>
  );
}

export function PageSkeleton({ cards = 6 }: { cards?: number }) {
  const { language } = useApp();
  return (
    <div className="skeleton-grid" aria-label={language === "ka" ? "იტვირთება" : "Loading"}>
      {Array.from({ length: cards }, (_, index) => (
        <div className="skeleton-card" key={index}>
          <span className="skeleton-line short" />
          <span className="skeleton-line" />
          <span className="skeleton-line medium" />
          <span className="skeleton-block" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-state">
      <span className="state-icon"><Inbox size={26} /></span>
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
}

export function ErrorState({
  message,
  retry,
}: {
  message: string;
  retry?: () => void;
}) {
  const { language } = useApp();
  const ka = language === "ka";
  return (
    <div className="page-state error-state" role="alert">
      <span className="state-icon"><AlertTriangle size={26} /></span>
      <h3>{ka ? "რაღაც ვერ გამოვიდა" : "Something went wrong"}</h3>
      <p>{message}</p>
      {retry && (
        <button className="button secondary small" onClick={retry}>
          <RefreshCw size={15} /> {ka ? "თავიდან ცდა" : "Try again"}
        </button>
      )}
    </div>
  );
}
