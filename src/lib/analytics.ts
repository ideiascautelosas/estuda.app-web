import { GA_MEASUREMENT_ID, SITE_URL } from "@/lib/site";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type EventValue = string | number | boolean | null | undefined;

function compactParams(params: Record<string, EventValue>) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== null));
}

export function isAnalyticsConfigured(): boolean {
  return Boolean(GA_MEASUREMENT_ID);
}

export function trackEvent(eventName: string, params: Record<string, EventValue> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", eventName, compactParams(params));
}

export function trackPageView(path: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  window.gtag("event", "page_view", {
    page_title: document.title,
    page_path: normalizedPath,
    page_location: `${SITE_URL}${normalizedPath}`,
  });
}