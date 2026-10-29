"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckoutFlow } from "@/components/CheckoutFlow";
import type { PlanOut } from "@/lib/billing";

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatPromoDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("pt-BR");
}

export function PricingToggle({
  title,
  monthly,
  annual,
  founding = false,
  analyticsLocation = "pricing",
}: {
  title: string;
  monthly: PlanOut;
  annual: PlanOut | null;
  founding?: boolean;
  analyticsLocation?: string;
}) {
  const [billingInterval, setBillingInterval] = useState<"month" | "year">("month");
  // Each plan's annual savings are against its own monthly price.
  const savingsCents = annual ? monthly.price_cents * 12 - annual.price_cents : 0;
  const annualIsBetterDeal = !!annual && savingsCents > 0;
  const plan = billingInterval === "year" && annualIsBetterDeal ? annual! : monthly;
  const promoEndsAt = monthly.promo_ends_at;

  return (
    <div
      className={`flex flex-col items-center gap-6 rounded-2xl border px-8 py-10 text-center ${
        founding ? "border-brand/20 bg-brand-light" : "border-slate-200 bg-surface"
      }`}
    >
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      {founding && (
        <span className="rounded-full bg-brand px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
          Preço de fundador · nunca sobe para quem assinar agora
          {promoEndsAt ? ` · oferta até ${formatPromoDate(promoEndsAt)}` : ""}
        </span>
      )}
      {founding && <p className="-mt-2 text-sm text-slate-600">Tudo do Premium, por um preço menor</p>}
      {annualIsBetterDeal && (
        <div className="inline-flex rounded-full border border-slate-200 bg-surface p-1">
          <button
            onClick={() => setBillingInterval("month")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${billingInterval === "month" ? "bg-brand text-white" : "text-slate-600"}`}
          >
            Mensal
          </button>
          <button
            onClick={() => setBillingInterval("year")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${billingInterval === "year" ? "bg-brand text-white" : "text-slate-600"}`}
          >
            Anual · economize R$ {formatPrice(savingsCents)}
          </button>
        </div>
      )}

      <div>
        {plan.interval === "year" ? (
          <>
            <p className="text-sm font-medium text-slate-600">a partir de</p>
            <p className="text-4xl font-extrabold tracking-tight text-slate-900">
              R$ {formatPrice(Math.round(plan.price_cents / 12))}
              <span className="text-base font-semibold text-slate-500">/mês</span>
            </p>
            <p className="mt-2 text-xs text-slate-500">Total anual: R$ {formatPrice(plan.price_cents)} pela assinatura</p>
          </>
        ) : (
          <p className="text-4xl font-extrabold tracking-tight text-slate-900">
            R$ {formatPrice(plan.price_cents)}
            <span className="text-base font-semibold text-slate-500">/mês</span>
          </p>
        )}
      </div>

      <p className="text-sm text-slate-600">Sem anúncios · {plan.trial_days ?? 7} dias grátis para testar tudo, cancele quando quiser</p>
      <CheckoutFlow planId={plan.id} label="Começar teste grátis" analyticsLocation={analyticsLocation} />
      <p className="max-w-md text-center text-xs leading-relaxed text-slate-500">
        Ao continuar, você concorda com os{" "}
        <Link href="/termos-de-uso" className="font-medium text-slate-700 hover:text-slate-900">
          Termos de Uso
        </Link>{" "}
        e com a{" "}
        <Link href="/politica-de-privacidade" className="font-medium text-slate-700 hover:text-slate-900">
          Política de Privacidade
        </Link>
        .
      </p>
    </div>
  );
}
