import Image from "next/image";

const SCREENSHOTS = [
  {
    src: "/screenshots/simulados.png",
    alt: "Tela de simulados do app estuda.app, mostrando os tipos de simulado disponíveis e o histórico de provas feitas",
    title: "Simulados no formato da banca",
    desc: "Diagnóstico rápido, simulado completo ou foco no seu tema fraco — sempre com correção comentada.",
  },
  {
    src: "/screenshots/resultado.png",
    alt: "Tela de resultado de um simulado do app estuda.app, com nota, desempenho por matéria e comparativo com outros candidatos",
    title: "Resultado com comparativo",
    desc: "Sua nota, o desempenho por matéria e como você fica na frente de outros candidatos ao mesmo cargo.",
  },
  {
    src: "/screenshots/revisao.png",
    alt: "Tela de revisão de erros do app estuda.app, mostrando questões erradas agrupadas por tema com ações de estudo",
    title: "Revisão dirigida dos seus erros",
    desc: "Cada erro vira uma questão de revisão focada naquele tema, no seu plano de estudo.",
  },
  {
    src: "/screenshots/insights.png",
    alt: "Tela de incidência por tema do app estuda.app, listando os temas que mais caem na banca por prioridade",
    title: "Incidência por tema",
    desc: "Descubra exatamente o que mais cai nas últimas provas da sua banca para o seu cargo.",
  },
  {
    src: "/screenshots/dashboard.png",
    alt: "Tela inicial do app estuda.app, mostrando os dias até a prova, o simulado do dia e os temas críticos",
    title: "Seu plano do dia",
    desc: "Quantos dias faltam, o que estudar hoje e os temas críticos da sua banca, tudo em um lugar.",
  },
  {
    src: "/screenshots/whatsapp.png",
    alt: "Conversa de WhatsApp do estuda.app enviando uma questão do dia",
    title: "5 questões por dia no WhatsApp",
    desc: "Mantenha o hábito nos dias corridos, direto no seu WhatsApp.",
  },
  {
    src: "/screenshots/offline.png",
    alt: "Tela de pacote offline do app estuda.app, com o download do simulado completo",
    title: "Pacote offline",
    desc: "Baixe até 3 provas completas e treine sem depender de internet.",
  },
  {
    src: "/screenshots/concursos.png",
    alt: "Tela de seleção de concursos do app estuda.app, com dois concursos cadastrados e um deles ativo",
    title: "Mais de um concurso",
    desc: "Prepare-se para mais de um concurso ao mesmo tempo e troque qual está ativo quando quiser.",
  },
  {
    src: "/screenshots/tutor.png",
    alt: "Tela do Tutor com IA do app estuda.app, mostrando um resumo gerado sobre um tema que caiu no simulado",
    title: "Tutor com IA",
    desc: "Peça um resumo de qualquer tema, na hora, sem sair do simulado.",
  },
  {
    src: "/screenshots/painel.png",
    alt: "Painel de desempenho do app estuda.app, mostrando visão geral, consistência e desempenho por matéria",
    title: "Painel de desempenho",
    desc: "Consistência, eficiência, prontidão para a prova e recomendações personalizadas em um só lugar.",
  },
];

export function AppScreenshots() {
  return (
    <section className="border-t border-slate-100 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">O app por dentro</h2>
        <p className="mx-auto mt-3 max-w-md text-center text-slate-600">Direto do celular, sem enfeites — é exatamente isso que você vai usar todo dia.</p>

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-5">
          {SCREENSHOTS.map((s) => (
            <div key={s.src} className="flex w-56 shrink-0 snap-start flex-col items-center gap-4 sm:w-auto">
              <div className="w-full overflow-hidden rounded-[28px] border-4 border-slate-900 bg-slate-900 shadow-xl">
                <Image src={s.src} alt={s.alt} width={390} height={844} className="w-full" />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
