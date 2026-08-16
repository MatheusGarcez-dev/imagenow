import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { visibleServices, type Service } from "@/data/services";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./ServicesCarousel.css";

gsap.registerPlugin(useGSAP);

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function isImagenowStamp(badges?: string[]) {
  return Boolean(badges?.some((b) => /(desenvolvido|criado) pela imagenow/i.test(b)));
}

export function ServicesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const panelId = useId();

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, expanded]);

  const scrollByCard = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".service-card");
    const step = card ? card.offsetWidth + 0 : el.clientWidth * 0.75;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section id="solucoes" className="services" aria-labelledby="services-title">
      <div className="wrap">
        <Reveal variant="fade-blur" className="services__intro">
          <div className="services__copy">
            <p className="services__eyebrow">O que oferecemos</p>
            <h2 id="services-title" className="font-display services__title">
              Soluções para <em>eventos</em>
            </h2>
            <p className="services__lead">
              Cada formato pode ser personalizado de acordo com a identidade visual, o fluxo do
              público, o espaço disponível e o tipo de entrega que o projeto precisa gerar.
            </p>
          </div>
          <div className="services__nav" role="group" aria-label="Navegar soluções">
            <button
              type="button"
              className="services__arrow"
              aria-label="Soluções anteriores"
              disabled={!canPrev}
              onClick={() => scrollByCard(-1)}
            >
              <ChevronLeft size={20} strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              className="services__arrow"
              aria-label="Próximas soluções"
              disabled={!canNext}
              onClick={() => scrollByCard(1)}
            >
              <ChevronRight size={20} strokeWidth={2} aria-hidden />
            </button>
          </div>
        </Reveal>
      </div>

      <div className="services__shell">
        <div
          ref={trackRef}
          className="services__track"
          aria-label="Lista de soluções. Use as setas ou deslize na horizontal."
        >
          {visibleServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              expanded={expanded === service.id}
              panelId={`${panelId}-${service.id}`}
              onToggle={() =>
                setExpanded((current) => (current === service.id ? null : service.id))
              }
            />
          ))}
        </div>
      </div>

      <div className="sr-only">
        {visibleServices.map((service) => (
          <article key={`seo-${service.id}`} id={service.id}>
            <h3>{service.name}</h3>
            <p>{service.tagline}</p>
            <p>{service.summary}</p>
            {service.description.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  expanded,
  panelId,
  onToggle,
}: {
  service: Service;
  index: number;
  expanded: boolean;
  panelId: string;
  onToggle: () => void;
}) {
  const detail = service.description.slice(1).join(" ");
  const stamped = isImagenowStamp(service.badges);
  const otherBadges =
    service.badges?.filter((b) => !/(desenvolvido|criado) pela imagenow/i.test(b)) ?? [];

  const detailRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const readyRef = useRef(false);
  const reduced = useReducedMotion();

  const syncPanelHeight = useCallback(() => {
    const panel = detailRef.current;
    if (!panel || !expanded) return;
    gsap.set(panel, { height: "auto" });
  }, [expanded]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (expanded) {
      video.currentTime = 0;
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [expanded, service.video]);

  useGSAP(
    () => {
      const panel = detailRef.current;
      const inner = innerRef.current;
      if (!panel || !inner) return;

      gsap.killTweensOf([panel, inner]);

      if (reduced) {
        gsap.set(panel, {
          height: expanded ? "auto" : 0,
          opacity: expanded ? 1 : 0,
          overflow: "hidden",
        });
        gsap.set(inner, { y: 0, opacity: expanded ? 1 : 0 });
        readyRef.current = true;
        return;
      }

      if (!readyRef.current) {
        gsap.set(panel, {
          height: expanded ? "auto" : 0,
          opacity: expanded ? 1 : 0,
          overflow: "hidden",
        });
        gsap.set(inner, { y: 0, opacity: expanded ? 1 : 0 });
        readyRef.current = true;
        return;
      }

      if (expanded) {
        gsap.set(panel, { height: "auto", opacity: 1, overflow: "hidden" });
        const target = panel.scrollHeight;
        gsap.fromTo(
          panel,
          { height: 0, opacity: 0.35 },
          {
            height: target,
            opacity: 1,
            duration: 0.62,
            ease: "power3.out",
            onComplete: () => {
              gsap.set(panel, { height: "auto", overflow: "visible" });
            },
          },
        );
        gsap.fromTo(
          inner,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            delay: 0.1,
            ease: "power3.out",
          },
        );
      } else {
        const current = panel.scrollHeight;
        gsap.set(panel, { height: current, overflow: "hidden" });
        gsap.to(inner, {
          y: 8,
          opacity: 0,
          duration: 0.28,
          ease: "power2.in",
        });
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: 0.48,
          delay: 0.04,
          ease: "power3.inOut",
        });
      }
    },
    { dependencies: [expanded, reduced] },
  );

  return (
    <article
      className={`service-card${expanded ? " is-expanded" : ""}${stamped ? " has-stamp" : ""}`}
      aria-labelledby={`${panelId}-title`}
    >
      <span className="service-card__index" aria-hidden="true">
        {padIndex(index)}
      </span>

      {stamped ? (
        <img
          src="/images/carimbo.png"
          alt="Criado pela Imagenow"
          width={140}
          height={140}
          className="service-card__stamp"
          loading="lazy"
          decoding="async"
        />
      ) : null}

      <div className="service-card__main">
        <h3 id={`${panelId}-title`} className="font-display service-card__name">
          {service.name}
        </h3>
        <p className="service-card__tag">{service.tagline}</p>
        <p className="service-card__summary">{service.summary}</p>

        {otherBadges.length ? (
          <ul className="service-card__badges">
            {otherBadges.map((badge) => (
              <li
                key={badge}
                className={
                  /desenvolvimento/i.test(badge)
                    ? "service-card__badge service-card__badge--muted"
                    : "service-card__badge"
                }
              >
                {badge}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="service-card__actions">
          <button
            type="button"
            className="service-card__expand"
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={onToggle}
          >
            Ver {expanded ? "menos" : "mais"}{" "}
            <span aria-hidden="true">{expanded ? "×" : "+"}</span>
          </button>
        </div>
      </div>

      <div
        id={panelId}
        ref={detailRef}
        className="service-card__detail"
        role="region"
        aria-hidden={!expanded}
        aria-label={`Detalhes de ${service.name}`}
      >
        <div ref={innerRef} className="service-card__detail-inner">
          <figure className="service-card__media">
            {service.video ? (
              <video
                ref={videoRef}
                className="service-card__video"
                src={service.video}
                muted
                loop
                playsInline
                autoPlay={expanded}
                preload="metadata"
                aria-label={service.imageAlt}
                onLoadedData={syncPanelHeight}
              />
            ) : (
              <img
                src={service.image}
                alt={service.imageAlt}
                width={640}
                height={800}
                loading="lazy"
                decoding="async"
                onLoad={syncPanelHeight}
              />
            )}
          </figure>
          {detail ? <p>{detail}</p> : null}
          <a
            className="service-card__cta"
            href={createWhatsAppUrl(service.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={expanded ? undefined : -1}
          >
            Conversar sobre este serviço
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}
