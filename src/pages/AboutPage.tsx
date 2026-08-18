import { Link } from "react-router-dom";
import { aboutContent } from "@/data/content";
import { messages } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Reveal, RevealStagger } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/common/JsonLd";
import { usePageMeta } from "@/hooks/usePageMeta";
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";
import "./AboutPage.css";

export function AboutPage() {
  usePageMeta({
    title: "Quem Somos | Imagenow – Soluções para Eventos",
    description:
      "Conheça a história da Imagenow, empresa especializada em soluções para eventos com equipamentos próprios, operação completa e ativações para marcas e celebrações.",
    path: "/quem-somos",
  });

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          breadcrumbJsonLd([{ name: "Quem somos", path: "/quem-somos" }]),
        ]}
      />
      <article className="about-page">
        <header className="about-page__hero">
          <div className="wrap">
            <Reveal variant="fade-blur" duration={1.1}>
              <nav className="about-page__crumbs" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span>Quem somos</span>
              </nav>
              <h1 className="font-display">{aboutContent.h1}</h1>
              <p className="about-page__subtitle">{aboutContent.subtitle}</p>
            </Reveal>
          </div>
        </header>

        <div className="wrap about-page__layout">
          <aside className="about-page__aside" aria-label="Temas">
            <Reveal variant="fade-right">
              <ul>
                {aboutContent.keywords.map((keyword) => (
                  <li key={keyword}>{keyword}</li>
                ))}
              </ul>
            </Reveal>
          </aside>

          <div className="about-page__body">
            {aboutContent.sections.map((section, sectionIndex) => (
              <section
                key={section.id}
                id={section.id}
                className="about-page__section"
                aria-labelledby={`${section.id}-title`}
              >
                <Reveal variant="fade-up" delay={sectionIndex * 0.04}>
                  <h2 id={`${section.id}-title`} className="font-display about-page__h2">
                    {section.h2}
                  </h2>
                </Reveal>
                <RevealStagger variant="fade-up" stagger={0.05} duration={0.8}>
                  {section.paragraphs.map((paragraph, index) => (
                    <p
                      key={paragraph.slice(0, 28)}
                      className={
                        sectionIndex === 0 && index === 0 ? "about-page__lead" : undefined
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </RevealStagger>
              </section>
            ))}

            <Reveal variant="soft" delay={0.1}>
              <p className="about-page__signature" aria-label="imagenow. still happening.">
                <span className="about-page__signature-brand">
                  {aboutContent.signature.brand}
                </span>
                <span className="about-page__signature-dot">. </span>
                <span className="about-page__signature-rest">
                  {aboutContent.signature.rest}
                </span>
              </p>
            </Reveal>

            <Reveal variant="scale-blur" delay={0.05}>
              <div className="about-page__media">
                <img
                  src="/images/about-page-banner.png"
                  alt="Equipe da Imagenow operando soluções fotográficas durante evento corporativo."
                  width={1600}
                  height={700}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>

            <Reveal variant="fade-up" className="about-page__related">
              <p className="about-page__related-title">Continue explorando</p>
              <ul>
                {aboutContent.relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="fade-up" className="about-page__actions">
              <AnimatedButton href="/#quem-somos-preview" variant="ghost" showIcon={false}>
                Voltar para a home
              </AnimatedButton>
              <AnimatedButton
                href={createWhatsAppUrl(messages.proposta)}
                external
                variant="dark"
                aria-label="Solicitar proposta pelo WhatsApp"
              >
                Solicitar proposta
              </AnimatedButton>
            </Reveal>
          </div>
        </div>
      </article>
    </>
  );
}
