"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Clock,
  CheckCircle2,
  Lightbulb,
  Gift,
  X,
  Play,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDogStore } from "@/store/dog-store";
import { TRAINING_EXERCISES } from "@/lib/training-data";
import {
  DIFFICULTY_LABELS,
  CATEGORY_LABELS,
  type TrainingExercise,
  type Difficulty,
  type TrainingCategory,
} from "@/lib/types";
import { generateId } from "@/lib/helpers";
import { toast } from "sonner";

export function TrainingTab({
  onStartSession,
}: {
  onStartSession: (exerciseId: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [filterDiff, setFilterDiff] = useState<Difficulty | "all">("all");
  const [filterCat, setFilterCat] = useState<TrainingCategory | "all">("all");
  const [selected, setSelected] = useState<TrainingExercise | null>(null);

  const filtered = useMemo(() => {
    return TRAINING_EXERCISES.filter((e) => {
      if (search && !e.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (filterDiff !== "all" && e.difficulty !== filterDiff) return false;
      if (filterCat !== "all" && e.category !== filterCat) return false;
      return true;
    });
  }, [search, filterDiff, filterCat]);

  const grouped = useMemo(() => {
    const groups: Record<TrainingCategory, TrainingExercise[]> = {
      obediencia: [],
      tricks: [],
      comportamento: [],
      socializacao: [],
    };
    filtered.forEach((e) => {
      groups[e.category].push(e);
    });
    return groups;
  }, [filtered]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold mb-1">Treinos</h1>
        <p className="text-sm text-muted-foreground">
          {TRAINING_EXERCISES.length} exercícios disponíveis
        </p>
      </div>

      {/* Search and filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar exercício..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={filterDiff}
            onValueChange={(v) => setFilterDiff(v as Difficulty | "all")}
          >
            <SelectTrigger className="w-full h-10 text-sm">
              <SelectValue placeholder="Dificuldade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas dificuldades</SelectItem>
              <SelectItem value="iniciante">Iniciante</SelectItem>
              <SelectItem value="intermediario">Intermediário</SelectItem>
              <SelectItem value="avancado">Avançado</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filterCat}
            onValueChange={(v) => setFilterCat(v as TrainingCategory | "all")}
          >
            <SelectTrigger className="w-full h-10 text-sm">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas categorias</SelectItem>
              <SelectItem value="obediencia">Obediência</SelectItem>
              <SelectItem value="tricks">Truques</SelectItem>
              <SelectItem value="comportamento">Comportamento</SelectItem>
              <SelectItem value="socializacao">Socialização</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Exercise list grouped by category */}
      {filtered.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          <Search className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p>Nenhum exercício encontrado com esses filtros.</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {(Object.keys(grouped) as TrainingCategory[]).map((cat) => {
            if (grouped[cat].length === 0) return null;
            return (
              <div key={cat}>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="text-base">
                    {cat === "obediencia"
                      ? "🎖️"
                      : cat === "tricks"
                      ? "🎭"
                      : cat === "comportamento"
                      ? "🏠"
                      : "👥"}
                  </span>
                  {CATEGORY_LABELS[cat]}
                  <Badge variant="secondary" className="text-[10px]">
                    {grouped[cat].length}
                  </Badge>
                </h3>
                <div className="space-y-3">
                  {grouped[cat].map((ex, idx) => (
                    <ExerciseCard
                      key={ex.id}
                      exercise={ex}
                      onOpen={() => setSelected(ex)}
                      delay={idx * 0.04}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ExerciseDetailDialog
        exercise={selected}
        onClose={() => setSelected(null)}
        onStartSession={onStartSession}
      />
    </div>
  );
}

function ExerciseCard({
  exercise,
  onOpen,
  delay,
}: {
  exercise: TrainingExercise;
  onOpen: () => void;
  delay: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onOpen}
      className="w-full text-left"
      aria-label={exercise.name}
    >
      <Card className="p-4 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
            {exercise.icon === "Dog"
              ? "🐕"
              : exercise.icon === "Bed"
              ? "🛏️"
              : exercise.icon === "Hourglass"
              ? "⏳"
              : exercise.icon === "Footprints"
              ? "🐾"
              : exercise.icon === "Hand"
              ? "🤚"
              : exercise.icon === "RotateCw"
              ? "🔄"
              : exercise.icon === "Drama"
              ? "🎭"
              : exercise.icon === "MapPin"
              ? "📍"
              : exercise.icon === "Users"
              ? "👥"
              : exercise.icon === "Bell"
              ? "🔔"
              : exercise.icon === "Tennis"
              ? "🎾"
              : "🐾"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-sm">{exercise.name}</h4>
              <Badge
                variant="outline"
                className={`text-[10px] ${
                  exercise.difficulty === "iniciante"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : exercise.difficulty === "intermediario"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-rose-50 text-rose-700 border-rose-200"
                }`}
              >
                {DIFFICULTY_LABELS[exercise.difficulty]}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {exercise.description}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {exercise.durationMin} min
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {exercise.steps.length} passos
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.button>
  );
}

function ExerciseDetailDialog({
  exercise,
  onClose,
  onStartSession,
}: {
  exercise: TrainingExercise | null;
  onClose: () => void;
  onStartSession: (exerciseId: string) => void;
}) {
  const addSession = useDogStore((s) => s.addSession);
  const dog = useDogStore((s) => s.dog);

  return (
    <Dialog
      open={!!exercise}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {exercise && (
              <>
                <span className="text-2xl">
                  {exercise.icon === "Dog"
                    ? "🐕"
                    : exercise.icon === "Bed"
                    ? "🛏️"
                    : exercise.icon === "Hourglass"
                    ? "⏳"
                    : "🐾"}
                </span>
                <span>{exercise.name}</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {exercise ? (
          <div className="space-y-5 pt-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {CATEGORY_LABELS[exercise.category]}
              </Badge>
              <Badge
                variant="outline"
                className={`text-xs ${
                  exercise.difficulty === "iniciante"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : exercise.difficulty === "intermediario"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-rose-50 text-rose-700 border-rose-200"
                }`}
              >
                {DIFFICULTY_LABELS[exercise.difficulty]}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" /> {exercise.durationMin} min
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {exercise.description}
            </p>

            {/* Steps */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Passo a passo ({exercise.steps.length})
              </h4>
              <div className="space-y-3">
                {exercise.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 p-3 rounded-xl bg-muted/40"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{step.title}</div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="text-[11px] text-primary mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {step.duration} min
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
              <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Dicas importantes
              </h4>
              <ul className="space-y-1.5 text-sm text-amber-900 dark:text-amber-100">
                {exercise.tips.map((t, i) => (
                  <li key={i} className="flex gap-2">
                    <span>•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reward */}
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 flex items-start gap-3">
              <Gift className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-400">
                  Recompensa sugerida
                </div>
                <div className="text-sm text-emerald-900 dark:text-emerald-100">
                  {exercise.reward}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => {
                  if (!dog) return;
                  addSession({
                    id: generateId(),
                    exerciseId: exercise.id,
                    date: new Date().toISOString(),
                    durationMin: exercise.durationMin,
                    completed: true,
                  });
                  toast.success(`Sessão de "${exercise.name}" registrada! 🎉`);
                  onClose();
                }}
                className="flex-1"
              >
                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                Registrar treino agora
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onStartSession(exercise.id);
                  onClose();
                }}
              >
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
