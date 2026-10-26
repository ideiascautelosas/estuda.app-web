import Image from "next/image";
import { ThemedScreenshot } from "@/components/ThemedScreenshot";

type Screenshot = {
  screen: string;
  alt: string;
  title: string;
  desc: string;
  // Hidden while the backend feature flag of the same name is off.
  flag?: "whatsapp" | "previous_contest";
};

// Ordered as the mentor loop the student goes through: today's plan,
// simulado, result, review of the mistakes, resumo and tutor on the weak
// topic — then the supporting screens.
const SCREENSHOTS: Screenshot[] = [
  {
    screen: "dashboard",
    alt: "Tela inicial do app estuda.app, mostrando os dias até a prova, o estudo do dia e os temas críticos",
    title: "Seu mentor diz o que estudar hoje",
    desc: "Quantos dias faltam, o bloco de estudo do dia e os temas críticos da sua banca, em um lugar só.",
  },
  {
    screen: "plano",
    alt: "Tela do plano de estudo do app estuda.app, com os blocos da semana divididos por matéria",
    title: "Plano de estudo no seu ritmo",
    desc: "Blocos montados com as suas horas da semana, a data da prova e o que você já domina.",
  },
  {
    screen: "simulados",
    alt: "Tela de simulados do app estuda.app, mostrando os tipos de simulado disponíveis e o histórico de provas feitas",
    title: "Simulados no formato da banca",
    desc: "Diagnóstico, simulado completo ou foco no seu tema fraco, sempre com correção comentada.",
  },
  {
    screen: "resultado",
    alt: "Tela de resultado de um simulado do app estuda.app, com nota, desempenho por matéria e comparativo com outros candidatos",
    title: "Resultado com comparativo",
    desc: "Sua nota, o desempenho por matéria e como você fica na frente de outros candidatos ao mesmo cargo.",
  },
  {
    screen: "revisao",
    alt: "Tela de revisão de erros do app estuda.app, mostrando questões erradas agrupadas por tema com ações de estudo",
    title: "Seus erros viram o próximo estudo",
    desc: "Cada erro vira um resumo, um simulado só daquele tema e um reteste agendado.",
  },
  {
    screen: "resumos",
    alt: "Tela de resumos do app estuda.app, com os resumos dos temas do edital",
    title: "Resumos do que mais cai",
    desc: "Resumos revisados dos temas do seu edital, sugeridos a partir dos seus erros.",
  },
  {
    screen: "tutor",
    alt: "Tela do Tutor com IA do app estuda.app, explicando um tema a partir de um resumo",
    title: "Tutor com IA",
    desc: "Tire dúvidas sobre o resumo ou a questão que você errou, sem sair do estudo.",
  },
  {
    screen: "provas-anteriores",
    alt: "Tela de provas anteriores do app estuda.app, com a posição do aluno na lista do último concurso",
    title: "Provas anteriores na íntegra",
    desc: "Faça a última prova da sua banca e veja em que posição você ficaria na lista de aprovados.",
    flag: "previous_contest",
  },
  {
    screen: "insights",
    alt: "Tela de incidência por tema do app estuda.app, listando os temas que mais caem na banca por prioridade",
    title: "Incidência por tema",
    desc: "Descubra exatamente o que mais cai nas últimas provas da sua banca para o seu cargo.",
  },
  {
    screen: "painel",
    alt: "Painel de desempenho do app estuda.app, mostrando visão geral, consistência e desempenho por matéria",
    title: "Painel de desempenho",
    desc: "Consistência, eficiência, prontidão para a prova e recomendações personalizadas em um só lugar.",
  },
  {
    screen: "offline",
    alt: "Tela de pacote offline do app estuda.app, com o download do simulado completo",
    title: "Pacote offline",
    desc: "Baixe até 3 provas completas e treine sem depender de internet.",
  },
  {
    screen: "concursos",
    alt: "Tela de seleção de concursos do app estuda.app, com dois concursos cadastrados e um deles ativo",
    title: "Mais de um concurso",
    desc: "Prepare-se para mais de um concurso ao mesmo tempo e troque qual está ativo quando quiser.",
  },
  {
    screen: "whatsapp",
    alt: "Conversa de WhatsApp do estuda.app enviando uma questão do dia",
    title: "5 questões por dia no WhatsApp",
    desc: "Mantenha o hábito nos dias corridos, direto no seu WhatsApp.",
    flag: "whatsapp",
  },
];

export function AppScreenshots({ flags }: { flags: Record<string, boolean> }) {
  const screenshots = SCREENSHOTS.filter((s) => !s.flag || flags[s.flag]);
  return (
    <section className="border-t border-slate-100 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">O app por dentro</h2>
        <p className="mx-auto mt-3 max-w-md text-center text-slate-600">
          Direto do celular, no tema claro ou escuro — mude o tema do site no topo da página e as telas acompanham.
        </p>

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-4">
          {screenshots.map((s) => (
            <div key={s.screen} className="flex w-56 shrink-0 snap-start flex-col items-center gap-4 sm:w-auto">
              <div className="w-full overflow-hidden rounded-[28px] border-4 border-slate-900 bg-slate-900 shadow-xl dark:border-slate-200 dark:bg-slate-200">
                {/* The WhatsApp chat isn't an app screen: one capture for both themes. */}
                {s.screen === "whatsapp" ? (
                  <Image src="/screenshots/whatsapp.png" alt={s.alt} width={390} height={844} className="w-full" />
                ) : (
                  <ThemedScreenshot name={s.screen} alt={s.alt} />
                )}
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
