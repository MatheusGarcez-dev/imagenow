import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(useGSAP);

/** Entrada no load do hero — stagger suave (blur só no desktop) */
export function useHeroEntrance(enabled = true) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !enabled) return;

      const wash = el.querySelector(".hero__media");
      const panel = el.querySelector(".hero__panel");
      const badge = el.querySelector(".hero__badge");
      const kicker = el.querySelector(".hero__kicker");
      const title = el.querySelector(".hero__title");
      const sign = el.querySelector(".hero__sign");
      const lead = el.querySelector(".hero__lead");
      const ctas = el.querySelector(".hero__ctas");
      const pager = el.querySelector(".hero__pager");
      const targets = [wash, panel, badge, kicker, title, sign, lead, ctas, pager].filter(
        Boolean,
      );

      if (reduced) {
        gsap.set(targets, { clearProps: "all", opacity: 1, filter: "none" });
        return;
      }

      const mobile = window.matchMedia("(max-width: 959px)").matches;
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          gsap.set(targets, { clearProps: "filter,transform" });
        },
      });

      if (wash) {
        tl.fromTo(
          wash,
          mobile ? { opacity: 0 } : { opacity: 0, scale: 1.05 },
          mobile
            ? { opacity: 1, duration: 0.85 }
            : { opacity: 1, scale: 1, duration: 1.2 },
          0,
        );
      }

      if (panel) {
        tl.fromTo(
          panel,
          mobile
            ? { opacity: 0, y: 16 }
            : { opacity: 0, y: 24, filter: "blur(8px)" },
          mobile
            ? { opacity: 1, y: 0, duration: 0.75 }
            : { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.95 },
          mobile ? 0.1 : 0.16,
        );
      }

      tl.fromTo(
        badge,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        mobile ? 0.28 : 0.4,
      )
        .fromTo(
          kicker,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.55 },
          mobile ? 0.34 : 0.48,
        )
        .fromTo(
          title,
          { opacity: 0, y: mobile ? 18 : 26 },
          { opacity: 1, y: 0, duration: mobile ? 0.7 : 0.9 },
          mobile ? 0.4 : 0.56,
        )
        .fromTo(
          [sign, lead].filter(Boolean),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.05 },
          mobile ? 0.52 : 0.72,
        )
        .fromTo(
          ctas,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.55 },
          mobile ? 0.62 : 0.86,
        )
        .fromTo(
          pager,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.45 },
          mobile ? 0.72 : 0.98,
        );
    },
    { scope: root, dependencies: [enabled, reduced], revertOnUpdate: true },
  );

  return root;
}
