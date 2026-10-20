"use client";

import { useCookieConsent } from "@/components/CookieConsentProvider";
import { trackEvent } from "@/lib/analytics";

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  const { openPreferences } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={() => {
        trackEvent("cookie_preferences_opened", { source: "button" });
        openPreferences();
      }}
      className={className}
    >
      Preferências de cookies
    </button>
  );
}