"use client";

import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { ApiError, getErrorMessage } from "@/lib/api";

type FormState = { name: string; email: string; password: string };
const emptyForm: FormState = { name: "", email: "", password: "" };

export function AuthModal() {
  const { authModal, closeAuth, openAuth, signIn, signUp, language, t, notify } = useApp();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm(emptyForm);
    setErrors({});
    setShowPassword(false);
  }, [authModal]);

  if (!authModal) return null;
  const signingUp = authModal === "sign-up";

  function validate() {
    const nextErrors: Partial<FormState> = {};
    if (signingUp && form.name.trim().length < 2) nextErrors.name = language === "ka" ? "სახელი მინიმუმ 2 სიმბოლო უნდა იყოს." : "Username must be at least 2 characters.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) nextErrors.email = language === "ka" ? "შეიყვანე სწორი ელფოსტა." : "Enter a valid email address.";
    if (form.password.length < 6) nextErrors.password = language === "ka" ? "პაროლი მინიმუმ 6 სიმბოლო უნდა იყოს." : "Password must be at least 6 characters.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (signingUp) await signUp({ name: form.name.trim(), email: form.email.trim(), password: form.password });
      else await signIn({ email: form.email.trim(), password: form.password });
      notify(language === "ka" ? "ანგარიშში წარმატებით შეხვედით." : "You are signed in.", "success");
    } catch (error) {
      if (error instanceof ApiError && error.issues.length) {
        const nextErrors: Partial<FormState> = {};
        error.issues.forEach((issue) => {
          if (issue.field === "name" || issue.field === "email" || issue.field === "password") nextErrors[issue.field] = issue.message;
        });
        setErrors(nextErrors);
      }
      notify(getErrorMessage(error, language), "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-backdrop auth-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeAuth()}>
      <section className="modal-card auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button className="modal-close" onClick={closeAuth} aria-label={t("account.cancel")}><X /></button>
        <div className="auth-brand"><span className="brand-mark"><LockKeyhole size={18} /></span><span>Quibly</span></div>
        <h2 id="auth-title">{signingUp ? t("auth.create") : t("auth.welcome")}</h2>
        <p>{signingUp ? t("auth.signUpText") : t("auth.signInText")}</p>

        <form onSubmit={submit} noValidate className="auth-form">
          {signingUp && <label className="form-field"><span>{t("auth.username")}</span><div className={errors.name ? "input-wrap invalid" : "input-wrap"}><UserRound size={17} /><input autoFocus value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} autoComplete="username" /></div>{errors.name && <small>{errors.name}</small>}</label>}
          <label className="form-field"><span>{t("auth.email")}</span><div className={errors.email ? "input-wrap invalid" : "input-wrap"}><Mail size={17} /><input autoFocus={!signingUp} type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} autoComplete="email" /></div>{errors.email && <small>{errors.email}</small>}</label>
          <label className="form-field"><span>{t("auth.password")}</span><div className={errors.password ? "input-wrap invalid" : "input-wrap"}><LockKeyhole size={17} /><input type={showPassword ? "text" : "password"} value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} autoComplete={signingUp ? "new-password" : "current-password"} /><button type="button" className="password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label="Toggle password visibility">{showPassword ? <EyeOff /> : <Eye />}</button></div>{errors.password && <small>{errors.password}</small>}</label>
          <button className="button primary full" disabled={submitting}>{submitting ? <><LoaderCircle className="spin" size={17} /> {t("auth.loading")}</> : signingUp ? t("auth.signUp") : t("auth.signIn")}</button>
        </form>

        <div className="auth-switch"><span>{signingUp ? t("auth.haveAccount") : t("auth.noAccount")}</span><button onClick={() => openAuth(signingUp ? "sign-in" : "sign-up")}>{signingUp ? t("auth.signIn") : t("auth.signUp")}</button></div>
      </section>
    </div>
  );
}
