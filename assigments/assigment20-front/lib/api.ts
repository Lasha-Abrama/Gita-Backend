import type {
  AnswerResponse,
  AuthResponse,
  Language,
  LeaderboardEntry,
  QuizDetail,
  QuizSummary,
  User,
} from "@/types";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

const TOKEN_KEY = "quibly:access-token";

export function getAccessToken() {
  return typeof window === "undefined" ? "" : localStorage.getItem(TOKEN_KEY) || "";
}

export function setAccessToken(token: string) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

type ValidationIssue = {
  field?: string;
  message: string;
};

export class ApiError extends Error {
  status: number;
  issues: ValidationIssue[];

  constructor(message: string, status = 500, issues: ValidationIssue[] = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.issues = issues;
  }
}

export function normalizeUser(user: Partial<User> & { _id: string }): User {
  return {
    _id: user._id,
    name: user.name?.trim() || "Unnamed player",
    email: user.email?.trim() || "legacy-profile@quibly.local",
    score: Number.isFinite(Number(user.score)) ? Number(user.score) : 0,
    answeredQuestions: Array.isArray(user.answeredQuestions)
      ? user.answeredQuestions
      : [],
    createdAt: user.createdAt || "",
    updatedAt: user.updatedAt || "",
  };
}

export function normalizeLeaderboard(entries: LeaderboardEntry[]) {
  return entries.map((entry, index) => ({
    rank: Number(entry.rank) || index + 1,
    userId: entry.userId,
    name: entry.name?.trim() || "Unnamed player",
    score: Number.isFinite(Number(entry.score)) ? Number(entry.score) : 0,
  }));
}

async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    const token = getAccessToken();
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError(
        data.message || "მოთხოვნის შესრულება ვერ მოხერხდა",
        response.status,
        data.errors || [],
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    throw new ApiError(
      "სერვერთან დაკავშირება ვერ მოხერხდა. დარწმუნდი, რომ backend გაშვებულია.",
      0,
    );
  }
}

export const api = {
  signUp: (payload: { name: string; email: string; password: string }) =>
    apiRequest<AuthResponse>("/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  signIn: (payload: { email: string; password: string }) =>
    apiRequest<AuthResponse>("/api/auth/sign-in", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getCurrentUser: async () => {
    const data = await apiRequest<{ user: User }>("/api/auth/current-user");
    return normalizeUser(data.user);
  },

  updateCurrentUser: async (payload: { name: string }) => {
    const data = await apiRequest<{ message: string; user: User }>(
      "/api/users/me",
      { method: "PATCH", body: JSON.stringify(payload) },
    );
    return normalizeUser(data.user);
  },

  getQuizzes: async () => {
    const data = await apiRequest<{ count: number; quizzes: QuizSummary[] }>(
      "/api/quizzes",
    );
    return data.quizzes;
  },

  getQuiz: async (id: string) => {
    const data = await apiRequest<{ quiz: QuizDetail }>(`/api/quizzes/${id}`);
    return data.quiz;
  },

  getLeaderboard: async () => {
    const data = await apiRequest<{
      count: number;
      leaderboard: LeaderboardEntry[];
    }>("/api/leaderboard");
    return normalizeLeaderboard(data.leaderboard);
  },

  submitAnswer: (payload: {
    quizId: string;
    questionId: string;
    selectedOption: number;
  }) =>
    apiRequest<AnswerResponse>("/api/answers", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export function getErrorMessage(error: unknown, language: Language = "ka") {
  if (error instanceof ApiError) {
    if (error.status === 409) {
      return error.message.includes("already answered")
        ? language === "ka" ? "ამ კითხვაზე პასუხი უკვე გაგზავნილია." : "You already answered this question."
        : language === "ka" ? "ასეთი მონაცემი უკვე არსებობს." : "This information already exists.";
    }

    return error.issues[0]?.message || error.message;
  }

  return language === "ka" ? "მოულოდნელი შეცდომა მოხდა. სცადე თავიდან." : "Something went wrong. Please try again.";
}
