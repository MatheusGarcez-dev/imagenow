import { ArrowRight, Briefcase, Check, Heart, Sparkles } from "lucide-react";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { contexts } from "@/data/services";
import "./ContextCardsSection.css";

const toneIcons = {
  corporate: Briefcase,
  brand: Sparkles,
  social: Heart,
} as const;

export function ContextCardsSection() {
  return (
    <section className="contexts" aria-labelledby="contexts-title">
      <div className="wrap">
        <h2 id="contexts-title" className="font-display contexts__title">
          Contextos em que a Imagenow atua
        </h2>
        <div className="contexts__grid">
          {contexts.map((item) => {
            const Icon = toneIcons[item.tone];

            return (
              <article
                key={item.id}
                className={`contexts__card contexts__card--${item.tone}`}
              >
                <div className="contexts__media">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="contexts__icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={2} />
                  </span>
                </div>

                <div className="contexts__body">
                  <h3 className="font-display">{item.title}</h3>
                  <p>{item.text}</p>

                  <ul className="contexts__features">
                    {item.features.map((feature) => (
                      <li key={feature}>
                        <span className="contexts__check" aria-hidden="true">
                          <Check size={14} strokeWidth={2.5} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    className="contexts__cta"
                    href={createWhatsAppUrl(item.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Saiba mais
                    <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
