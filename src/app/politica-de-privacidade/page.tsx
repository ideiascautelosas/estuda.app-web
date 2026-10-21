import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { LEGAL_INFO } from "@/lib/legal";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata("/politica-de-privacidade", "Política de Privacidade | Estuda", "Como o estuda.app coleta, usa, compartilha e protege dados pessoais dos usuários."),
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      description="Esta política explica como tratamos dados pessoais no estuda.app durante o acesso à plataforma, autenticação, contratação da assinatura e uso dos recursos disponíveis."
      lastUpdated="20 de outubro de 2026"
    >
      <section>
        <h2>1. Quem trata os dados</h2>
        <p>
          Para fins desta política, o tratamento de dados relacionado à operação do estuda.app é realizado por{" "}
          <strong>{LEGAL_INFO.operatorName}</strong>
          {LEGAL_INFO.cnpj ? `, inscrita no CNPJ sob o nº ${LEGAL_INFO.cnpj}` : ""}.
        </p>
        <p>
          Para assuntos de privacidade e proteção de dados, contato principal: <a href={`mailto:${LEGAL_INFO.supportEmail}`}>{LEGAL_INFO.supportEmail}</a>.
        </p>
      </section>

      <section>
        <h2>2. Dados que podemos coletar</h2>
        <p>Dependendo da sua interação com o estuda.app, podemos tratar as seguintes categorias de dados:</p>
        <ul>
          <li>dados de identificação e contato, como número de telefone informado para autenticação;</li>
          <li>dados de acesso e uso, como ações realizadas na plataforma, preferências e histórico de utilização;</li>
          <li>dados técnicos, como endereço IP, tipo de dispositivo, navegador, data e hora de acesso;</li>
          <li>dados relacionados à assinatura, como plano contratado, status do pagamento e identificadores da transação;</li>
          <li>dados de sessão, como token de autenticação e identificador interno do usuário mantidos no navegador para preservar o login;</li>
          <li>dados de suporte, quando você entra em contato pelos canais oficiais;</li>
          <li>
            dados de publicidade na versão gratuita, como identificador de publicidade do dispositivo, dados técnicos e
            interações com anúncios, coletados pelo Google AdMob.
          </li>
        </ul>
        <p>
          Os dados completos do cartão não são armazenados por nós quando o pagamento é processado por parceiro especializado,
          como a Stripe.
        </p>
      </section>

      <section>
        <h2>3. Como usamos os dados</h2>
        <p>Os dados pessoais podem ser utilizados para:</p>
        <ul>
          <li>permitir autenticação, acesso e manutenção da sua conta;</li>
          <li>oferecer simulados, revisão, personalização do estudo e demais recursos da plataforma;</li>
          <li>processar assinaturas, cobranças, testes grátis, renovações e cancelamentos;</li>
          <li>criar sessões de checkout, confirmar pagamentos e refletir a ativação ou desativação da assinatura na sua conta;</li>
          <li>prevenir fraude, abuso, acessos indevidos e incidentes de segurança;</li>
          <li>cumprir obrigações legais, regulatórias e exercer direitos em processos administrativos ou judiciais;</li>
          <li>melhorar desempenho, estabilidade, conteúdo e experiência do usuário;</li>
          <li>exibir anúncios na versão gratuita, mensurar sua exibição e prevenir fraude publicitária.</li>
        </ul>
      </section>

      <section>
        <h2>4. Bases legais</h2>
        <p>
          Quando aplicável, o tratamento de dados pessoais poderá se fundamentar na execução de contrato, no exercício regular
          de direitos, no cumprimento de obrigação legal, em interesses legítimos compatíveis com a operação da plataforma ou no
          seu consentimento, conforme o caso.
        </p>
      </section>

      <section>
        <h2>5. Compartilhamento de dados</h2>
        <p>Podemos compartilhar dados pessoais com:</p>
        <ul>
          <li>prestadores de serviços essenciais para autenticação, hospedagem, análise técnica e suporte operacional;</li>
          <li>parceiros de pagamento responsáveis por processar transações, validar cobranças e retornar eventos de confirmação da assinatura;</li>
          <li>fornecedores de analytics, como o Google Analytics, quando você consentir com os cookies analíticos;</li>
          <li>Google AdMob (Google LLC e afiliadas), que exibe anúncios na versão gratuita e pode tratar dados como identificador de publicidade e dados do dispositivo;</li>
          <li>
            provedores de inteligência artificial que geram as respostas do Tutor IA — Google (Gemini) e DeepSeek — que recebem
            apenas o texto da pergunta enviada ao tutor e o tema de estudo, sem seu nome, telefone ou outros dados de cadastro;
          </li>
          <li>autoridades públicas ou terceiros, quando necessário para cumprimento de obrigação legal ou proteção de direitos.</li>
        </ul>
        <p>
          O compartilhamento ocorre apenas na medida necessária para as finalidades descritas nesta política.
        </p>
      </section>

      <section>
        <h2>6. Armazenamento e segurança</h2>
        <p>
          Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados pessoais contra acesso não autorizado,
          perda, alteração ou destruição indevida. Ainda assim, nenhum sistema é totalmente inviolável.
        </p>
        <p>
          Para preservar sua sessão entre acessos, alguns identificadores de autenticação podem ser armazenados localmente no
          seu navegador. Você pode encerrar a sessão limpando esses dados por meio das funcionalidades do serviço ou do próprio
          navegador.
        </p>
        <p>
          Os dados são mantidos pelo tempo necessário para cumprir as finalidades previstas nesta política, atender exigências
          legais e resguardar direitos relacionados à operação da plataforma.
        </p>
        <p>
          <strong>Acesso ao histórico de simulados no plano gratuito.</strong> No plano gratuito, o acesso detalhado a um
          simulado já concluído (perguntas, respostas e resultado) fica disponível por até 7 (sete) dias após a sua
          finalização. Após esse prazo, o acesso a esses detalhes é restringido na sua conta, permanecendo disponíveis os
          seus dados de identificação, o plano contratado e as informações de segmentação (cargo, banca e preferências de
          estudo). A assinatura de um plano pago (Standard ou Premium) restabelece o acesso ao histórico completo enquanto
          estiver ativa. Essa
          restrição afeta apenas o acesso pela sua conta — os dados podem continuar armazenados pelo prazo necessário às
          demais finalidades descritas nesta política.
        </p>
      </section>

      <section>
        <h2>7. Cookies e tecnologias similares</h2>
        <p>
          Podemos utilizar armazenamento local e tecnologias equivalentes para manter sua sessão, lembrar preferências, proteger
          o acesso, compreender o uso da plataforma e, na versão gratuita, exibir anúncios.
        </p>
        <p>
          Quando você aceitar os cookies analíticos, poderemos usar ferramentas como o Google Analytics para mensurar visitas,
          entender interações com botões e melhorar a experiência do site com base em dados agregados.
        </p>
      </section>

      <section>
        <h2>8. Anúncios na versão gratuita</h2>
        <p>
          A versão gratuita do estuda.app exibe anúncios. Esses anúncios são fornecidos pelo Google AdMob, que
          pode usar identificadores do dispositivo e tecnologias similares para exibir, limitar a frequência e mensurar
          anúncios, e, quando permitido, personalizá-los. O Google trata esses dados conforme a sua própria política de
          privacidade (policies.google.com/technologies/partner-sites).
        </p>
        <p>
          Você pode limitar a personalização de anúncios nas configurações de privacidade do seu dispositivo (por exemplo,
          redefinindo ou desativando o identificador de publicidade) e, quando solicitado, gerenciando o seu consentimento.
          Assinantes dos planos Standard e Premium não visualizam anúncios enquanto a assinatura estiver ativa.
        </p>
      </section>

      <section>
        <h2>9. Direitos do titular</h2>
        <p>
          Nos termos da legislação aplicável, você pode solicitar confirmação de tratamento, acesso, correção, anonimização,
          eliminação, portabilidade ou informações sobre compartilhamento, quando cabível.
        </p>
        <p>
          Para exercer seus direitos, utilize os canais oficiais de atendimento informados no site ou no aplicativo. Poderemos
          solicitar informações adicionais para confirmar sua identidade antes de atender à solicitação.
        </p>
      </section>

      <section>
        <h2>10. Transferências e serviços de terceiros</h2>
        <p>
          Alguns fornecedores podem operar infraestrutura em diferentes localidades. Sempre que houver tratamento por terceiros,
          buscamos adotar salvaguardas compatíveis com a proteção de dados pessoais.
        </p>
        <p>
          Em especial, as perguntas enviadas ao Tutor IA podem ser processadas fora do Brasil: nos servidores do Google
          (Gemini) e da DeepSeek, que ficam, respectivamente, em diferentes países e na China. Por isso, não inclua dados
          pessoais no texto das perguntas ao tutor.
        </p>
      </section>

      <section>
        <h2>11. Atualizações desta política</h2>
        <p>
          Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças operacionais, legais ou
          regulatórias. A versão vigente estará sempre disponível nesta página com a respectiva data de atualização.
        </p>
      </section>

      <section>
        <h2>12. Contato</h2>
        <p>
          Em caso de dúvidas, solicitações ou pedidos relacionados à privacidade e proteção de dados, utilize os canais oficiais
          de atendimento disponíveis no site, no aplicativo ou nas comunicações relacionadas à sua assinatura.
        </p>
        <p>
          Contato: <a href={`mailto:${LEGAL_INFO.supportEmail}`}>{LEGAL_INFO.supportEmail}</a>
        </p>
      </section>
    </LegalPage>
  );
}