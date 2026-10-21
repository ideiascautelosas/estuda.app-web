import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { LEGAL_INFO } from "@/lib/legal";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata("/politica-de-cancelamento", "Política de Cancelamento | Estuda", "Entenda como cancelar sua assinatura no estuda.app, seus direitos e prazos."),
  robots: "index, follow",
};

export default function CancellationPolicyPage() {
  return (
    <LegalPage
      title="Política de Cancelamento"
      description="Esta política descreve o processo, direitos e responsabilidades relacionados ao cancelamento da sua assinatura no estuda.app."
      lastUpdated="15 de outubro de 2026"
    >
      <section>
        <h2>1. Direito de Cancelamento</h2>
        <p>
          Você tem o direito de cancelar sua assinatura do estuda.app a qualquer momento, sem penalidades ou justificativas. O
          cancelamento da assinatura interrompe sua obrigação de pagamento futuro, mas não afeta a validade de um período pago
          que já tenha sido processado.
        </p>
      </section>

      <section>
        <h2>2. Como Cancelar</h2>
        <p>Para cancelar sua assinatura, você pode:</p>
        <ul>
          <li>acessar as configurações da sua conta no aplicativo ou site do estuda.app e selecionar &quot;Cancelar assinatura&quot;;</li>
          <li>entrar em contato com nosso suporte através de <a href={`mailto:${LEGAL_INFO.supportEmail}`}>{LEGAL_INFO.supportEmail}</a> com sua solicitação de cancelamento;</li>
          <li>
            gerenciar sua assinatura diretamente com a plataforma de pagamento (Apple App Store ou Google Play), caso tenha
            contratado através dessas lojas.
          </li>
        </ul>
        <p>O cancelamento é processado imediatamente após sua confirmação. Você receberá uma confirmação por email.</p>
      </section>

      <section>
        <h2>3. Acesso Após Cancelamento</h2>
        <p>
          Assim que o cancelamento for processado, sua assinatura deixará de ser ativa. Você perderá acesso aos recursos do
          seu plano pago (Standard ou Premium) ao termo do período pago atualmente em vigor, voltando ao plano gratuito, que
          exibe anúncios. A remoção de anúncios, benefício dos planos pagos, também termina nesse momento.
        </p>
        <p>
          Se seu período de teste grátis ainda não tiver expirado quando você cancelar, o acesso ao teste continuará disponível
          até o final do período de teste ou até a data de cancelamento da assinatura, o que ocorrer primeiro.
        </p>
      </section>

      <section>
        <h2>4. Reembolsos</h2>
        <p>
          Você não tem direito a reembolso dos valores já pagos pela assinatura ou pelos períodos de teste já consumidos, salvo
          por motivos previstos em lei, como:
        </p>
        <ul>
          <li>cobranças duplicadas ou não autorizadas;</li>
          <li>
            situações em que a legislação de proteção ao consumidor garante direito de arrependimento ou reembolso (quando
            aplicável);
          </li>
          <li>erros comprovados na processamento da transação.</li>
        </ul>
        <p>
          Pedidos de reembolso devem ser solicitados por escrito para <a href={`mailto:${LEGAL_INFO.supportEmail}`}>{LEGAL_INFO.supportEmail}</a> no
          prazo de até 30 dias da data da cobrança questionada, com documentação de suporte.
        </p>
      </section>

      <section>
        <h2>5. Período de Teste Grátis</h2>
        <p>
          Se você se inscreveu em um período de teste grátis, o cancelamento deve ser realizado antes do término do teste para
          evitar cobranças automáticas. Nós enviaremos lembretes por email, mas a responsabilidade de cancelar a tempo é sua.
        </p>
        <p>
          Se você for cobrado após o período de teste e comprovar que cancelou antes do prazo, poderemos processar um reembolso
          da cobrança indevida.
        </p>
      </section>

      <section>
        <h2>6. Renovação e Cobrança</h2>
        <p>
          As assinaturas ativas são renovadas automaticamente ao final de cada período de cobrança (mensal ou anual). Se você
          não desejar que sua assinatura seja renovada, cancele-a antes da data de renovação.
        </p>
        <p>
          A data exata de renovação é informada no seu perfil de assinatura. Você receberá uma notificação antes de cada
          renovação.
        </p>
      </section>

      <section>
        <h2>7. Cancelamento Involuntário</h2>
        <p>
          Podemos cancelar ou suspender sua conta e assinatura caso você viole os Termos de Uso, cometa fraude, abuse do
          serviço ou prejudique outros usuários. Nesse caso, podemos não processar nenhum reembolso, a menos que a lei
          expressamente nos obrigue.
        </p>
      </section>

      <section>
        <h2>8. Dados Após Cancelamento</h2>
        <p>
          O cancelamento da assinatura não deleta automaticamente sua conta nem seus dados associados. Se você deseja que seus
          dados pessoais sejam removidos, pode solicitar a exclusão da conta conforme descrito na Política de Privacidade.
        </p>
      </section>

      <section>
        <h2>9. Reativação da Assinatura</h2>
        <p>
          Após cancelar, você pode reativar sua assinatura a qualquer momento acessando novamente a seção de planos e
          contratando um novo período. Nenhuma penalidade ou taxa adicional será aplicada.
        </p>
      </section>

      <section>
        <h2>10. Disputas de Cobrança</h2>
        <p>
          Se você acredita ter sido cobrado indevidamente, entre em contato conosco em <a href={`mailto:${LEGAL_INFO.supportEmail}`}>{LEGAL_INFO.supportEmail}</a> para
          investigação. Você também pode abrir uma disputa diretamente com sua instituição financeira ou com a plataforma de
          pagamento (Stripe, Apple App Store, Google Play).
        </p>
      </section>

      <section>
        <h2>11. Contato</h2>
        <p>
          Para dúvidas sobre cancelamento, reembolsos ou qualquer situação relacionada à sua assinatura, utilize os canais
          oficiais de atendimento:
        </p>
        <p>
          Email: <a href={`mailto:${LEGAL_INFO.supportEmail}`}>{LEGAL_INFO.supportEmail}</a>
        </p>
      </section>

      <section>
        <h2>12. Alterações desta Política</h2>
        <p>
          Esta Política de Cancelamento pode ser atualizada periodicamente. Notificaremos você sobre mudanças significativas
          através de email ou comunicação na plataforma. Seu uso continuado do serviço implica na aceitação das alterações.
        </p>
      </section>
    </LegalPage>
  );
}
