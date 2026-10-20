const SOURCE_KEY = "estuda_source";

function sanitizeSource(raw: string): string {
  return raw
    .toLowerCase()
    .split("")
    .filter((ch) => /[a-z0-9_-]/.test(ch))
    .join("")
    .slice(0, 40);
}

// First-touch attribution: reads utm_source/src off the current URL (set by
// an Instagram bio link, a WhatsApp/Facebook group post, etc.) and persists
// it so it's still available if the phone/OTP modal is opened later in the
// visit, or on a repeat visit without the query param.
export function getAttributionSource(): string | undefined {
  if (typeof window === "undefined") return undefined;

  const params = new URLSearchParams(window.location.search);
  const raw = params.get("utm_source") ?? params.get("src");
  if (raw) {
    const clean = sanitizeSource(raw);
    if (clean) {
      window.localStorage.setItem(SOURCE_KEY, clean);
      return clean;
    }
  }

  return window.localStorage.getItem(SOURCE_KEY) ?? undefined;
}
