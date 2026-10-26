"use client";

import { createContext, Suspense, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

type CookieConsentStatus = "accepted" | "rejected" | "unset";

type CookieConsentSnapshot = {
  status: CookieConsentStatus;
  ready: boolean;
};

type CookieConsentContextValue = {
  status: CookieConsentStatus;
  hasChoice: boolean;
  isBannerOpen: boolean;
  accept: () => void;
  reject: () => void;
  openPreferences: () => void;
};

const COOKIE_CONSENT_KEY = "estuda_cookie_consent";
const listeners = new Set<() => void>();

const SERVER_SNAPSHOT: CookieConsentSnapshot = { status: "unset", ready: false };
const CLIENT_SNAPSHOTS: Record<CookieConsentStatus, CookieConsentSnapshot> = {
  accepted: { status: "accepted", ready: true },
  rejected: { status: "rejected", ready: true },
  unset: { status: "unset", ready: true },
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function readCookieConsent(): CookieConsentSnapshot {
  if (typeof window === "undefined") {
    return SERVER_SNAPSHOT;
  }

  const saved = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  if (saved === "accepted" || saved === "rejected") {
    return CLIENT_SNAPSHOTS[saved];
  }

  return CLIENT_SNAPSHOTS.unset;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return readCookieConsent();
}

function getServerSnapshot(): CookieConsentSnapshot {
  return SERVER_SNAPSHOT;
}

function persistCookieConsent(status: Exclude<CookieConsentStatus, "unset">) {
  window.localStorage.setItem(COOKIE_CONSENT_KEY, status);
  listeners.forEach((listener) => listener());
}

function CookieBanner({
  open,
  onAccept,
  onReject,
}: {
  open: boolean;
  onAccept: () => void;
  onReject: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-slate-900">Cookies e analytics</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Usamos cookies e tecnologias similares para medir visitas, entender os cliques nos botões e melhorar a
            experiência do site. Você pode aceitar os cookies analíticos ou continuar apenas com os necessários.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onReject}
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Apenas necessários
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Aceitar cookies
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  function accept() {
    persistCookieConsent("accepted");
    setPreferencesOpen(false);
    trackEvent("cookie_consent_update", { consent_status: "accepted" });
  }

  function reject() {
    persistCookieConsent("rejected");
    setPreferencesOpen(false);
    trackEvent("cookie_consent_update", { consent_status: "rejected" });
  }

  function openPreferences() {
    setPreferencesOpen(true);
  }

  const isBannerOpen = snapshot.ready && (preferencesOpen || snapshot.status === "unset");

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      status: snapshot.status,
      hasChoice: snapshot.status !== "unset",
      isBannerOpen,
      accept,
      reject,
      openPreferences,
    }),
    [isBannerOpen, snapshot.status],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      <Suspense fallback={null}>
        <GoogleAnalytics enabled={snapshot.ready && snapshot.status === "accepted"} />
      </Suspense>
      {children}
      <CookieBanner open={isBannerOpen} onAccept={accept} onReject={reject} />
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return context;
}