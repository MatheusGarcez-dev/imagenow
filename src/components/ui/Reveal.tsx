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
  { y?: number; x?: number; scale?: number; blur: number }
> = {
  "fade-up": { y: 28, blur: 8 },
  "fade-down": { y: -20, blur: 6 },
  "fade-left": { x: 28, blur: 8 },
  "fade-right": { x: -28, blur: 8 },
  "fade-blur": { y: 16, blur: 12 },
  "scale-blur": { y: 20, scale: 0.97, blur: 10 },
  soft: { y: 16, blur: 4 },
};

function isMobileViewport() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches;
}

export function Reveal({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  duration = 1.05,
  blur,
  y,
  x,
  start = "top 90%",
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
        gsap.set(el, { clearProps: "all", autoAlpha: 1 });
        return;
      }

      const mobile = isMobileViewport();
      const preset = VARIANT_FROM[variant];

      // Mobile: sem animação de entrada — prioriza scroll fluido no iOS
      if (mobile) {
        gsap.set(el, { clearProps: "all", autoAlpha: 1 });
        return;
      }

      const useBlur = (blur ?? preset.blur) > 0;
      const fromBlur = useBlur ? (blur ?? preset.blur) : 0;
      const moveY = y ?? preset.y ?? 0;
      const moveX = x ?? preset.x ?? 0;

      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
          y: moveY,
          x: moveX,
          scale: mobile ? 1 : (preset.scale ?? 1),
          ...(useBlur ? { filter: `blur(${fromBlur}px)` } : {}),
        },
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          ...(useBlur ? { filter: "blur(0px)" } : {}),
          duration: mobile ? Math.min(duration, 0.7) : duration,
          delay,
          ease: "power2.out",
          clearProps: "filter,transform",
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
      style={style}
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
  start = "top 92%",
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
        gsap.set(items, { clearProps: "all", autoAlpha: 1 });
        return;
      }

      if (isMobileViewport()) {
        gsap.set(items, { clearProps: "all", autoAlpha: 1 });
        return;
      }

      const preset = VARIANT_FROM[variant];
      const useBlur = preset.blur > 0;

      gsap.fromTo(
        items,
        {
          autoAlpha: 0,
          y: preset.y ?? 0,
          x: preset.x ?? 0,
          scale: preset.scale ?? 1,
          ...(useBlur ? { filter: `blur(${preset.blur}px)` } : {}),
        },
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          ...(useBlur ? { filter: "blur(0px)" } : {}),
          duration,
          delay,
          stagger,
          ease: "power2.out",
          clearProps: "filter,transform",
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
