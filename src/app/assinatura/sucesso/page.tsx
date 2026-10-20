"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getEntitlements } from "@/lib/billing";

type PollResult = "unknown" | "active" | "pending";

const POLL_ATTEMPTS = 6;
const POLL_INTERVAL_MS = 2500;

export default function CheckoutSuccessPage() {
  const { token } = useAuth();
  const [pollResult, setPollResult] = useState<PollResult>("unknown");

  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    let attempt = 0;

    async function poll() {
      attempt += 1;
      try {
        const entitlements = await getEntitlements(token!);
        if (cancelled) return;
        if (entitlements.plan === "premium") {
          setPollResult("active");
          return;
        }
      } catch {
        // keep polling — the webhook may just not have landed yet
      }
      if (attempt < POLL_ATTEMPTS && !cancelled) {
        setTimeout(poll, POLL_INTERVAL_MS);
      } else if (!cancelled) {
        setPollResult("pending");
      }
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const status: "checking" | "active" | "pending" = !token ? "pending" : pollResult === "unknown" ? "checking" : pollResult;

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <Image src="/logo.png" alt="" width={56} height={56} className="rounded-2xl" />

      {status === "checking" && (
        <>
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-brand" />
          <h1 className="text-2xl font-extrabold text-slate-900">Confirmando seu pagamento…</h1>
          <p className="max-w-sm text-slate-600">Isso costuma levar só alguns segundos.</p>
        </>
      )}

      {status === "active" && (
        <>
          <h1 className="text-3xl font-extrabold text-slate-900">Você é Premium! 🎉</h1>
          <p className="max-w-sm text-slate-600">Sua assinatura já está ativa. Abra o app estuda.app no seu celular para continuar de onde parou.</p>
        </>
      )}

      {status === "pending" && (
        <>
          <h1 className="text-2xl font-extrabold text-slate-900">Pagamento recebido</h1>
          <p className="max-w-sm text-slate-600">
            Estamos processando a confirmação — pode levar mais alguns instantes. Abra o app em alguns minutos e sua assinatura deve estar ativa.
          </p>
        </>
      )}

      <Link href="/" className="text-sm font-semibold text-brand hover:text-brand-dark">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
