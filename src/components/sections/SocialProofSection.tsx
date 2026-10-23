import { Star } from "lucide-react";
import {
  casamentosReviewsUrl,
  googleReviewsUrl,
  ratingSources,
  ratingSummary,
  testimonials,
} from "@/data/testimonials";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Reveal } from "@/components/ui/Reveal";
import "./SocialProofSection.css";

function RatingStars({
  rating,
  label,
  size = 15,
}: {
  rating: number;
  label?: string;
  size?: number;
}) {
  return (
    <div className="feedback-marquee__stars" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={size}
          strokeWidth={0}
          className={index < rating ? "is-filled" : "is-empty"}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function SocialProofSection() {
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="social-proof" aria-labelledby="social-proof-title">
      <div className="wrap social-proof__layout">
        <Reveal variant="fade-blur" className="social-proof__header">
          <div
            className="social-proof__score"
            role="group"
            aria-label={`Nota ${ratingSummary.rating.toFixed(1)} de 5, com mais de ${ratingSummary.count} avaliações no ${ratingSources.map((source) => source.name).join(" e no ")}`}
          >
            <div className="social-proof__score-head" aria-hidden="true">
              <RatingStars rating={Math.round(ratingSummary.rating)} size={18} />
              <span className="social-proof__score-value">
                {ratingSummary.rating.toFixed(1)}
              </span>
              <span className="social-proof__score-total">
                {ratingSummary.count}+ avaliações
              </span>
            </div>
            <ul className="social-proof__sources" aria-hidden="true">
              {ratingSources.map((source) => (
                <li key={source.id}>
                  <span className="social-proof__source-name">{source.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <h2 id="social-proof-title" className="font-display section-heading">
            <span className="title-accent">Confiança</span> construída em eventos reais
          </h2>
          <p className="social-proof__note">
            Avaliações reais de quem já levou a Imagenow para o evento.
          </p>
        </Reveal>

        <Reveal variant="soft" delay={0.12} className="social-proof__card">
          <h3 className="sr-only">Depoimentos de clientes no Google</h3>
          <div className="feedback-marquee">
            <ul className="feedback-marquee__track" aria-label="Avaliações do Google">
              {loop.map((item, index) => {
                const isClone = index >= testimonials.length;
                return (
                  <li
                    key={`${item.id}-${index}`}
                    className="feedback-marquee__item"
                    aria-hidden={isClone || undefined}
                  >
                    <blockquote>
                      <RatingStars
                        rating={item.rating}
                        label={`${item.rating} de 5 estrelas`}
                      />
                      <p>“{item.quote}”</p>
                      <footer>
                        <span className="feedback-marquee__name">{item.name}</span>
                        <span className="feedback-marquee__source">Google</span>
                      </footer>
                    </blockquote>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="wrap">
        <Reveal variant="fade-up" delay={0.16} className="social-proof__cta">
          <AnimatedButton
            href={googleReviewsUrl}
            external
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
          >
            + Avaliações Google
          </AnimatedButton>
          <AnimatedButton
            href={casamentosReviewsUrl}
            external
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
          >
            + Avaliações Casamentos.com.br
          </AnimatedButton>
        </Reveal>
      </div>
    </section>
  );
}
