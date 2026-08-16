import { HeroSection } from "@/components/sections/HeroSection";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { IntroBentoSection } from "@/components/sections/IntroBentoSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
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
import { siteConfig } from "@/data/site";

export function HomePage() {
  usePageMeta({
    title:
      "Imagenow | Soluções visuais para eventos corporativos, marcas e celebrações",
    description: siteConfig.description,
    path: "/",
  });

  return (
    <>
      <JsonLd data={[organizationJsonLd(), faqJsonLd(), ...serviceJsonLd()]} />
      <HeroSection />
      <BrandsSection />
      <IntroBentoSection />
      <SocialProofSection />
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
