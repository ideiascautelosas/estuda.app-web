import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { LEGAL_INFO } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Termos de Uso | Estuda",
  description: "Regras e condições para uso do estuda.app e contratação dos planos Standard e Premium.",
};

export default function TermsOfUsePage() {
  return (
    <LegalPage
      title="Termos de Uso"
      description="Estes termos definem as condições para acesso ao estuda.app, uso dos recursos educacionais da plataforma e contratação dos planos pagos Standard e Premium."
      lastUpdated="15 de outubro de 2026"
    >
      <section>
        <h2>1. Aceitação dos termos</h2>
        <p>
          Ao acessar ou utilizar o estuda.app, você concorda com estes Termos de Uso e com a nossa Política de Privacidade.
          Se não concordar com alguma condição, não utilize a plataforma.
        </p>
      </section>

      <section>
        <h2>2. Sobre o serviço</h2>
        <p>
          O estuda.app oferece recursos digitais voltados à preparação para concursos, incluindo simulados, revisão dirigida,
          ferramentas de apoio ao estudo e funcionalidades complementares, gratuitas ou pagas.
        </p>
        <p>
          Podemos atualizar, ajustar ou descontinuar funcionalidades a qualquer momento, inclusive para melhorar segurança,
          desempenho ou aderência legal.
        </p>
        <p>
          Para fins destes termos, a operação da plataforma é atribuída a <strong>{LEGAL_INFO.operatorName}</strong>.
          {LEGAL_INFO.cnpj ? ` CNPJ: ${LEGAL_INFO.cnpj}.` : ""}
        </p>
      </section>

      <section>
        <h2>3. Cadastro e acesso</h2>
        <p>
          O acesso pode depender de autenticação por telefone e código de verificação por SMS. Você se compromete a fornecer
          dados verdadeiros, atualizados e vinculados a um número sob seu controle.
        </p>
        <p>
          Após a autenticação, o acesso à sua sessão pode ser mantido no navegador por meio de armazenamento local do
          dispositivo, para permitir continuidade de uso entre visitas. Você é responsável pelo uso da sua conta e por manter
          a segurança do dispositivo utilizado para acesso.
        </p>
      </section>

      <section>
        <h2>4. Versão gratuita, anúncios e assinatura</h2>
        <p>
          O estuda.app possui uma versão gratuita financiada por publicidade. Ao utilizá-la, você concorda em visualizar
          anúncios exibidos por nós ou pelo Google AdMob. Não nos responsabilizamos pelo conteúdo, produtos ou
          serviços de anunciantes, e a interação com anúncios é de sua exclusiva escolha.
        </p>
        <p>
          Os planos pagos (Standard e Premium) removem os anúncios do aplicativo enquanto a assinatura estiver ativa. Ao
          cancelar ou encerrar a assinatura, a conta volta ao plano gratuito e os anúncios voltam a ser exibidos.
        </p>
        <h3>Assinatura, teste grátis e cobrança</h3>
        <p>
          Alguns recursos podem exigir contratação de um plano pago — atualmente Standard ou Premium, cada um com seu próprio
          conjunto de recursos. Os valores, periodicidade, benefícios incluídos e eventual período de teste grátis são
          apresentados no momento da contratação. O plano Standard é oferecido apenas com cobrança mensal; o plano Premium
          pode ser contratado mensal ou anualmente.
        </p>
        <p>
          Quando houver teste grátis, a cobrança será iniciada ao final do período informado, salvo cancelamento anterior.
          O processamento do pagamento é realizado por parceiro terceirizado especializado, como a Stripe, em ambiente próprio
          e sujeito também aos termos e políticas desse parceiro.
        </p>
        <p>
          Para planos pagos, o estuda.app cria uma sessão de checkout e redireciona você ao ambiente seguro do parceiro de
          pagamento. O plano contratado só é ativado após a confirmação do pagamento pelo processador. Se o fluxo de checkout
          for abandonado, cancelado ou não confirmado, o acesso ao plano pago não é concedido.
        </p>
        <p>
          Tentativas de fraude, contestação indevida, uso abusivo ou violação das regras comerciais da assinatura podem gerar
          suspensão ou cancelamento do acesso.
        </p>
        <p>
          No plano gratuito, o acesso detalhado a simulados já concluídos fica disponível por até 7 (sete) dias após a
          finalização de cada simulado; qualquer plano pago (Standard ou Premium) mantém esse acesso disponível por todo o
          período em que estiver ativo. Mais detalhes sobre esse tratamento estão na nossa Política de Privacidade.
        </p>
      </section>

      <section>
        <h2>5. Cancelamento</h2>
        <p>
          Você pode solicitar o cancelamento da renovação da assinatura pelos canais oficiais disponibilizados ao assinante.
          O cancelamento impede cobranças futuras, respeitado o ciclo já pago ou o período de teste aplicável.
        </p>
        <p>
          Para evitar a primeira cobrança durante o teste grátis, o cancelamento deve ser solicitado antes do encerramento do
          período promocional informado na contratação. Salvo disposição legal em contrário ou oferta expressa, não há
          reembolso proporcional por período já iniciado.
        </p>
      </section>

      <section>
        <h2>6. Uso permitido</h2>
        <p>Você concorda em não:</p>
        <ul>
          <li>usar a plataforma para finalidade ilícita, fraudulenta ou que viole direitos de terceiros;</li>
          <li>tentar contornar limitações técnicas, mecanismos de autenticação ou regras comerciais da assinatura;</li>
          <li>copiar, revender, redistribuir ou explorar comercialmente conteúdos e funcionalidades sem autorização;</li>
          <li>interferir no funcionamento, segurança ou integridade do serviço.</li>
        </ul>
      </section>

      <section>
        <h2>7. Propriedade intelectual</h2>
        <p>
          A marca, identidade visual, software, textos, estrutura dos simulados e demais elementos do estuda.app são protegidos
          pela legislação aplicável. Estes termos não transferem a você qualquer direito de propriedade sobre a plataforma.
        </p>
      </section>

      <section>
        <h2>8. Disponibilidade e limites de responsabilidade</h2>
        <p>
          Empregamos esforços razoáveis para manter o serviço disponível e seguro, mas não garantimos funcionamento ininterrupto
          ou livre de falhas. Poderão ocorrer indisponibilidades temporárias por manutenção, atualização ou fatores externos.
        </p>
        <p>
          O estuda.app oferece apoio aos estudos, mas não garante aprovação em concursos, classificação, nomeação ou qualquer
          resultado específico.
        </p>
      </section>

      <section>
        <h2>9. Privacidade e dados pessoais</h2>
        <p>
          O tratamento de dados pessoais realizado no contexto do uso da plataforma segue a nossa Política de Privacidade,
          que integra estes Termos de Uso para todos os fins.
        </p>
      </section>

      <section>
        <h2>10. Alterações destes termos</h2>
        <p>
          Podemos atualizar estes termos periodicamente. A versão mais recente ficará disponível nesta página, com indicação da
          data de atualização. O uso continuado da plataforma após mudanças relevantes representa concordância com a nova versão.
        </p>
      </section>

      <section>
        <h2>11. Contato</h2>
        <p>
          Em caso de dúvidas sobre estes termos, utilize os canais oficiais de atendimento informados no site, no aplicativo ou
          nas comunicações relacionadas à sua assinatura.
        </p>
        <p>
          Contato: <a href={`mailto:${LEGAL_INFO.supportEmail}`}>{LEGAL_INFO.supportEmail}</a>
        </p>
      </section>
    </LegalPage>
  );
}