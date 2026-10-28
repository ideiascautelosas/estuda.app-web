import Image from "next/image";
import Link from "next/link";
import { AppDownloadLinks } from "@/components/AppDownloadLinks";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteFooter({ showDownloads = true }: { showDownloads?: boolean }) {
  return (
    <footer className="border-t border-slate-100 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 text-sm text-slate-500 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={22} height={22} className="rounded-[6px]" />
          <span className="font-semibold text-slate-700">estuda.app</span>
        </div>
        <div className="flex flex-col items-center gap-2 sm:items-end">
          {showDownloads && <AppDownloadLinks align="right" analyticsLocation="footer" />}
          <nav aria-label="Informações legais" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link href="/sobre" className="transition hover:text-slate-700">
              Quem somos
            </Link>
            <Link href="/termos-de-uso" className="transition hover:text-slate-700">
              Termos de Uso
            </Link>
            <Link href="/politica-de-privacidade" className="transition hover:text-slate-700">
              Política de Privacidade
            </Link>
            <Link href="/politica-de-cancelamento" className="transition hover:text-slate-700">
              Política de Cancelamento
            </Link>
            <CookieSettingsButton className="transition hover:text-slate-700" />
          </nav>
          <ThemeToggle />
          <p>© {new Date().getFullYear()} Estuda. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
