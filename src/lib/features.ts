import { api } from "./api";

// Server-side feature switches (app-concursos-backend services/features.py,
// GET /v1/features). A flag the API doesn't return, or an unreachable API,
// reads as off — same default as the backend.
export type Features = Record<string, boolean>;

export async function getFeatures(): Promise<Features> {
  try {
    return await api.get<Features>("/v1/features", { cache: "no-store" });
  } catch {
    return {};
  }
}
