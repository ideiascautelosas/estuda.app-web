import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FOUNDER_STATS } from "@/components/FoundersBlock";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "/sobre",
  "Quem somos | Estuda",
  "O estuda.app foi criado por dois concurseiros com mais de 5 aprovações em concursos públicos federais, estaduais e municipais.",
);

// The tutor's persona name. The app still calls it "Tutor com IA", so this
// is the one place to change if the name changes before it ships there.
const TUTOR_NAME = "Vera";

const LESSONS = [
  {
    title: "Estude o que mais cai",
    desc: "A gente perdeu meses com tema que nunca caiu. Hoje a incidência de temas mostra o que a sua banca mais cobra.",
    feature: "Incidência de temas",
    icon: (
      <>
        <path d="M3 21h18" />
        <path d="M6 17V11" />
        <path d="M12 17V5" />
        <path d="M18 17v-8" />
      </>
    ),
  },
  {
    title: "Treine no estilo da banca",
    desc: "Cada banca tem o seu jeito de perguntar. Treinar nesse formato tira o susto do dia da prova.",
    feature: "Simulados no formato da banca",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
  },
  {
    title: "Seu erro é o seu plano",
    desc: "Quem passa revisa o que errou, não o que já sabe. O app transforma cada erro em resumo e reteste.",
    feature: "Revisão dirigida dos erros",
    icon: (
      <>
        <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
        <path d="M3 21v-5h5" />
      </>
    ),
  },
  {
    title: "Dúvida não espera",
    desc: `Dúvida parada vira tema abandonado. A ${TUTOR_NAME} explica o que você errou na hora, sem sair do estudo.`,
    feature: "Tutor com IA",
    icon: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />,
  },
];

const PRINCIPLES = [
  {
    title: "Sem promessa de aprovação",
    desc: "Aprovação depende de você. A gente entrega o método e as ferramentas para cada hora de estudo render mais.",
  },
  {
    title: "Conteúdo revisado",
    desc: "Resumos e questões passam por revisão antes de chegar ao app. Achou um erro? Você reporta direto na questão.",
  },
  {
    title: "Transparência com IA",
    desc: `A ${TUTOR_NAME} é uma inteligência artificial e sempre deixa isso claro. Ela ajuda a entender, mas a fonte é sempre a lei e o edital.`,
  },
];

// Served as a file rather than inlined: its gradient and clip-path ids
// would otherwise be global to the page. next/image does not optimize SVG.
function TutorAvatar({ className }: { className?: string }) {
  return (
    <Image
      src="/vera.svg"
      alt={`Ilustração da ${TUTOR_NAME}, a tutora com IA`}
      width={200}
      height={200}
      unoptimized
      className={className}
    />
  );
}

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={32} height={32} className="rounded-[9px]" />
            <span className="text-lg font-extrabold tracking-tight text-slate-900">estuda.app</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 sm:flex">
            <Link href="/#mentor" className="hover:text-slate-900">Como funciona</Link>
            <Link href="/#recursos" className="hover:text-slate-900">Recursos</Link>
            <Link href="/#preco" className="hover:text-slate-900">Preço</Link>
            <Link href="/sobre" aria-current="page" className="font-bold text-slate-900">Quem somos</Link>
            <Link href="/#faq" className="hover:text-slate-900">Dúvidas</Link>
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block">
              <ThemeToggle />
            </span>
            <Link
              href="/#preco"
              className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Assinar
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-14 text-center sm:pt-24">
          <span className="rounded-full bg-brand-light px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-dark dark:text-brand">Quem somos</span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Feito por quem já foi aprovado
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600">
            O estuda.app nasceu de dois concurseiros que passaram anos do outro lado da prova: edital em PDF, simulado errado na véspera e a
            dúvida de estar estudando o que realmente cai.
          </p>
        </section>

        <section aria-label="Nossas aprovações" className="mx-auto max-w-6xl px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {FOUNDER_STATS.map((stat) => (
              <div key={stat.value} className="rounded-2xl border border-slate-200 bg-surface p-8">
                <p className="text-5xl font-extrabold tracking-tight text-brand">{stat.value}</p>
                <p className="mt-3 text-base font-semibold text-slate-900">{stat.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{stat.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Nossa história</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">Antes de criar o app, a gente fez a prova</h2>
          </div>
          <div className="flex flex-col gap-5 text-base leading-relaxed text-slate-700">
            <p>
              Entre nós dois, somamos mais de cinco aprovações em concursos públicos, nas esferas federal, estadual e municipal.
            </p>
            <p>
              O que fez diferença foi o método que fomos ajustando prova após prova: menos material acumulado e mais questão resolvida, foco
              no que a banca realmente cobra, e cada erro virando o próximo tema de revisão.
            </p>
            <p>
              O estuda.app é esse método transformado em produto. Ele faz por você a parte que mais tomava o nosso tempo: decidir o que
              estudar hoje.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-slate-50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-bold uppercase tracking-wide text-brand">O que aprendemos passando</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">Cada lição virou um recurso do app</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {LESSONS.map((lesson) => (
                <div key={lesson.title} className="flex flex-col rounded-2xl border border-slate-200 bg-surface p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {lesson.icon}
                    </svg>
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{lesson.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{lesson.desc}</p>
                  <p className="mt-4 text-xs font-semibold text-brand">{lesson.feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col items-center gap-8 rounded-3xl bg-brand-light p-8 sm:flex-row sm:p-12">
            <TutorAvatar className="h-32 w-32 shrink-0 sm:h-40 sm:w-40" />
            <div>
              <span className="rounded-full bg-brand-dark px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">Inteligência artificial</span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">Conheça a {TUTOR_NAME}, sua tutora com IA</h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-700">
                A {TUTOR_NAME} reúne o jeito de estudar dos fundadores e conversa com você como a colega que passou antes: explica o erro, aponta o
                que revisar e lembra de manter o ritmo. Ela é uma inteligência artificial, e sempre vai deixar isso claro.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">No que a gente acredita</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="border-t-2 border-slate-900 pt-5">
                <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The slate scale flips in dark mode (see globals.css), so this band
            inverts with the theme instead of needing dark: variants. */}
        <section className="bg-slate-900">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-16 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-50">Estude com o método de quem passou</h2>
              <p className="mt-2 text-slate-300">Grátis para começar. 7 dias de Premium para testar tudo.</p>
            </div>
            <Link
              href="/#preco"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Começar grátis
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
