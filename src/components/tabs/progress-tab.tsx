"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Clock,
  Trophy,
  Calendar as CalIcon,
  TrendingUp,
  Award,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDogStore } from "@/store/dog-store";
import { TRAINING_EXERCISES } from "@/lib/training-data";
import {
  CATEGORY_LABELS,
  type TrainingCategory,
} from "@/lib/types";
import {
  getLast7DaysLabels,
  getMinutesByDay,
  formatDateTime,
} from "@/lib/helpers";

const PIE_COLORS = ["oklch(0.65 0.17 55)", "oklch(0.7 0.13 145)", "oklch(0.55 0.14 25)", "oklch(0.75 0.16 90)"];

export function ProgressTab() {
  const sessions = useDogStore((s) => s.sessions);
  const dog = useDogStore((s) => s.dog);

  const stats = useMemo(() => {
    const totalSessions = sessions.length;
    const totalMinutes = sessions.reduce((sum, s) => sum + s.durationMin, 0);
    const avgRating =
      sessions.filter((s) => s.rating).reduce((sum, s) => sum + (s.rating ?? 0), 0) /
        (sessions.filter((s) => s.rating).length || 1);

    // Category distribution
    const catCount: Record<string, number> = {};
    sessions.forEach((s) => {
      const ex = TRAINING_EXERCISES.find((e) => e.id === s.exerciseId);
      if (ex) {
        catCount[ex.category] = (catCount[ex.category] || 0) + 1;
      }
    });

    const catData = Object.entries(catCount).map(([k, v]) => ({
      name: CATEGORY_LABELS[k as TrainingCategory],
      value: v,
    }));

    // Most trained exercise
    const exCount: Record<string, number> = {};
    sessions.forEach((s) => {
      exCount[s.exerciseId] = (exCount[s.exerciseId] || 0) + 1;
    });

    const topExId = Object.entries(exCount).sort((a, b) => b[1] - a[1])[0]?.[0];
    const topEx = topExId
      ? TRAINING_EXERCISES.find((e) => e.id === topExId)
      : null;
    const topExCount = topExId ? exCount[topExId] : 0;

    // Days active
    const uniqueDays = new Set(
      sessions.map((s) => new Date(s.date).toDateString())
    ).size;

    return {
      totalSessions,
      totalMinutes,
      avgRating,
      catData,
      topEx,
      topExCount,
      daysActive: uniqueDays,
    };
  }, [sessions]);

  const weekLabels = getLast7DaysLabels();
  const weekMinutes = getMinutesByDay(sessions);
  const weekData = weekLabels.map((label, idx) => ({
    day: label,
    minutos: weekMinutes[idx],
  }));

  if (sessions.length === 0) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold">Progresso</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe sua jornada de adestramento
          </p>
        </div>
        <Card className="p-10 text-center">
          <div className="text-5xl mb-3">📊</div>
          <h3 className="font-semibold mb-1">Nenhum treino registrado ainda</h3>
          <p className="text-sm text-muted-foreground">
            Registre seu primeiro treino na aba <strong>Treinos</strong> para
            começar a acompanhar seu progresso.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Progresso</h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe a jornada de {dog?.name ?? "seu cão"} 🐾
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <SummaryCard
          icon={Clock}
          label="Tempo total"
          value={`${stats.totalMinutes}min`}
          color="text-amber-600 bg-amber-50 dark:bg-amber-950/40"
        />
        <SummaryCard
          icon={Trophy}
          label="Sessões"
          value={`${stats.totalSessions}`}
          color="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40"
        />
        <SummaryCard
          icon={CalIcon}
          label="Dias ativos"
          value={`${stats.daysActive}`}
          color="text-rose-600 bg-rose-50 dark:bg-rose-950/40"
        />
        <SummaryCard
          icon={Award}
          label="Avaliação média"
          value={`${stats.avgRating.toFixed(1)} ★`}
          color="text-violet-600 bg-violet-50 dark:bg-violet-950/40"
        />
      </div>

      {/* Weekly chart */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Últimos 7 dias
          </h3>
          <Badge variant="secondary">
            {weekMinutes.reduce((a, b) => a + b, 0)} min
          </Badge>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weekData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={30}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid var(--border)",
                background: "var(--background)",
                fontSize: "12px",
              }}
              formatter={(v: number) => [`${v} min`, "Tempo"]}
              labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
            />
            <Bar
              dataKey="minutos"
              fill="oklch(0.65 0.17 55)"
              radius={[6, 6, 0, 0]}
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Category distribution */}
      {stats.catData.length > 0 && (
        <Card className="p-5">
          <h3 className="font-semibold mb-4">Distribuição por categoria</h3>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={stats.catData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={45}
                  paddingAngle={3}
                >
                  {stats.catData.map((_, idx) => (
                    <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid var(--border)",
                    background: "var(--background)",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: "11px" }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-2">
              {stats.catData.map((c, idx) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/40"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: PIE_COLORS[idx % PIE_COLORS.length] }}
                    />
                    <span className="text-sm">{c.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Most trained */}
      {stats.topEx && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-5 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-2xl">
                🏆
              </div>
              <div className="flex-1">
                <div className="text-xs text-primary font-semibold uppercase">
                  Exercício mais praticado
                </div>
                <div className="font-bold text-lg">{stats.topEx.name}</div>
                <div className="text-xs text-muted-foreground">
                  {stats.topExCount} sessões registradas
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Recent sessions */}
      <Card className="p-5">
        <h3 className="font-semibold mb-3">Sessões recentes</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {sessions.slice(0, 20).map((s) => {
            const ex = TRAINING_EXERCISES.find((e) => e.id === s.exerciseId);
            return (
              <div
                key={s.id}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/40 hover:bg-muted transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-base">
                    {ex?.icon === "Dog"
                      ? "🐕"
                      : ex?.icon === "Bed"
                      ? "🛏️"
                      : "🐾"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">
                    {ex?.name ?? "Exercício"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDateTime(s.date)} • {s.durationMin} min
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
    </div>
  );
}

function SummaryCard({
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
