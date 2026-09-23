import { Link } from "react-router-dom";
import { ArrowUpRight, Facebook, Instagram, Linkedin } from "lucide-react";
import { siteConfig, messages, navLinks } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { Reveal } from "@/components/ui/Reveal";
import "./Footer.css";

const year = new Date().getFullYear();

function WhatsAppIcon({ size = 15 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
  {
    label: "Facebook",
    href: siteConfig.social.facebook,
    icon: Facebook,
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
