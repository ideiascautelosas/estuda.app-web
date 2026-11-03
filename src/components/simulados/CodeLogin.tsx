"use client";

import { useEffect, useRef, useState } from "react";
import { ApiError } from "@/lib/api";
import { requestAccessCode, saveBuyerSession, verifyAccessCode, type BuyerSession } from "@/lib/simulados";

const inputClass = "h-11 rounded-xl border border-slate-200 bg-surface px-3 text-[15px] font-normal text-slate-900";
const primaryClass = "min-h-12 rounded-xl bg-brand px-5 text-[15px] font-bold text-white transition hover:bg-brand-dark disabled:opacity-60";

function errorMessage(err: unknown): string {
  if (err instanceof ApiError && err.status === 429) return "Muitas tentativas. Aguarde um pouco e tente de novo.";
  return err instanceof ApiError ? err.message : "Algo deu errado. Tente novamente.";
}

// E-mail → 6-digit code → buyer session. With `email` given (the success
// page), the code is sent right away and the e-mail can't be changed.
export function CodeLogin({ email: fixedEmail, onSignedIn }: { email?: string; onSignedIn: (session: BuyerSession) => void }) {
  const [email, setEmail] = useState(fixedEmail ?? "");
  const [step, setStep] = useState<"email" | "code">(fixedEmail ? "code" : "email");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const autoSent = useRef(false);

  async function send(address: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await requestAccessCode(address);
      setStep("code");
      setNotice(res.debug_code ? `(desenvolvimento) código: ${res.debug_code}` : null);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (fixedEmail && !autoSent.current) {
      autoSent.current = true;
      void send(fixedEmail);
    }
  }, [fixedEmail]);

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await verifyAccessCode(email.trim(), code.trim());
      const session = { token: res.access_token, email: res.email, expiresAt: res.expires_at };
      saveBuyerSession(session);
      onSignedIn(session);
    } catch (err) {
      setBusy(false);
      setError(errorMessage(err));
    }
  }

  if (step === "email") {
    return (
      <form onSubmit={(e) => { e.preventDefault(); void send(email.trim()); }} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-600">
          E-mail
          <input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@email.com" className={inputClass} />
        </label>
        {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button type="submit" disabled={busy} className={primaryClass}>{busy ? "Enviando…" : "Enviar código"}</button>
      </form>
    );
  }

  return (
    <form onSubmit={verify} className="flex flex-col gap-4">
      <p className="text-[15px] text-slate-600">
        Se houver compras em <strong className="text-slate-900">{email}</strong>, o código chega em instantes. Ele vale por 10 minutos.
        Olhe também no spam e em Promoções.
      </p>
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-600">
        Código de acesso
        <input inputMode="numeric" autoComplete="one-time-code" pattern="\d{6}" maxLength={6} required value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} placeholder="000000"
          className={`${inputClass} h-12 text-xl tracking-[0.3em]`} />
      </label>
      {notice && <p className="text-xs text-slate-500">{notice}</p>}
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={busy || code.length !== 6} className={primaryClass}>{busy ? "Entrando…" : "Entrar"}</button>
      <div className="flex justify-between gap-3 text-[13px]">
        <button type="button" disabled={busy} onClick={() => void send(email.trim())} className="text-brand hover:text-brand-dark">
          Enviar outro código
        </button>
        {!fixedEmail && (
          <button type="button" onClick={() => { setStep("email"); setCode(""); setError(null); }} className="text-slate-500">
            Usar outro e-mail
          </button>
        )}
      </div>
    </form>
  );
}
