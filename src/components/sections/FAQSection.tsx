import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { faqItems } from "@/data/faq";
import { messages } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Reveal, RevealStagger } from "@/components/ui/Reveal";
import "./FAQSection.css";

export function FAQSection() {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<string[]>([faqItems[0]?.id].filter(Boolean));

  const toggle = (id: string) => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    setOpenIds((current) => {
      const isOpen = current.includes(id);
      if (isMobile) return isOpen ? [] : [id];
      return isOpen ? current.filter((item) => item !== id) : [...current, id];
    });
  };

  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <Reveal variant="fade-blur" className="faq__intro">
          <p className="faq__eyebrow">Dúvidas frequentes</p>
          <h2 id="faq-title" className="font-display">
            Antes de solicitar sua proposta
          </h2>
          <p className="faq__lead">
            Respostas rápidas sobre soluções fotográficas, ativações visuais e formatos
            personalizados para eventos corporativos, ações de marca e celebrações sociais.
          </p>
        </Reveal>

        <RevealStagger
          className="faq__list"
          childSelector=".faq__item"
          variant="fade-up"
          stagger={0.07}
          duration={0.85}
        >
          {faqItems.map((item, index) => {
            const panelId = `${baseId}-panel-${item.id}`;
            const buttonId = `${baseId}-btn-${item.id}`;
            const open = openIds.includes(item.id);
            return (
              <div key={item.id} className={`faq__item ${open ? "is-open" : ""}`}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="faq__trigger"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                  >
                    <span>
                      <span className="faq__index">{String(index + 1).padStart(2, "0")}</span>
                      {item.question}
                    </span>
                    <span className="faq__icon-wrap" aria-hidden="true">
                      <Plus size={18} strokeWidth={1.75} className="faq__icon" />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq__panel"
                  aria-hidden={!open}
                  inert={!open ? true : undefined}
                >
                  <div className="faq__panel-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </RevealStagger>

        <Reveal variant="soft" delay={0.1} className="faq__cta">
          <AnimatedButton
            href={createWhatsAppUrl(messages.duvidas)}
            external
            variant="dark"
            aria-label="Falar com a Imagenow no WhatsApp sobre dúvidas"
          >
            Ainda tem dúvidas? Fale com a Imagenow
          </AnimatedButton>
        </Reveal>
      </div>
    </section>
  );
}
