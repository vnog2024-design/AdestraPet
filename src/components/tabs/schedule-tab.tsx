"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalIcon,
  Plus,
  Clock,
  Check,
  Trash2,
  CalendarDays,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDogStore } from "@/store/dog-store";
import { TRAINING_EXERCISES } from "@/lib/training-data";
import {
  generateId,
  formatDateTime,
  isSameDay,
  isToday,
} from "@/lib/helpers";
import { toast } from "sonner";

export function ScheduleTab({
  onStartSession,
}: {
  onStartSession: (exerciseId: string) => void;
}) {
  const scheduled = useDogStore((s) => s.scheduled);
  const addScheduled = useDogStore((s) => s.addScheduled);
  const toggleScheduled = useDogStore((s) => s.toggleScheduledComplete);
  const removeScheduled = useDogStore((s) => s.removeScheduled);
  const addSession = useDogStore((s) => s.addSession);
  const dog = useDogStore((s) => s.dog);

  const [open, setOpen] = useState(false);
  const [exId, setExId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const upcoming = useMemo(() => {
    const now = new Date();
    return scheduled
      .filter((s) => new Date(s.scheduledFor) >= now || !s.completed)
      .sort(
        (a, b) =>
          new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime()
      );
  }, [scheduled]);

  const todayList = upcoming.filter((s) => {
    const d = new Date(s.scheduledFor);
    return isToday(d.toISOString()) || (isSameDay(d, new Date()) && !s.completed);
  });

  const futureList = upcoming.filter(
    (s) => !todayList.includes(s)
  );

  function handleSchedule() {
    if (!exId || !date || !time) {
      toast.error("Preencha todos os campos");
      return;
    }
    const scheduledFor = new Date(`${date}T${time}`).toISOString();
    if (new Date(scheduledFor) < new Date()) {
      toast.error("Escolha uma data e hora futura");
      return;
    }
    addScheduled({
      id: generateId(),
      exerciseId: exId,
      scheduledFor,
      completed: false,
    });
    toast.success("Treino agendado! 📅");
    setOpen(false);
    setExId("");
    setDate("");
    setTime("");
  }

  function handleComplete(id: string, exerciseId: string, duration: number) {
    toggleScheduled(id);
    addSession({
      id: generateId(),
      exerciseId,
      date: new Date().toISOString(),
      durationMin: duration,
      completed: true,
    });
    toast.success("Treino concluído! 🎉");
  }

  if (!dog) return null;

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agenda</h1>
          <p className="text-sm text-muted-foreground">
            Programe os treinos de {dog.name}
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-1" /> Agendar
            </Button>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Agendar novo treino</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label className="mb-2 block">Exercício</Label>
                <Select value={exId} onValueChange={setExId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um exercício" />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {TRAINING_EXERCISES.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.name} ({e.durationMin} min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="mb-2 block">Data</Label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Hora</Label>
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button onClick={handleSchedule} className="flex-1">
                  Agendar treino
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {scheduled.length === 0 ? (
        <Card className="p-10 text-center">
          <div className="text-5xl mb-3">📅</div>
          <h3 className="font-semibold mb-1">Nenhum treino agendado</h3>
          <p className="text-sm text-muted-foreground">
            Clique em <strong>Agendar</strong> para programar a próxima sessão
            de treino com {dog.name}.
          </p>
        </Card>
      ) : (
        <>
          {/* Today */}
          {todayList.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CalIcon className="w-4 h-4 text-primary" />
                Hoje
                <Badge variant="secondary">{todayList.length}</Badge>
              </h3>
              <div className="space-y-2">
                <AnimatePresence>
                  {todayList.map((s) => {
                    const ex = TRAINING_EXERCISES.find(
                      (e) => e.id === s.exerciseId
                    );
                    if (!ex) return null;
                    return (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                      >
                        <ScheduledCard
                          title={ex.name}
                          time={formatDateTime(s.scheduledFor)}
                          durationMin={ex.durationMin}
                          completed={s.completed}
                          onComplete={() =>
                            handleComplete(s.id, ex.id, ex.durationMin)
                          }
                          onRemove={() => {
                            removeScheduled(s.id);
                            toast.info("Agendamento removido");
                          }}
                          onStart={() => onStartSession(ex.id)}
                        />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Future */}
          {futureList.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                Próximos
              </h3>
              <div className="space-y-2">
                {futureList.map((s) => {
                  const ex = TRAINING_EXERCISES.find(
                    (e) => e.id === s.exerciseId
                  );
                  if (!ex) return null;
                  return (
                    <ScheduledCard
                      key={s.id}
                      title={ex.name}
                      time={formatDateTime(s.scheduledFor)}
                      durationMin={ex.durationMin}
                      completed={s.completed}
                      onComplete={() =>
                        handleComplete(s.id, ex.id, ex.durationMin)
                      }
                      onRemove={() => {
                        removeScheduled(s.id);
                        toast.info("Agendamento removido");
                      }}
                      onStart={() => onStartSession(ex.id)}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ScheduledCard({
  title,
  time,
  durationMin,
  completed,
  onComplete,
  onRemove,
  onStart,
}: {
  title: string;
  time: string;
  durationMin: number;
  completed: boolean;
  onComplete: () => void;
  onRemove: () => void;
  onStart: () => void;
}) {
  return (
    <Card className={`p-4 ${completed ? "opacity-60" : ""}`}>
      <div className="flex items-center gap-3">
        <button
          onClick={onComplete}
          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
            completed
              ? "bg-primary border-primary text-primary-foreground"
              : "border-muted-foreground/40 hover:border-primary"
          }`}
        >
          {completed && <Check className="w-4 h-4" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className={`font-medium text-sm ${completed ? "line-through" : ""}`}>
            {title}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {time}
            </span>
            <span>•</span>
            <span>{durationMin} min</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {!completed && (
            <Button size="sm" variant="ghost" onClick={onStart} className="h-8 px-2">
              Iniciar
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={onRemove}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
