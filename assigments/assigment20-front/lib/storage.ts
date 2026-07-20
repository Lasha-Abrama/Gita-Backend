import type { QuizResult } from "@/types";

const resultKey = (userId: string, quizId: string) =>
  `quibly:result:${userId}:${quizId}`;

export function saveQuizResult(result: QuizResult) {
  localStorage.setItem(resultKey(result.userId, result.quizId), JSON.stringify(result));
}

export function saveLatestQuizResult(result: QuizResult) {
  sessionStorage.setItem("quibly:latest-result", JSON.stringify(result));
}

export function getLatestQuizResult(userId: string, quizId: string) {
  const raw = sessionStorage.getItem("quibly:latest-result");
  if (!raw) return null;

  try {
    const result = JSON.parse(raw) as QuizResult;
    return result.userId === userId && result.quizId === quizId ? result : null;
  } catch {
    return null;
  }
}

export function getQuizResult(userId: string, quizId: string) {
  const raw = localStorage.getItem(resultKey(userId, quizId));
  if (!raw) return null;

  try {
    return JSON.parse(raw) as QuizResult;
  } catch {
    return null;
  }
}

export function getAllQuizResults(userId: string) {
  const results: QuizResult[] = [];
  const prefix = `quibly:result:${userId}:`;

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (!key?.startsWith(prefix)) continue;

    try {
      results.push(JSON.parse(localStorage.getItem(key) || ""));
    } catch {
      // Ignore malformed local progress and keep the rest usable.
    }
  }

  return results;
}
