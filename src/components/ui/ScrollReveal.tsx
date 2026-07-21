import { useMemo, useRef, type ReactNode, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ScrollRevealProps = {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  id?: string;
};

export function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
  id,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el || reduced) return;

      const scroller =
        scrollContainerRef?.current && scrollContainerRef.current
          ? scrollContainerRef.current
          : undefined;

      gsap.fromTo(
        el,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            ...(scroller ? { scroller } : {}),
            start: "top bottom",
            end: rotationEnd,
            scrub: 1.4,
          },
        },
      );

      const wordElements = el.querySelectorAll(".word");

      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: "opacity" },
        {
          ease: "none",
          opacity: 1,
          stagger: 0.03,
          scrollTrigger: {
            trigger: el,
            ...(scroller ? { scroller } : {}),
            start: "top 90%",
            end: wordAnimationEnd,
            scrub: 1.6,
          },
        },
      );

      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: "none",
            filter: "blur(0px)",
            stagger: 0.03,
            scrollTrigger: {
              trigger: el,
              ...(scroller ? { scroller } : {}),
              start: "top 90%",
              end: wordAnimationEnd,
              scrub: 1.6,
            },
          },
        );
      }
    },
    {
      scope: containerRef,
      dependencies: [
        scrollContainerRef,
        enableBlur,
        baseRotation,
        baseOpacity,
        rotationEnd,
        wordAnimationEnd,
        blurStrength,
        reduced,
      ],
      revertOnUpdate: true,
    },
  );

  return (
    <h2
      id={id}
      ref={containerRef}
      className={`scroll-reveal ${containerClassName}`.trim()}
    >
      <span
        className={`scroll-reveal__text block font-semibold leading-[1.45] ${textClassName}`.trim()}
      >
        {typeof children === "string" ? splitText : children}
      </span>
    </h2>
  );
}

export default ScrollReveal;
