import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { visibleBrands } from "@/data/brands";
import { Reveal } from "@/components/ui/Reveal";
import "./BrandsSection.css";

export function BrandsSection() {
  return (
    <section className="brands-strip" aria-label="Marcas e empresas atendidas">
      <div className="brands-strip__noise" aria-hidden="true" />

      <Reveal variant="soft" duration={0.85} className="brands-strip__layout">
        <div className="brands-strip__rail">
          <p className="brands-strip__title font-display section-heading">
            Marcas e empresas
            <br />
            atendidas pela
            <br />
            <span className="title-accent">Imagenow</span>
          </p>
        </div>

        <div className="brands-strip__stage">
          <h2 className="sr-only">Marcas e empresas atendidas pela Imagenow</h2>
          <BrandMarquee brands={visibleBrands} direction="left" duration={64} />
        </div>
      </Reveal>
    </section>
  );
}
