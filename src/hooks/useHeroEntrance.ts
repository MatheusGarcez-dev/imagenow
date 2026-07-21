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

      const media = el.querySelector(".hero__media");
      const badge = el.querySelector(".hero__badge");
      const title = el.querySelector(".hero__title");
      const lead = el.querySelector(".hero__lead");
      const ctas = el.querySelector(".hero__ctas");
      const brands = el.querySelector(".hero__brands");
      const targets = [media, badge, title, lead, ctas, brands].filter(Boolean);

      if (reduced) {
        gsap.set(targets, { clearProps: "all", opacity: 1, filter: "none" });
        return;
      }

      const mobile = window.matchMedia("(max-width: 1023px)").matches;
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          gsap.set(targets, { clearProps: "filter,transform" });
        },
      });

      if (media) {
        tl.fromTo(
          media,
          mobile
            ? { opacity: 0 }
            : { opacity: 0, scale: 1.04, filter: "blur(12px)" },
          mobile
            ? { opacity: 1, duration: 0.9 }
            : { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.35 },
          0,
        );
      }

      tl.fromTo(
        badge,
        { opacity: 0, y: mobile ? 10 : 14 },
        { opacity: 1, y: 0, duration: 0.65 },
        mobile ? 0.15 : 0.3,
      )
        .fromTo(
          title,
          { opacity: 0, y: mobile ? 18 : 32 },
          { opacity: 1, y: 0, duration: mobile ? 0.75 : 1 },
          mobile ? 0.22 : 0.4,
        )
        .fromTo(
          lead,
          { opacity: 0, y: mobile ? 12 : 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          mobile ? 0.35 : 0.62,
        )
        .fromTo(
          ctas,
          { opacity: 0, y: mobile ? 10 : 16 },
          { opacity: 1, y: 0, duration: 0.65 },
          mobile ? 0.45 : 0.8,
        )
        .fromTo(
          brands,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.7 },
          mobile ? 0.55 : 0.95,
        );
    },
    { scope: root, dependencies: [enabled, reduced], revertOnUpdate: true },
  );

  return root;
}
