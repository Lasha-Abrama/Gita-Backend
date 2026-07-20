export type User = {
  _id: string;
  name: string;
  email: string;
  score: number;
  answeredQuestions: string[];
  createdAt: string;
  updatedAt: string;
};

export type Language = "ka" | "en";
export type AuthMode = "sign-in" | "sign-up";

export type AuthResponse = {
  message: string;
  accessToken: string;
  user: User;
};

export type QuizSummary = {
  _id: string;
  title: string;
  topic: string;
};

export type Question = {
  _id: string;
  question: string;
  options: string[];
  points: number;
};

export type QuizDetail = QuizSummary & {
  totalQuestions: number;
  questions: Question[];
};

export type LeaderboardEntry = {
  rank: number;
  userId: string;
  name: string;
  score: number;
};

export type OnlineUser = {
  userId: string;
  name: string;
};

export type AnswerResponse = {
  message: string;
  result: {
    isCorrect: boolean;
    correctOption: number;
    earnedPoints: number;
    totalScore: number;
  };
  leaderboard: LeaderboardEntry[];
};

export type AnswerRecord = {
  questionId: string;
  selectedOption: number;
  correctOption: number;
  isCorrect: boolean;
  earnedPoints: number;
};

export type QuizResult = {
  quizId: string;
  quizTitle: string;
  userId: string;
  correct: number;
  incorrect: number;
  score: number;
  percentage: number;
  completedAt: string;
  answers: AnswerRecord[];
};

export type ToastMessage = {
  id: number;
  type: "success" | "error" | "info";
  message: string;
};
