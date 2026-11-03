"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { SimuladosHeader } from "@/components/simulados/SimuladosHeader";
import { CodeLogin } from "@/components/simulados/CodeLogin";
import { ApiError } from "@/lib/api";
import { getCheckoutStatus, type CheckoutStatus } from "@/lib/simulados";

const POLL_ATTEMPTS = 8;
const POLL_INTERVAL_MS = 2500;

function SuccessContent() {
  const router = useRouter();
  const sessionId = useSearchParams().get("session_id");
  const [status, setStatus] = useState<CheckoutStatus | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    let attempt = 0;
    async function poll() {
      attempt += 1;
      try {
        const res = await getCheckoutStatus(sessionId!);
        if (cancelled) return;
        setStatus(res);
        if (res.status === "paid") return;
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) {
          setFailed(true);
          return;
        }
      }
      if (attempt < POLL_ATTEMPTS && !cancelled) setTimeout(poll, POLL_INTERVAL_MS);
      else if (!cancelled) setFailed(true);
    }
    void poll();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  if (!sessionId || (failed && status?.status !== "paid")) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Ainda não confirmamos seu pagamento</h1>
        <p className="text-[17px] text-slate-600">
          Se o cartão foi cobrado, a confirmação chega por e-mail em alguns minutos e o pacote aparece em Meus simulados.
        </p>
        <Link href="/meus-simulados" className="self-start rounded-xl bg-brand px-5 py-3 font-bold text-white">Ir para Meus simulados</Link>
      </div>
    );
  }

  if (status?.status !== "paid") {
    return (
      <div className="flex flex-col items-start gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-brand" />
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Confirmando seu pagamento…</h1>
        <p className="text-slate-600">Isso costuma levar só alguns segundos.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <span className="self-start rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-emerald-700">
        Pagamento confirmado
      </span>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Seu pacote já está em Meus simulados</h1>
      <p className="text-[17px] text-slate-600">{status.title}</p>
      <div className="flex flex-col gap-3.5 rounded-2xl border-2 border-brand p-6">
        <div className="text-[17px] font-extrabold text-slate-900">Confirme seu e-mail para entrar</div>
        <CodeLogin email={status.email} onSignedIn={() => router.push("/meus-simulados")} />
      </div>
      <p className="text-[13px] text-slate-500">
        Você pode voltar quando quiser: clique em Meus simulados no topo do site e entre com o mesmo e-mail. O recibo do cartão vem do
        Stripe.
      </p>
    </div>
  );
}

export default function SimuladoSuccessPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SimuladosHeader current="simulados" />
      <main className="mx-auto w-full max-w-xl flex-1 px-6 py-16">
        <Suspense fallback={null}>
          <SuccessContent />
        </Suspense>
      </main>
    </div>
  );
}
