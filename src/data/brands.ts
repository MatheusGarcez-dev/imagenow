export const brands = [
  "Adidas",
  "Itaú",
  "Lacoste",
  "CAIXA",
  "Levi's",
  "BRADESCO SHOP",
  "LATAM",
  "Havaianas",
  "Piet",
  "SmartFit",
  "IGUATEMI",
  "Pringles",
  "Stellantis",
  "Cacau Show",
  "Posca",
  "Dasa",
  "Saint-Gobain",
  "Dexco",
  "Gafisa",
  "EZTEC",
  "Coco Bambu",
  "Banco Fibra",
  "Ri Happy",
  "Worldpay",
  "Pura Vida",
  "Cubo Itaú",
  "St. Paul's School",
  "Lysoform",
  "Conta Simples",
  "Yázigi",
  "Colégio Objetivo",
  "MPD",
  "Taboca",
  "Alphaquip",
  "Rotary",
  "Braschemical",
] as const;

export type BrandName = (typeof brands)[number];

/** Logos em /public/images/logos/{n}.png — ordem igual à lista `brands` (1 = Adidas … 36 = Braschemical) */
export function brandLogo(brand: BrandName) {
  const index = brands.indexOf(brand);
  const n = index >= 0 ? index + 1 : 1;
  return `/images/logos/${n}.png`;
}

export function brandAlt(name: string) {
  const isEmpresa =
    /banco|caixa|dasa|gafisa|eztec|worldpay|rotary|stellantis|saint|dexco|fibra|cubo|objetivo|paul|bradesco|iguatemi/i.test(
      name,
    );
  return `${name} - ${isEmpresa ? "empresa" : "marca"} atendida pela Imagenow`;
}
