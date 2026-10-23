import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { photoFormats } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./PhotoFormatsSection.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Inclinação de cada foto no monte inicial, como cartas jogadas na mesa
const PILE_ROTATIONS = [-14, 9, -6, 13, -10, 5, -3, 11];

export function PhotoFormatsSection() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Entrada: as fotos saem empilhadas da lateral e se espalham até a posição na grade
  useGSAP(
    () => {
      const gallery = galleryRef.current;
      if (!gallery || reduced) return;

      const medias = gsap.utils.toArray<HTMLElement>(".photo-formats__media", gallery);
      const labels = gsap.utils.toArray<HTMLElement>(".photo-formats__label", gallery);
      if (!medias.length) return;

      gsap.set(medias, { opacity: 0 });
      gsap.set(labels, { opacity: 0, y: 10 });

      ScrollTrigger.create({
        trigger: gallery,
        start: "top 78%",
        once: true,
        onEnter: () => {
          // Ponto de saída: rente à lateral esquerda da galeria, na altura do meio
          const box = gallery.getBoundingClientRect();
          const originX = box.left;
          const originY = box.top + box.height / 2;

          const tl = gsap.timeline();

          medias.forEach((media, index) => {
            const rect = media.getBoundingClientRect();
            const dx = originX - (rect.left + rect.width / 2);
            const dy = originY - (rect.top + rect.height / 2);

            tl.fromTo(
              media,
              {
                x: dx,
                y: dy,
                rotation: PILE_ROTATIONS[index % PILE_ROTATIONS.length],
                scale: 0.72,
                opacity: 0,
              },
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 1.15,
                ease: "back.out(1.15)",
                clearProps: "transform",
              },
              index * 0.08,
            );
          });

          tl.to(
            labels,
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" },
            0.75,
          );
        },
      });
    },
    { scope: galleryRef, dependencies: [reduced] },
  );

  return (
    <section id="formatos" className="photo-formats" aria-labelledby="formats-title">
      <div className="wrap photo-formats__grid">
        <Reveal variant="fade-up" className="photo-formats__copy">
          <h2 id="formats-title" className="font-display section-heading photo-formats__title">
            Seu evento não é igual.
            <br />
            A <span className="title-accent">impressão</span> também não precisa ser.
          </h2>
          <p className="photo-formats__lead">
            Do registro rápido à lembrança que merece ser guardada. Diferentes formatos
            pensados para acompanhar o momento, o espaço e a proposta de cada ação.
          </p>
        </Reveal>

        <div ref={galleryRef} className="photo-formats__gallery">
          <ul className="photo-formats__list">
            {photoFormats.map((format) => (
              <li
                key={format.id}
                className={`photo-formats__item photo-formats__item--${format.id}`}
              >
                <div className="photo-formats__media">
                  <img
                    className="photo-formats__img"
                    src={format.image}
                    alt={`Formato de impressão ${format.name}: ${format.detail}`}
                    decoding="async"
                  />
                </div>
                {/* O selo "Preferido" já vem na própria imagem */}
                <p className="photo-formats__label">{format.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
