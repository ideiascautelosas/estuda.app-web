import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SimuladosHeader({ current }: { current: "simulados" | "meus" }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="" width={32} height={32} className="rounded-[9px]" />
          <span className="text-lg font-extrabold tracking-tight text-slate-900">estuda.app</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 sm:flex">
          <Link href="/simulados" aria-current={current === "simulados" ? "page" : undefined}
            className={current === "simulados" ? "font-bold text-slate-900" : "hover:text-slate-900"}>
            Simulados
          </Link>
          <Link href="/sobre" className="hover:text-slate-900">Quem somos</Link>
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <ThemeToggle />
          </span>
          <Link
            href="/meus-simulados"
            aria-current={current === "meus" ? "page" : undefined}
            className={`inline-flex min-h-11 items-center justify-center rounded-full border px-5 text-sm font-semibold transition ${
              current === "meus" ? "border-brand text-slate-900" : "border-slate-200 text-slate-900 hover:border-slate-300"
            }`}
          >
            Meus simulados
          </Link>
        </div>
      </div>
    </header>
  );
}
