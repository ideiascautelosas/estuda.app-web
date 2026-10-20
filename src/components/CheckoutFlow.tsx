"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { ApiError } from "@/lib/api";
import { getAttributionSource } from "@/lib/attribution";
import { startPhoneAuth, verifyPhoneAuth, translateAuthError } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";
import { checkout } from "@/lib/billing";

type Step = "closed" | "phone" | "otp" | "redirecting" | "updated";

function LegalNotice() {
  return (
    <p className="text-center text-xs leading-relaxed text-slate-500">
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
  );
}

export function CheckoutFlow({
  planId = "premium",
  label = "Assinar Premium",
  analyticsLocation = "unknown",
}: {
  planId?: string;
  label?: string;
  analyticsLocation?: string;
}) {
  const { token, login, logout } = useAuth();
  const [step, setStep] = useState<Step>("closed");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [debugCode, setDebugCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function goToCheckout(authToken: string) {
    setLoading(true);
    setError("");
    try {
      const res = await checkout(planId, authToken);
      if (res.checkout_url) {
        setStep("redirecting");
        window.location.assign(res.checkout_url);
        return;
      }
      if (res.status === "updated") {
        // Already subscribed on the site: the backend changed the plan of
        // that same subscription (prorated) instead of starting a second one.
        setStep("updated");
        setLoading(false);
        return;
      }
      setError("O pagamento não está disponível no momento. Tente novamente em instantes.");
      setLoading(false);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Não foi possível iniciar o pagamento.");
      setLoading(false);
      // Reached via an already-stored token (no modal open yet) — a silent
      // failure here means the error above never renders anywhere. A stale
      // or invalidated token (expired, or a backend secret rotation) is the
      // most likely cause, so drop it and let the user re-authenticate.
      if (step === "closed") {
        if (err instanceof ApiError && err.status === 401) logout();
        setStep("phone");
      }
    }
  }

  function openFlow() {
    setError("");
    trackEvent("checkout_cta_click", { plan_id: planId, label, location: analyticsLocation, authenticated: Boolean(token) });
    if (token) {
      void goToCheckout(token);
    } else {
      setStep("phone");
    }
  }

  function close() {
    if (step === "redirecting") return;
    setStep("closed");
    setError("");
    setCode("");
  }

  async function submitPhone(e: FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 11) {
      setError("Informe um telefone válido, com DDD.");
      return;
    }
    setLoading(true);
    setError("");
    trackEvent("checkout_phone_submit", { plan_id: planId, location: analyticsLocation });
    try {
      const res = await startPhoneAuth(digits, getAttributionSource());
      setDebugCode(res.debug_code ?? null);
      setStep("otp");
    } catch (err) {
      setError(translateAuthError(err, "Não foi possível enviar o código."));
    } finally {
      setLoading(false);
    }
  }

  async function submitCode(e: FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    setLoading(true);
    setError("");
    trackEvent("checkout_otp_submit", { plan_id: planId, location: analyticsLocation });
    try {
      const res = await verifyPhoneAuth(digits, code);
      login(res.access_token, res.user_id);
      await goToCheckout(res.access_token);
    } catch (err) {
      setError(translateAuthError(err, "Código inválido."));
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={openFlow}
        disabled={loading && step === "closed"}
        className="inline-flex items-center justify-center rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark disabled:opacity-60"
      >
        {label}
      </button>

      {step !== "closed" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" onClick={close}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {step === "phone" && (
              <form onSubmit={submitPhone} className="flex flex-col gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Entre com seu telefone</h2>
                  <p className="mt-1 text-sm text-slate-500">Sem senha. Enviamos um código por SMS para continuar o pagamento.</p>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 focus-within:border-brand">
                  <span className="text-sm font-semibold text-slate-500">+55</span>
                  <input
                    autoFocus
                    inputMode="numeric"
                    placeholder="(00) 00000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-sm text-slate-900 outline-none"
                  />
                </div>
                {!!error && <p className="text-sm font-medium text-red-600">{error}</p>}
                <button type="submit" disabled={loading} className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60">
                  {loading ? "Enviando…" : "Receber código"}
                </button>
                <LegalNotice />
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={submitCode} className="flex flex-col gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Digite o código</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Enviamos um código de 6 dígitos por SMS para +55 {phone}.
                    {debugCode ? ` (ambiente de teste: ${debugCode})` : ""}
                  </p>
                </div>
                <input
                  autoFocus
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  className="rounded-xl border border-slate-200 px-3 py-2.5 text-center text-lg tracking-[0.5em] text-slate-900 outline-none focus:border-brand"
                />
                {!!error && <p className="text-sm font-medium text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
                >
                  {loading ? "Verificando…" : "Confirmar e ir para o pagamento"}
                </button>
                <button type="button" onClick={() => setStep("phone")} className="text-sm font-medium text-slate-500 hover:text-slate-700">
                  Usar outro número
                </button>
                <LegalNotice />
              </form>
            )}

            {step === "updated" && (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <p className="text-base font-bold text-slate-900">Plano alterado</p>
                <p className="text-sm text-slate-600">
                  Sua assinatura atual foi atualizada para este plano. A diferença é ajustada proporcionalmente na próxima fatura.
                </p>
              </div>
            )}
            {step === "redirecting" && (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-brand" />
                <p className="text-sm font-medium text-slate-600">Redirecionando para o pagamento seguro…</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
