import { createWhatsAppUrl } from "@/lib/whatsapp";
import { contexts } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import "./ContextCardsSection.css";

export function ContextCardsSection() {
  return (
    <section className="contexts" aria-labelledby="contexts-title">
      <div className="wrap">
        <Reveal variant="fade-up" className="contexts__header">
          <h2 id="contexts-title" className="font-display contexts__title">
            Contextos em que a Imagenow atua
          </h2>
        </Reveal>
      </div>

      <div className="contexts__grid" role="list">
        {contexts.map((item) => (
          <a
            key={item.id}
            role="listitem"
            href={createWhatsAppUrl(item.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={`contexts__panel contexts__panel--${item.tone}`}
            aria-label={`${item.title}. ${item.text} Abrir conversa no WhatsApp.`}
          >
            <div className="contexts__media" aria-hidden="true">
              <img
                src={item.image}
                alt=""
                width={900}
                height={1200}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="contexts__scrim" aria-hidden="true" />
            <div className="contexts__copy">
              <h3 className="font-display contexts__panel-title">{item.title}</h3>
              <div className="contexts__panel-text-wrap">
                <p className="contexts__panel-text">{item.text}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
