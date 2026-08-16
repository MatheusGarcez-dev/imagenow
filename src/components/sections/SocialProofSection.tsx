import { Star } from "lucide-react";
import {
  casamentosReviewsUrl,
  googleRatingSummary,
  googleReviewsUrl,
  testimonials,
} from "@/data/testimonials";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Reveal } from "@/components/ui/Reveal";
import "./SocialProofSection.css";

function RatingStars({ rating, label }: { rating: number; label: string }) {
  return (
    <div className="feedback-marquee__stars" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={15}
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
      <div className="wrap">
        <Reveal variant="fade-blur" className="social-proof__header">
          <p className="social-proof__rating" aria-label="5.0 no Google, mais de 100 avaliações">
            ⭐ {googleRatingSummary.rating.toFixed(1)} no Google •{" "}
            {googleRatingSummary.countLabel} avaliações
          </p>
          <h2 id="social-proof-title" className="font-display">
            Confiança construída em eventos reais.
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

        <Reveal variant="fade-up" delay={0.16} className="social-proof__cta">
          <AnimatedButton
            href={googleReviewsUrl}
            external
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
          >
            Ver mais avaliações no Google
          </AnimatedButton>
          <AnimatedButton
            href={casamentosReviewsUrl}
            external
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
          >
            Avaliações no Casamentos.com
          </AnimatedButton>
        </Reveal>
      </div>
    </section>
  );
}
