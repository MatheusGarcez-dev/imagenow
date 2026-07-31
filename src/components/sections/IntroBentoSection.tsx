import { Reveal } from "@/components/ui/Reveal";
import "./IntroBentoSection.css";

export function IntroBentoSection() {
  return (
    <section
      className="approach"
      aria-labelledby="approach-title"
      data-section="manifesto"
    >
      <div className="wrap approach__grid">
        <Reveal variant="fade-up" duration={1} className="approach__copy">
          <p className="approach__eyebrow">Nossa abordagem</p>
          <h2 id="approach-title" className="font-display approach__title">
            Ativações que entram no ritmo do evento.
          </h2>
          <div className="approach__body">
            <p>
              Cada projeto da Imagenow é pensado a partir do público, do espaço, da
              identidade visual e do objetivo da ação. Mais do que instalar um
              equipamento, estruturamos uma entrega que funcione com fluidez, gere
              interação e se integre ao evento sem interromper o que está acontecendo.
            </p>
            <p>
              Parte das nossas estruturas é desenvolvida pela própria Imagenow e
              fabricada sob demanda, unindo design, operação e uso real em eventos.
            </p>
          </div>
          <p className="approach__badge">
            <span className="approach__badge-dot" aria-hidden="true" />
            Estruturas desenvolvidas pela Imagenow
          </p>
        </Reveal>

        <Reveal variant="scale-blur" duration={1.15} delay={0.08} className="approach__media">
          <img
            src="/images/about-bg.png"
            alt="Registro instantâneo em ativação Imagenow: polaroids e energia de evento"
            width={1200}
            height={1500}
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      </div>
    </section>
  );
}
