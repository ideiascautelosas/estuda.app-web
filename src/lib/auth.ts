import { api, ApiError } from "./api";

export interface PhoneStartResponse {
  phone: string;
  otp_sent: boolean;
  expires_in_seconds: number;
  debug_code?: string | null;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user_id: string;
  is_new_user: boolean;
}

// The backend's error `detail` strings are in English by convention — the
// same messages the mobile app translates for its own OTP screen.
const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "No code requested for this phone": "Nenhum código foi solicitado para este telefone.",
  "Code expired, request a new one": "Código expirado. Solicite um novo.",
  "Too many attempts, request a new code": "Muitas tentativas. Solicite um novo código.",
  "Invalid code": "Código inválido. Tente novamente.",
};

export function startPhoneAuth(phone: string, source?: string) {
  return api.post<PhoneStartResponse>("/v1/auth/phone/start", { phone, source });
}

export function verifyPhoneAuth(phone: string, code: string) {
  return api.post<TokenResponse>("/v1/auth/phone/verify", { phone, code });
}

export function translateAuthError(err: unknown, fallback: string): string {
  if (err instanceof ApiError && typeof err.detail === "string") {
    return AUTH_ERROR_MESSAGES[err.detail] ?? err.message;
  }
  return err instanceof ApiError ? err.message : fallback;
}

const TOKEN_KEY = "estuda_token";
const USER_ID_KEY = "estuda_user_id";

export function loadSession(): { token: string; userId: string } | null {
  if (typeof window === "undefined") return null;
  const token = window.localStorage.getItem(TOKEN_KEY);
  const userId = window.localStorage.getItem(USER_ID_KEY);
  return token && userId ? { token, userId } : null;
}

export function saveSession(token: string, userId: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(USER_ID_KEY, userId);
}

export function clearSession() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_ID_KEY);
}
