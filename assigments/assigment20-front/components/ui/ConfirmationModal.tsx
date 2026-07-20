"use client";

import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";
import { useApp } from "@/components/providers/AppProvider";

export function ConfirmationModal({
  open,
  title,
  description,
  confirmLabel = "",
  loading = false,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const { language } = useApp();
  const ka = language === "ka";
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label={ka ? "დახურვა" : "Close"}>
          <X size={18} />
        </button>
        <span className="modal-icon danger"><AlertTriangle size={24} /></span>
        <h2 id="confirm-title">{title}</h2>
        <p>{description}</p>
        <div className="modal-actions">
          <button className="button secondary" onClick={onClose} disabled={loading}>{ka ? "გაუქმება" : "Cancel"}</button>
          <button className="button danger" onClick={onConfirm} disabled={loading}>
            {loading ? ka ? "მუშავდება..." : "Working..." : confirmLabel || (ka ? "წაშლა" : "Delete")}
          </button>
        </div>
      </div>
    </div>
  );
}
