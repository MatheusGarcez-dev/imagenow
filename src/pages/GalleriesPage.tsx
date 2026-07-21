import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { findGalleryByCode, normalizeGalleryCode } from "@/data/galleries";
import { messages, siteConfig } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/common/JsonLd";
import { usePageMeta } from "@/hooks/usePageMeta";
import { breadcrumbJsonLd } from "@/lib/seo";
import "./GalleriesPage.css";

const ERROR_COPY = {
  empty: "Digite o código do evento para continuar.",
  not_found: "Não encontramos uma galeria com esse código. Confira e tente de novo.",
  inactive: "Essa galeria ainda não está disponível. Fale com a produção do evento.",
  expired: "O prazo de disponibilidade dessa galeria encerrou. Entre em contato com a Imagenow.",
} as const;

export function GalleriesPage() {
  const inputId = useId();
  const errorId = useId();
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const autoHandled = useRef(false);

  usePageMeta({
    title: "Galerias de Eventos | Imagenow",
    description:
      "Acesse as fotos do seu evento Imagenow. Digite o código recebido para abrir sua galeria, baixar imagens e reviver os momentos registrados.",
    path: "/galerias",
  });

  useEffect(() => {
    if (autoHandled.current) return;
    const fromQuery = searchParams.get("code") ?? searchParams.get("c");
    if (!fromQuery) return;
    autoHandled.current = true;

    const normalized = normalizeGalleryCode(fromQuery);
    setCode(normalized);

    const result = findGalleryByCode(normalized);
    if (result.ok) {
      setPending(true);
      trackEvent("galeria_acessar", {
        code: normalized,
        event_name: result.entry.name,
        client: result.entry.client ?? "",
        via: "query",
      });
      window.location.assign(result.redirectUrl);
      return;
    }

    setError(ERROR_COPY[result.reason]);
    trackEvent("galeria_codigo_erro", {
      reason: result.reason,
      code: normalized || "(vazio)",
      via: "query",
    });
  }, [searchParams]);

  function openGallery(raw: string) {
    const result = findGalleryByCode(raw);

    if (!result.ok) {
      setError(ERROR_COPY[result.reason]);
      trackEvent("galeria_codigo_erro", {
        reason: result.reason,
        code: normalizeGalleryCode(raw) || "(vazio)",
      });
      return;
    }

    setError(null);
    setPending(true);
    trackEvent("galeria_acessar", {
      code: normalizeGalleryCode(raw),
      event_name: result.entry.name,
      client: result.entry.client ?? "",
    });

    window.location.assign(result.redirectUrl);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    openGallery(code);
  }

  return (
    <>
      <JsonLd
        data={[breadcrumbJsonLd([{ name: "Galerias", path: "/galerias" }])]}
      />

      <article className="galleries-page">
        <header className="galleries-page__hero">
          <div className="wrap">
            <Reveal variant="fade-blur" duration={1.1}>
              <nav className="galleries-page__crumbs" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span>Galerias</span>
              </nav>
              <p className="galleries-page__eyebrow">Galerias de eventos</p>
              <h1 className="font-display">Acesse as fotos do seu evento</h1>
              <p className="galleries-page__lead">
                O evento continua aqui. Digite o código recebido para abrir sua galeria,
                baixar suas imagens e reviver os momentos registrados pela Imagenow.
              </p>
            </Reveal>
          </div>
        </header>

        <div className="wrap galleries-page__body">
          <Reveal variant="scale-blur" delay={0.06}>
            <form className="galleries-page__form" onSubmit={onSubmit} noValidate>
              <label className="galleries-page__label" htmlFor={inputId}>
                Código do evento
              </label>
              <div className="galleries-page__row">
                <input
                  id={inputId}
                  name="code"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  placeholder="Ex.: LEVISPIET2026"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    if (error) setError(null);
                  }}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                  className="galleries-page__input"
                />
                <AnimatedButton
                  type="submit"
                  variant="dark"
                  className="galleries-page__submit"
                  showIcon={!pending}
                  aria-label="Acessar galeria"
                >
                  {pending ? "Abrindo…" : "Acessar galeria"}
                </AnimatedButton>
              </div>
              {error ? (
                <p id={errorId} className="galleries-page__error" role="alert">
                  {error}
                </p>
              ) : (
                <p className="galleries-page__hint">
                  O código costuma vir no QR Code, no material do evento ou na mensagem enviada
                  pela produção. A senha ou PIN da galeria, quando existir, é pedida no Pixieset.
                </p>
              )}
            </form>
          </Reveal>

          <Reveal variant="fade-up" delay={0.12}>
            <aside className="galleries-page__notice" aria-label="Privacidade">
              <p className="galleries-page__notice-title">Privacidade</p>
              <p>
                As galerias ficam disponíveis por tempo limitado e não são listadas
                publicamente. Fotos com pessoas identificáveis são tratadas com cuidado;
                se precisar solicitar a remoção de alguma imagem, fale com a Imagenow.
              </p>
              <div className="galleries-page__notice-actions">
                <a href={`mailto:${siteConfig.email}?subject=Remo%C3%A7%C3%A3o%20de%20imagem%20-%20galeria`}>
                  Solicitar remoção
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={createWhatsAppUrl(messages.galeria)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                <span aria-hidden="true">·</span>
                <Link to="/politica-de-privacidade">Política de privacidade</Link>
              </div>
            </aside>
          </Reveal>

          <Reveal variant="soft" delay={0.16}>
            <p className="galleries-page__footer-note">
              As galerias ficam disponíveis por tempo limitado. Caso não encontre seu evento
              ou queira solicitar a remoção de alguma imagem, entre em contato com a Imagenow.
            </p>
          </Reveal>
        </div>
      </article>
    </>
  );
}
