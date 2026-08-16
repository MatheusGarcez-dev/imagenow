import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { brands } from "@/data/brands";
import { Reveal } from "@/components/ui/Reveal";
import "./BrandsSection.css";

export function BrandsSection() {
  const mid = Math.ceil(brands.length / 2);
  const rowA = brands.slice(0, mid);
  const rowB = brands.slice(mid);

  return (
    <section className="brands-strip" aria-label="Marcas e empresas atendidas">
      <div className="brands-strip__noise" aria-hidden="true" />

      <Reveal variant="soft" duration={0.85} className="brands-strip__layout">
        <div className="brands-strip__rail">
          <p className="brands-strip__kicker">Prova em campo</p>
          <p className="brands-strip__title font-display">
            Marcas e empresas
            <br />
            atendidas pela
            <br />
            Imagenow
          </p>
        </div>

        <div className="brands-strip__stage">
          <h2 className="sr-only">Marcas e empresas atendidas pela Imagenow</h2>
          <BrandMarquee brands={rowA} direction="left" duration={48} />
          <BrandMarquee brands={rowB} direction="right" duration={56} />
        </div>
      </Reveal>
    </section>
  );
}
