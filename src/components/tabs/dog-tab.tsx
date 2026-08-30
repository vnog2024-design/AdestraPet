"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PawPrint, Pencil, Trash2, Target, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDogStore } from "@/store/dog-store";
import { BREEDS, TRAITS, DOG_EMOJIS, GOALS } from "@/lib/training-data";
import { calculateAge, calculateDogYears } from "@/lib/helpers";
import { toast } from "sonner";

export function DogTab() {
  const dog = useDogStore((s) => s.dog);
  const updateDog = useDogStore((s) => s.updateDog);
  const resetProfile = useDogStore((s) => s.resetProfile);
  const [editing, setEditing] = useState(false);

  if (!dog) return null;

  const age = calculateAge(dog.birthDate);
  const dogYears = calculateDogYears(dog);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Meu Cão</h1>
        {!editing && (
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
            <Pencil className="w-4 h-4 mr-1.5" /> Editar
          </Button>
        )}
      </div>

      {editing ? (
        <DogEditForm
          initial={dog}
          onSave={(updated) => {
            updateDog(updated);
            setEditing(false);
            toast.success("Perfil atualizado!");
          }}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <>
          {/* Profile header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-br from-primary to-primary/70 p-6 sm:p-8 text-primary-foreground">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center text-5xl">
                    {dog.photoEmoji}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{dog.name}</h2>
                    <p className="text-primary-foreground/80 text-sm mt-0.5">
                      {dog.breed}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-primary-foreground border-0 mt-1"
                    >
                      {dog.sex === "macho"
                        ? "Macho ♂"
                        : dog.sex === "femea"
                        ? "Fêmea ♀"
                        : "—"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-border">
                <Stat label="Idade" value={age.total} />
                <Stat label="Peso" value={dog.weight ? `${dog.weight} kg` : "—"} />
                <Stat label="Idade humana" value={dogYears.split(" ")[0]} />
              </div>
            </Card>
          </motion.div>

          {/* Goals */}
          {dog.goals.length > 0 && (
            <Card className="p-5">
              <h3 className="font-semibold flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-primary" />
                Objetivos de treinamento
              </h3>
              <div className="flex flex-wrap gap-2">
                {dog.goals.map((g) => (
                  <Badge key={g} variant="secondary" className="text-sm py-1.5">
                    {g}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Traits */}
          {dog.traits.length > 0 && (
            <Card className="p-5">
              <h3 className="font-semibold flex items-center gap-2 mb-3">
                <PawPrint className="w-4 h-4 text-primary" />
                Personalidade
              </h3>
              <div className="flex flex-wrap gap-2">
                {dog.traits.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="bg-accent/30 text-sm py-1.5"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Danger zone */}
          <div className="pt-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full text-destructive hover:bg-destructive/5 hover:text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Apagar perfil e recomeçar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Apagar perfil?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação vai apagar o perfil de {dog.name} e todo o histórico
                    de treinos. Não pode ser desfeito.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      resetProfile();
                      toast.success("Perfil removido. Recomece quando quiser!");
                    }}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Apagar tudo
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 text-center">
      <div className="text-sm sm:text-base font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function DogEditForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: NonNullable<ReturnType<typeof useDogStore.getState>["dog"]>;
  onSave: (data: NonNullable<ReturnType<typeof useDogStore.getState>["dog"]>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial.name);
  const [breed, setBreed] = useState(initial.breed);
  const [birthDate, setBirthDate] = useState(initial.birthDate);
  const [weight, setWeight] = useState(String(initial.weight || ""));
  const [sex, setSex] = useState<"" | "macho" | "femea">(initial.sex);
  const [emoji, setEmoji] = useState(initial.photoEmoji);
  const [traits, setTraits] = useState<string[]>(initial.traits);
  const [goals, setGoals] = useState<string[]>(initial.goals);

  function toggle(list: string[], item: string) {
    return list.includes(item)
      ? list.filter((x) => x !== item)
      : [...list, item];
  }

  function handleSave() {
    if (!name.trim()) {
      toast.error("Nome é obrigatório");
      return;
    }
    onSave({
      name: name.trim(),
      breed,
      birthDate,
      weight: parseFloat(weight) || 0,
      sex,
      photoEmoji: emoji,
      traits,
      goals,
    });
  }

  return (
    <Card className="p-5 sm:p-6 space-y-5">
      {/* Avatar */}
      <div>
        <Label className="mb-2 block">Avatar</Label>
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

      <div>
        <Label htmlFor="edit-name" className="mb-2 block">
          Nome do cão
        </Label>
        <Input
          id="edit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12"
        />
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
          <Label htmlFor="edit-weight" className="mb-2 block">
            Peso (kg)
          </Label>
          <Input
            id="edit-weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="edit-birth" className="mb-2 block">
          Data de nascimento
        </Label>
        <Input
          id="edit-birth"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="h-12"
        />
      </div>

      <div>
        <Label className="mb-2 block">Personalidade</Label>
        <div className="flex flex-wrap gap-2">
          {TRAITS.map((t) => (
            <Badge
              key={t}
              variant={traits.includes(t) ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setTraits((cur) => toggle(cur, t))}
            >
              {traits.includes(t) && <Check className="w-3 h-3 mr-1" />}
              {t}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Objetivos</Label>
        <div className="space-y-2">
          {GOALS.map((g) => {
            const checked = goals.includes(g);
            return (
              <button
                key={g}
                onClick={() => setGoals((cur) => toggle(cur, g))}
                className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                  checked
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                    checked ? "border-primary bg-primary" : "border-muted-foreground/40"
                  }`}
                >
                  {checked && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <span className="font-medium text-sm">{g}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
        <Button onClick={handleSave} className="flex-1">
          Salvar alterações
        </Button>
      </div>
    </Card>
  );
}
