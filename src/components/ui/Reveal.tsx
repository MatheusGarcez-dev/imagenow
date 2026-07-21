import { useRef, type ReactNode, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade-blur"
  | "scale-blur"
  | "soft";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  blur?: number;
  y?: number;
  x?: number;
  start?: string;
  once?: boolean;
  style?: CSSProperties;
};

const VARIANT_FROM: Record<
  RevealVariant,
  { y?: number; x?: number; scale?: number; blur: number; opacity: number }
> = {
  "fade-up": { y: 36, blur: 10, opacity: 0 },
  "fade-down": { y: -28, blur: 8, opacity: 0 },
  "fade-left": { x: 40, blur: 12, opacity: 0 },
  "fade-right": { x: -40, blur: 12, opacity: 0 },
  "fade-blur": { y: 18, blur: 16, opacity: 0 },
  "scale-blur": { y: 24, scale: 0.96, blur: 14, opacity: 0 },
  soft: { y: 20, blur: 6, opacity: 0 },
};

export function Reveal({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  duration = 1.05,
  blur,
  y,
  x,
  start = "top 88%",
  once = true,
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (reduced) {
        gsap.set(el, { clearProps: "all", autoAlpha: 1, filter: "none" });
        return;
      }

      const preset = VARIANT_FROM[variant];
      const fromBlur = blur ?? preset.blur;

      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
          y: y ?? preset.y ?? 0,
          x: x ?? preset.x ?? 0,
          scale: preset.scale ?? 1,
          filter: `blur(${fromBlur}px)`,
        },
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        },
      );
    },
    {
      dependencies: [variant, delay, duration, blur, y, x, start, once, reduced],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ visibility: reduced ? undefined : "hidden", ...style }}
    >
      {children}
    </div>
  );
}

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  childSelector?: string;
  variant?: RevealVariant;
  stagger?: number;
  delay?: number;
  duration?: number;
  start?: string;
  once?: boolean;
};

export function RevealStagger({
  children,
  className = "",
  childSelector,
  variant = "fade-up",
  stagger = 0.09,
  delay = 0,
  duration = 0.95,
  start = "top 90%",
  once = true,
}: RevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const items = childSelector
        ? Array.from(el.querySelectorAll<HTMLElement>(childSelector))
        : (Array.from(el.children) as HTMLElement[]);

      if (!items.length) return;

      if (reduced) {
        gsap.set(items, { clearProps: "all", autoAlpha: 1, filter: "none" });
        return;
      }

      const preset = VARIANT_FROM[variant];

      gsap.fromTo(
        items,
        {
          autoAlpha: 0,
          y: preset.y ?? 0,
          x: preset.x ?? 0,
          scale: preset.scale ?? 1,
          filter: `blur(${preset.blur}px)`,
        },
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        },
      );
    },
    {
      dependencies: [childSelector, variant, stagger, delay, duration, start, once, reduced],
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={ref} className={`reveal-stagger ${className}`.trim()}>
      {children}
    </div>
  );
}
