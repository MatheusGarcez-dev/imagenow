import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { processSteps } from "@/data/services";
import { messages } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./ProcessSection.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ProcessSection() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [unlocked, setUnlocked] = useState(reduced ? processSteps.length - 1 : -1);

  useGSAP(
    () => {
      if (!root.current) return;

      const timeline = root.current.querySelector<HTMLElement>(".process__timeline");
      const lineTrack = root.current.querySelector<HTMLElement>(".process__line");
      const lineFill = root.current.querySelector<HTMLElement>(".process__line-fill");
      const steps = gsap.utils.toArray<HTMLElement>(".process__step");
      const markers = steps
        .map((step) => step.querySelector<HTMLElement>(".process__marker"))
        .filter((marker): marker is HTMLElement => Boolean(marker));

      const syncUnlocked = (index: number) => {
        setUnlocked((current) => (current === index ? current : index));
      };

      const pinLineToMarkers = () => {
        if (!timeline || !lineTrack || markers.length < 2) return;

        const timelineBox = timeline.getBoundingClientRect();
        const firstBox = markers[0].getBoundingClientRect();
        const lastBox = markers[markers.length - 1].getBoundingClientRect();

        const firstCenter = firstBox.top + firstBox.height / 2 - timelineBox.top;
        const lastCenter = lastBox.top + lastBox.height / 2 - timelineBox.top;

        lineTrack.style.top = `${firstCenter}px`;
        lineTrack.style.bottom = "auto";
        lineTrack.style.height = `${Math.max(0, lastCenter - firstCenter)}px`;
      };

      pinLineToMarkers();
      requestAnimationFrame(pinLineToMarkers);

      if (reduced) {
        gsap.set(lineFill, { scaleY: 1 });
        syncUnlocked(processSteps.length - 1);
        return;
      }

      gsap.from(".process__intro > *", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process__intro",
          start: "top 80%",
          once: true,
        },
      });

      if (lineFill && markers.length >= 2) {
        gsap.fromTo(
          lineFill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: markers[0],
              endTrigger: markers[markers.length - 1],
              start: "center center",
              end: "center center",
              scrub: 0.15,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const last = Math.max(steps.length - 1, 1);
                let maxIndex = -1;
                for (let index = 0; index <= last; index += 1) {
                  if (self.progress >= index / last - 0.001) maxIndex = index;
                }
                syncUnlocked(maxIndex);
              },
              onLeave: () => syncUnlocked(processSteps.length - 1),
              onLeaveBack: () => syncUnlocked(-1),
            },
          },
        );
      }

      steps.forEach((step) => {
        gsap.from(step.querySelector(".process__step-copy"), {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 84%",
            once: true,
          },
        });
      });

      ScrollTrigger.addEventListener("refreshInit", pinLineToMarkers);
      ScrollTrigger.addEventListener("refresh", pinLineToMarkers);
      window.addEventListener("resize", pinLineToMarkers);

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", pinLineToMarkers);
        ScrollTrigger.removeEventListener("refresh", pinLineToMarkers);
        window.removeEventListener("resize", pinLineToMarkers);
      };
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section
      id="como-funciona"
      ref={root}
      className="process"
      aria-labelledby="process-title"
    >
      <div className="wrap">
        <div className="process__intro">
          <p className="process__eyebrow">Como funciona</p>
          <h2 id="process-title" className="font-display process__headline">
            Do briefing à entrega, tudo pensado para funcionar no evento.
          </h2>
          <p className="process__lead">
            Entendemos o contexto, indicamos o formato ideal, personalizamos a entrega e
            operamos no dia com equipe preparada.
          </p>
        </div>

        <div className="process__layout">
          <aside className="process__sticky" aria-hidden="true">
            <figure className="process__visual">
              <img
                src="/images/process-visual.png"
                alt=""
                width={576}
                height={1024}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="process__visual-caption">
                <p className="font-brand process__visual-mark">still happening.</p>
                <p>5 etapas · uma operação contínua</p>
              </figcaption>
            </figure>
          </aside>

          <div className="process__timeline">
            <div className="process__line" aria-hidden="true">
              <span className="process__line-fill" />
            </div>
            <ol>
              {processSteps.map((step, index) => (
                <li
                  key={step.n}
                  className={`process__step${index <= unlocked ? " is-active" : ""}`}
                >
                  <span className="process__marker" aria-hidden="true" />
                  <span className="process__n font-display">{step.n}</span>
                  <div className="process__step-copy">
                    <h3 className="font-display">{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="process__cta">
          <div className="process__cta-copy">
            <p className="process__cta-label">Pronto para o próximo evento?</p>
            <p>Conte o contexto — a gente indica o formato certo.</p>
          </div>
          <AnimatedButton
            href={createWhatsAppUrl(messages.evento)}
            external
            variant="primary"
            aria-label="Falar sobre meu evento no WhatsApp"
          >
            Falar sobre meu evento
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}
