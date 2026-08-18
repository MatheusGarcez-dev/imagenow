import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { contexts } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./ContextCardsSection.css";

const AUTO_MS = 5000;

export function ContextCardsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const labelId = useId();
  const reduced = useReducedMotion();
  const total = contexts.length;

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (reduced || paused || total < 2) return;

    let id: number | undefined;
    const mq = window.matchMedia("(max-width: 899px)");

    const start = () => {
      if (!mq.matches) return;
      id = window.setInterval(() => {
        setActive((current) => (current + 1) % total);
      }, AUTO_MS);
    };

    const stop = () => {
      if (id != null) window.clearInterval(id);
      id = undefined;
    };

    const onChange = () => {
      stop();
      start();
    };

    start();
    mq.addEventListener("change", onChange);
    return () => {
      stop();
      mq.removeEventListener("change", onChange);
    };
  }, [paused, reduced, total]);

  const current = contexts[active];

  return (
    <section className="contexts" aria-labelledby="contexts-title">
      <div className="wrap">
        <Reveal variant="fade-up" className="contexts__header">
          <h2 id="contexts-title" className="font-display section-heading contexts__title">
            <span className="title-accent">Experiências</span> para diferentes contextos
          </h2>
        </Reveal>
      </div>

      {/* Mobile: carrossel estilo card */}
      <div className="contexts__mobile wrap">
        <div
          className="contexts-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setPaused(false);
            }
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.clientX ?? null;
            setPaused(true);
          }}
          onTouchEnd={(event) => {
            const start = touchStartX.current;
            const end = event.changedTouches[0]?.clientX;
            touchStartX.current = null;
            setPaused(false);
            if (start == null || end == null) return;
            const delta = end - start;
            if (Math.abs(delta) < 48) return;
            if (delta < 0) next();
            else prev();
          }}
        >
          <a
            href="#solucoes"
            className="contexts-carousel__card"
            aria-labelledby={labelId}
            aria-label={`${current.title}. Ir para as soluções.`}
          >
            {contexts.map((item, index) => (
              <div
                key={item.id}
                className={`contexts-carousel__slide${index === active ? " is-active" : ""}`}
                aria-hidden={index !== active}
              >
                <img
                  src={item.image}
                  alt=""
                  width={900}
                  height={1125}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            ))}
            <div className="contexts-carousel__scrim" aria-hidden="true" />
            <div className="contexts-carousel__copy">
              <div className="contexts-carousel__title-row">
                <span className="contexts-carousel__icon" aria-hidden="true">
                  <Images size={16} strokeWidth={2} />
                </span>
                <h3 id={labelId} className="font-display contexts-carousel__title">
                  {current.title}
                </h3>
              </div>
              <p className="contexts-carousel__text">{current.text}</p>
            </div>
          </a>

          <button
            type="button"
            className="contexts-carousel__nav contexts-carousel__nav--prev"
            aria-label="Contexto anterior"
            onClick={prev}
          >
            <ChevronLeft size={22} strokeWidth={2} aria-hidden />
          </button>
          <button
            type="button"
            className="contexts-carousel__nav contexts-carousel__nav--next"
            aria-label="Próximo contexto"
            onClick={next}
          >
            <ChevronRight size={22} strokeWidth={2} aria-hidden />
          </button>

          <div
            className="contexts-carousel__dots"
            role="tablist"
            aria-label="Contextos de atuação"
          >
            {contexts.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={item.title}
                className={`contexts-carousel__dot${index === active ? " is-active" : ""}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: painéis full-bleed */}
      <div className="contexts__grid" role="list">
        {contexts.map((item, index) => (
          <a
            key={item.id}
            role="listitem"
            href="#solucoes"
            className={`contexts__panel contexts__panel--${item.tone}`}
            aria-label={`${item.title}. Ir para as soluções.`}
          >
            <div className="contexts__media" aria-hidden="true">
              <img
                src={item.image}
                alt=""
                width={900}
                height={1200}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="contexts__scrim" aria-hidden="true" />
            <div className="contexts__copy">
              <span className="contexts__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display contexts__panel-title">{item.title}</h3>
              <div className="contexts__panel-text-wrap">
                <p className="contexts__panel-text">{item.text}</p>
                <span className="contexts__cta">
                  Ver soluções
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
