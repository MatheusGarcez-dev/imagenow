import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(useGSAP);

type HeroEntranceProps = {
  scopeSelector?: string;
};

/** Entrada no load do hero — stagger suave com blur */
export function useHeroEntrance(enabled = true) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !enabled) return;

      const media = el.querySelector(".hero__media");
      const badge = el.querySelector(".hero__badge");
      const title = el.querySelector(".hero__title");
      const lead = el.querySelector(".hero__lead");
      const ctas = el.querySelector(".hero__ctas");
      const brands = el.querySelector(".hero__brands");

      if (reduced) {
        gsap.set([media, badge, title, lead, ctas, brands].filter(Boolean), {
          clearProps: "all",
          opacity: 1,
          filter: "none",
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (media) {
        tl.fromTo(
          media,
          { opacity: 0, scale: 1.06, filter: "blur(18px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.45 },
          0,
        );
      }

      tl.fromTo(
        badge,
        { opacity: 0, y: 16, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
        0.35,
      )
        .fromTo(
          title,
          { opacity: 0, y: 40, filter: "blur(14px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1 },
          0.45,
        )
        .fromTo(
          lead,
          { opacity: 0, y: 24, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
          0.7,
        )
        .fromTo(
          ctas,
          { opacity: 0, y: 20, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85 },
          0.88,
        )
        .fromTo(
          brands,
          { opacity: 0, y: 18, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
          1.05,
        );
    },
    { scope: root, dependencies: [enabled, reduced], revertOnUpdate: true },
  );

  return root;
}

export type { HeroEntranceProps };
