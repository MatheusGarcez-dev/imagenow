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
        <Reveal variant="fade-blur" duration={1.15} className="partnerships__hero">
          <div className="partnerships__aurora">
            <Aurora
              colorStops={["#EC4899", "#EF4444", "#7C3AED"]}
              amplitude={1}
              blend={0.5}
            />
          </div>
          <div className="partnerships__hero-content">
            <p className="partnerships__eyebrow">Parcerias</p>
            <h2 id="partnerships-title" className="font-display">
              Imagenow para o seu negócio.
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
          </div>
        </Reveal>

        <div
          id={panelId}
          className={`partnerships__panel ${open ? "is-open" : ""}`}
          hidden={!open}
        >
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
            variant="dark"
            className="mt-8"
            aria-label="Conversar sobre parceria no WhatsApp"
          >
            Conversar sobre parceria
          </AnimatedButton>
        </div>

        {/* Conteúdo sempre no DOM para SEO */}
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
