import Image from "next/image";
import Link from "next/link";
import { AppDownloadLinks } from "@/components/AppDownloadLinks";
import { AppScreenshots } from "@/components/AppScreenshots";
import { CheckoutFlow } from "@/components/CheckoutFlow";
import { FoundersBlock } from "@/components/FoundersBlock";
import { PricingToggle } from "@/components/PricingToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Metadata } from "next";
import { getComparison, getPlans, type PlanOut } from "@/lib/billing";
import { getFeatures } from "@/lib/features";
import { SITE_DESCRIPTION, SITE_TITLE, pageMetadata } from "@/lib/site";
import { PRELAUNCH } from "@/lib/launch";
import { PreLaunch } from "@/components/PreLaunch";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = pageMetadata("/", SITE_TITLE, SITE_DESCRIPTION);

const FALLBACK_PREMIUM: PlanOut = {
  id: "premium",
  name: "Premium",
  price_cents: 2990,
  interval: "month",
  trial_days: 7,
  features: {},
  promo_ends_at: null,
};

const FALLBACK_STANDARD: PlanOut = {
  id: "standard",
  name: "Standard",
  price_cents: 1490,
  interval: "month",
  trial_days: 7,
  features: {},
  promo_ends_at: null,
};

function formatPromoDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("pt-BR");
}

// The mentor loop, in the order the student lives it.
const MENTOR_STEPS = [
  { title: "Plano do dia", desc: "O app monta seus blocos de estudo com as horas da sua semana, a data da prova e o seu ritmo." },
  { title: "Simulado direcionado", desc: "Simulados no formato da banca, puxando os temas em que você mais erra e os que mais caem." },
  { title: "Resumo do tema fraco", desc: "Cada erro aponta o resumo certo, com o Tutor com IA para tirar a dúvida na hora." },
  { title: "Reteste e plano ajustado", desc: "O tema volta em um reteste agendado e o plano se ajusta ao que você já domina." },
];

const FEATURES = [
  { title: "Um mentor de estudo no bolso", desc: "O app acompanha cada simulado e diz o que estudar a seguir: plano do dia, resumos e simulados direcionados aos seus temas fracos." },
  { title: "Simulados no formato da banca", desc: "Provas montadas no estilo exato da banca do seu cargo, com correção comentada questão a questão." },
  { title: "Revisão dirigida dos seus erros", desc: "Cada erro vira um resumo, um simulado só daquele tema e um reteste agendado." },
  { title: "Resumos e Tutor com IA", desc: "Resumos revisados dos temas do edital e um tutor que explica o que você errou, sem sair do estudo." },
  { title: "Incidência de temas", desc: "Veja o que mais cai nas últimas provas da sua banca para o seu cargo, e priorize o estudo por ali." },
  { title: "Provas anteriores na íntegra", desc: "Faça a última prova da sua banca e veja em que posição você ficaria na lista de aprovados.", flag: "previous_contest" },
  { title: "Painel de desempenho com recomendações", desc: "Consistência, eficiência e prontidão para a prova, com recomendações que apontam exatamente o que estudar a seguir." },
  { title: "Pacote offline", desc: "Baixe até 3 provas completas e treine sem depender de internet — o tempo é validado no envio." },
  { title: "5 questões por dia no WhatsApp", desc: "Mantenha o hábito nos dias corridos, direto no seu WhatsApp.", flag: "whatsapp" },
];

const FAQ = [
  { q: "O app é gratuito? Tem anúncios?", a: "Sim, o estuda.app é gratuito e pode ser usado sem pagar nada. Para manter a versão gratuita, ela exibe anúncios. Quem assina o Standard ou o Premium usa o app sem anúncios." },
  { q: "Como funcionam os anúncios?", a: "Os anúncios aparecem apenas na versão gratuita e podem ser fornecidos pelo Google AdMob, que pode usar identificadores do dispositivo para exibir anúncios. Detalhes na Política de Privacidade." },
  { q: "Como remover os anúncios?", a: "Assinando qualquer plano pago (Standard ou Premium). Os anúncios deixam de ser exibidos enquanto a assinatura estiver ativa." },
  { q: "Qual a diferença entre o grátis e os planos pagos?", a: "No grátis guardamos só os últimos 7 dias de simulados. É com esse histórico que o app descobre seus temas fracos e monta o plano, os resumos e os simulados direcionados — com uma semana de dados, o direcionamento acerta menos. No Standard e no Premium todo o seu histórico fica guardado e entra nas recomendações, sem anúncios." },
  { q: "Como funciona o teste grátis?", a: "Você tem 7 dias de acesso completo ao Premium antes da primeira cobrança. Cancele antes do fim do teste e não paga nada." },
  { q: "Onde eu pago?", a: "O pagamento é feito aqui no site, com Stripe — a mesma infraestrutura usada por milhares de empresas para processar cartões com segurança. Seu cartão não passa pelos nossos servidores." },
  { q: "Como cancelo?", a: "Você pode solicitar o cancelamento da renovação pelos canais oficiais informados ao assinante. Se cancelar antes do fim do teste grátis, a primeira cobrança não é realizada." },
  { q: "Preciso baixar o app antes de assinar?", a: "Não. Assine aqui pelo site com seu telefone. Depois do pagamento ser confirmado, sua assinatura passa a valer na mesma conta usada no app." },
];

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default async function Home() {
  if (PRELAUNCH) return <PreLaunch />;
  const [flags, comparison] = await Promise.all([getFeatures(), getComparison()]);
  const features = FEATURES.filter((f) => !f.flag || flags[f.flag]);
  const historyRow = comparison?.rows.find((r) => r.key === "history");
  let premium = FALLBACK_PREMIUM;
  let premiumAnnual: PlanOut | null = null;
  let regularMonthlyCents = FALLBACK_PREMIUM.price_cents;
  let standard = FALLBACK_STANDARD;
  try {
    const plans = await getPlans();
    // Founding-member rate: whenever the backend is still offering it (see
    // billing.py's launch-window deadline), it replaces the regular monthly
    // plan everywhere on this page — same checkout flow, discounted price.
    // Once the window closes, list_plans stops returning it and this page
    // falls back to the regular "premium" plan automatically.
    premium = plans.find((p) => p.id === "premium_founding") ?? plans.find((p) => p.id === "premium") ?? FALLBACK_PREMIUM;
    // Annual (R$ 299,90) and the founding rate are sold only here, on the
    // website; the stores sell the monthly plans. Founding is monthly only.
    premiumAnnual = plans.find((p) => p.id === "premium_annual") ?? null;
    regularMonthlyCents = plans.find((p) => p.id === "premium")?.price_cents ?? regularMonthlyCents;
    // Standard has no founding/annual variant — just the one monthly plan.
    standard = plans.find((p) => p.id === "standard") ?? FALLBACK_STANDARD;
  } catch {
    // Keep the fallback plan so the page still renders (and still lets
    // people through the phone/OTP steps) even if the API is momentarily
    // unreachable during a deploy.
  }

  const isFounding = premium.id === "premium_founding";
  const promoEndsAt = premium.promo_ends_at ?? null;

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={32} height={32} className="rounded-[9px]" />
            <span className="text-lg font-extrabold tracking-tight text-slate-900">estuda.app</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 sm:flex">
            <a href="#mentor" className="hover:text-slate-900">Como funciona</a>
            <a href="#recursos" className="hover:text-slate-900">Recursos</a>
            <a href="#preco" className="hover:text-slate-900">Preço</a>
            <Link href="/sobre" className="hover:text-slate-900">Quem somos</Link>
            <a href="#faq" className="hover:text-slate-900">Dúvidas</a>
          </nav>
          <div className="flex items-center gap-3">
            {/* On phones the header has no room next to "Assinar": the footer has it. */}
            <span className="hidden sm:block">
              <ThemeToggle />
            </span>
            <CheckoutFlow planId={premium.id} label="Assinar" analyticsLocation="header" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 text-center sm:pt-24">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Um mentor de estudo que diz o que estudar para o seu concurso
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600">
            O app acompanha cada simulado e monta o seu plano: resumos e simulados direcionados aos seus temas fracos, no formato da sua banca.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3">
            {isFounding && (
              <span className="rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand">
                Oferta de fundador · preço trava para sempre{promoEndsAt ? ` · até ${formatPromoDate(promoEndsAt)}` : ""}
              </span>
            )}
            <span className="rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-emerald-700">
              App gratuito · com anúncios · sem anúncios nos planos pagos
            </span>
            <CheckoutFlow planId={premium.id} label={`Começar teste grátis de ${premium.trial_days ?? 7} dias`} analyticsLocation="hero" />
            <p className="max-w-md text-center text-sm text-slate-600">
              Use grátis, com anúncios, quanto quiser. Assine para estudar sem anúncios e liberar mais recursos.
            </p>
            <p className="text-sm text-slate-500">
              R$ {formatPrice(premium.price_cents)}/mês depois do teste · cancele quando quiser
              {isFounding && " · esse preço nunca sobe pra você"}
            </p>
            <p className="max-w-md text-center text-xs leading-relaxed text-slate-500">
              Ao continuar, você concorda com os <Link href="/termos-de-uso" className="font-medium text-slate-700 hover:text-slate-900">Termos de Uso</Link> e com a{" "}
              <Link href="/politica-de-privacidade" className="font-medium text-slate-700 hover:text-slate-900">Política de Privacidade</Link>.
            </p>
            <AppDownloadLinks className="mt-4" analyticsLocation="hero" />
          </div>
        </section>

        <section id="mentor" className="border-t border-slate-100 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">Você estuda, o app direciona</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
              Como um mentor, o estuda.app aprende com cada simulado e decide o próximo passo do seu estudo.
            </p>
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {MENTOR_STEPS.map((step, i) => (
                <li key={step.title} className="rounded-2xl border border-slate-200 bg-surface p-6">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">{i + 1}</span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <AppScreenshots flags={flags} />

        <section id="recursos" className="border-t border-slate-100 bg-slate-50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">Tudo o que você precisa para passar</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl border border-slate-200 bg-surface p-6">
                  <h3 className="text-base font-bold text-slate-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FoundersBlock />

        <section id="preco" className="border-t border-slate-100 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">Grátis com anúncios, ou sem anúncios com um plano</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
              Seja transparente com você: a versão gratuita é financiada por anúncios. Assinando o Standard ou o Premium, o app fica sem anúncios, além de liberar mais recursos.
            </p>

            {comparison && (
              <div className="mt-12 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
                      <th className="px-5 py-4 font-bold">Recurso</th>
                      <th className="px-5 py-4 text-center font-bold">Grátis</th>
                      <th className="px-5 py-4 text-center font-bold text-brand">Standard</th>
                      <th className="px-5 py-4 text-center font-bold text-brand">Premium</th>
                    </tr>
                  </thead>
                  {comparison.groups.map((group) => {
                    const rows = comparison.rows.filter((r) => r.group === group.key);
                    if (!rows.length) return null;
                    return (
                      <tbody key={group.key}>
                        <tr className="border-t border-slate-200">
                          <th colSpan={4} className="px-5 pt-5 pb-2 text-xs font-bold uppercase tracking-wide text-brand">
                            {group.label}
                          </th>
                        </tr>
                        {rows.map((row) => (
                          <tr key={row.key} className={row.key === "history" ? "bg-amber-100/40" : undefined}>
                            <td className="px-5 py-3 align-top">
                              <span className="font-medium text-slate-800">{row.label}</span>
                              {row.hint && <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{row.hint}</span>}
                            </td>
                            <td className="px-5 py-3 text-center align-top text-slate-500">{row.free}</td>
                            <td className="px-5 py-3 text-center align-top font-bold text-brand">{row.standard}</td>
                            <td className="px-5 py-3 text-center align-top font-bold text-brand">{row.premium}</td>
                          </tr>
                        ))}
                      </tbody>
                    );
                  })}
                </table>
              </div>
            )}

            {historyRow && (
              <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-100/40 p-6">
                <h3 className="text-base font-bold text-slate-900">Por que o histórico faz diferença</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  O direcionamento do app vem do seu histórico de simulados. No grátis guardamos só os últimos {historyRow.free}: os temas
                  fracos de semanas atrás somem, e o plano, os resumos e os simulados sugeridos ficam menos certeiros. Nos planos pagos o
                  histórico é {historyRow.standard}, então cada simulado que você faz deixa o mentor mais preciso.
                </p>
              </div>
            )}

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col items-center gap-6 rounded-2xl border border-emerald-200 bg-emerald-50/50 px-8 py-10 text-center">
                <h3 className="text-lg font-bold text-slate-900">Grátis</h3>
                <p className="text-4xl font-extrabold tracking-tight text-slate-900">
                  R$ 0
                  <span className="text-base font-semibold text-slate-500">/mês</span>
                </p>
                <p className="text-sm text-slate-600">
                  Simulados, plano do dia e resumos, sem cartão. Histórico de 7 dias e anúncios.
                </p>
                <AppDownloadLinks analyticsLocation="pricing-free" />
              </div>
              <div className="flex flex-col items-center gap-6 rounded-2xl border border-slate-200 bg-surface px-8 py-10 text-center">
                <h3 className="text-lg font-bold text-slate-900">Standard</h3>
                <p className="text-4xl font-extrabold tracking-tight text-slate-900">
                  R$ {formatPrice(standard.price_cents)}
                  <span className="text-base font-semibold text-slate-500">/mês</span>
                </p>
                <p className="text-sm text-slate-600">Histórico completo e sem anúncios · {standard.trial_days ?? 7} dias grátis para testar, cancele quando quiser</p>
                <CheckoutFlow planId={standard.id} label="Começar no Standard" analyticsLocation="pricing-standard" />
              </div>
              <PricingToggle monthly={premium} annual={premiumAnnual} regularMonthlyCents={regularMonthlyCents} founding={isFounding} promoEndsAt={promoEndsAt} />
            </div>
          </div>
        </section>

        <section id="faq" className="border-t border-slate-100 bg-slate-50 py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">Dúvidas frequentes</h2>
            <div className="mt-10 flex flex-col gap-6">
              {FAQ.map((item) => (
                <div key={item.q}>
                  <h3 className="text-base font-bold text-slate-900">{item.q}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
