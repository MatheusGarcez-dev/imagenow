import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";
import { siteConfig, messages, navLinks } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import "./Footer.css";

const year = new Date().getFullYear();

const socialLinks = [
  {
    label: "WhatsApp",
    href: createWhatsAppUrl(messages.proposta),
    icon: WhatsAppIcon,
  },
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    icon: Instagram,
  },
] as const;

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
              <WhatsAppIcon size={16} />
              Solicitar proposta
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
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </li>
                <li>
                  <span>{siteConfig.city}</span>
                </li>
              </ul>
              <p className="site-footer__heading site-footer__heading--social">Social</p>
              <ul className="site-footer__socials">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="site-footer__social"
                      aria-label={`${label} da Imagenow`}
                    >
                      <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
                      {label}
                    </a>
                  </li>
                ))}
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
