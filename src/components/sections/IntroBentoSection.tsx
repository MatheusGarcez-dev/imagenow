import { useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import "./IntroBentoSection.css";

function ApproachVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const play = () => {
      void video.play().catch(() => undefined);
    };

    const restart = () => {
      video.currentTime = 0;
      play();
    };

    play();
    video.addEventListener("ended", restart);
    video.addEventListener("pause", play);
    video.addEventListener("canplay", play);

    return () => {
      video.removeEventListener("ended", restart);
      video.removeEventListener("pause", play);
      video.removeEventListener("canplay", play);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="approach__video"
      src="/images/approach.mov"
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-label="Ativações Imagenow que entram no ritmo do evento"
    />
  );
}

export function IntroBentoSection() {
  return (
    <section
      className="approach"
      aria-labelledby="approach-title"
      data-section="manifesto"
    >
      <div className="wrap approach__grid">
        <div className="approach__visual">
          <ApproachVideo />
          <div className="approach__scrim" aria-hidden="true" />
        </div>

        <div className="approach__text">
          <Reveal variant="fade-up" duration={1} className="approach__headline">
            <h2 id="approach-title" className="font-display section-heading approach__title">
              <span className="title-accent">Ativações</span> que entram no ritmo do evento
            </h2>
          </Reveal>

          <Reveal variant="fade-up" duration={1} delay={0.06} className="approach__copy">
            <div className="approach__body">
              <p>
                Cada evento é diferente. Por isso, pensamos em soluções que façam sentido
                para o público, para o espaço e para a marca.
              </p>
              <p>
                Adaptamos o que já existe ou criamos algo novo quando o projeto pede.
                Algumas estruturas são desenvolvidas e produzidas pela própria Imagenow,
                sempre pensando em design, interação e, principalmente, no que funciona de
                verdade durante o evento.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
