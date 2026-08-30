import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  DogProfile,
  TrainingSession,
  ScheduledSession,
} from "@/lib/types";

interface DogStore {
  // Onboarding
  hasProfile: boolean;
  dog: DogProfile | null;

  // Sessions
  sessions: TrainingSession[];
  scheduled: ScheduledSession[];

  // Actions
  setDog: (dog: DogProfile) => void;
  updateDog: (partial: Partial<DogProfile>) => void;
  resetProfile: () => void;

  addSession: (session: TrainingSession) => void;
  removeSession: (id: string) => void;

  addScheduled: (s: ScheduledSession) => void;
  toggleScheduledComplete: (id: string) => void;
  removeScheduled: (id: string) => void;
}

const DEFAULT_DOG: DogProfile = {
  name: "",
  breed: "",
  birthDate: "",
  weight: 0,
  sex: "",
  traits: [],
  photoEmoji: "🐕",
  goals: [],
};

export const useDogStore = create<DogStore>()(
  persist(
    (set) => ({
      hasProfile: false,
      dog: null,
      sessions: [],
      scheduled: [],

      setDog: (dog) => set({ dog, hasProfile: true }),

      updateDog: (partial) =>
        set((state) => ({
          dog: state.dog
            ? { ...state.dog, ...partial }
            : { ...DEFAULT_DOG, ...partial },
          hasProfile: true,
        })),

      resetProfile: () =>
        set({ dog: null, hasProfile: false, sessions: [], scheduled: [] }),

      addSession: (session) =>
        set((state) => ({ sessions: [session, ...state.sessions] })),

      removeSession: (id) =>
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== id),
        })),

      addScheduled: (s) =>
        set((state) => ({ scheduled: [s, ...state.scheduled] })),

      toggleScheduledComplete: (id) =>
        set((state) => ({
          scheduled: state.scheduled.map((s) =>
            s.id === id ? { ...s, completed: !s.completed } : s
          ),
        })),

      removeScheduled: (id) =>
        set((state) => ({
          scheduled: state.scheduled.filter((s) => s.id !== id),
        })),
    }),
    {
      name: "adestrapet-store",
    }
  )
);
