import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { BuyBox } from "@/components/simulados/BuyBox";
import { Check } from "@/components/simulados/PackageCatalog";
import { SimuladosHeader } from "@/components/simulados/SimuladosHeader";
import { PACKAGE_FACTS, bonusSummary, fetchPackage, formatISODate, miniAssunto, splitItems } from "@/lib/simulados";
import { pageMetadata } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata(props: PageProps<"/simulados/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const pkg = await fetchPackage(id);
  if (!pkg) return {};
  return pageMetadata(`/simulados/${pkg.id}`, `Simulados ${pkg.cargo} — ${pkg.concurso} | Estuda`,
    `Pacote de simulados inéditos para ${pkg.cargo} (${pkg.concurso}), no formato ${pkg.banca}, com gabarito comentado em PDF.`);
}

export default async function PackagePage(props: PageProps<"/simulados/[id]">) {
  const { id } = await props.params;
  const pkg = await fetchPackage(id);
  if (!pkg) notFound();
  const facts = PACKAGE_FACTS[pkg.id];
  const { main, bonus } = splitItems(pkg.items);
  const max = facts ? Math.max(...facts.disciplinas.map(([, n]) => n)) : 1;
  const inclui = [
    `${main.length} simulados completos${main[0] ? ` de ${main[0].questions} questões` : ""}`,
    ...(bonus.length ? [bonusSummary(bonus)] : []),
    "Gabarito comentado em cada questão",
    "PDFs com senha exclusiva da sua compra",
  ];
  const until = pkg.downloads_until ? formatISODate(pkg.downloads_until) : null;

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SimuladosHeader current="simulados" />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pt-8 pb-20">
        <nav aria-label="Navegação" className="text-sm text-slate-500">
          <Link href="/simulados" className="text-brand hover:text-brand-dark">Simulados</Link> / {pkg.concurso} / {pkg.cargo}
        </nav>
        <div className="mt-6 flex flex-wrap items-start gap-8">
          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-10">
            <div>
              <div className="flex flex-wrap gap-2">
                {facts && <Chip brand>{facts.sigla}</Chip>}
                <Chip>{pkg.banca}</Chip>
                {facts && <Chip>Prova em {formatISODate(facts.prova)}</Chip>}
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Pacote {pkg.cargo} — {pkg.concurso}
              </h1>
              {pkg.description && <p className="mt-3 max-w-2xl text-[17px] text-slate-600">{pkg.description}</p>}
              {facts && (
                <dl className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
                  <Fact label="Vagas" value={facts.vagas} />
                  <Fact label="Remuneração" value={facts.remuneracao} />
                  <Fact label="Prova objetiva" value={facts.provaLonga} />
                  <Fact label="Formato" value={facts.formato} />
                </dl>
              )}
            </div>

            <section>
              <h2 className="mb-3.5 text-xl font-extrabold text-slate-900">O que vem no pacote</h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2.5">
                {main.map((i) => (
                  <div key={i.title} className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-surface p-3.5">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Simulado</span>
                    <span className="text-[15px] font-extrabold text-slate-900">{i.title}</span>
                    <span className="text-[13px] text-slate-600">{i.questions} questões · caderno + gabarito</span>
                  </div>
                ))}
                {bonus.map((i) => (
                  <div key={i.title} className="flex flex-col gap-1 rounded-xl border border-dashed border-amber-800 bg-amber-100 p-3.5">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-amber-800">Brinde · mini simulado</span>
                    <span className="text-[15px] font-extrabold text-slate-900">{miniAssunto(i.title)}</span>
                    <span className="text-[13px] text-slate-600">{i.questions} questões</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Cada simulado vem em dois PDFs: caderno de questões e gabarito comentado. Os PDFs são protegidos por uma senha gerada para a
                sua compra.
              </p>
            </section>

            {facts && (
              <section>
                <h2 className="mb-3.5 text-xl font-extrabold text-slate-900">Questões por disciplina, em cada simulado</h2>
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  {facts.disciplinas.map(([nome, n], idx) => (
                    <div key={nome} className={`flex flex-wrap items-center gap-4 px-4 py-2.5 ${idx ? "border-t border-slate-100" : ""}`}>
                      <span className="min-w-0 flex-[1_1_260px] text-[15px] text-slate-700">{nome}</span>
                      <span className="h-2 flex-[0_1_180px] overflow-hidden rounded-full bg-slate-100">
                        <span className="block h-2 rounded-full bg-brand" style={{ width: `${Math.round((n / max) * 100)}%` }} />
                      </span>
                      <span className="w-10 text-right text-sm font-bold text-slate-900">{n}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-2.5 text-[13px] text-slate-500">{facts.distribuicao} Base: {facts.edital}.</p>
              </section>
            )}

            <section>
              <h2 className="mb-3.5 text-xl font-extrabold text-slate-900">Como funciona</h2>
              <ol className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
                <Step n={1} title="Informe seu e-mail e pague">O pagamento é no cartão, pelo Stripe. A compra fica ligada ao seu e-mail.</Step>
                <Step n={2} title="Entre em Meus simulados">Enviamos um código de acesso para o seu e-mail. Não precisa criar senha.</Step>
                <Step n={3} title="Baixe e abra os PDFs">A senha dos PDFs aparece na sua área. Imprima ou resolva na tela.</Step>
              </ol>
            </section>

            <section>
              <h2 className="mb-3.5 text-xl font-extrabold text-slate-900">Dúvidas</h2>
              <div className="flex flex-col gap-2.5 text-[15px] text-slate-700">
                <Faq q="É assinatura?">Não. Pagamento único, só no cartão.</Faq>
                <Faq q="Preciso criar conta?">
                  Não. Em Meus simulados você digita o e-mail da compra e recebe um código de acesso. O código vale por 10 minutos.
                </Faq>
                <Faq q="Por quanto tempo posso baixar?">
                  {until ? `Até ${until}.` : "Enquanto o pacote estiver ativo."} Os PDFs que você baixou continuam seus, e a senha não expira.
                </Faq>
                <Faq q="E se eu me arrepender?">
                  Você tem 7 dias corridos após a compra para pedir o reembolso integral, como prevê o Código de Defesa do Consumidor. O valor
                  volta para o cartão e o pacote sai de Meus simulados.
                </Faq>
                <Faq q="É a prova oficial?">
                  Não. São simulados inéditos do estuda.app no formato da banca, sem vínculo com a banca ou o órgão.
                </Faq>
              </div>
            </section>
          </div>

          <aside className="flex min-w-0 flex-[1_1_320px] flex-col gap-4 rounded-2xl border-2 border-brand bg-surface p-6 lg:sticky lg:top-24">
            <div className="text-[13px] font-bold uppercase tracking-wide text-slate-500">Pacote completo</div>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-700">
              {inclui.map((i) => (
                <li key={i} className="flex items-start gap-2"><Check /><span>{i}</span></li>
              ))}
            </ul>
            <BuyBox pkg={pkg} />
            <p className="text-xs text-slate-500">
              Ao continuar, você concorda com os <Link href="/termos-de-uso" className="text-brand">Termos de Uso</Link> e com a{" "}
              <Link href="/politica-de-privacidade" className="text-brand">Política de Privacidade</Link>.
            </p>
          </aside>
        </div>
      </main>
      <SiteFooter showDownloads={false} />
    </div>
  );
}

function Chip({ children, brand }: { children: React.ReactNode; brand?: boolean }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${brand ? "bg-brand-light text-brand-dark dark:text-brand" : "bg-slate-100 text-slate-700"}`}>
      {children}
    </span>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3.5">
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-[15px] font-bold text-slate-900">{value}</dd>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="rounded-2xl border border-slate-200 p-4">
      <div className="text-[13px] font-extrabold text-brand">{n}</div>
      <div className="mt-1.5 text-[15px] font-bold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{children}</div>
    </li>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <p>
      <strong className="text-slate-900">{q}</strong> {children}
    </p>
  );
}
