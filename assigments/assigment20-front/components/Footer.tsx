"use client";

import Link from "next/link";
import { Code2, Sparkles } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";

export function Footer() {
  const { language, t } = useApp();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div><Link href="/" className="brand footer-brand"><span className="brand-mark"><Sparkles size={16} /></span><span>Quibly</span></Link><p>{language === "ka" ? "ცოდნა, შეჯიბრი და რეალურ დროში განახლებული შედეგები — ერთ სივრცეში." : "Knowledge, competition, and real-time results — all in one place."}</p></div>
        <div className="footer-links"><Link href="/quizzes">{t("nav.quizzes")}</Link><Link href="/leaderboard">{t("nav.leaderboard")}</Link></div>
        <div className="footer-note"><Code2 size={17} /><span>Built with React, Express & Socket.IO</span></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Quibly</span><span>{language === "ka" ? "100 კითხვა • 10 თემა • ერთი live leaderboard" : "100 questions • 10 topics • one live leaderboard"}</span></div>
    </footer>
  );
}
