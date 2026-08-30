"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDogStore } from "@/store/dog-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { Onboarding } from "@/components/onboarding";
import { BottomNav, type TabId } from "@/components/bottom-nav";
import { HomeTab } from "@/components/tabs/home-tab";
import { DogTab } from "@/components/tabs/dog-tab";
import { TrainingTab } from "@/components/tabs/training-tab";
import { ProgressTab } from "@/components/tabs/progress-tab";
import { ScheduleTab } from "@/components/tabs/schedule-tab";
import { ActiveSessionDialog } from "@/components/active-session";

export default function Home() {
  const hydrated = useHydrated();
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [sessionOpen, setSessionOpen] = useState(false);

  function startSession(exerciseId: string) {
    setActiveExercise(exerciseId);
    setSessionOpen(true);
  }

  // Show nothing during SSR to avoid hydration mismatch (zustand persist).
  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-2xl bg-primary animate-pulse" />
      </div>
    );
  }

  return (
    <AppContent
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      startSession={startSession}
      sessionOpen={sessionOpen}
      setSessionOpen={setSessionOpen}
      activeExercise={activeExercise}
    />
  );
}

function AppContent({
  activeTab,
  setActiveTab,
  startSession,
  sessionOpen,
  setSessionOpen,
  activeExercise,
}: {
  activeTab: TabId;
  setActiveTab: (id: TabId) => void;
  startSession: (exerciseId: string) => void;
  sessionOpen: boolean;
  setSessionOpen: (open: boolean) => void;
  activeExercise: string | null;
}) {
  const hasProfile = useDogStore((s) => s.hasProfile);

  if (!hasProfile) {
    return <Onboarding />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BottomNav active={activeTab} onChange={setActiveTab} />

      <main className="flex-1 lg:pl-64 pb-24 lg:pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "home" && (
                <HomeTab
                  onNavigate={setActiveTab}
                  onStartSession={startSession}
                />
              )}
              {activeTab === "dog" && <DogTab />}
              {activeTab === "training" && (
                <TrainingTab onStartSession={startSession} />
              )}
              {activeTab === "progress" && <ProgressTab />}
              {activeTab === "schedule" && (
                <ScheduleTab onStartSession={startSession} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <ActiveSessionDialog
        exerciseId={activeExercise}
        open={sessionOpen}
        onClose={() => setSessionOpen(false)}
      />
    </div>
  );
}
