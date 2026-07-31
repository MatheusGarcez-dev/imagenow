export type HeroBanner = {
  id: string;
  src: string;
  alt: string;
  position?: string;
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  lead?: string;
};

export const heroBanners: HeroBanner[] = [
  {
    id: "banner-1",
    src: "/images/banner-1-hero.png",
    alt: "Convidadas em evento com fotos impressas e atmosfera Imagenow",
    position: "center center",
    eyebrow: "imagenow. still happening.",
    title: "Quando o evento termina,",
    titleAccent: "a lembrança continua.",
    lead: "Ativações e registros visuais para eventos, marcas e celebrações.",
  },
  {
    id: "banner-2",
    src: "/images/banner-2-hero.png",
    alt: "Grupo em celebração com tiras de foto e adereços Imagenow",
    position: "center center",
    eyebrow: "ativações para eventos",
    title: "Entra no ritmo",
    titleAccent: "do que está acontecendo.",
    lead: "Soluções pensadas para o fluxo real do público e do espaço.",
  },
  {
    id: "banner-3",
    src: "/images/banner-3-hero.png",
    alt: "Convidados com adereços e energia de festa Imagenow",
    position: "center center",
    eyebrow: "registros que permanecem",
    title: "Impressa. Digital.",
    titleAccent: "Compartilhada.",
    lead: "Memórias que continuam depois que o evento termina.",
  },
];

export const HERO_BANNER_DURATION = 6.5;
