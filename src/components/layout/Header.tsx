import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { navLinks, messages, siteConfig } from "@/data/site";
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
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const wasSticky = useRef(false);

  useEffect(() => {
    let formTimer = 0;
    let primed = false;
    const onScroll = () => {
      const next = window.scrollY > 32;
      if (!primed) {
        primed = true;
        wasSticky.current = next;
        setSticky(next);
        return;
      }
      if (next && !wasSticky.current) {
        setForming(true);
        window.clearTimeout(formTimer);
        formTimer = window.setTimeout(() => setForming(false), 600);
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
    const previous = document.body.style.overflow;
    const openButton = openRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      openButton?.focus();
    };
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
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <div className="mobile-menu__top">
          <Link to="/" className="site-header__logo" onClick={() => setOpen(false)}>
            <img
              src="/images/logo-imagenow.png"
              alt=""
              width={148}
              height={34}
              decoding="async"
            />
          </Link>
          <button
            ref={closeRef}
            type="button"
            className="mobile-menu__close"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
          >
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>

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
            aria-label="Solicitar proposta pelo WhatsApp"
          >
            Solicitar proposta
          </AnimatedButton>
          <p className="mobile-menu__meta">{siteConfig.tagline}</p>
        </div>
      </div>
    </>
  );
}
