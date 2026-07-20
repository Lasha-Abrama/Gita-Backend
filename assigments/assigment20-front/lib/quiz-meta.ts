import {
  BookOpen,
  BrainCircuit,
  Calculator,
  Clapperboard,
  Cpu,
  Dumbbell,
  FlaskConical,
  Globe2,
  Landmark,
  Music2,
  type LucideIcon,
} from "lucide-react";
import type { Language } from "@/types";

type QuizMeta = {
  description: string;
  difficulty: string;
  minutes: number;
  accent: string;
  Icon: LucideIcon;
};

const englishCopy: Record<string, { title: string; description: string; difficulty: string }> = {
  Geography: { title: "Geography Quiz", description: "Countries, cities, oceans, and remarkable places around the world.", difficulty: "Medium" },
  Science: { title: "Science Quiz", description: "The laws of nature, the human body, and our universe.", difficulty: "Medium" },
  History: { title: "History Quiz", description: "Important eras, events, and influential historical figures.", difficulty: "Hard" },
  Technology: { title: "Technology Quiz", description: "Web technologies, programming, and the digital world.", difficulty: "Medium" },
  Sports: { title: "Sports Quiz", description: "Football, the Olympics, and standout facts from sport.", difficulty: "Easy" },
  Literature: { title: "Literature Quiz", description: "Great authors, classic works, and unforgettable characters.", difficulty: "Medium" },
  Cinema: { title: "Cinema Quiz", description: "Iconic films, directors, and the history of cinema.", difficulty: "Easy" },
  Music: { title: "Music Quiz", description: "Composers, bands, and musical culture from around the world.", difficulty: "Medium" },
  Mathematics: { title: "Mathematics Quiz", description: "Quick calculations, geometry, and logical problems.", difficulty: "Medium" },
  "General Knowledge": { title: "General Knowledge Quiz", description: "A little of everything — art, nature, and everyday facts.", difficulty: "Easy" },
};

const meta: Record<string, QuizMeta> = {
  Geography: {
    description: "ქვეყნები, ქალაქები, ოკეანეები და მსოფლიოს გამორჩეული ადგილები.",
    difficulty: "საშუალო",
    minutes: 6,
    accent: "cyan",
    Icon: Globe2,
  },
  Science: {
    description: "ბუნების კანონები, ადამიანის სხეული და ჩვენი სამყარო.",
    difficulty: "საშუალო",
    minutes: 7,
    accent: "violet",
    Icon: FlaskConical,
  },
  History: {
    description: "მნიშვნელოვანი ეპოქები, მოვლენები და ისტორიული პირები.",
    difficulty: "რთული",
    minutes: 7,
    accent: "amber",
    Icon: Landmark,
  },
  Technology: {
    description: "ვებტექნოლოგიები, პროგრამირება და ციფრული სამყარო.",
    difficulty: "საშუალო",
    minutes: 6,
    accent: "blue",
    Icon: Cpu,
  },
  Sports: {
    description: "ფეხბურთი, ოლიმპიადა და სპორტის გამორჩეული ფაქტები.",
    difficulty: "მარტივი",
    minutes: 5,
    accent: "green",
    Icon: Dumbbell,
  },
  Literature: {
    description: "დიდი ავტორები, კლასიკური ნაწარმოებები და პერსონაჟები.",
    difficulty: "საშუალო",
    minutes: 7,
    accent: "rose",
    Icon: BookOpen,
  },
  Cinema: {
    description: "საკულტო ფილმები, რეჟისორები და კინოს ისტორია.",
    difficulty: "მარტივი",
    minutes: 5,
    accent: "purple",
    Icon: Clapperboard,
  },
  Music: {
    description: "კომპოზიტორები, ბენდები და მუსიკალური კულტურა.",
    difficulty: "საშუალო",
    minutes: 6,
    accent: "pink",
    Icon: Music2,
  },
  Mathematics: {
    description: "სწრაფი გამოთვლები, გეომეტრია და ლოგიკური ამოცანები.",
    difficulty: "საშუალო",
    minutes: 8,
    accent: "indigo",
    Icon: Calculator,
  },
  "General Knowledge": {
    description: "ყველაფერი ცოტ-ცოტა — ხელოვნება, ბუნება და ყოველდღიური ფაქტები.",
    difficulty: "მარტივი",
    minutes: 6,
    accent: "cyan",
    Icon: BrainCircuit,
  },
};

export function getQuizMeta(topic: string, language: Language = "ka"): QuizMeta {
  const base = (
    meta[topic] || {
      description: "ათი საინტერესო კითხვა ცოდნის შესამოწმებლად.",
      difficulty: "საშუალო",
      minutes: 6,
      accent: "violet",
      Icon: BrainCircuit,
    }
  );

  if (language === "en") {
    const translated = englishCopy[topic];
    return {
      ...base,
      description: translated?.description || "Ten engaging questions to test your knowledge.",
      difficulty: translated?.difficulty || "Medium",
    };
  }

  return base;
}

export function getQuizTitle(topic: string, title: string, language: Language) {
  return language === "en" ? englishCopy[topic]?.title || title : title;
}
