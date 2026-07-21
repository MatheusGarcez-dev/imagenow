import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Reveal } from "@/components/ui/Reveal";
import "./AboutPreviewSection.css";

export function AboutPreviewSection() {
  return (
    <section
      id="quem-somos-preview"
      className="about-preview"
      aria-labelledby="about-preview-title"
    >
      <div className="about-preview__frame">
        <Reveal variant="scale-blur" duration={1.15} className="about-preview__banner">
          <div className="about-preview__media" aria-hidden="true">
            <img
              src="/images/about-bg.png"
              alt=""
              width={1600}
              height={700}
              loading="lazy"
              decoding="async"
            />
            <div className="about-preview__scrim" />
          </div>
          <div className="about-preview__banner-copy">
            <p className="about-preview__eyebrow">Quem somos</p>
            <h2 id="about-preview-title" className="font-display">
              Muito além de equipamentos.
            </h2>
          </div>
        </Reveal>
      </div>

      <div className="wrap">
        <Reveal variant="fade-up" delay={0.08} className="about-preview__copy">
          <p>
            A Imagenow desenvolve e opera soluções para eventos com planejamento, design e
            atenção ao fluxo real de cada projeto.
          </p>
          <p>
            Criamos entregas que funcionam no momento certo e continuam depois, na lembrança e
            na percepção de quem participa.
          </p>
          <AnimatedButton href="/quem-somos" variant="dark">
            Conheça a Imagenow
          </AnimatedButton>
        </Reveal>
      </div>
    </section>
  );
}
