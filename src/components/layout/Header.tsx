import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks, messages } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import "./Header.css";

function NavLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  const location = useLocation();
  const isRoute = href.startsWith("/") && !href.includes("#");
  const active = isRoute
    ? location.pathname === href
    : location.hash === href.replace("/#", "#") ||
      (href.includes("#") && location.pathname === "/" && location.hash === `#${href.split("#")[1]}`);

  if (isRoute) {
    return (
      <Link
        to={href}
        className={active ? "is-active" : undefined}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
      >
        {label}
      </Link>
    );
  }

  return (
    <a href={href} className={active ? "is-active" : undefined} onClick={onNavigate}>
      {label}
    </a>
  );
}

export function Header() {
  const [sticky, setSticky] = useState(false);
  const [forming, setForming] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuId = useId();
  const openRef = useRef<HTMLButtonElement>(null);
  const wasSticky = useRef(false);

  useEffect(() => {
    let formTimer = 0;
    let primed = false;
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      const next = y > 24;
      if (!primed) {
        primed = true;
        wasSticky.current = next;
        setSticky(next);
        return;
      }
      const canForm =
        next &&
        !wasSticky.current &&
        window.matchMedia("(min-width: 1024px)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (canForm) {
        setForming(true);
        window.clearTimeout(formTimer);
        formTimer = window.setTimeout(() => setForming(false), 550);
      }
      wasSticky.current = next;
      setSticky(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(formTimer);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`site-header ${sticky ? "is-sticky" : ""} ${forming ? "is-forming" : ""} ${open ? "is-open" : ""}`}
      >
        <div className="site-header__shell">
          <Link to="/" className="site-header__logo" aria-label="Imagenow home">
            <img
              src="/images/logo-imagenow.png"
              alt=""
              width={148}
              height={34}
              decoding="async"
            />
          </Link>

          <nav className="site-header__nav" aria-label="Principal">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          <div className="site-header__actions">
            <AnimatedButton
              href={createWhatsAppUrl(messages.proposta)}
              external
              variant="compact"
              className="site-header__cta"
              aria-label="Solicitar proposta pelo WhatsApp"
            >
              Solicitar proposta
            </AnimatedButton>
            <button
              ref={openRef}
              type="button"
              className="site-header__menu-btn"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="site-header__menu-icon" data-open={open || undefined}>
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id={menuId}
        className={`mobile-menu ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <button
          type="button"
          className="mobile-menu__backdrop"
          aria-label="Fechar menu"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        />
        <div
          className="mobile-menu__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <nav className="mobile-menu__nav" aria-label="Mobile">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </nav>
          <div className="mobile-menu__footer">
            <AnimatedButton
              href={createWhatsAppUrl(messages.proposta)}
              external
              variant="primary"
              className="mobile-menu__cta"
              aria-label="Solicitar proposta pelo WhatsApp"
            >
              Solicitar proposta
            </AnimatedButton>
          </div>
        </div>
      </div>
    </>
  );
}
