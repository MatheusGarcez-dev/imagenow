import { useState } from "react";
import { brands, brandAlt, brandIcons } from "@/data/brands";
import "./BrandMarquee.css";

function BrandMark({
  brand,
  isClone,
}: {
  brand: (typeof brands)[number];
  isClone: boolean;
}) {
  const slug = brandIcons[brand];
  const [failed, setFailed] = useState(false);

  if (!slug || failed) {
    return (
      <span className="brand-marquee__word" title={brand}>
        {brand}
      </span>
    );
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/ffffff`}
      alt={isClone ? "" : brandAlt(brand)}
      width={88}
      height={28}
      loading="lazy"
      decoding="async"
      className="brand-marquee__logo"
      onError={() => setFailed(true)}
    />
  );
}

export function BrandMarquee() {
  const loop = [...brands, ...brands];

  return (
    <div className="brand-marquee">
      <h2 className="sr-only">Marcas e empresas atendidas pela Imagenow</h2>
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
