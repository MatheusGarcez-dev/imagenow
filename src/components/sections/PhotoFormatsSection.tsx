import { photoFormats, type PhotoFormat } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import "./PhotoFormatsSection.css";

const SHOTS = [
  "/images/banner-1-hero.png",
  "/images/banner-2-hero.png",
  "/images/banner-3-hero.png",
  "/images/card-celebracoes.webp",
  "/images/card-eventos.webp",
  "/images/card-de-acoes-da-marca.jpeg",
  "/images/services/selfiemobi.png",
  "/images/services/totem-fotografico.jpg",
];

function shot(index: number) {
  return SHOTS[index % SHOTS.length];
}

function Slot({ index }: { index: number }) {
  return (
    <span className="fmt-slot">
      <img src={shot(index)} alt="" />
    </span>
  );
}

function Strip({ start, count, slim }: { start: number; count: number; slim?: boolean }) {
  return (
    <div className={`fmt-strip${slim ? " is-slim" : ""}`}>
      {Array.from({ length: count }, (_, i) => (
        <Slot key={i} index={start + i} />
      ))}
    </div>
  );
}

function Polaroid({ index, slim }: { index: number; slim?: boolean }) {
  return (
    <div className={`fmt-pola${slim ? " is-slim" : ""}`}>
      <Slot index={index} />
    </div>
  );
}

function FormatPrint({ format }: { format: PhotoFormat }) {
  const layout = format.layout;

  return (
    <div className={`fmt fmt--${layout}`} aria-hidden="true">
      {layout === "strips" ? (
        <>
          <Strip start={0} count={3} />
          <Strip start={1} count={3} />
          <Strip start={2} count={3} />
        </>
      ) : null}

      {layout === "strips-slim" ? (
        <>
          <Strip start={3} count={4} slim />
          <Strip start={4} count={4} slim />
          <Strip start={5} count={4} slim />
        </>
      ) : null}

      {layout === "polaroid" ? (
        <>
          <Polaroid index={0} />
          <Polaroid index={2} />
        </>
      ) : null}

      {layout === "polaroid-slim" ? (
        <>
          <Polaroid index={1} slim />
          <Polaroid index={3} slim />
          <Polaroid index={5} slim />
        </>
      ) : null}

      {layout === "mini-polaroid" ? (
        <div className="fmt-board">
          <Polaroid index={0} />
          <Polaroid index={1} />
          <Polaroid index={2} />
          <Polaroid index={6} />
        </div>
      ) : null}

      {layout === "sheet-3" ? (
        <div className="fmt-sheet fmt-sheet--3">
          <Slot index={0} />
          <div className="fmt-sheet__stack">
            <Slot index={4} />
            <Slot index={7} />
          </div>
        </div>
      ) : null}

      {layout === "sheet-1" ? (
        <div className="fmt-sheet fmt-sheet--1">
          <Slot index={1} />
        </div>
      ) : null}

      {layout === "sheet-4" ? (
        <div className="fmt-sheet fmt-sheet--4">
          <Slot index={2} />
          <Slot index={3} />
          <Slot index={5} />
          <Slot index={6} />
        </div>
      ) : null}
    </div>
  );
}

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
                <FormatPrint format={format} />
                <p className="photo-formats__label">
                  {format.name}
                  {format.preferred ? (
                    <span className="photo-formats__pref">Preferido</span>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
