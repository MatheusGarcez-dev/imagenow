import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const HOME_SCROLL_KEY = "imagenow:home-scroll";

function readScrollY() {
  return window.scrollY || document.documentElement.scrollTop || 0;
}

function writeScrollY(y: number) {
  window.scrollTo({ top: y, left: 0, behavior: "auto" });
}

/**
 * Restaura a posição da home ao voltar de /quem-somos
 * (em vez de sempre ir para o topo).
 */
export function useRouteScroll() {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    const prev = prevPath.current;
    const next = location.pathname;

    if (prev === "/" && next !== "/") {
      sessionStorage.setItem(HOME_SCROLL_KEY, String(readScrollY()));
    }

    const frame = window.requestAnimationFrame(() => {
      if (next === "/" && location.hash) {
        const id = location.hash.slice(1);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        prevPath.current = next;
        return;
      }

      if (next === "/" && prev === "/quem-somos" && !location.hash) {
        const raw = sessionStorage.getItem(HOME_SCROLL_KEY);
        const y = raw ? Number(raw) : 0;
        if (Number.isFinite(y) && y > 0) {
          writeScrollY(y);
          sessionStorage.removeItem(HOME_SCROLL_KEY);
        }
        prevPath.current = next;
        return;
      }

      if (next !== prev) {
        writeScrollY(0);
      }

      prevPath.current = next;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);
}
