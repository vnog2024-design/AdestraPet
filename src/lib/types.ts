export type Difficulty = "iniciante" | "intermediario" | "avancado";

export type TrainingCategory =
  | "obediencia"
  | "tricks"
  | "comportamento"
  | "socializacao";

export interface TrainingStep {
  title: string;
  description: string;
  duration: number; // minutes
}

export interface TrainingExercise {
  id: string;
  name: string;
  category: TrainingCategory;
  difficulty: Difficulty;
  description: string;
  icon: string; // lucide icon name
  durationMin: number; // total minutes
  steps: TrainingStep[];
  tips: string[];
  reward: string;
}

export interface DogProfile {
  name: string;
  breed: string;
  birthDate: string; // ISO date
  weight: number; // kg
  sex: "macho" | "femea" | "";
  traits: string[];
  photoEmoji: string;
  goals: string[];
}

export interface TrainingSession {
  id: string;
  exerciseId: string;
  date: string; // ISO datetime
  durationMin: number;
  completed: boolean;
  notes?: string;
  rating?: number; // 1-5 stars
}

export interface ScheduledSession {
  id: string;
  exerciseId: string;
  scheduledFor: string; // ISO datetime
  completed: boolean;
}

export interface DailyTip {
  date: string;
  title: string;
  content: string;
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

export const CATEGORY_LABELS: Record<TrainingCategory, string> = {
  obediencia: "Obediência",
  tricks: "Truques",
  comportamento: "Comportamento",
  socializacao: "Socialização",
};
