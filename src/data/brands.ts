export const brands = [
  "Adidas",
  "Itaú",
  "CAIXA",
  "BRADESCO SHOP",
  "Lacoste",
  "Levi's",
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

/**
 * Arquivos em /public/images/logos/{n}.png
 * Mapa explícito (a ordem da lista mudou; os PNGs mantêm a numeração original).
 * null = ainda sem arte própria (não entra no carrossel).
 */
const logoFileByBrand: Record<BrandName, number | null> = {
  Adidas: 1,
  "Itaú": 2,
  Lacoste: 3,
  CAIXA: 4,
  "Levi's": 5,
  "BRADESCO SHOP": 35,
  LATAM: 6,
  Havaianas: 7,
  Piet: 27,
  SmartFit: 8,
  IGUATEMI: null,
  Pringles: 9,
  Stellantis: 10,
  "Cacau Show": 11,
  Posca: 12,
  Dasa: 13,
  "Saint-Gobain": 14,
  Dexco: 15,
  Gafisa: 16,
  EZTEC: 17,
  "Coco Bambu": 18,
  "Banco Fibra": 19,
  "Ri Happy": 20,
  Worldpay: 21,
  "Pura Vida": 22,
  "Cubo Itaú": 23,
  "St. Paul's School": 24,
  Lysoform: 25,
  "Conta Simples": 26,
  Yázigi: 28,
  "Colégio Objetivo": 29,
  MPD: 30,
  Taboca: 31,
  Alphaquip: 32,
  Rotary: 33,
  Braschemical: 34,
};

export const visibleBrands = brands.filter(
  (brand) => logoFileByBrand[brand] != null,
);

export function brandLogo(brand: BrandName) {
  const n = logoFileByBrand[brand] ?? 1;
  return `/images/logos/${n}.png`;
}

export function brandAlt(name: string) {
  const isEmpresa =
    /banco|caixa|dasa|gafisa|eztec|worldpay|rotary|stellantis|saint|dexco|fibra|cubo|objetivo|paul|bradesco|iguatemi|mpd/i.test(
      name,
    );
  return `${name} - ${isEmpresa ? "empresa" : "marca"} atendida pela Imagenow`;
}
