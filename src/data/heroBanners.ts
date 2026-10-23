export type HeroBanner = {
  id: string;
  src: string;
  srcMobile?: string;
  alt: string;
  position?: string;
  title: string;
  titleAccent?: string;
  lead?: string;
};

export const heroBanners: HeroBanner[] = [
  {
    id: "banner-1",
    src: "/images/banner-1-hero-v2.png",
    srcMobile: "/images/banner-1-hero-mobile.jpg",
    alt: "Convidadas sorrindo e mostrando fotos impressas da Imagenow em eventos",
    position: "center center",
    title: "Quando o evento termina,",
    titleAccent: "a lembrança continua.",
    lead: "Ativações e registros visuais para eventos, marcas e celebrações.",
  },
  {
    id: "banner-2",
    src: "/images/banner-2-hero.png",
    srcMobile: "/images/banner-2-hero-mobile.jpg",
    alt: "Grupo em celebração com tiras de foto e adereços Imagenow",
    position: "center center",
    title: "Entra no ritmo",
    titleAccent: "do que está acontecendo.",
    lead: "Soluções pensadas para o fluxo real do público e do espaço.",
  },
  {
    id: "banner-3",
    src: "/images/banner-3-hero.png",
    srcMobile: "/images/banner-3-hero-mobile.jpg",
    alt: "Convidados com adereços e energia de festa Imagenow",
    position: "center center",
    title: "Impressa. Digital.",
    titleAccent: "Compartilhada.",
    lead: "Memórias que continuam depois que o evento termina.",
  },
];

export const HERO_BANNER_DURATION = 6.5;
