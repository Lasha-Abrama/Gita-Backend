"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api, getAccessToken, getErrorMessage, normalizeLeaderboard, setAccessToken } from "@/lib/api";
import { translate } from "@/lib/i18n";
import { getSocket } from "@/lib/socket";
import type { AuthMode, Language, LeaderboardEntry, OnlineUser, ToastMessage, User } from "@/types";

type Credentials = { email: string; password: string };
type Registration = Credentials & { name: string };

type AppContextValue = {
  leaderboard: LeaderboardEntry[];
  leaderboardLoading: boolean;
  onlineUsers: number;
  onlineUserList: OnlineUser[];
  socketConnected: boolean;
  currentUser: User | null;
  currentUserId: string;
  authLoading: boolean;
  authModal: AuthMode | null;
  language: Language;
  t: (key: string) => string;
  setLanguage: (language: Language) => void;
  openAuth: (mode?: AuthMode) => void;
  closeAuth: () => void;
  signIn: (payload: Credentials) => Promise<void>;
  signUp: (payload: Registration) => Promise<void>;
  logout: () => void;
  updateUsername: (name: string) => Promise<void>;
  refreshCurrentUser: () => Promise<void>;
  refreshLeaderboard: () => Promise<void>;
  notify: (message: string, type?: ToastMessage["type"]) => void;
  toasts: ToastMessage[];
  dismissToast: (id: number) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [onlineUserList, setOnlineUserList] = useState<OnlineUser[]>([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authModal, setAuthModal] = useState<AuthMode | null>(null);
  const [language, setLanguageState] = useState<Language>("ka");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const t = useCallback((key: string) => translate(language, key), [language]);

  const notify = useCallback(
    (message: string, type: ToastMessage["type"] = "info") => {
      const id = Date.now() + Math.random();
      setToasts((current) => [...current, { id, message, type }]);
      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, 4200);
    },
    [],
  );

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    localStorage.setItem("quibly:language", nextLanguage);
    document.documentElement.lang = nextLanguage;
  }, []);

  const refreshCurrentUser = useCallback(async () => {
    if (!getAccessToken()) {
      setCurrentUser(null);
      return;
    }

    try {
      setCurrentUser(await api.getCurrentUser());
    } catch {
      setAccessToken("");
      setCurrentUser(null);
    }
  }, []);

  const refreshLeaderboard = useCallback(async () => {
    setLeaderboardLoading(true);
    try {
      setLeaderboard(await api.getLeaderboard());
    } catch (error) {
      notify(getErrorMessage(error, language), "error");
    } finally {
      setLeaderboardLoading(false);
    }
  }, [language, notify]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("quibly:language");
    if (savedLanguage === "en" || savedLanguage === "ka") {
      setLanguageState(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }

    Promise.all([refreshCurrentUser(), refreshLeaderboard()]).finally(() => {
      setAuthLoading(false);
    });
  }, [refreshCurrentUser, refreshLeaderboard]);

  useEffect(() => {
    const token = getAccessToken();
    const socket = getSocket(token);

    const onConnect = () => setSocketConnected(true);
    const onDisconnect = () => setSocketConnected(false);
    const onOnlineUsers = (data: { count: number; users?: OnlineUser[] }) => {
      setOnlineUsers(data.count);
      setOnlineUserList(data.users || []);
    };
    const onLeaderboard = (data: LeaderboardEntry[]) => {
      setLeaderboard(normalizeLeaderboard(data));
      setLeaderboardLoading(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onDisconnect);
    socket.on("online-users:update", onOnlineUsers);
    socket.on("leaderboard:update", onLeaderboard);

    if (currentUser && token) socket.connect();
    else {
      socket.disconnect();
      setSocketConnected(false);
      setOnlineUsers(0);
      setOnlineUserList([]);
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onDisconnect);
      socket.off("online-users:update", onOnlineUsers);
      socket.off("leaderboard:update", onLeaderboard);
    };
  }, [currentUser]);

  const finishAuthentication = useCallback((accessToken: string, user: User) => {
    setAccessToken(accessToken);
    setCurrentUser(user);
    setAuthModal(null);
  }, []);

  const signIn = useCallback(async (payload: Credentials) => {
    const response = await api.signIn(payload);
    finishAuthentication(response.accessToken, response.user);
  }, [finishAuthentication]);

  const signUp = useCallback(async (payload: Registration) => {
    const response = await api.signUp(payload);
    finishAuthentication(response.accessToken, response.user);
  }, [finishAuthentication]);

  const logout = useCallback(() => {
    setAccessToken("");
    getSocket().disconnect();
    setCurrentUser(null);
    setOnlineUsers(0);
    setOnlineUserList([]);
    setSocketConnected(false);
  }, []);

  const updateUsername = useCallback(async (name: string) => {
    setCurrentUser(await api.updateCurrentUser({ name }));
  }, []);

  const value = useMemo(() => ({
    leaderboard,
    leaderboardLoading,
    onlineUsers,
    onlineUserList,
    socketConnected,
    currentUser,
    currentUserId: currentUser?._id || "",
    authLoading,
    authModal,
    language,
    t,
    setLanguage,
    openAuth: (mode: AuthMode = "sign-in") => setAuthModal(mode),
    closeAuth: () => setAuthModal(null),
    signIn,
    signUp,
    logout,
    updateUsername,
    refreshCurrentUser,
    refreshLeaderboard,
    notify,
    toasts,
    dismissToast,
  }), [
    authLoading, authModal, currentUser, dismissToast, language, leaderboard,
    leaderboardLoading, logout, notify, onlineUserList, onlineUsers, refreshCurrentUser,
    refreshLeaderboard, setLanguage, signIn, signUp, socketConnected, t, toasts,
    updateUsername,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
