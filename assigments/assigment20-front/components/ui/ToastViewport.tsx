"use client";

import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";

export function ToastViewport() {
  const { toasts, dismissToast, language } = useApp();

  return (
    <div className="toast-viewport" aria-live="polite">
      {toasts.map((toast) => {
        const Icon = toast.type === "success"
          ? CheckCircle2
          : toast.type === "error"
            ? XCircle
            : Info;

        return (
          <div className={`toast ${toast.type}`} key={toast.id}>
            <Icon size={19} />
            <span>{toast.message}</span>
            <button
              aria-label={language === "ka" ? "შეტყობინების დახურვა" : "Dismiss notification"}
              onClick={() => dismissToast(toast.id)}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
