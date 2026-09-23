import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

type Options = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

export function useInView<T extends HTMLElement>(options: Options = {}) {
  const { threshold = 0.2, rootMargin = "0px", once = true } = options;
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.dataset.inview = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.inview = "true";
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.dataset.inview = "false";
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, reduced]);

  return ref;
}
