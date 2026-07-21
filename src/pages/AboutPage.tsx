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
    title: "Quem somos | Imagenow",
    description:
      "Conheça a Imagenow, empresa de soluções para eventos corporativos, ações de marca e celebrações sociais, com formatos desenvolvidos para integrar design, operação e tecnologia.",
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
              <p className="about-page__eyebrow">Quem somos</p>
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
            <RevealStagger variant="fade-up" stagger={0.06} duration={0.85}>
              {aboutContent.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 28)}
                  className={index === 0 || index === 7 ? "about-page__lead" : undefined}
                >
                  {paragraph}
                </p>
              ))}
            </RevealStagger>
            <Reveal variant="soft" delay={0.1}>
              <p className="font-brand about-page__signature">{aboutContent.signature}</p>
            </Reveal>

            <Reveal variant="scale-blur" delay={0.05}>
              <div
                className="about-page__media"
                role="img"
                aria-label="Atmosfera visual do universo Imagenow"
              >
                <img
                  src="/images/about-page-banner.png"
                  alt=""
                  width={1600}
                  height={700}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>

            <Reveal variant="fade-up" className="about-page__actions">
              <AnimatedButton href="/" variant="ghost" showIcon={false}>
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
