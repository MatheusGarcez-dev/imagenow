export const siteConfig = {
  name: "Imagenow",
  tagline: "imagenow. still happening.",
  description:
    "A Imagenow cria soluções que entram no ritmo do evento. Planejamento, design, tecnologia e operação trabalham juntos para transformar encontros em registros, interações e lembranças que continuam acontecendo.",
  url: import.meta.env.VITE_SITE_URL ?? "https://imagenow.com.br",
  email: import.meta.env.VITE_EMAIL ?? "contato@imagenow.com.br",
  city: "São Paulo, SP",
  whatsapp: import.meta.env.VITE_WHATSAPP ?? "5511999999999",
  social: {
    linkedin: "https://linkedin.com/company/imagenow",
    instagram: "https://instagram.com/imagenow",
    facebook: "https://facebook.com/imagenow",
  },
} as const;

export const messages = {
  proposta: "Olá! Gostaria de solicitar uma proposta para um evento.",
  evento: "Olá! Gostaria de conversar sobre uma solução para meu evento.",
  parceria: "Olá! Gostaria de conversar sobre uma parceria com a Imagenow.",
  duvidas: "Olá! Tenho algumas dúvidas sobre as soluções da Imagenow para eventos.",
  galeria:
    "Olá! Preciso de ajuda com a galeria de fotos do meu evento / solicitar remoção de imagem.",
  servico: (nome: string) =>
    `Olá! Gostaria de conversar sobre o ${nome} para um evento.`,
} as const;

export const navLinks = [
  { label: "Soluções", href: "/#solucoes" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Quem somos", href: "/quem-somos" },
  { label: "Galerias", href: "/galerias" },
  { label: "Parcerias", href: "/#parcerias" },
  { label: "Contato", href: "/#contato" },
] as const;
