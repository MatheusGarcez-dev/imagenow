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
  empty: "Informe a data e a senha do evento para continuar.",
  not_found: "Não encontramos uma galeria com esses dados. Confira e tente de novo.",
  inactive: "Essa galeria ainda não está disponível. Fale com a produção do evento.",
  expired: "O prazo de disponibilidade dessa galeria encerrou. Entre em contato com a Imagenow.",
} as const;

export function GalleriesPage() {
  const dateId = useId();
  const passwordId = useId();
  const errorId = useId();
  const [searchParams] = useSearchParams();
  const [eventDate, setEventDate] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const autoHandled = useRef(false);

  usePageMeta({
    title: "Fotos do seu evento | Imagenow",
    description:
      "Acesse as fotos do evento usando a data e a senha fornecida pela Imagenow. Disponíveis por 30 dias após o evento.",
    path: "/galerias",
  });

  useEffect(() => {
    if (autoHandled.current) return;
    const fromQuery = searchParams.get("code") ?? searchParams.get("c");
    if (!fromQuery) return;
    autoHandled.current = true;

    const normalized = normalizeGalleryCode(fromQuery);
    setPassword(normalized);

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

  function openGallery(rawPassword: string, date: string) {
    if (!rawPassword.trim() || !date) {
      setError(ERROR_COPY.empty);
      return;
    }

    const result = findGalleryByCode(rawPassword);

    if (!result.ok) {
      setError(ERROR_COPY[result.reason === "empty" ? "empty" : result.reason]);
      trackEvent("galeria_codigo_erro", {
        reason: result.reason,
        code: normalizeGalleryCode(rawPassword) || "(vazio)",
      });
      return;
    }

    if (result.entry.eventDate && result.entry.eventDate !== date) {
      setError(ERROR_COPY.not_found);
      trackEvent("galeria_codigo_erro", {
        reason: "date_mismatch",
        code: normalizeGalleryCode(rawPassword),
      });
      return;
    }

    setError(null);
    setPending(true);
    trackEvent("galeria_acessar", {
      code: normalizeGalleryCode(rawPassword),
      event_name: result.entry.name,
      client: result.entry.client ?? "",
    });

    window.location.assign(result.redirectUrl);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    openGallery(password, eventDate);
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
                <span>Fotos</span>
              </nav>
              <p className="galleries-page__eyebrow">Galerias de eventos</p>
              <h1 className="font-display">Fotos do seu evento</h1>
              <p className="galleries-page__lead">
                Acesse as fotos do evento usando a data e a senha fornecida pela Imagenow.
              </p>
              <p className="galleries-page__availability">
                Disponíveis por 30 dias após o evento.
              </p>
            </Reveal>
          </div>
        </header>

        <div className="wrap galleries-page__body">
          <Reveal variant="scale-blur" delay={0.06}>
            <form className="galleries-page__form" onSubmit={onSubmit} noValidate>
              <div className="galleries-page__fields">
                <div>
                  <label className="galleries-page__label" htmlFor={dateId}>
                    Data do evento
                  </label>
                  <input
                    id={dateId}
                    name="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => {
                      setEventDate(e.target.value);
                      if (error) setError(null);
                    }}
                    aria-invalid={error ? true : undefined}
                    className="galleries-page__input"
                  />
                </div>
                <div>
                  <label className="galleries-page__label" htmlFor={passwordId}>
                    Senha
                  </label>
                  <input
                    id={passwordId}
                    name="password"
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    placeholder="Senha fornecida pela Imagenow"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value.toUpperCase());
                      if (error) setError(null);
                    }}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errorId : undefined}
                    className="galleries-page__input"
                  />
                </div>
              </div>

              <div className="galleries-page__row">
                <AnimatedButton
                  type="submit"
                  variant="dark"
                  className="galleries-page__submit"
                  showIcon={!pending}
                  aria-label="Acessar fotos"
                >
                  {pending ? "Abrindo…" : "Acessar fotos"}
                </AnimatedButton>
              </div>
              {error ? (
                <p id={errorId} className="galleries-page__error" role="alert">
                  {error}
                </p>
              ) : (
                <p className="galleries-page__hint">
                  Use a data do evento e a senha enviada pela Imagenow (QR Code, material do
                  evento ou mensagem da produção).
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
              Disponíveis por 30 dias após o evento. Caso não encontre sua galeria ou queira
              solicitar a remoção de alguma imagem, entre em contato com a Imagenow.
            </p>
          </Reveal>
        </div>
      </article>
    </>
  );
}
