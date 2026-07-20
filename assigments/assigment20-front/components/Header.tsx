"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Globe2, LoaderCircle, LogOut, Menu, Pencil, Sparkles, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { OnlineUsersBadge } from "@/components/ui/OnlineUsersBadge";
import { getErrorMessage } from "@/lib/api";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const { currentUser, authLoading, language, setLanguage, t, openAuth, logout, updateUsername, notify } = useApp();

  const navigation = [
    { href: "/", label: t("nav.home") },
    { href: "/quizzes", label: t("nav.quizzes") },
    { href: "/leaderboard", label: t("nav.leaderboard") },
  ];

  useEffect(() => {
    setMenuOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => setName(currentUser?.name || ""), [currentUser]);

  async function saveUsername(event: React.FormEvent) {
    event.preventDefault();
    const cleanName = name.trim();
    if (cleanName.length < 2 || cleanName === currentUser?.name) return;
    setSaving(true);
    try {
      await updateUsername(cleanName);
      setEditing(false);
      notify(t("account.updated"), "success");
    } catch (error) {
      notify(getErrorMessage(error, language), "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Quibly home">
          <span className="brand-mark"><Sparkles size={18} /></span>
          <span>Quibly</span>
        </Link>

        <nav className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
          {navigation.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return <Link key={item.href} href={item.href} className={active ? "active" : ""}>{item.label}</Link>;
          })}
        </nav>

        <div className="header-actions">
          <OnlineUsersBadge compact />
          <button className="language-toggle" onClick={() => setLanguage(language === "ka" ? "en" : "ka")} aria-label="Change language"><Globe2 size={15} /><span>{t("language.label")}</span></button>

          {!authLoading && (currentUser ? (
            <div className="account-menu-wrap">
              <button className="account-trigger" onClick={() => setAccountOpen((open) => !open)} aria-expanded={accountOpen}>
                <span className="account-avatar">{currentUser.name.charAt(0).toUpperCase()}</span>
                <span>{currentUser.name}</span>
                <ChevronDown size={14} />
              </button>
              {accountOpen && (
                <div className="account-popover">
                  <div className="account-summary"><span className="account-avatar large">{currentUser.name.charAt(0).toUpperCase()}</span><div><strong>{currentUser.name}</strong><small>{currentUser.email}</small></div></div>
                  {editing ? (
                    <form className="account-edit-form" onSubmit={saveUsername}>
                      <label><span>{t("auth.username")}</span><div className="input-wrap"><UserRound size={16} /><input value={name} onChange={(event) => setName(event.target.value)} autoFocus maxLength={50} /></div></label>
                      <small>{t("account.emailLocked")}</small>
                      <div><button type="button" className="button tiny secondary" onClick={() => { setEditing(false); setName(currentUser.name); }}>{t("account.cancel")}</button><button className="button tiny primary" disabled={saving || name.trim().length < 2}>{saving ? <LoaderCircle className="spin" size={14} /> : <Check size={14} />} {t("account.save")}</button></div>
                    </form>
                  ) : (
                    <div className="account-menu-actions"><button onClick={() => setEditing(true)}><Pencil size={16} /> {t("account.edit")}</button><button className="logout-action" onClick={() => { logout(); setAccountOpen(false); }}><LogOut size={16} /> {t("auth.signOut")}</button></div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="auth-header-actions"><button className="button tiny secondary" onClick={() => openAuth("sign-in")}>{t("auth.signIn")}</button><button className="button tiny primary" onClick={() => openAuth("sign-up")}>{t("auth.signUp")}</button></div>
          ))}

          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
  );
}
