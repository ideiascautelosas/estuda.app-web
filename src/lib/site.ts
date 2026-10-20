import { LEGAL_INFO } from "@/lib/legal";

function envValue(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizeSiteUrl(value: string | null): string {
  const fallback = "https://estuda.app";
  if (!value) return fallback;
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export const SITE_NAME = "estuda.app";
export const SITE_TITLE = "Estuda — sua aprovação em concursos";
export const SITE_DESCRIPTION = "Simulados no formato da banca, revisão dirigida dos seus erros e um tutor com IA. Estude com foco no que realmente cai.";
export const SITE_URL = normalizeSiteUrl(envValue(process.env.NEXT_PUBLIC_SITE_URL));
export const GA_MEASUREMENT_ID = envValue(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
export const GOOGLE_SITE_VERIFICATION = envValue(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION);
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

export const SEO_KEYWORDS = [
  "concurso público",
  "simulado para concurso",
  "estudo para concurso",
  "preparação para concursos",
  "questões comentadas",
  "banca examinadora",
  "plano de estudo",
  "tutor com IA",
  "revisão de erros",
] as const;

export const STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "pt-BR",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    email: LEGAL_INFO.supportEmail,
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    operatingSystem: "Web, iOS, Android",
    applicationCategory: "EducationalApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  },
] as const;