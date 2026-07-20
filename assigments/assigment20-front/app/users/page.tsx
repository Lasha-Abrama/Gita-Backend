"use client";

import { LoaderCircle, LockKeyhole, LogOut, Mail, Save, ShieldCheck, Trophy, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { getErrorMessage } from "@/lib/api";

export default function AccountPage() {
  const { currentUser, authLoading, language, t, openAuth, logout, updateUsername, notify } = useApp();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const ka = language === "ka";

  useEffect(() => setName(currentUser?.name || ""), [currentUser]);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2 || name.trim() === currentUser?.name) return;
    setSaving(true);
    try {
      await updateUsername(name.trim());
      notify(t("account.updated"), "success");
    } catch (error) {
      notify(getErrorMessage(error, language), "error");
    } finally {
      setSaving(false);
    }
  }

  if (authLoading) return <div className="center-page"><LoaderCircle className="spin" /></div>;

  if (!currentUser) return (
    <div className="page-wrap section-pad"><div className="container narrow"><section className="account-page-card glass-panel signed-out-account"><LockKeyhole /><h1>{ka ? "შედი შენს ანგარიშში" : "Sign in to your account"}</h1><p>{t("auth.required")}</p><div><button className="button secondary" onClick={() => openAuth("sign-in")}>{t("auth.signIn")}</button><button className="button primary" onClick={() => openAuth("sign-up")}>{t("auth.signUp")}</button></div></section></div></div>
  );

  return (
    <div className="page-wrap section-pad account-page"><div className="container narrow">
      <div className="page-heading"><div className="eyebrow"><ShieldCheck size={15} /> {ka ? "დაცული ანგარიში" : "Secure account"}</div><h1>{t("nav.account")}</h1><p>{ka ? "მართე მომხმარებლის სახელი და ნახე შენი საერთო პროგრესი." : "Manage your username and review your overall progress."}</p></div>
      <section className="account-page-card glass-panel">
        <div className="account-identity"><span className="account-avatar profile-avatar">{currentUser.name.charAt(0).toUpperCase()}</span><div><h2>{currentUser.name}</h2><p>{currentUser.email}</p></div></div>
        <div className="account-stats"><div><Trophy /><span>{ka ? "საერთო ქულა" : "Total score"}</span><strong>{currentUser.score}</strong></div><div><ShieldCheck /><span>{ka ? "გაცემული პასუხი" : "Answers submitted"}</span><strong>{currentUser.answeredQuestions.length}</strong></div></div>
        <form onSubmit={save} className="account-page-form">
          <label className="form-field"><span>{t("auth.username")}</span><div className="input-wrap"><UserRound size={17} /><input value={name} onChange={(event) => setName(event.target.value)} maxLength={50} /></div></label>
          <label className="form-field locked-field"><span>{t("auth.email")}</span><div className="input-wrap"><Mail size={17} /><input value={currentUser.email} disabled /><LockKeyhole size={15} /></div><small>{t("account.emailLocked")}</small></label>
          <button className="button primary" disabled={saving || name.trim().length < 2 || name.trim() === currentUser.name}>{saving ? <LoaderCircle className="spin" size={17} /> : <Save size={17} />} {t("account.save")}</button>
        </form>
        <button className="account-page-logout" onClick={logout}><LogOut size={17} /> {t("auth.signOut")}</button>
      </section>
    </div></div>
  );
}
