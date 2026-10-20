import { api } from "./api";

export interface PlanOut {
  id: string;
  name: string;
  price_cents: number;
  interval: "month" | "year" | null;
  trial_days: number | null;
  features: Record<string, unknown>;
  promo_ends_at: string | null;
}

export interface CheckoutResponse {
  plan_id: string;
  status: string;
  checkout_url: string | null;
  trial_ends_at: string | null;
}

export interface EntitlementsResponse {
  plan: string;
  billing_plan_id: string | null;
  features: Record<string, unknown>;
  trial_ends_at: string | null;
}

export function getPlans() {
  return api.get<PlanOut[]>("/v1/billing/plans", { cache: "no-store" });
}

export function checkout(planId: string, token: string) {
  return api.post<CheckoutResponse>("/v1/billing/checkout", { plan_id: planId }, { token });
}

export function getEntitlements(token: string) {
  return api.get<EntitlementsResponse>("/v1/billing/entitlements", { token, cache: "no-store" });
}
