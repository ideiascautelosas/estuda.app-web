"use client";

import { useState } from "react";
import { ApiError } from "@/lib/api";
import { formatBRL, startCheckout, type SimuladoPackage } from "@/lib/simulados";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function BuyBox({ pkg }: { pkg: SimuladoPackage }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError("Digite um e-mail válido.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { checkout_url } = await startCheckout(pkg.id, value);
      window.location.href = checkout_url;
    } catch (err) {
      setBusy(false);
      if (err instanceof ApiError && err.status === 409) {
        setError("Este e-mail já comprou este pacote. Seus arquivos estão em Meus simulados.");
      } else {
        setError(err instanceof ApiError ? err.message : "Algo deu errado. Tente novamente.");
      }
    }
  }

  return (
    <>
      <div>
        <span className="text-4xl font-extrabold tracking-tight text-slate-900">{formatBRL(pkg.price_cents)}</span>
        <div className="mt-0.5 text-sm text-slate-500">pagamento único no cartão</div>
      </div>
      <button type="button" onClick={() => setOpen(true)}
        className="min-h-13 rounded-2xl bg-brand text-base font-bold text-white transition hover:bg-brand-dark">
        Comprar pacote
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true"
          aria-labelledby="buy-title" onClick={() => !busy && setOpen(false)}>
          <form onSubmit={pay} onClick={(e) => e.stopPropagation()}
            className="flex max-h-full w-full max-w-sm flex-col gap-4 overflow-y-auto rounded-2xl bg-surface p-7 shadow-2xl">
            <div>
              <h2 id="buy-title" className="text-lg font-extrabold text-slate-900">Seu e-mail</h2>
              <p className="mt-1 text-sm text-slate-500">
                A compra fica ligada a este e-mail. É com ele que você entra em Meus simulados para baixar os PDFs.
              </p>
            </div>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-600">
              E-mail
              <input type="email" autoComplete="email" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                className="h-11 rounded-xl border border-slate-200 bg-surface px-3 text-[15px] font-normal text-slate-900" />
            </label>
            <div className="flex justify-between gap-3 rounded-xl bg-slate-50 p-3.5 text-sm text-slate-700">
              <span>Pacote · {pkg.cargo}</span>
              <strong className="text-slate-900">{formatBRL(pkg.price_cents)}</strong>
            </div>
            {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={busy}
              className="min-h-12 rounded-xl bg-brand text-[15px] font-bold text-white transition hover:bg-brand-dark disabled:opacity-60">
              {busy ? "Abrindo o pagamento…" : "Ir para o pagamento"}
            </button>
            <button type="button" disabled={busy} onClick={() => setOpen(false)} className="min-h-11 text-sm text-slate-500">
              Cancelar
            </button>
          </form>
        </div>
      )}
    </>
  );
}
