import Link from "next/link";

// Only what the founders can back up: keep these in step with the facts,
// not with marketing copy.
export const FOUNDER_STATS = [
  { value: "5+", label: "aprovações em concursos públicos", detail: "somadas entre os dois fundadores" },
  { value: "3", label: "esferas de governo", detail: "aprovações em concursos federais, estaduais e municipais" },
  { value: "2", label: "fundadores concurseiros", detail: "que estudaram, erraram, ajustaram o método e passaram" },
];

// Home-page teaser for /sobre. The slate scale flips in dark mode (see
// globals.css), so the dark band turns light there without dark: variants.
export function FoundersBlock() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 rounded-3xl bg-slate-900 p-8 sm:p-12 lg:flex-row lg:items-center">
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-300">Quem está por trás</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-50 sm:text-4xl">Feito por quem já passou na prova</h2>
            <p className="mt-4 max-w-lg text-slate-300">
              Os fundadores somam mais de 5 aprovações em concursos federais, estaduais e municipais. O app é o método que eles usaram, agora no
              seu bolso.
            </p>
            <Link href="/sobre" className="mt-6 inline-block py-2 font-semibold text-slate-50 underline-offset-4 hover:underline">
              Conheça nossa história →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:w-[30rem]">
            {FOUNDER_STATS.map((stat) => (
              <div key={stat.value} className="rounded-2xl bg-slate-800 p-6">
                <p className="text-4xl font-extrabold tracking-tight text-slate-50">{stat.value}</p>
                <p className="mt-2 text-sm leading-snug text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
