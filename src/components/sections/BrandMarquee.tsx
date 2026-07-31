import { useState, type CSSProperties } from "react";
import { brandAlt, brandLogo, type BrandName } from "@/data/brands";
import "./BrandMarquee.css";

function BrandMark({ brand, isClone }: { brand: BrandName; isClone: boolean }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="brand-marquee__word" title={brand}>
        {brand}
      </span>
    );
  }

  return (
    <img
      src={brandLogo(brand)}
      alt={isClone ? "" : brandAlt(brand)}
      width={160}
      height={64}
      loading="lazy"
      decoding="async"
      className="brand-marquee__logo"
      onError={() => setFailed(true)}
    />
  );
}

type BrandMarqueeProps = {
  brands: readonly BrandName[];
  direction?: "left" | "right";
  duration?: number;
};

export function BrandMarquee({
  brands,
  direction = "left",
  duration = 50,
}: BrandMarqueeProps) {
  const loop = [...brands, ...brands];

  return (
    <div
      className={`brand-marquee brand-marquee--${direction}`}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div className="brand-marquee__viewport">
        <ul className="brand-marquee__track" aria-label="Marcas atendidas">
          {loop.map((brand, index) => {
            const isClone = index >= brands.length;
            return (
              <li
                key={`${brand}-${index}`}
                className="brand-marquee__item"
                aria-hidden={isClone || undefined}
              >
                <BrandMark brand={brand} isClone={isClone} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
