import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";
import { LAUNCH_CONTACT_EMAIL } from "@/lib/launch";

const HIGHLIGHTS = [
  {
    src: "/screenshots/simulados.png",
    alt: "Tela de simulados do app estuda.app com os tipos de simulado e o histórico",
    title: "Simulados no formato da banca",
    desc: "Questões de provas anteriores da sua banca, montadas com o peso de cada matéria no edital. Correção comentada, com a justificativa da própria banca quando ela publica.",
  },
  {
    src: "/screenshots/revisao.png",
    alt: "Tela de revisão de erros do app estuda.app com questões agrupadas por tema",
    title: "Seus erros viram plano de estudo",
    desc: "Cada questão errada vai para a revisão dirigida: o tema, um resumo e um novo simulado só daquilo que você ainda não domina.",
  },
  {
    src: "/screenshots/insights.png",
    alt: "Tela de incidência por tema do app estuda.app",
    title: "Saiba o que mais cai",
    desc: "A incidência de cada matéria e tema nas últimas provas da banca, para estudar primeiro o que mais pesa na nota.",
  },
  {
    src: "/screenshots/tutor.png",
    alt: "Tela do Tutor com IA do app estuda.app com um resumo de tema",
    title: "Tutor com IA",
    desc: "Peça um resumo ou uma explicação de qualquer tema, na hora, a partir dos seus próprios erros.",
  },
];

const MORE = [
  { title: "Plano de estudo diário", desc: "Quantos dias faltam, o que estudar hoje e lembretes na hora certa." },
  { title: "Painel de desempenho", desc: "Consistência, eficiência e prontidão para a prova." },
  { title: "Estude offline", desc: "Baixe provas completas e treine sem internet." },
  { title: "Mais de um concurso", desc: "Prepare-se para vários cargos e troque quando quiser." },
];

function Phone({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-[32px] border-[5px] border-slate-900 bg-slate-900 shadow-2xl ${className}`}>
      <Image src={src} alt={alt} width={390} height={844} className="w-full" priority={priority} />
    </div>
  );
}

export function PreLaunch() {
  const notify = `mailto:${LAUNCH_CONTACT_EMAIL}?subject=${encodeURIComponent("Quero ser avisado do lançamento do estuda.app")}`;
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-slate-100">
        <div className="mx-auto flex max-w-6xl items-center gap-2.5 px-6 py-4">
          <Image src="/logo.png" alt="" width={32} height={32} className="rounded-[9px]" />
          <span className="text-lg font-extrabold tracking-tight text-slate-900">estuda.app</span>
        </div>
      </header>

      <main className="flex-1">
        <section className="overflow-hidden bg-gradient-to-b from-brand-light to-white">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-14 pb-20 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
            <div className="text-center lg:text-left">
              <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand">
                Lançamento em breve · iOS e Android
              </span>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                Estude o que cai na <span className="text-brand">sua</span> prova.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600 lg:mx-0">
                Simulados com questões reais da sua banca, revisão dirigida dos seus erros e um tutor com IA — tudo no celular, num plano de estudo feito para o seu concurso.
              </p>
              <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a href={notify} className="rounded-xl bg-brand px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-dark">
                  Quero ser avisado
                </a>
                <span className="text-sm text-slate-500">Grátis para começar. Sem cartão.</span>
              </div>
            </div>

            <div className="relative mx-auto flex h-[460px] w-full max-w-[460px] items-center justify-center sm:h-[560px]">
              <Phone src="/screenshots/simulados.png" alt="Tela de simulados do app" className="absolute left-0 top-12 w-[38%] -rotate-6 opacity-95" priority />
              <Phone src="/screenshots/revisao.png" alt="Tela de revisão de erros do app" className="absolute right-0 top-12 w-[38%] rotate-6 opacity-95" priority />
              <Phone src="/screenshots/dashboard.png" alt="Tela inicial do app com o plano do dia" className="relative z-10 w-[46%]" priority />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Feito para passar, não para decorar</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">Tudo gira em torno da sua banca, do seu cargo e dos seus erros.</p>
            <div className="mt-16 flex flex-col gap-20">
              {HIGHLIGHTS.map((h, i) => (
                <div key={h.src} className={`flex flex-col items-center gap-10 md:flex-row ${i % 2 ? "md:flex-row-reverse" : ""}`}>
                  <div className="w-56 shrink-0 sm:w-64">
                    <Phone src={h.src} alt={h.alt} />
                  </div>
                  <div className="max-w-md text-center md:text-left">
                    <span className="text-sm font-bold text-brand">0{i + 1}</span>
                    <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">{h.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-slate-600">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
            {MORE.map((m) => (
              <div key={m.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-base font-bold text-slate-900">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Estamos quase lá</h2>
            <p className="mt-3 text-slate-600">O estuda.app chega em breve à App Store e ao Google Play. Deixe seu contato e avisamos no lançamento.</p>
            <a href={notify} className="mt-8 inline-block rounded-xl bg-brand px-6 py-3.5 text-base font-bold text-white transition hover:bg-brand-dark">
              Quero ser avisado
            </a>
          </div>
        </section>
      </main>

      <SiteFooter showDownloads={false} />
    </div>
  );
}
