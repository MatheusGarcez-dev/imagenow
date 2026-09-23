import { Link } from "react-router-dom";
import { aboutContent, partnershipsContent } from "@/data/content";
import { messages } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Reveal, RevealStagger } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/common/JsonLd";
import { usePageMeta } from "@/hooks/usePageMeta";
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";
import "./AboutPage.css";

export function PartnershipsPage() {
  usePageMeta({
    title: "Parcerias | Imagenow – Imagenow para o seu negócio",
    description: partnershipsContent.subtitle,
    path: "/parcerias",
  });

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          breadcrumbJsonLd([{ name: "Parcerias", path: "/parcerias" }]),
        ]}
      />
      <article className="about-page">
        <header className="about-page__hero">
          <div className="wrap">
            <Reveal variant="fade-blur" duration={1.1}>
              <nav className="about-page__crumbs" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span>Parcerias</span>
              </nav>
              <h1 className="font-display">{partnershipsContent.h1}</h1>
              <p className="about-page__subtitle">{partnershipsContent.subtitle}</p>
            </Reveal>
          </div>
        </header>

        <div className="wrap about-page__layout">
          <div className="about-page__body">
            <section
              id="integracao-estrategica"
              className="about-page__section"
              aria-labelledby="integracao-estrategica-title"
            >
              <Reveal variant="fade-up">
                <h2 id="integracao-estrategica-title" className="font-display about-page__h2">
                  Integração estratégica
                </h2>
              </Reveal>
              <RevealStagger variant="fade-up" stagger={0.05} duration={0.8}>
                {partnershipsContent.intro.map((paragraph, index) => (
                  <p
                    key={paragraph.slice(0, 28)}
                    className={index === 0 ? "about-page__lead" : undefined}
                  >
                    {paragraph}
                  </p>
                ))}
              </RevealStagger>
            </section>

            <section
              id="pontos-principais"
              className="about-page__section"
              aria-labelledby="pontos-principais-title"
            >
              <Reveal variant="fade-up">
                <h2 id="pontos-principais-title" className="font-display about-page__h2">
                  Pontos principais da parceria
                </h2>
              </Reveal>
              <Reveal variant="fade-up" delay={0.06}>
                <ul className="about-page__points">
                  {partnershipsContent.points.map((point) => (
                    <li key={point.title}>
                      <h3>{point.title}</h3>
                      <p>{point.text}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>

            <Reveal variant="soft" delay={0.1}>
              <p className="about-page__signature" aria-label="imagenow. still happening.">
                <span className="about-page__signature-brand">
                  <span className="about-page__idot">
                    <span>i</span>
                  </span>
                  magenow
                </span>
                <span className="about-page__signature-dot">. </span>
                <span className="about-page__signature-rest">{aboutContent.signature.rest}</span>
              </p>
            </Reveal>

            <Reveal variant="fade-up" className="about-page__related">
              <p className="about-page__related-title">Continue explorando</p>
              <ul>
                <li>
                  <Link to="/quem-somos">Quem somos</Link>
                </li>
                <li>
                  <Link to="/#solucoes">Soluções para eventos</Link>
                </li>
                <li>
                  <Link to="/#contato">Contato</Link>
                </li>
              </ul>
            </Reveal>

            <Reveal variant="fade-up" className="about-page__actions">
              <AnimatedButton href="/" variant="ghost" showIcon={false}>
                Voltar para a home
              </AnimatedButton>
              <AnimatedButton
                href={createWhatsAppUrl(messages.parceria)}
                external
                variant="dark"
                aria-label="Conversar sobre parceria pelo WhatsApp"
              >
                Conversar sobre parceria
              </AnimatedButton>
            </Reveal>
          </div>
        </div>
      </article>
    </>
  );
}
