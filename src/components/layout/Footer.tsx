import { Link } from "react-router-dom";
import { ArrowUpRight, Instagram } from "lucide-react";
import { siteConfig, messages, navLinks } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { Reveal } from "@/components/ui/Reveal";
import "./Footer.css";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <Reveal variant="fade-up" className="site-footer__top">
          <div className="site-footer__brand">
            <img
              src="/images/logo-imagenow.png"
              alt="imagenow"
              width={168}
              height={38}
              className="site-footer__logo"
              decoding="async"
            />
            <p className="site-footer__tagline">{siteConfig.tagline}</p>
            <p className="site-footer__lead">
              Soluções para eventos corporativos, ações de marca e celebrações sociais.
            </p>
            <a
              className="site-footer__cta"
              href={createWhatsAppUrl(messages.proposta)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar proposta
              <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

          <div className="site-footer__cols">
            <div className="site-footer__col">
              <p className="site-footer__heading">Navegação</p>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("/") && !link.href.includes("#") ? (
                      <Link to={link.href}>{link.label}</Link>
                    ) : (
                      <a href={link.href}>{link.label}</a>
                    )}
                  </li>
                ))}
                <li>
                  <Link to="/politica-de-privacidade">Privacidade</Link>
                </li>
              </ul>
            </div>

            <div className="site-footer__col">
              <p className="site-footer__heading">Contato</p>
              <ul>
                <li>
                  <a
                    href={createWhatsAppUrl(messages.proposta)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </li>
                <li>
                  <span>{siteConfig.city}</span>
                </li>
                <li>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer__social"
                    aria-label="Instagram da Imagenow"
                  >
                    <Instagram size={15} strokeWidth={1.75} aria-hidden="true" />
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal variant="soft" delay={0.08} className="site-footer__bottom">
          <p>
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p className="site-footer__still">{siteConfig.tagline}</p>
        </Reveal>
      </div>
    </footer>
  );
}
