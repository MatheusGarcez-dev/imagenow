import { useEffect, useState } from "react";
import { messages, siteConfig } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useHeroEntrance } from "@/hooks/useHeroEntrance";
import "./HeroSection.css";

const media = [
  {
    src: "/images/hero-bg.png",
    alt: "Atmosfera visual de evento com luzes vibrantes, universo Imagenow",
  },
];

export function HeroSection() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();
  const heroRef = useHeroEntrance(true);

  useEffect(() => {
    if (media.length < 2 || reduced) return;

    let timer: number | undefined;
    const start = () => {
      timer = window.setInterval(() => {
        setActive((i) => (i + 1) % media.length);
      }, 7000);
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (timer) window.clearInterval(timer);
      } else {
        start();
      }
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      if (timer) window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <section ref={heroRef} className="hero" aria-labelledby="hero-title">
      <div className="hero__stage">
        <div className="hero__media" aria-hidden={media.length === 1}>
          {media.map((item, index) => (
            <img
              key={item.src}
              src={item.src}
              alt={index === active ? item.alt : ""}
              width={1920}
              height={1080}
              fetchPriority={index === 0 ? "high" : "low"}
              decoding="async"
              className={`hero__img ${index === active ? "is-active" : ""} ${loaded || index !== 0 ? "" : "is-loading"}`}
              onLoad={() => index === 0 && setLoaded(true)}
              onError={(e) => {
                e.currentTarget.style.opacity = "0";
              }}
            />
          ))}
          <div className="hero__overlay" />
          <div className="hero__grain" aria-hidden="true" />
        </div>

        <div className="hero__content">
          <p className="hero__badge">{siteConfig.tagline}</p>
          <h1 id="hero-title" className="font-syne hero__title">
            Quando o evento termina,
            <br />
            <em className="hero__accent">a lembrança continua.</em>
          </h1>
          <p className="hero__lead">
            Ativações, registros e soluções visuais para eventos corporativos, ações de
            marca e celebrações sociais.
          </p>
          <div className="hero__ctas">
            <AnimatedButton
              href={createWhatsAppUrl(messages.proposta)}
              external
              aria-label="Solicitar proposta pelo WhatsApp"
            >
              Solicitar proposta
            </AnimatedButton>
            <a href="/#solucoes" className="hero__secondary">
              Conhecer serviços
            </a>
          </div>
        </div>

        <div className="hero__brands">
          <BrandMarquee />
        </div>
      </div>
    </section>
  );
}
