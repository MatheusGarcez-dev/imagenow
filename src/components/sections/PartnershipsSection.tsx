import { useId, useState } from "react";
import { partnershipsContent } from "@/data/content";
import { messages } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import Aurora from "@/components/ui/Aurora";
import { Reveal } from "@/components/ui/Reveal";
import "./PartnershipsSection.css";

export function PartnershipsSection() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section id="parcerias" className="partnerships" aria-labelledby="partnerships-title">
      <div className="wrap">
        <Reveal
          variant="fade-blur"
          duration={1.15}
          className={`partnerships__hero${open ? " is-open" : ""}`}
        >
          <div className="partnerships__aurora">
            <Aurora
              colorStops={["#EC4899", "#EF4444", "#7C3AED"]}
              amplitude={1}
              blend={0.5}
            />
          </div>
          <div className="partnerships__hero-content">
            <h2 id="partnerships-title" className="font-display section-heading">
              Imagenow para o seu <span className="title-accent">negócio</span>
            </h2>
            <p>
              Soluções integradas para ampliar seu portfólio, fortalecer sua entrega e
              oferecer novas possibilidades aos seus clientes.
            </p>
            <div className="partnerships__actions">
              <AnimatedButton
                variant="outline"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls={panelId}
              >
                {open ? "Recolher" : "Entenda como funciona"}
              </AnimatedButton>
            </div>

            <div
              id={panelId}
              className="partnerships__expand"
              hidden={!open}
              role="region"
              aria-label="Como funciona a parceria"
            >
              <div className="partnerships__expand-inner">
                <h3 className="font-display">Integração estratégica</h3>
                <p className="partnerships__sub">
                  Para espaços, produtoras e empresas que buscam ampliar sua entrega
                </p>
                <div className="partnerships__copy">
                  {partnershipsContent.intro.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>
                <h3 className="font-display partnerships__points-title">
                  Pontos principais da parceria
                </h3>
                <ul className="partnerships__points">
                  {partnershipsContent.points.map((point) => (
                    <li key={point.title}>
                      <h4>{point.title}</h4>
                      <p>{point.text}</p>
                    </li>
                  ))}
                </ul>
                <AnimatedButton
                  href={createWhatsAppUrl(messages.parceria)}
                  external
                  variant="primary"
                  className="partnerships__cta"
                  aria-label="Conversar sobre parceria no WhatsApp"
                >
                  Conversar sobre parceria
                </AnimatedButton>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="sr-only" aria-hidden={open || undefined}>
          <h3>Integração estratégica</h3>
          {partnershipsContent.intro.map((paragraph) => (
            <p key={`seo-${paragraph.slice(0, 24)}`}>{paragraph}</p>
          ))}
          {partnershipsContent.points.map((point) => (
            <p key={`seo-${point.title}`}>
              {point.title}: {point.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
