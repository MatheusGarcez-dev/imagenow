import { photoFormats } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import "./PhotoFormatsSection.css";

export function PhotoFormatsSection() {
  return (
    <section id="formatos" className="photo-formats" aria-labelledby="formats-title">
      <div className="wrap photo-formats__grid">
        <Reveal variant="fade-up" className="photo-formats__copy">
          <h2 id="formats-title" className="font-display section-heading photo-formats__title">
            Seu evento não é igual
            <br />
            A <span className="title-accent">impressão</span> também não precisa ser
          </h2>
          <p className="photo-formats__lead">
            Do registro rápido à lembrança que merece ser guardada. Diferentes formatos
            pensados para acompanhar o momento, o espaço e a proposta de cada ação.
          </p>
        </Reveal>

        <Reveal variant="soft" delay={0.08} className="photo-formats__gallery">
          <ul className="photo-formats__list">
            {photoFormats.map((format) => (
              <li key={format.id} className="photo-formats__item">
                <div className="photo-formats__media">
                  <img
                    className="photo-formats__img"
                    src={format.image}
                    alt={`Formato de impressão ${format.name}: ${format.detail}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {/* O selo "Preferido" já vem na própria imagem */}
                <p className="photo-formats__label">{format.name}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
