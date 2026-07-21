import { Reveal, RevealStagger } from "@/components/ui/Reveal";
import "./EventRhythmSection.css";

export function EventRhythmSection() {
  return (
    <section className="event-rhythm" aria-labelledby="rhythm-title">
      <div className="event-rhythm__frame">
        <Reveal variant="scale-blur" duration={1.2} className="event-rhythm__banner">
          <div className="event-rhythm__media" aria-hidden="true">
            <img
              src="/images/event-rhythm-banner.png"
              alt=""
              width={1600}
              height={700}
              loading="lazy"
              decoding="async"
            />
            <div className="event-rhythm__scrim" />
          </div>
          <h2 id="rhythm-title" className="font-display event-rhythm__title">
            Ativações que entram no ritmo do evento.
          </h2>
        </Reveal>
      </div>

      <div className="wrap">
        <RevealStagger
          className="event-rhythm__copy"
          variant="fade-up"
          stagger={0.12}
          delay={0.08}
        >
          <p>
            Cada projeto da Imagenow é pensado a partir do público, do espaço, da identidade
            visual e do objetivo da ação.
          </p>
          <p>
            Mais do que instalar um equipamento, estruturamos uma entrega que funcione com
            fluidez, gere interação e se integre ao evento sem interromper o que está
            acontecendo.
          </p>
          <p>
            Parte das nossas estruturas é desenvolvida pela própria Imagenow e fabricada sob
            demanda, unindo design, operação e uso real em eventos. Isso nos permite criar
            soluções mais alinhadas ao fluxo, à estética e à qualidade que cada projeto
            exige.
          </p>
        </RevealStagger>
      </div>
    </section>
  );
}
