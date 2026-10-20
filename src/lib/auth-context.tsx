"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { clearSession, loadSession, saveSession } from "./auth";

interface Session {
  token: string;
  userId: string;
}

// A tiny external store (React's own recommended pattern for reading
// something like localStorage) instead of useState+useEffect — it resolves
// to the right value on the client's very first render, no "flash of
// logged-out" and no synchronous setState-in-effect.
let cached: Session | null | undefined;
const listeners = new Set<() => void>();

function getSnapshot(): Session | null {
  if (cached === undefined) cached = loadSession();
  return cached;
}

function getServerSnapshot(): Session | null {
  return null;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setSession(session: Session | null) {
  cached = session;
  if (session) saveSession(session.token, session.userId);
  else clearSession();
  listeners.forEach((listener) => listener());
}

interface AuthContextValue {
  token: string | null;
  userId: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const session = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value: AuthContextValue = {
    token: session?.token ?? null,
    userId: session?.userId ?? null,
    login: (token, userId) => setSession({ token, userId }),
    logout: () => setSession(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
