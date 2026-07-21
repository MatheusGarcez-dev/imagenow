import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { X } from "lucide-react";
import { services, type Service } from "@/data/services";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Reveal } from "@/components/ui/Reveal";
import "./ServicesCarousel.css";

const BASE_SPEED = 0.45;
const MAX_SPEED = 4.5;
const FRICTION = 0.965;
const DRAG_CLICK_THRESHOLD = 6;

export function ServicesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(BASE_SPEED);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const suppressClickRef = useRef(false);
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const axisRef = useRef<"none" | "x" | "y">("none");

  const [expanded, setExpanded] = useState<string | null>(null);
  const panelId = useId();

  const loop = [...services, ...services];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reducedMotionRef.current = media.matches;
      if (media.matches) velocityRef.current = 0;
      else if (!draggingRef.current) velocityRef.current = BASE_SPEED;
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    pausedRef.current = Boolean(expanded);
    if (!expanded && !reducedMotionRef.current && !draggingRef.current) {
      velocityRef.current = BASE_SPEED;
    }
  }, [expanded]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const wrapOffset = () => {
      const half = track.scrollWidth / 2;
      if (half <= 0) return;
      while (offsetRef.current <= -half) offsetRef.current += half;
      while (offsetRef.current > 0) offsetRef.current -= half;
    };

    const tick = () => {
      if (reducedMotionRef.current) {
        frame = window.requestAnimationFrame(tick);
        return;
      }

      if (!draggingRef.current && !pausedRef.current) {
        const current = velocityRef.current;
        const next = current + (BASE_SPEED - current) * (1 - FRICTION);
        velocityRef.current = Math.min(MAX_SPEED, Math.max(BASE_SPEED * 0.35, next));
        offsetRef.current -= velocityRef.current;
      } else if (!draggingRef.current && Math.abs(velocityRef.current) > 0.02) {
        velocityRef.current *= FRICTION;
        offsetRef.current -= velocityRef.current;
        if (Math.abs(velocityRef.current) < 0.02) velocityRef.current = 0;
      }

      wrapOffset();
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || reducedMotionRef.current) return;
    draggingRef.current = true;
    axisRef.current = "none";
    dragDistanceRef.current = 0;
    suppressClickRef.current = false;
    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
    lastXRef.current = event.clientX;
    lastTRef.current = performance.now();
    velocityRef.current = 0;
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;

    const dxTotal = event.clientX - startXRef.current;
    const dyTotal = event.clientY - startYRef.current;

    // Decide eixo: vertical = scroll da página; horizontal = arrasta o carrossel
    if (axisRef.current === "none") {
      if (Math.abs(dxTotal) < 10 && Math.abs(dyTotal) < 10) return;
      if (Math.abs(dyTotal) >= Math.abs(dxTotal)) {
        axisRef.current = "y";
        draggingRef.current = false;
        return;
      }
      axisRef.current = "x";
      viewportRef.current?.setPointerCapture(event.pointerId);
      lastXRef.current = event.clientX;
      lastTRef.current = performance.now();
    }

    if (axisRef.current !== "x") return;
    event.preventDefault();

    const now = performance.now();
    const dx = event.clientX - lastXRef.current;
    const dt = Math.max(now - lastTRef.current, 1);
    offsetRef.current += dx;
    dragDistanceRef.current += Math.abs(dx);
    velocityRef.current = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, (-dx / dt) * 16));
    lastXRef.current = event.clientX;
    lastTRef.current = now;
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current && axisRef.current !== "x") {
      axisRef.current = "none";
      return;
    }
    const wasHorizontal = axisRef.current === "x";
    draggingRef.current = false;
    axisRef.current = "none";
    if (!wasHorizontal) return;

    if (dragDistanceRef.current > DRAG_CLICK_THRESHOLD) {
      suppressClickRef.current = true;
    }
    if (!reducedMotionRef.current && !pausedRef.current) {
      const abs = Math.abs(velocityRef.current);
      if (abs < BASE_SPEED) {
        velocityRef.current = velocityRef.current < 0 ? -BASE_SPEED : BASE_SPEED;
      }
    }
    try {
      viewportRef.current?.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
  };

  const active = services.find((s) => s.id === expanded) ?? null;

  return (
    <section id="solucoes" className="services" aria-labelledby="services-title">
      <div className="wrap">
        <Reveal variant="fade-blur" className="services__intro">
          <p className="services__eyebrow">Soluções para eventos</p>
          <h2 id="services-title" className="font-display services__title">
            Formatos para diferentes objetivos, públicos e estruturas.
          </h2>
          <p className="services__lead">
            Reunimos soluções fotográficas, digitais, interativas e de conveniência para
            eventos corporativos, ações de marca e celebrações sociais.
          </p>
          <p className="services__lead services__lead--secondary">
            Cada formato pode ser personalizado de acordo com a identidade visual, o fluxo do
            público, o espaço disponível e o tipo de entrega que o projeto precisa gerar.
          </p>
        </Reveal>
      </div>

      <div className="services__shell">
        <div className="services__fade services__fade--left" aria-hidden="true" />
        <div className="services__fade services__fade--right" aria-hidden="true" />

        <div
          ref={viewportRef}
          className="services__viewport"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={(event) => {
            if (draggingRef.current || axisRef.current === "x") endDrag(event);
          }}
        >
          <div
            ref={trackRef}
            className="services__track"
            aria-label="Lista de soluções em carrossel contínuo. Arraste na horizontal para acelerar."
          >
            {loop.map((service, index) => {
              const isClone = index >= services.length;
              return (
                <ServiceCard
                  key={`${service.id}-${index}`}
                  service={service}
                  expanded={!isClone && expanded === service.id}
                  panelId={panelId}
                  inert={isClone}
                  onToggle={() => {
                    if (suppressClickRef.current) {
                      suppressClickRef.current = false;
                      return;
                    }
                    if (isClone) return;
                    setExpanded((current) =>
                      current === service.id ? null : service.id,
                    );
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div
        id={panelId}
        className={`services__panel ${active ? "is-open" : ""}`}
        hidden={!active}
        role="region"
        aria-label={active ? `Detalhes de ${active.name}` : undefined}
      >
        {active ? (
          <div className="wrap services__panel-inner">
            <div className="services__panel-top">
              <div>
                <h3 className="font-display">{active.name}</h3>
                <p className="services__panel-tag">{active.tagline}</p>
              </div>
              <button
                type="button"
                className="services__close"
                aria-label="Fechar detalhes do serviço"
                onClick={() => setExpanded(null)}
              >
                <X size={20} strokeWidth={1.75} />
              </button>
            </div>
            <div className="services__panel-grid">
              <div className="services__panel-media">
                <img
                  src={active.image}
                  alt={active.imageAlt}
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
              <div className="services__panel-copy">
                {active.badges?.length ? (
                  <ul className="services__badges">
                    {active.badges.map((badge) => (
                      <li key={badge}>{badge}</li>
                    ))}
                  </ul>
                ) : null}
                {active.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
                <AnimatedButton
                  href={createWhatsAppUrl(active.whatsappMessage)}
                  external
                  variant="dark"
                  className="mt-4"
                  aria-label={`Conversar sobre ${active.name} no WhatsApp`}
                >
                  Conversar sobre este serviço
                </AnimatedButton>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="sr-only">
        {services.map((service) => (
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
  expanded,
  panelId,
  onToggle,
  inert = false,
}: {
  service: Service;
  expanded: boolean;
  panelId: string;
  onToggle: () => void;
  inert?: boolean;
}) {
  return (
    <article
      className={`service-card accent-${service.accent} ${expanded ? "is-expanded" : ""}`}
      aria-hidden={inert || undefined}
    >
      <div className="service-card__media">
        <img src={service.image} alt="" loading="lazy" width={640} height={480} />
      </div>
      <div className="service-card__body">
        {service.badges?.[0] ? (
          <span className="service-card__badge">{service.badges[0]}</span>
        ) : null}
        <h3 className="font-display">{service.name}</h3>
        <p className="service-card__tag">{service.tagline}</p>
        <p className="service-card__summary">{service.summary}</p>
        <button
          type="button"
          className="service-card__expand"
          aria-expanded={expanded}
          aria-controls={panelId}
          tabIndex={inert ? -1 : undefined}
          onClick={onToggle}
        >
          {expanded ? "Recolher" : "Ver detalhes"}
        </button>
      </div>
    </article>
  );
}
