import { Link } from "react-router-dom";
import { siteConfig } from "@/data/site";
import { usePageMeta } from "@/hooks/usePageMeta";

export function PrivacyPage() {
  usePageMeta({
    title: "Política de Privacidade | Imagenow",
    description:
      "Política de privacidade da Imagenow: informações sobre coleta e uso de dados em contatos e propostas.",
    path: "/politica-de-privacidade",
  });

  return (
    <article className="wrap" style={{ paddingBlock: "clamp(7rem, 14vw, 9rem) 4rem" }}>
      <nav aria-label="Breadcrumb" style={{ display: "flex", gap: "0.5rem", color: "#6a655e" }}>
        <Link to="/">Home</Link>
        <span aria-hidden>/</span>
        <span>Política de Privacidade</span>
      </nav>
      <h1 className="font-display" style={{ marginTop: "1.5rem", fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
        Política de Privacidade
      </h1>
      <div style={{ maxWidth: "68ch", marginTop: "1.5rem", color: "#3f3c38" }}>
        <p>
          A {siteConfig.name} trata com responsabilidade as informações compartilhadas por
          meio dos canais de contato do site, especialmente WhatsApp e e-mail.
        </p>
        <p>
          Os dados fornecidos voluntariamente (como nome, empresa, telefone, data e local do
          evento) são utilizados apenas para elaborar propostas, esclarecer dúvidas e
          conduzir o atendimento comercial.
        </p>
        <p>
          Não vendemos dados pessoais. O compartilhamento ocorre somente quando necessário
          para a execução do serviço contratado ou por obrigação legal.
        </p>
        <p>
          Para solicitações relacionadas a privacidade, escreva para{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </div>
    </article>
  );
}
