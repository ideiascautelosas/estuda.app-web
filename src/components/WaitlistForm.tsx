"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { ApiError } from "@/lib/api";
import { getAttributionSource } from "@/lib/attribution";
import { contactKind, joinLaunchWaitlist } from "@/lib/waitlist";

type Status = "idle" | "loading" | "success" | "error";

// "Quero ser avisado" on the pre-launch page. One field takes an e-mail or a
// celular: visitors pick whichever they prefer without choosing a tab first,
// and the API tells the two apart.
export function WaitlistForm({ placement, align = "center" }: { placement: string; align?: "center" | "start" }) {
  const id = useId();
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const alignment = align === "start" ? "items-center text-center lg:items-start lg:text-left" : "items-center text-center";

  async function submit(e: FormEvent) {
    e.preventDefault();
    const kind = contactKind(contact);
    if (!kind) {
      setStatus("error");
      setError("Digite um e-mail válido ou um celular com DDD.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      await joinLaunchWaitlist(contact.trim(), getAttributionSource() ?? placement, website);
      setStatus("success");
      trackEvent("waitlist_signup", { kind, placement });
    } catch (err) {
      setStatus("error");
      if (err instanceof ApiError && err.status === 422) setError("Confira o e-mail ou o celular digitado.");
      else if (err instanceof ApiError && err.status === 429) setError("Muitas tentativas. Tente de novo mais tarde.");
      else if (err instanceof ApiError && err.status === 0) setError(err.message);
      else setError("Não foi possível salvar agora. Tente novamente.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className={`flex w-full max-w-md flex-col gap-1 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 ${alignment}`}>
        <p className="text-base font-bold text-emerald-900">Pronto! Você está na lista.</p>
        <p className="text-sm text-emerald-700">Avisamos assim que o estuda.app chegar à App Store e ao Google Play.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={`flex w-full max-w-md flex-col gap-3 ${alignment}`}>
      <label htmlFor={`${id}-contact`} className="sr-only">
        E-mail ou celular com DDD
      </label>
      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <input
          id={`${id}-contact`}
          type="text"
          autoComplete="email"
          placeholder="Seu e-mail ou celular"
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? `${id}-error` : undefined}
          disabled={status === "loading"}
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-surface px-4 py-3.5 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand disabled:opacity-60 aria-invalid:border-red-200"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-xl bg-brand px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-dark disabled:opacity-60"
        >
          {status === "loading" ? "Enviando…" : "Quero ser avisado"}
        </button>
      </div>
      {/* Honeypot: off-screen and out of the tab order, so only bots fill it. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />
      {status === "error" && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      )}
      <p className="text-xs leading-relaxed text-slate-500">
        Ao enviar, você autoriza o estuda.app a usar este contato só para avisar do lançamento, conforme a{" "}
        <Link href="/politica-de-privacidade" className="font-medium text-slate-700 underline-offset-2 hover:text-slate-900 hover:underline">
          Política de Privacidade
        </Link>
        .
      </p>
    </form>
  );
}
