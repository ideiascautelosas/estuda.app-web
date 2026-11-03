import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SimuladosHeader } from "@/components/simulados/SimuladosHeader";
import { PackageCatalog } from "@/components/simulados/PackageCatalog";
import { fetchPackages } from "@/lib/simulados";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "/simulados",
  "Simulados inéditos por concurso e cargo | Estuda",
  "Pacotes de simulados inéditos no formato da banca, com gabarito comentado em PDF. 5 simulados completos + 2 mini simulados de brinde.",
);

export const revalidate = 300;

export default async function SimuladosPage() {
  const packages = await fetchPackages();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SimuladosHeader current="simulados" />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pt-14 pb-6 text-center sm:pt-20">
          <span className="rounded-full bg-brand-light px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-dark dark:text-brand">
            Novo · só no site
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Pacotes de simulados inéditos para o seu concurso e cargo
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            5 simulados completos no formato da prova + 2 mini simulados de brinde, com gabarito comentado. Depois da compra, seus PDFs e a
            senha ficam em Meus simulados, aqui no site. Você entra com um código enviado ao seu e-mail.
          </p>
        </section>
        <PackageCatalog packages={packages} />
        <p className="mx-auto max-w-3xl px-6 pb-16 text-center text-sm text-slate-500">
          Os simulados do estuda.app são inéditos, não são provas oficiais e não têm vínculo com as bancas ou os órgãos. Datas, vagas e
          formato conforme os editais.
        </p>
      </main>
      <SiteFooter showDownloads={false} />
    </div>
  );
}
