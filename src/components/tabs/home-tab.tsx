"use client";

import { motion } from "framer-motion";
import {
  PawPrint,
  Dumbbell,
  Clock,
  Flame,
  Trophy,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDogStore } from "@/store/dog-store";
import { TRAINING_EXERCISES, DAILY_TIPS } from "@/lib/training-data";
import {
  calculateAge,
  calculateDogYears,
  getTodayTipIndex,
  isToday,
  formatTime,
} from "@/lib/helpers";
import { PRODUCT } from "@/config/product";
import type { TabId } from "@/components/bottom-nav";

export function HomeTab({
  onNavigate,
  onStartSession,
}: {
  onNavigate: (id: TabId) => void;
  onStartSession: (exerciseId: string) => void;
}) {
  const dog = useDogStore((s) => s.dog);
  const sessions = useDogStore((s) => s.sessions);

  if (!dog) return null;

  const age = calculateAge(dog.birthDate);
  const dogYears = calculateDogYears(dog);

  const todaySessions = sessions.filter((s) => isToday(s.date));
  const minutesToday = todaySessions.reduce((sum, s) => sum + s.durationMin, 0);
  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce((sum, s) => sum + s.durationMin, 0);

  // Streak calculation (consecutive days with sessions)
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dayStart = new Date(d);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(d);
    dayEnd.setHours(23, 59, 59, 999);

    const hasSession = sessions.some((s) => {
      const sd = new Date(s.date);
      return sd >= dayStart && sd <= dayEnd;
    });
    if (hasSession) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }

  const tipIdx = getTodayTipIndex();
  const tip = DAILY_TIPS[tipIdx];

  const suggestedExercises = TRAINING_EXERCISES.filter(
    (e) => e.difficulty === "iniciante"
  ).slice(0, 3);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <div className="space-y-6">
      {/* Hero greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl">
          <div className="relative p-6 sm:p-8">
            <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute right-10 bottom-0 text-7xl opacity-30 select-none">
              {dog.photoEmoji}
            </div>
            <div className="relative z-10">
              <p className="text-primary-foreground/80 text-sm font-medium">
                {greeting}! 👋
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold mt-1">
                {dog.name}
              </h1>
              <p className="text-primary-foreground/80 mt-1 text-sm">
                {dog.breed} • {age.total}
              </p>

              <div className="flex gap-2 mt-4 flex-wrap">
                {dog.traits.slice(0, 3).map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="bg-white/20 text-primary-foreground border-0"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          icon={Clock}
          label="Hoje"
          value={`${minutesToday}min`}
          color="bg-amber-100 text-amber-700"
        />
        <StatCard
          icon={Flame}
          label="Sequência"
          value={`${streak} ${streak === 1 ? "dia" : "dias"}`}
          color="bg-orange-100 text-orange-700"
        />
        <StatCard
          icon={Dumbbell}
          label="Sessões"
          value={`${totalSessions}`}
          color="bg-emerald-100 text-emerald-700"
        />
        <StatCard
          icon={Trophy}
          label="Total"
          value={`${totalMinutes}min`}
          color="bg-rose-100 text-rose-700"
        />
      </div>

      {/* Today sessions */}
      {todaySessions.length > 0 && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2">
              <PawPrint className="w-4 h-4 text-primary" />
              Treinos de hoje
            </h3>
            <Badge variant="secondary">{todaySessions.length}</Badge>
          </div>
          <div className="space-y-2">
            {todaySessions.map((s) => {
              const ex = TRAINING_EXERCISES.find((e) => e.id === s.exerciseId);
              return (
                <div
                  key={s.id}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Dumbbell className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">
                      {ex?.name ?? "Exercício"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatTime(s.date)} • {s.durationMin} min
                    </div>
                  </div>
                  {s.rating && (
                    <div className="text-amber-500 text-xs">
                      {"★".repeat(s.rating)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Suggested trainings */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Sugestões para começar</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate("training")}
          >
            Ver todos <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {suggestedExercises.map((ex, idx) => (
            <motion.button
              key={ex.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              onClick={() => onStartSession(ex.id)}
              className="text-left"
            >
              <Card className="p-4 h-full hover:border-primary/50 hover:shadow-md transition-all group cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{ex.icon === "Dog" ? "🐕" : ex.icon === "Bed" ? "🛏️" : ex.icon === "Hourglass" ? "⏳" : "🐾"}</span>
                  <Badge variant="outline" className="text-[10px] capitalize">
                    {ex.difficulty}
                  </Badge>
                </div>
                <div className="font-semibold text-sm mb-1">{ex.name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {ex.durationMin} min
                </div>
              </Card>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Daily tip */}
      <Card className="p-5 bg-accent/40 border-accent">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
              Dica do dia
            </div>
            <div className="font-semibold mb-1">{tip.title}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {tip.content}
            </p>
          </div>
        </div>
      </Card>

      {/* Dog years fun fact */}
      <div className="text-center text-xs text-muted-foreground pb-4">
        <p>
          {dog.name} tem aproximadamente <strong>{dogYears}</strong> em idade
          humana 🐾
        </p>
        <p className="mt-1 opacity-70">
          {PRODUCT.name} v{PRODUCT.version}
        </p>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <Card className="p-3 sm:p-4">
      <div
        className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center mb-2`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="text-lg sm:text-xl font-bold leading-none">{value}</div>
      <div className="text-[11px] text-muted-foreground mt-1">{label}</div>
    </Card>
  );
}
