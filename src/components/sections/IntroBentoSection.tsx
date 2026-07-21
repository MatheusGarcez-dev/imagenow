import { ArrowUpRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { RevealStagger } from "@/components/ui/Reveal";
import "./IntroBentoSection.css";

const manifesto =
  "A Imagenow cria soluções que entram no ritmo do evento. Planejamento, design, tecnologia e operação trabalham juntos para transformar encontros em registros, interações e lembranças que continuam acontecendo.";

const cards = [
  {
    id: "equip",
    label: "Estruturas próprias",
    titleBefore: "Desenvolvido para o evento ",
    titleAccent: "real",
    titleAfter: "",
    text: "Equipamentos e formatos pensados para fluxo, estética e operação no dia.",
    image: "/images/bento-equip.png",
    cta: true,
  },
  {
    id: "process",
    label: "Método",
    titleBefore: "Do briefing à entrega",
    titleAccent: "",
    titleAfter: "",
    text: "Entendimento, indicação, personalização, operação e materiais finais.",
    steps: ["Brief", "Formato", "Ops", "Entrega"],
  },
  {
    id: "formats",
    label: "Entregas",
    titleBefore: "Impressa. Digital. Compartilhada.",
    titleAccent: "",
    titleAfter: "",
    text: "Do papel ao celular, a lembrança continua acontecendo.",
  },
  {
    id: "since",
    label: "Trajetória",
    titleBefore: "Desde ",
    titleAccent: "2018",
    titleAfter: "",
    text: "Experiência em corporativo, marca e celebrações.",
    image: "/images/bento-since.png",
  },
  {
    id: "mobile",
    label: "Mobilidade",
    titleBefore: "Uma ativação que acompanha o ",
    titleAccent: "público",
    titleAfter: "",
    text: "SelfieMobi e formatos que entram no ritmo do evento.",
    image: "/images/bento-mobile.png",
  },
] as const;

export function IntroBentoSection() {
  const ref = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className="intro-bento"
      aria-labelledby="manifesto-title"
      data-section="manifesto"
    >
      <div className="wrap">
        <ScrollReveal
          id="manifesto-title"
          baseOpacity={0.28}
          enableBlur
          baseRotation={1.2}
          blurStrength={3}
          rotationEnd="center center"
          wordAnimationEnd="center center"
          containerClassName="font-display intro-bento__title"
          textClassName="intro-bento__title-text"
        >
          {manifesto}
        </ScrollReveal>

        <RevealStagger
          className="bento"
          childSelector=".bento__card"
          variant="scale-blur"
          stagger={0.1}
          duration={1}
        >
          {cards.map((card) => (
            <article key={card.id} className={`bento__card bento__card--${card.id}`}>
              {"image" in card && card.image ? (
                <div className="bento__media" aria-hidden="true">
                  <img src={card.image} alt="" loading="lazy" decoding="async" />
                </div>
              ) : (
                <div className="bento__glow" aria-hidden="true" />
              )}

              <div className="bento__content">
                <p className="bento__label">{card.label}</p>
                <div className="bento__body">
                  <h3 className="font-display">
                    {card.titleBefore}
                    {card.titleAccent ? (
                      <span className="bento__accent">{card.titleAccent}</span>
                    ) : null}
                    {card.titleAfter}
                  </h3>
                  <p>{card.text}</p>
                  {"steps" in card && card.steps ? (
                    <ol className="bento__steps">
                      {card.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  ) : null}
                </div>
                {"cta" in card && card.cta ? (
                  <a
                    className="bento__cta"
                    href="/#solucoes"
                    aria-label="Ver soluções da Imagenow"
                  >
                    <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
