import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroBentoSection } from "@/components/sections/IntroBentoSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { EventRhythmSection } from "@/components/sections/EventRhythmSection";
import { ContextCardsSection } from "@/components/sections/ContextCardsSection";
import { ServicesCarousel } from "@/components/sections/ServicesCarousel";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { AboutPreviewSection } from "@/components/sections/AboutPreviewSection";
import { PartnershipsSection } from "@/components/sections/PartnershipsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/common/JsonLd";
import { usePageMeta } from "@/hooks/usePageMeta";
import { faqJsonLd, organizationJsonLd, serviceJsonLd } from "@/lib/seo";

export function HomePage() {
  const location = useLocation();

  usePageMeta({
    title:
      "Imagenow | Soluções visuais para eventos corporativos, marcas e celebrações",
    description:
      "A Imagenow cria ativações, registros fotográficos, soluções digitais e estruturas para eventos corporativos, ações de marca e celebrações sociais.",
    path: "/",
  });

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

  return (
    <>
      <JsonLd data={[organizationJsonLd(), faqJsonLd(), ...serviceJsonLd()]} />
      <HeroSection />
      <IntroBentoSection />
      <SocialProofSection />
      <EventRhythmSection />
      <ContextCardsSection />
      <ServicesCarousel />
      <ProcessSection />
      <AboutPreviewSection />
      <PartnershipsSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
