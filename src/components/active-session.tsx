"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Pause,
  Check,
  ChevronRight,
  ChevronLeft,
  Trophy,
  Clock,
  Star,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { TRAINING_EXERCISES } from "@/lib/training-data";
import { DIFFICULTY_LABELS } from "@/lib/types";
import { useDogStore } from "@/store/dog-store";
import { generateId } from "@/lib/helpers";
import { toast } from "sonner";

export function ActiveSessionDialog({
  exerciseId,
  open,
  onClose,
}: {
  exerciseId: string | null;
  open: boolean;
  onClose: () => void;
}) {
  // Remount inner component whenever (open, exerciseId) changes - this resets
  // all internal state (stepIdx, elapsed, etc) without using setState in effect.
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-lg max-h-[95vh] overflow-y-auto p-0"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">
          Sessão de treino em andamento
        </DialogTitle>
        {open && exerciseId && (
          <ActiveSessionInner
            key={`${exerciseId}-${open}`}
            exerciseId={exerciseId}
            onClose={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function ActiveSessionInner({
  exerciseId,
  onClose,
}: {
  exerciseId: string;
  onClose: () => void;
}) {
  const addSession = useDogStore((s) => s.addSession);
  const exercise = TRAINING_EXERCISES.find((e) => e.id === exerciseId);

  const [stepIdx, setStepIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0); // seconds
  const [running, setRunning] = useState(true);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  if (!exercise) return null;

  const ex = exercise;
  const totalSteps = ex.steps.length;
  const currentStep = ex.steps[stepIdx];
  const stepDurationSec = currentStep.duration * 60;
  const stepProgress = Math.min(100, (elapsed / stepDurationSec) * 100);
  const isLastStep = stepIdx === totalSteps - 1;

  function handleNext() {
    if (stepIdx < totalSteps - 1) {
      setStepIdx((s) => s + 1);
      setElapsed(0);
    }
  }

  function handlePrev() {
    if (stepIdx > 0) {
      setStepIdx((s) => s - 1);
      setElapsed(0);
    }
  }

  function handleFinish() {
    addSession({
      id: generateId(),
      exerciseId: ex.id,
      date: new Date().toISOString(),
      durationMin: ex.durationMin,
      completed: true,
      rating: rating || undefined,
    });
    toast.success(`Sessão de "${ex.name}" concluída! 🎉`, {
      description: rating ? `Avaliação: ${"★".repeat(rating)}` : "Bom trabalho!",
    });
    onClose();
  }

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <>
      <DialogClose
        className="absolute right-3 top-3 z-10 rounded-full bg-background/80 backdrop-blur p-1.5"
        aria-label="Fechar"
      >
        <X className="w-4 h-4" />
      </DialogClose>

      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="text-3xl">
            {ex.icon === "Dog"
              ? "🐕"
              : ex.icon === "Bed"
              ? "🛏️"
              : ex.icon === "Hourglass"
              ? "⏳"
              : "🐾"}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{ex.name}</h2>
            <Badge
              variant="secondary"
              className="bg-white/20 text-primary-foreground border-0 mt-1"
            >
              {DIFFICULTY_LABELS[ex.difficulty]}
            </Badge>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-primary-foreground/80">
            Passo {stepIdx + 1} de {totalSteps}
          </span>
          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((stepIdx + 1) / totalSteps) * 100}%` }}
              transition={{ type: "spring", duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Timer */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setRunning((r) => !r)}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:scale-105 transition-transform"
          >
            {running ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>
          <div className="flex-1">
            <div className="text-2xl font-bold font-mono">
              {formatTime(elapsed)}
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" /> {currentStep.duration} min sugeridos
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setElapsed(0);
              setRunning(true);
            }}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Step progress */}
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${stepProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  {stepIdx + 1}
                </div>
                <h3 className="font-bold text-lg leading-tight pt-1">
                  {currentStep.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentStep.description}
              </p>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Rating (only on last step) */}
        {isLastStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 rounded-xl bg-accent/40 text-center"
          >
            <p className="text-sm font-semibold mb-2">Como foi a sessão?</p>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  className={`p-1 transition-all ${
                    rating >= n ? "scale-110" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <Star
                    className={`w-7 h-7 ${
                      rating >= n
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={stepIdx === 0}
            className="flex-1"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
          </Button>
          {isLastStep ? (
            <Button onClick={handleFinish} className="flex-1">
              <Trophy className="w-4 h-4 mr-1" /> Concluir
            </Button>
          ) : (
            <Button onClick={handleNext} className="flex-1">
              Próximo <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
