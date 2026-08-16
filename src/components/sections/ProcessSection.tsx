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

const LAST_STEP = processSteps.length - 1;

function progressToIndex(progress: number) {
  if (progress <= 0.04) return 0;
  return Math.min(LAST_STEP, Math.max(0, Math.round(progress * LAST_STEP)));
}

export function ProcessSection() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [unlocked, setUnlocked] = useState(reduced ? LAST_STEP : 0);

  useGSAP(
    () => {
      if (!root.current) return;

      const section = root.current;
      const timeline = section.querySelector<HTMLElement>(".process__timeline");
      const lineTrack = section.querySelector<HTMLElement>(".process__line");
      const lineFill = section.querySelector<HTMLElement>(".process__line-fill");
      const steps = gsap.utils.toArray<HTMLElement>(".process__step", section);
      const markers = steps
        .map((step) => step.querySelector<HTMLElement>(".process__marker"))
        .filter((marker): marker is HTMLElement => Boolean(marker));

      const syncUnlocked = (index: number) => {
        setUnlocked((current) => (current === index ? current : index));
      };

      const applyProgress = (progress: number) => {
        if (lineFill) gsap.set(lineFill, { scaleX: progress });
        syncUnlocked(progressToIndex(progress));
      };

      const pinLineToMarkers = () => {
        if (!timeline || !lineTrack || markers.length < 2) return;

        const timelineBox = timeline.getBoundingClientRect();
        const firstBox = markers[0].getBoundingClientRect();
        const lastBox = markers[markers.length - 1].getBoundingClientRect();

        const firstCenter =
          firstBox.left + firstBox.width / 2 - timelineBox.left + timeline.scrollLeft;
        const lastCenter =
          lastBox.left + lastBox.width / 2 - timelineBox.left + timeline.scrollLeft;

        lineTrack.style.left = `${firstCenter}px`;
        lineTrack.style.right = "auto";
        lineTrack.style.width = `${Math.max(0, lastCenter - firstCenter)}px`;
      };

      pinLineToMarkers();
      requestAnimationFrame(pinLineToMarkers);

      if (reduced) {
        applyProgress(1);
        return;
      }

      gsap.from(".process__intro > *", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process__intro",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(steps, {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process__timeline-shell",
          start: "top 90%",
          once: true,
        },
      });

      const mm = gsap.matchMedia();

      // Desktop: pin da seção + scrub longo (experiência controlada)
      mm.add("(min-width: 900px)", () => {
        if (!lineFill) return;

        applyProgress(0);

        ScrollTrigger.create({
          trigger: section,
          start: "top top+=72",
          end: () => `+=${Math.round(window.innerHeight * 1.05)}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: pinLineToMarkers,
          onUpdate: (self) => applyProgress(self.progress),
          onLeave: () => applyProgress(1),
          onLeaveBack: () => applyProgress(0),
        });
      });

      // Mobile: scrub na seção inteira (começa cedo) + sync no scroll horizontal
      mm.add("(max-width: 899px)", () => {
        if (!lineFill) return;

        applyProgress(0);

        ScrollTrigger.create({
          trigger: section,
          start: "top 75%",
          end: "bottom 20%",
          scrub: 0.4,
          invalidateOnRefresh: true,
          onRefresh: pinLineToMarkers,
          onUpdate: (self) => applyProgress(self.progress),
          onLeave: () => applyProgress(1),
          onLeaveBack: () => applyProgress(0),
        });

        const onTimelineScroll = () => {
          pinLineToMarkers();
          if (!timeline) return;
          const max = timeline.scrollWidth - timeline.clientWidth;
          if (max <= 8) return;
          applyProgress(timeline.scrollLeft / max);
        };

        timeline?.addEventListener("scroll", onTimelineScroll, { passive: true });
        return () => timeline?.removeEventListener("scroll", onTimelineScroll);
      });

      ScrollTrigger.addEventListener("refreshInit", pinLineToMarkers);
      ScrollTrigger.addEventListener("refresh", pinLineToMarkers);
      window.addEventListener("resize", pinLineToMarkers);

      return () => {
        mm.revert();
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
          <p className="process__eyebrow">Processo</p>
          <h2 id="process-title" className="font-display process__headline">
            Do briefing à entrega, tudo pensado para{" "}
            <strong>funcionar no evento.</strong>
          </h2>
          <p className="process__lead">
            Entendemos o contexto, indicamos o formato ideal, personalizamos a entrega e
            operamos no dia com equipe preparada.
          </p>
        </div>
      </div>

      <div className="process__timeline-shell">
        <div className="process__timeline" tabIndex={0} aria-label="Etapas do processo">
          <div className="process__line" aria-hidden="true">
            <span className="process__line-fill" />
          </div>
          <ol>
            {processSteps.map((step, index) => (
              <li
                key={step.n}
                className={`process__step${index <= unlocked ? " is-active" : ""}`}
              >
                <span className="process__marker" aria-hidden="true">
                  <span className="process__n font-display">{step.n}</span>
                </span>
                <div className="process__step-copy">
                  <h3 className="font-display">{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="wrap process__cta">
        <AnimatedButton
          href={createWhatsAppUrl(messages.evento)}
          external
          variant="primary"
          aria-label="Falar sobre meu evento no WhatsApp"
        >
          Falar sobre meu evento
        </AnimatedButton>
      </div>
    </section>
  );
}
