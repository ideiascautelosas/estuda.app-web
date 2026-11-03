"use client";

import Link from "next/link";
import { useState } from "react";
import { PACKAGE_FACTS, bonusSummary, daysUntil, formatBRL, formatISODate, splitItems, type SimuladoPackage } from "@/lib/simulados";

const selectClass = "h-11 rounded-xl border border-slate-200 bg-surface px-3 text-[15px] text-slate-900";

export function PackageCatalog({ packages }: { packages: SimuladoPackage[] }) {
  const [concurso, setConcurso] = useState("");
  const [cargo, setCargo] = useState("");

  const concursos = [...new Set(packages.map((p) => p.concurso))];
  const inConcurso = packages.filter((p) => !concurso || p.concurso === concurso);
  const cargos = [...new Set(inConcurso.map((p) => p.cargo))];
  const visible = inConcurso.filter((p) => !cargo || p.cargo === cargo);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-12">
      <div className="flex flex-wrap items-end gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <label className="flex flex-[1_1_240px] flex-col gap-1.5 text-[13px] font-semibold text-slate-600">
          Concurso
          <select value={concurso} onChange={(e) => { setConcurso(e.target.value); setCargo(""); }} className={selectClass}>
            <option value="">Todos os concursos</option>
            {concursos.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label className="flex flex-[1_1_240px] flex-col gap-1.5 text-[13px] font-semibold text-slate-600">
          Cargo
          <select value={cargo} onChange={(e) => setCargo(e.target.value)} className={selectClass}>
            <option value="">Todos os cargos</option>
            {cargos.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <button type="button" onClick={() => { setConcurso(""); setCargo(""); }}
          className="h-11 rounded-xl border border-slate-200 bg-surface px-4 text-sm font-semibold text-slate-700 hover:border-slate-300">
          Limpar filtros
        </button>
      </div>
      <p className="mt-4 px-1 text-sm text-slate-500">{visible.length} {visible.length === 1 ? "pacote" : "pacotes"}</p>

      <div className="mt-4 grid gap-5 sm:grid-cols-[repeat(auto-fill,minmax(340px,1fr))]">
        {visible.map((p) => <PackageCard key={p.id} pkg={p} />)}
      </div>
      {visible.length === 0 && (
        <p className="py-10 text-center text-slate-500">
          {packages.length === 0 ? "Os pacotes estão sendo preparados. Volte em breve." : "Nenhum pacote para esse filtro ainda."}
        </p>
      )}
    </section>
  );
}

function PackageCard({ pkg }: { pkg: SimuladoPackage }) {
  const facts = PACKAGE_FACTS[pkg.id];
  const { main, bonus } = splitItems(pkg.items);
  const perSimulado = main[0]?.questions;
  const inclui = [
    `${main.length} simulados completos${perSimulado ? ` de ${perSimulado} questões` : ""}`,
    ...(bonus.length ? [bonusSummary(bonus)] : []),
    "Gabarito comentado em cada questão",
    "PDFs com senha exclusiva da sua compra",
  ];
  return (
    <article className="flex flex-col gap-4 rounded-2xl border-2 border-brand bg-surface p-6">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{facts?.sigla ?? pkg.banca}</span>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">Disponível</span>
      </div>
      <div>
        <h2 className="text-[22px] font-extrabold tracking-tight text-slate-900">{pkg.cargo}</h2>
        <p className="mt-1 text-[15px] text-slate-600">{pkg.concurso}</p>
      </div>
      <dl className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3.5">
        <Fact label="Banca" value={pkg.banca} />
        {facts && <Fact label="Prova objetiva" value={`${formatISODate(facts.prova)} · faltam ${daysUntil(facts.prova)} dias`} />}
        {perSimulado && <Fact label="Questões por simulado" value={String(perSimulado)} />}
        {facts && <Fact label="Formato" value={facts.formato.split(" · ")[0]} />}
      </dl>
      <ul className="flex flex-col gap-2 text-sm text-slate-700">
        {inclui.map((i) => (
          <li key={i} className="flex items-start gap-2">
            <Check />
            <span>{i}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
        <div>
          <div className="text-[26px] font-extrabold tracking-tight text-slate-900">{formatBRL(pkg.price_cents)}</div>
          <div className="text-xs text-slate-500">pagamento único no cartão</div>
        </div>
        <Link href={`/simulados/${pkg.id}`}
          className="inline-flex min-h-11 items-center rounded-xl bg-brand px-5 text-[15px] font-bold text-white transition hover:bg-brand-dark">
          Ver pacote
        </Link>
      </div>
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-slate-900">{value}</dd>
    </div>
  );
}

export function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true" className="mt-0.5 flex-none text-brand">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
