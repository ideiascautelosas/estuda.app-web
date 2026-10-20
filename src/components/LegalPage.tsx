import Link from "next/link";
import type { ReactNode } from "react";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";

type LegalPageProps = {
  title: string;
  description: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalPage({ title, description, lastUpdated, children }: LegalPageProps) {
  return (
    <div className="min-h-full bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-slate-900">
            estuda.app
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
            <Link href="/termos-de-uso" className="transition hover:text-slate-900">
              Termos de Uso
            </Link>
            <Link href="/politica-de-privacidade" className="transition hover:text-slate-900">
              Privacidade
            </Link>
            <Link href="/politica-de-cancelamento" className="transition hover:text-slate-900">
              Cancelamento
            </Link>
            <CookieSettingsButton className="transition hover:text-slate-900" />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Documento legal</p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">{description}</p>
          <p className="mt-4 text-sm text-slate-500">Última atualização: {lastUpdated}</p>

          <article className="prose prose-slate mt-10 max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:leading-7 prose-li:leading-7 prose-strong:text-slate-900">
            {children}
          </article>
        </div>
      </main>
    </div>
  );
}