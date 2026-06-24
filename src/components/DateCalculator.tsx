"use client";

import { useState } from "react";
import { addDays, daysBetween, formatLongDateFR, todayISO } from "@/lib/date-utils";

type Mode = "difference" | "addSubtract" | "age";

const TABS: Array<{ id: Mode; label: string }> = [
  { id: "difference", label: "Différence entre 2 dates" },
  { id: "addSubtract", label: "Ajouter / soustraire des jours" },
  { id: "age", label: "Calculateur d'âge" },
];

const inputClasses =
  "w-full rounded-md border border-border-strong bg-surface px-3.5 py-2.5 text-sm text-text-primary min-h-[44px] outline-none transition-colors duration-fast ease-default focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(247,127,0,0.12)]";

export default function DateCalculator() {
  const [mode, setMode] = useState<Mode>("difference");

  return (
    <div className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
      <div role="tablist" aria-label="Type de calcul" className="flex flex-wrap border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={mode === tab.id}
            onClick={() => setMode(tab.id)}
            className={[
              "flex-1 min-w-[140px] min-h-[44px] px-3 py-3 text-sm font-medium transition-colors duration-base ease-default",
              mode === tab.id
                ? "bg-surface-raised text-text-primary border-b-2 border-primary-500"
                : "text-text-secondary hover:bg-surface-raised/60",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-5 sm:p-6">
        {mode === "difference" && <DifferenceCalculator />}
        {mode === "addSubtract" && <AddSubtractCalculator />}
        {mode === "age" && <AgeCalculator />}
      </div>
    </div>
  );
}

function DifferenceCalculator() {
  const today = todayISO();
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(addDays(today, 30));

  const diff = daysBetween(start, end);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Date de début" value={start} onChange={setStart} />
        <Field label="Date de fin" value={end} onChange={setEnd} />
      </div>
      <Result>
        {diff === 0
          ? "Les deux dates sont identiques."
          : `${Math.abs(diff)} jour${Math.abs(diff) > 1 ? "s" : ""} ${
              diff > 0 ? "séparent ces deux dates" : "(date de fin avant la date de début)"
            }`}
      </Result>
    </div>
  );
}

function AddSubtractCalculator() {
  const [base, setBase] = useState(todayISO());
  const [amount, setAmount] = useState(7);
  const [operation, setOperation] = useState<"add" | "subtract">("add");

  const result = addDays(base, operation === "add" ? amount : -amount);

  return (
    <div className="space-y-4">
      <Field label="Date de départ" value={base} onChange={setBase} />
      <div className="flex flex-wrap items-end gap-3">
        <div
          role="group"
          aria-label="Opération"
          className="flex rounded-md border border-border-strong overflow-hidden"
        >
          <button
            type="button"
            aria-pressed={operation === "add"}
            onClick={() => setOperation("add")}
            className={`min-h-[44px] px-4 text-sm font-medium transition-colors duration-base ease-default ${
              operation === "add"
                ? "bg-primary-600 text-white"
                : "bg-surface text-text-primary hover:bg-surface-raised"
            }`}
          >
            Ajouter
          </button>
          <button
            type="button"
            aria-pressed={operation === "subtract"}
            onClick={() => setOperation("subtract")}
            className={`min-h-[44px] px-4 text-sm font-medium transition-colors duration-base ease-default ${
              operation === "subtract"
                ? "bg-primary-600 text-white"
                : "bg-surface text-text-primary hover:bg-surface-raised"
            }`}
          >
            Soustraire
          </button>
        </div>
        <div className="flex-1 min-w-[140px]">
          <label htmlFor="days-amount" className="block text-sm font-medium text-text-primary mb-1.5">
            Nombre de jours
          </label>
          <input
            id="days-amount"
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
            className={inputClasses}
          />
        </div>
      </div>
      <Result>{formatLongDateFR(result)}</Result>
    </div>
  );
}

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const today = todayISO();

  const totalDays = daysBetween(birthDate, today);
  const years = Math.floor(totalDays / 365.25);
  const remainderDays = totalDays - Math.floor(years * 365.25);
  const months = Math.floor(remainderDays / 30.44);
  const days = Math.floor(remainderDays - months * 30.44);

  return (
    <div className="space-y-4">
      <Field label="Date de naissance" value={birthDate} onChange={setBirthDate} />
      <Result>
        {totalDays < 0
          ? "Cette date est dans le futur."
          : `${years} an${years !== 1 ? "s" : ""}, ${months} mois et ${days} jour${days !== 1 ? "s" : ""}`}
      </Result>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-1.5">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClasses}
      />
    </div>
  );
}

function Result({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-surface-raised p-4 sm:p-5">
      <p className="text-sm text-text-secondary mb-1">Résultat</p>
      <p className="font-display text-xl sm:text-2xl font-semibold text-text-primary">{children}</p>
    </div>
  );
}
