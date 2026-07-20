import type { Language } from "@/types";

const copy: Record<string, Record<Language, string>> = {
  "nav.home": { ka: "მთავარი", en: "Home" },
  "nav.quizzes": { ka: "ქვიზები", en: "Quizzes" },
  "nav.leaderboard": { ka: "ლიდერბორდი", en: "Leaderboard" },
  "nav.account": { ka: "ანგარიში", en: "Account" },
  "auth.signIn": { ka: "შესვლა", en: "Sign in" },
  "auth.signUp": { ka: "რეგისტრაცია", en: "Sign up" },
  "auth.signOut": { ka: "გასვლა", en: "Log out" },
  "auth.welcome": { ka: "კეთილი იყოს შენი დაბრუნება", en: "Welcome back" },
  "auth.create": { ka: "შექმენი Quibly ანგარიში", en: "Create your Quibly account" },
  "auth.signInText": { ka: "შედი, გააგრძელე ქვიზები და აიწიე რეიტინგში.", en: "Sign in, continue your quizzes, and climb the ranking." },
  "auth.signUpText": { ka: "ერთი ანგარიში ინახავს შენს ქულებსა და ადგილს ლიდერბორდზე.", en: "One account keeps your scores and leaderboard position." },
  "auth.username": { ka: "მომხმარებლის სახელი", en: "Username" },
  "auth.email": { ka: "ელფოსტა", en: "Email" },
  "auth.password": { ka: "პაროლი", en: "Password" },
  "auth.noAccount": { ka: "ჯერ არ გაქვს ანგარიში?", en: "New to Quibly?" },
  "auth.haveAccount": { ka: "უკვე გაქვს ანგარიში?", en: "Already have an account?" },
  "auth.loading": { ka: "გთხოვ მოიცადო...", en: "Please wait..." },
  "auth.required": { ka: "ქვიზისთვის საჭიროა ანგარიშში შესვლა.", en: "Sign in to play quizzes and save your score." },
  "account.edit": { ka: "სახელის შეცვლა", en: "Change username" },
  "account.save": { ka: "შენახვა", en: "Save changes" },
  "account.cancel": { ka: "გაუქმება", en: "Cancel" },
  "account.emailLocked": { ka: "ელფოსტის შეცვლა შეუძლებელია", en: "Email cannot be changed" },
  "account.updated": { ka: "მომხმარებლის სახელი განახლდა.", en: "Your username was updated." },
  "language.label": { ka: "English", en: "ქართული" },
  "common.loading": { ka: "იტვირთება...", en: "Loading..." },
  "common.retry": { ka: "თავიდან ცდა", en: "Try again" },
  "common.points": { ka: "ქულა", en: "points" },
  "common.you": { ka: "შენ", en: "You" },
  "socket.live": { ka: "Live", en: "Live" },
  "socket.connecting": { ka: "კავშირი...", en: "Connecting..." },
  "online.title": { ka: "ონლაინ მოთამაშეები", en: "Online players" },
  "online.empty": { ka: "სხვა მოთამაშე ახლა ონლაინ არ არის.", en: "No other players are online right now." },
  "online.signIn": { ka: "ონლაინ მოთამაშეების სანახავად შედი ანგარიშში.", en: "Sign in to see who is online." },
};

export function translate(language: Language, key: string) {
  return copy[key]?.[language] || copy[key]?.ka || key;
}
