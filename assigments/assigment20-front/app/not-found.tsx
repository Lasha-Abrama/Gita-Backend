"use client";

import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";

export default function NotFound() {
  const { language } = useApp();
  const ka = language === "ka";
  return (
    <div className="page-wrap section-pad"><div className="container narrow"><div className="page-state">
      <span className="state-icon"><Compass /></span>
      <h1>404 — {ka ? "გვერდი ვერ მოიძებნა" : "Page not found"}</h1>
      <p>{ka ? "მისამართი შეიძლება შეიცვალა ან ეს გვერდი აღარ არსებობს." : "The address may have changed, or this page no longer exists."}</p>
      <Link href="/" className="button primary"><ArrowLeft size={17} /> {ka ? "მთავარ გვერდზე დაბრუნება" : "Back to homepage"}</Link>
    </div></div></div>
  );
}
