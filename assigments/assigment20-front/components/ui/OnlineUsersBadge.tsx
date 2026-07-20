"use client";

import { Radio, UserRound, UsersRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";

export function OnlineUsersBadge({ compact = false }: { compact?: boolean }) {
  const {
    onlineUsers,
    onlineUserList,
    socketConnected,
    currentUser,
    openAuth,
    t,
  } = useApp();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className="online-badge-wrap" ref={wrapperRef}>
      <button
        className={`online-badge ${socketConnected ? "is-live" : ""}`}
        title={socketConnected ? t("socket.live") : t("socket.connecting")}
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Radio size={15} aria-hidden="true" />
        <span className="live-dot" aria-hidden="true" />
        {!compact && <span>{socketConnected ? t("socket.live") : t("socket.connecting")}</span>}
        <strong>{onlineUsers}</strong>
      </button>

      {open && (
        <div className="online-users-popover" role="dialog" aria-label={t("online.title")}>
          <div className="online-popover-heading"><UsersRound size={17} /><div><strong>{t("online.title")}</strong><span>{onlineUsers}</span></div></div>
          {!currentUser ? (
            <div className="online-empty"><UserRound /><p>{t("online.signIn")}</p><button className="button tiny primary" onClick={() => { setOpen(false); openAuth("sign-in"); }}>{t("auth.signIn")}</button></div>
          ) : onlineUserList.length === 0 ? (
            <div className="online-empty"><UsersRound /><p>{t("online.empty")}</p></div>
          ) : (
            <div className="online-user-list">
              {onlineUserList.map((user) => (
                <div className="online-user-row" key={user.userId}>
                  <span className="online-user-avatar">{user.name.charAt(0).toUpperCase()}</span>
                  <strong>{user.name}</strong>
                  <span><i /> {t("socket.live")}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
