"use client";

import { useSyncExternalStore } from "react";
import { applyThemePreference, readThemePreference, type ThemePreference } from "@/lib/theme";

const OPTIONS: { value: ThemePreference; label: string; icon: string }[] = [
  { value: "light", label: "Tema claro", icon: "☀" },
  { value: "dark", label: "Tema escuro", icon: "☾" },
  { value: "system", label: "Seguir o sistema", icon: "◐" },
];

// Every toggle on the page (header, footer) shows the same choice.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  // While on "system", follow the device switching mid-visit.
  const media = matchMedia("(prefers-color-scheme: dark)");
  const onChange = () => {
    if (readThemePreference() === "system") applyThemePreference("system");
  };
  media.addEventListener("change", onChange);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", onChange);
  };
}

function choose(value: ThemePreference) {
  applyThemePreference(value);
  listeners.forEach((l) => l());
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  // null on the server, which doesn't know the stored choice.
  const preference = useSyncExternalStore(subscribe, readThemePreference, () => null);

  return (
    <div role="radiogroup" aria-label="Tema do site" className={`inline-flex rounded-full border border-slate-200 bg-surface p-0.5 ${className}`}>
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={preference === o.value}
          aria-label={o.label}
          title={o.label}
          onClick={() => choose(o.value)}
          className={`flex h-7 w-7 items-center justify-center rounded-full text-sm transition ${
            preference === o.value ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          {o.icon}
        </button>
      ))}
    </div>
  );
}
