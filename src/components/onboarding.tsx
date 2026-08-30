"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PawPrint, ChevronRight, ChevronLeft, Check, Sparkles } from "lucide-react";
import { useDogStore } from "@/store/dog-store";
import { BREEDS, TRAITS, DOG_EMOJIS, GOALS } from "@/lib/training-data";
import type { DogProfile } from "@/lib/types";

const STEPS = [
  { id: 0, title: "Nome do cão", icon: "🐾" },
  { id: 1, title: "Raça e características", icon: "📋" },
  { id: 2, title: "Objetivos", icon: "🎯" },
];

export function Onboarding() {
  const setDog = useDogStore((s) => s.setDog);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");
  const [sex, setSex] = useState<"" | "macho" | "femea">("");
  const [emoji, setEmoji] = useState(DOG_EMOJIS[0]);
  const [traits, setTraits] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);

  function toggleTrait(t: string) {
    setTraits((cur) =>
      cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]
    );
  }

  function toggleGoal(g: string) {
    setGoals((cur) =>
      cur.includes(g) ? cur.filter((x) => x !== g) : [...cur, g]
    );
  }

  function canAdvance() {
    if (step === 0) return name.trim().length > 0;
    if (step === 1) return breed !== "" && sex !== "" && birthDate !== "";
    if (step === 2) return goals.length > 0;
    return true;
  }

  function handleFinish() {
    const profile: DogProfile = {
      name: name.trim(),
      breed,
      birthDate,
      weight: parseFloat(weight) || 0,
      sex,
      traits,
      photoEmoji: emoji,
      goals,
    };
    setDog(profile);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 paw-pattern">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-lg animate-float">
              <PawPrint className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            Adestra<span className="text-primary">Pet</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Seu companheiro para um cão feliz e bem treinado
          </p>
        </div>

        <Card className="p-6 sm:p-8 shadow-xl border-border/60">
          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {STEPS.map((s, idx) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    idx < step
                      ? "bg-primary text-primary-foreground"
                      : idx === step
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {idx < step ? <Check className="w-4 h-4" /> : idx + 1}
                </div>
                {idx < STEPS.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-1 ${
                      idx < step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-1">
                    Vamos conhecer seu cão! 🐶
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Comece dizendo o nome e escolhendo um avatar para ele.
                  </p>
                </div>

                <div>
                  <Label htmlFor="dog-name" className="mb-2 block">
                    Nome do seu cão
                  </Label>
                  <Input
                    id="dog-name"
                    placeholder="Ex.: Thor, Mel, Bob..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 text-lg"
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Escolha um avatar</Label>
                  <div className="flex gap-2 flex-wrap">
                    {DOG_EMOJIS.map((e) => (
                      <button
                        key={e}
                        onClick={() => setEmoji(e)}
                        className={`w-14 h-14 rounded-2xl text-3xl flex items-center justify-center transition-all ${
                          emoji === e
                            ? "bg-primary/15 ring-2 ring-primary scale-110"
                            : "bg-muted hover:bg-muted/70"
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-1">
                    Características 📋
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Informações para personalizar o treinamento.
                  </p>
                </div>

                <div>
                  <Label className="mb-2 block">Raça</Label>
                  <Select value={breed} onValueChange={setBreed}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Selecione a raça" />
                    </SelectTrigger>
                    <SelectContent>
                      {BREEDS.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="mb-2 block">Sexo</Label>
                    <Select
                      value={sex}
                      onValueChange={(v) => setSex(v as "macho" | "femea")}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="macho">Macho ♂</SelectItem>
                        <SelectItem value="femea">Fêmea ♀</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dog-weight" className="mb-2 block">
                      Peso (kg)
                    </Label>
                    <Input
                      id="dog-weight"
                      type="number"
                      inputMode="decimal"
                      placeholder="Ex.: 12"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="dog-birth" className="mb-2 block">
                    Data de nascimento (aproximada)
                  </Label>
                  <Input
                    id="dog-birth"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label className="mb-2 block">
                    Personalidade{" "}
                    <span className="text-muted-foreground text-xs">
                      (opcional)
                    </span>
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {TRAITS.map((t) => (
                      <Badge
                        key={t}
                        variant={traits.includes(t) ? "default" : "secondary"}
                        className={`cursor-pointer transition-all ${
                          traits.includes(t)
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-secondary/70"
                        }`}
                        onClick={() => toggleTrait(t)}
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-1">Objetivos 🎯</h2>
                  <p className="text-sm text-muted-foreground">
                    Selecione o que você deseja alcançar com o treinamento.
                  </p>
                </div>
                <div className="space-y-2">
                  {GOALS.map((g) => (
                    <button
                      key={g}
                      onClick={() => toggleGoal(g)}
                      className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                        goals.includes(g)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                          goals.includes(g)
                            ? "border-primary bg-primary"
                            : "border-muted-foreground/40"
                        }`}
                      >
                        {goals.includes(g) && (
                          <Check className="w-3 h-3 text-primary-foreground" />
                        )}
                      </div>
                      <span className="font-medium">{g}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <Button
                variant="outline"
                onClick={() => setStep((s) => s - 1)}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
              </Button>
            )}
            {step < STEPS.length - 1 ? (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance()}
                className="flex-1"
              >
                Continuar <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                disabled={!canAdvance()}
                className="flex-1"
              >
                <Sparkles className="w-4 h-4 mr-1" /> Começar a treinar!
              </Button>
            )}
          </div>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Seus dados ficam apenas neste dispositivo. 🔒
        </p>
      </motion.div>
    </div>
  );
}
