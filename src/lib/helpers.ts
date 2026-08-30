import type { DogProfile } from "@/lib/types";

export function calculateAge(birthDate: string): { years: number; months: number; total: string } {
  if (!birthDate) return { years: 0, months: 0, total: "—" };
  const birth = new Date(birthDate);
  const now = new Date();
  const diffMs = now.getTime() - birth.getTime();
  if (diffMs < 0) return { years: 0, months: 0, total: "—" };

  const years = Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));
  const months = Math.floor(
    (diffMs % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000)
  );

  let total = "";
  if (years > 0) total += `${years} ano${years > 1 ? "s" : ""}`;
  if (months > 0) {
    if (total) total += " e ";
    total += `${months} ${months > 1 ? "meses" : "mês"}`;
  }
  if (!total) total = "Recém-nascido";

  return { years, months, total };
}

export function calculateDogYears(dog: DogProfile | null): string {
  if (!dog || !dog.birthDate) return "—";
  const { years, months } = calculateAge(dog.birthDate);
  const total = years + months / 12;
  // Simplified - real formula varies by breed size
  let dogYears: number;
  if (total <= 1) {
    dogYears = total * 15;
  } else if (total <= 2) {
    dogYears = 15 + (total - 1) * 9;
  } else {
    dogYears = 24 + (total - 2) * 4;
  }
  return `${Math.floor(dogYears)} anos caninos`;
}

export function getTodayTipIndex(): number {
  const startOfYear = new Date(new Date().getFullYear(), 0, 0);
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  return dayOfYear % 7;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isToday(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getLast7DaysLabels(): string[] {
  const labels: string[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    labels.push(
      d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "")
    );
  }
  return labels;
}

export function getMinutesByDay(sessions: { date: string; durationMin: number }[]): number[] {
  const today = new Date();
  const result: number[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setHours(0, 0, 0, 0);
    d.setDate(today.getDate() - i);
    const nextDay = new Date(d);
    nextDay.setDate(d.getDate() + 1);

    const total = sessions
      .filter((s) => {
        const sd = new Date(s.date);
        return sd >= d && sd < nextDay;
      })
      .reduce((sum, s) => sum + s.durationMin, 0);

    result.push(total);
  }
  return result;
}
