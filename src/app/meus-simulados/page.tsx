"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { SimuladosHeader } from "@/components/simulados/SimuladosHeader";
import { CodeLogin } from "@/components/simulados/CodeLogin";
import { ApiError } from "@/lib/api";
import {
  clearBuyerSession,
  downloadFile,
  formatISODate,
  listPurchases,
  readBuyerSession,
  type BuyerSession,
  type Purchase,
} from "@/lib/simulados";

// The session lives in localStorage; this keeps the page in step with
// sign-in and sign-out without reading storage during the server render.
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function signOut() {
  clearBuyerSession();
  notify();
}
const sessionKey = () => {
  const s = readBuyerSession();
  return s ? JSON.stringify(s) : "";
};

export default function MeusSimuladosPage() {
  const raw = useSyncExternalStore(subscribe, sessionKey, () => null);
  const session: BuyerSession | null = raw ? JSON.parse(raw) : null;

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SimuladosHeader current="meus" />
      <main className="flex-1">
        {raw === null ? null : session ? (
          <PurchasesView session={session} onSignOut={signOut} />
        ) : (
          <section className="mx-auto max-w-md px-6 py-16">
            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-surface p-7">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Meus simulados</h1>
                <p className="mt-1.5 text-[15px] text-slate-600">
                  Digite o e-mail usado na compra. Enviamos um código de acesso, sem senha para lembrar.
                </p>
              </div>
              <CodeLogin onSignedIn={notify} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function PurchasesView({ session, onSignOut }: { session: BuyerSession; onSignOut: () => void }) {
  const [purchases, setPurchases] = useState<Purchase[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    listPurchases(session.token).then(
      (list) => !cancelled && setPurchases(list),
      (err) => {
        if (cancelled) return;
        // An expired or revoked session goes back to the sign-in form.
        if (err instanceof ApiError && err.status === 401) onSignOut();
        else setError(err instanceof ApiError ? err.message : "Não foi possível carregar seus simulados.");
      },
    );
    return () => {
      cancelled = true;
    };
  }, [session.token, onSignOut]);

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pt-10 pb-20">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Meus simulados</h1>
          <p className="mt-1.5 text-[15px] text-slate-600">Conectado como {session.email}</p>
        </div>
        <button type="button" onClick={onSignOut}
          className="min-h-11 rounded-xl border border-slate-200 bg-surface px-4 text-sm font-semibold text-slate-700">
          Sair
        </button>
      </div>
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {purchases === null && !error && <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-brand" />}
      {purchases?.length === 0 && (
        <p className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
          Nenhum pacote neste e-mail. <Link href="/simulados" className="text-brand">Ver pacotes</Link>
        </p>
      )}
      {purchases?.map((p) => <PurchaseCard key={p.id} purchase={p} token={session.token} />)}
    </section>
  );
}

function PurchaseCard({ purchase, token }: { purchase: Purchase; token: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const order = purchase.id.slice(-8).toUpperCase();
  const paid = new Date(purchase.paid_at).toLocaleDateString("pt-BR");
  const refundUntil = new Date(new Date(purchase.paid_at).getTime() + 7 * 86_400_000).toLocaleDateString("pt-BR");

  async function get(simuladoId: string, kind: "caderno" | "gabarito") {
    const key = `${simuladoId}/${kind}`;
    setBusy(key);
    setError(null);
    try {
      await downloadFile(token, purchase.id, simuladoId, kind);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Não foi possível baixar o arquivo.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-surface">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
        <div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">Ativo</span>
          <h2 className="mt-2 text-[22px] font-extrabold tracking-tight text-slate-900">{purchase.title}</h2>
          <p className="mt-1 text-sm text-slate-500">
            Pedido nº {order} · comprado em {paid}
            {purchase.downloads_until && ` · downloads até ${formatISODate(purchase.downloads_until)}`}
          </p>
        </div>
        <div className="min-w-60 rounded-xl bg-slate-50 px-3.5 py-3">
          <div className="text-xs text-slate-500">Senha para abrir os PDFs</div>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xl font-bold tracking-[0.08em] text-slate-900">
              {showPassword ? purchase.password : "•".repeat(purchase.password.length)}
            </span>
            <button type="button" onClick={() => setShowPassword((v) => !v)}
              className="min-h-8 rounded-lg border border-slate-200 bg-surface px-2.5 text-xs font-semibold text-slate-700">
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>
      </div>
      <div>
        {purchase.items.map((item, idx) => (
          <div key={item.simulado_id} className={`flex flex-wrap items-center gap-3 px-6 py-3 ${idx ? "border-t border-slate-100" : ""}`}>
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
              item.bonus ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"}`}>
              {item.bonus ? "Brinde" : "Simulado"}
            </span>
            <div className="min-w-0 flex-[1_1_220px] text-[15px] font-bold text-slate-900">{item.title}</div>
            <div className="flex gap-2">
              {item.files.map((kind) => (
                <button key={kind} type="button" disabled={busy !== null} onClick={() => void get(item.simulado_id, kind)}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 text-sm font-semibold text-slate-900 hover:border-slate-300 disabled:opacity-60">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
                  </svg>
                  {busy === `${item.simulado_id}/${kind}` ? "Baixando…" : kind === "caderno" ? "Caderno" : "Gabarito"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {error && <p role="alert" className="mx-6 mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <p className="border-t border-slate-100 px-6 py-3.5 text-[13px] text-slate-500">
        Os PDFs levam o seu e-mail e o nº do pedido em marca-d’água. Não compartilhe a senha. Reembolso integral até {refundUntil}.
      </p>
    </article>
  );
}
