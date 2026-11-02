import { api } from "@/lib/api";

export type WaitlistContactKind = "email" | "phone";

// Mirrors the API's check (app/models/waitlist.py): loose on e-mails, and
// phones must be a Brazilian mobile (DDD + 9 digits) unless written in
// international format, which the API validates on its own.
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function contactKind(value: string): WaitlistContactKind | null {
  const trimmed = value.trim();
  if (trimmed.includes("@")) return EMAIL_RE.test(trimmed) ? "email" : null;
  let digits = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("+") && !digits.startsWith("55")) return digits.length >= 8 && digits.length <= 15 ? "phone" : null;
  if (digits.startsWith("55") && digits.length >= 12) digits = digits.slice(2);
  return digits.length === 11 && digits[2] === "9" ? "phone" : null;
}

export function joinLaunchWaitlist(contact: string, source?: string, website?: string) {
  return api.post<{ ok: boolean }>("/v1/launch-waitlist", { contact, source, website: website || undefined });
}
