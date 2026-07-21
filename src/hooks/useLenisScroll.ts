import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function isTouchOrMobile() {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(max-width: 1023px)").matches ||
    window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0
  );
}

export function useLenisScroll() {
  useEffect(() => {
    // Mobile/touch: nunca inicializar Lenis
    if (
      isTouchOrMobile() ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      document.documentElement.style.removeProperty("height");
      document.body.style.removeProperty("height");
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("top");
      document.body.style.removeProperty("width");
      ScrollTrigger.normalizeScroll(false);
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 0,
    });

    document.documentElement.classList.add("lenis", "lenis-smooth");

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      event.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -24 });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      gsap.ticker.remove(ticker);
      document.removeEventListener("click", onAnchorClick);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, []);
}
