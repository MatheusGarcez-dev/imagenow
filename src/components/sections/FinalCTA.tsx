import { messages } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Reveal } from "@/components/ui/Reveal";
import "./FinalCTA.css";

export function FinalCTA() {
  return (
    <section id="contato" className="final-cta" aria-labelledby="final-cta-title">
      <div className="wrap">
        <Reveal variant="scale-blur" duration={1.2} className="final-cta__shell">
          <div className="final-cta__media" aria-hidden="true">
            <img src="/images/hero-bg.png" alt="" loading="lazy" />
          </div>
          <div className="final-cta__card">
            <h2 id="final-cta-title" className="font-display">
              Vamos conversar sobre o seu evento?
            </h2>
            <p>
              Cada projeto tem um formato, um público e um objetivo. A Imagenow ajuda a
              estruturar a solução mais adequada para o seu contexto.
            </p>
            <AnimatedButton
              href={createWhatsAppUrl(messages.proposta)}
              external
              variant="dark"
              aria-label="Solicitar proposta pelo WhatsApp"
            >
              Solicitar proposta
            </AnimatedButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
