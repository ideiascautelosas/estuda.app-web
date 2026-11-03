import { API_BASE_URL, ApiError, api } from "@/lib/api";

// Simulado packages sold on the site (backend routers/simulados.py). The
// buyer has no app account: "Meus simulados" signs in with a code sent to
// the purchase e-mail and keeps the token in this browser.

export interface PackageItem {
  title: string;
  kind: "simulado" | "mini";
  bonus: boolean;
  questions: number;
  discursive: boolean;
}

export interface SimuladoPackage {
  id: string;
  title: string;
  concurso: string;
  cargo: string;
  banca: string;
  description: string;
  price_cents: number;
  downloads_until: string | null;
  items: PackageItem[];
}

export interface PurchaseItem {
  simulado_id: string;
  title: string;
  kind: "simulado" | "mini";
  bonus: boolean;
  files: ("caderno" | "gabarito")[];
}

export interface Purchase {
  id: string;
  package_id: string;
  title: string;
  email: string;
  password: string;
  paid_at: string;
  downloads_until: string | null;
  items: PurchaseItem[];
}

export interface CheckoutStatus {
  status: "paid" | "pending";
  email: string;
  package_id: string;
  title: string;
}

// What the editais say about each package's concurso; the backend only
// knows the package. Keyed by package id, as published from the ingest.
export interface PackageFacts {
  sigla: string;
  prova: string;
  provaLonga: string;
  formato: string;
  vagas: string;
  remuneracao: string;
  edital: string;
  disciplinas: [string, number][];
  distribuicao: string;
}

export const PACKAGE_FACTS: Record<string, PackageFacts> = {
  "pc-al-2026-agente": {
    sigla: "PC/AL",
    prova: "2026-12-06",
    provaLonga: "06/12/2026 (prevista)",
    formato: "Certo ou errado · 50 + 70 itens",
    vagas: "65 imediatas + 65 CR",
    remuneracao: "R$ 5.318,63",
    edital: "Edital nº 1 – PC/AL, de 2/7/2026",
    distribuicao: "O edital fixa 50 itens de conhecimentos básicos e 70 de específicos, sem divisão por disciplina; esta divisão é do estuda.app.",
    disciplinas: [
      ["Língua Portuguesa", 16],
      ["Tecnologia da Informação e Segurança Cibernética", 10],
      ["Raciocínio Lógico-Matemático", 10],
      ["Legislação Institucional do Estado de Alagoas", 10],
      ["Noções de Direito Penal", 9],
      ["Noções de Direito Processual Penal", 9],
      ["Legislação Penal Especial", 9],
      ["Noções de Direito Administrativo", 7],
      ["Contabilidade, Análise Financeira e Crimes contra a Ordem Tributária", 7],
      ["Estatística e Análise de Dados", 7],
      ["Noções de Direitos Humanos", 6],
      ["Noções de Direito Constitucional", 6],
      ["Crimes Cibernéticos e Segurança Digital", 6],
      ["Ética no Serviço Público", 5],
      ["Atualidades", 3],
    ],
  },
  "pc-ba-2026-investigador": {
    sigla: "PC/BA",
    prova: "2026-12-06",
    provaLonga: "06/12/2026, em Salvador",
    formato: "Múltipla escolha · 5 alternativas",
    vagas: "500",
    remuneracao: "até R$ 6.433,06",
    edital: "Edital SAEB nº 02/2026",
    distribuicao: "Divisão por disciplina do estuda.app, a partir do conteúdo programático do edital.",
    disciplinas: [
      ["Noções de Direito Penal", 10],
      ["Noções de Direito Processual Penal", 10],
      ["Legislação Penal e Processual Extravagante", 10],
      ["Língua Portuguesa", 10],
      ["Noções de Contabilidade", 8],
      ["Noções de Direito Administrativo", 8],
      ["Noções de Direito Constitucional", 8],
      ["Raciocínio Lógico", 6],
      ["Informática", 6],
      ["Estatística", 6],
      ["Promoção da Igualdade Racial e de Gênero", 5],
      ["Medicina Legal", 5],
      ["Legislação Geral", 5],
      ["Atualidades", 3],
    ],
  },
};

export function formatBRL(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// "2026-12-06" → "06/12/2026", without going through the browser's timezone.
export function formatISODate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${d}/${m}/${y}`;
}

export function daysUntil(iso: string): number {
  const target = new Date(`${iso}T08:00:00-03:00`).getTime();
  return Math.max(0, Math.ceil((target - Date.now()) / 86_400_000));
}

export function splitItems(items: PackageItem[]) {
  return { main: items.filter((i) => !i.bonus), bonus: items.filter((i) => i.bonus) };
}

// The ingest names a mini "Mini simulado · Tecnologia e Cibersegurança 1";
// the site shows only its assunto.
export function miniAssunto(title: string): string {
  return title.replace(/^mini simulado\s*·\s*/i, "").replace(/\s+\d+$/, "");
}

// Assuntos often contain "e" themselves, so they are joined with "·".
export function bonusSummary(bonus: PackageItem[]): string {
  const assuntos = bonus.map((i) => miniAssunto(i.title));
  const sizes = new Set(bonus.map((i) => i.questions));
  const each = sizes.size === 1 ? `, ${bonus[0].questions} questões cada` : "";
  return `${bonus.length} mini simulados de brinde (${assuntos.join(" · ")}${each})`;
}

// Server components: the catalog is public and changes rarely.
export async function fetchPackages(): Promise<SimuladoPackage[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/v1/simulados/packages`, { next: { revalidate: 300 } });
    return res.ok ? ((await res.json()) as SimuladoPackage[]) : [];
  } catch {
    return [];
  }
}

export async function fetchPackage(id: string): Promise<SimuladoPackage | null> {
  if (!/^[a-z0-9-]{3,80}$/.test(id)) return null;
  const res = await fetch(`${API_BASE_URL}/v1/simulados/packages/${id}`, { next: { revalidate: 300 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Package ${id}: ${res.status}`);
  return (await res.json()) as SimuladoPackage;
}

export const startCheckout = (packageId: string, email: string) =>
  api.post<{ checkout_url: string }>("/v1/simulados/checkout", { package_id: packageId, email });

export const getCheckoutStatus = (sessionId: string) =>
  api.get<CheckoutStatus>(`/v1/simulados/checkout-sessions/${encodeURIComponent(sessionId)}`);

export const requestAccessCode = (email: string) =>
  api.post<{ sent: boolean; expires_in_seconds: number; debug_code: string | null }>("/v1/simulados/access/start", { email });

export const verifyAccessCode = (email: string, code: string) =>
  api.post<{ access_token: string; expires_at: string; email: string }>("/v1/simulados/access/verify", { email, code });

export const listPurchases = (token: string) => api.get<Purchase[]>("/v1/simulados/purchases", { token });

// The PDF comes stamped and encrypted for this buyer, so it goes through
// fetch (with the token) and is saved from a blob.
export async function downloadFile(token: string, purchaseId: string, simuladoId: string, kind: "caderno" | "gabarito") {
  const res = await fetch(`${API_BASE_URL}/v1/simulados/purchases/${purchaseId}/files/${simuladoId}/${kind}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    let detail: unknown = null;
    try {
      detail = (await res.json()).detail;
    } catch {}
    throw new ApiError(res.status, detail, typeof detail === "string" ? detail : "Não foi possível baixar o arquivo.");
  }
  const name = /filename="([^"]+)"/.exec(res.headers.get("Content-Disposition") ?? "")?.[1] ?? `${kind}.pdf`;
  const url = URL.createObjectURL(await res.blob());
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

const TOKEN_KEY = "estuda.simulados.session";

export interface BuyerSession {
  token: string;
  email: string;
  expiresAt: string;
}

export function readBuyerSession(): BuyerSession | null {
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as BuyerSession;
    return new Date(session.expiresAt).getTime() > Date.now() ? session : null;
  } catch {
    return null;
  }
}

export function saveBuyerSession(session: BuyerSession) {
  try {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(session));
  } catch {}
}

export function clearBuyerSession() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {}
}
