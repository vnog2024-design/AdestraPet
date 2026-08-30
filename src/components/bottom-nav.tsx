"use client";

import { motion } from "framer-motion";
import {
  Home,
  PawPrint,
  Dumbbell,
  BarChart3,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type TabId =
  | "home"
  | "dog"
  | "training"
  | "progress"
  | "schedule";

const NAV_ITEMS: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Início", icon: Home },
  { id: "training", label: "Treinos", icon: Dumbbell },
  { id: "schedule", label: "Agenda", icon: Calendar },
  { id: "progress", label: "Progresso", icon: BarChart3 },
  { id: "dog", label: "Meu Cão", icon: PawPrint },
];

export function BottomNav({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (id: TabId) => void;
}) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 border-r bg-sidebar/40 backdrop-blur-md p-4 z-40">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <PawPrint className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-bold leading-tight">
              Adestra<span className="text-primary">Pet</span>
            </div>
            <div className="text-[10px] text-muted-foreground">
              Treino com carinho
            </div>
          </div>
        </div>

        <nav className="space-y-1" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === active;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-accent/50 text-muted-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-xl bg-primary"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <Icon className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto p-3 rounded-xl bg-accent/40 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">💡 Dica do dia</p>
          <p>
            Recompense em até 2 segundos para o cão associar o comportamento.
          </p>
        </div>
      </aside>

      {/* Mobile top header */}
      <header className="lg:hidden sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <PawPrint className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold">
              Adestra<span className="text-primary">Pet</span>
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {NAV_ITEMS.find((n) => n.id === active)?.label}
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-lg border-t pb-[env(safe-area-inset-bottom)]"
        aria-label="Navegação principal"
      >
        <div className="grid grid-cols-5 gap-1 px-1 py-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === active;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-lg text-[10px] font-medium transition-all",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-mobile"
                    className="absolute -top-1.5 w-1 h-1 rounded-full bg-primary"
                  />
                )}
                <Icon className={cn("w-5 h-5", isActive && "scale-110")} />
                <span className="leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
