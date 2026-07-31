export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source?: "google";
};

/** Avaliações públicas do Google — Imagenow Eventos */
export const googleReviewsUrl =
  "https://www.google.com/maps/search/?api=1&query=Imagenow+Eventos+Calçada+dos+Mirtilos+10+Alphaville+Barueri";

export const googleRatingSummary = {
  rating: 5.0,
  countLabel: "108",
} as const;

export const testimonials: Testimonial[] = [
  {
    id: "natalia-gomes",
    name: "Natalia Gomes",
    rating: 5,
    source: "google",
    quote:
      "Adorei trabalhar com vcs! Contratei o serviço para um evento corporativo e do início ao fim o Raphael me atendeu com muita atenção. Foram muito pontuais e proativos na instalação e atendimento durante o evento. A qualidade das fotos é excelente e os convidados amaram!",
  },
  {
    id: "vinicius-morales",
    name: "Vinícius Morales",
    rating: 5,
    source: "google",
    quote:
      "Excelente serviço!!! Deu super certo o evento, recebemos muitos elogios da nossa Diretoria, a galera amou tirar as fotos, fomos super bem atendidos pela equipe, nota 1000 pelo trabalho de vocês!!",
  },
  {
    id: "carina-fonseca",
    name: "Carina Fonseca",
    rating: 5,
    source: "google",
    quote:
      "Adorei tudo, foi perfeito!!! Serviço muito bem prestado, confiável, equipe maravilhosa e atenciosa com todos os meus convidados, foram super pontuais no dia do meu evento e entregaram todas as mídias feitas na festa super rápido. Já salvei o contato pra ter em todas as minhas festas.",
  },
  {
    id: "felipe-montaldi",
    name: "Felipe Montaldi Ferraz de Toledo",
    rating: 5,
    source: "google",
    quote:
      "Equipe ultra simpática, trouxe uma energia incrível para o evento e se tornou praticamente uma atração. Inicialmente pensamos em utilizar o totem convencional, mas nos recomendaram o SelfieMobi — a melhor recomendação que tivemos!",
  },
  {
    id: "viviane-guedes",
    name: "Viviane Guedes",
    rating: 5,
    source: "google",
    quote:
      "Maravilhoso, meus convidados amaram... foi muito divertido, deu um upgrade na festa, atendente super educado e paciente. Gustavo do início das conversas até o fim não deixou a desejar e entregou muito mais do prometido. Totem de fotos incrível.",
  },
  {
    id: "gabriella-macedo",
    name: "Gabriella Macedo Chaves",
    rating: 5,
    source: "google",
    quote:
      "Gostamos muito do serviço do Imagenow, desde o princípio quando entramos em contato, foram muito atenciosos e flexíveis. Pontuais no dia do casamento, receberam a todos os convidados que foram fotografar no totem com muita alegria.",
  },
  {
    id: "giiu-xavier",
    name: "Giiu Xavier",
    rating: 5,
    source: "google",
    quote:
      "Conheci a empresa em 2022, no casamento da minha prima, e desde então me encantei com o atendimento e com a lembrança entregue. Gostei tanto que contratei para o meu próprio casamento — foi um sucesso!",
  },
  {
    id: "pamella-costa",
    name: "Pamella Costa",
    rating: 5,
    source: "google",
    quote:
      "A Imagenow esteve presente na festa de 15 anos da minha filha e só tenho elogios e agradecimento. Sempre muito educados e cordiais, o totem fotográfico com a qualidade de imagem impecável.",
  },
  {
    id: "katiane-betiol",
    name: "Katiane Betiol",
    rating: 5,
    source: "google",
    quote:
      "Super indico a Imagenow para seu evento!! Eles participaram da festa de debutante da minha filha e foi tudo perfeito!! Qualidade excelente, equipe super profissional!!! Muito obrigada Imagenow!! Até o próximo evento!!",
  },
  {
    id: "mirian-lima",
    name: "Mirian Lima de Brito",
    rating: 5,
    source: "google",
    quote:
      "Ótima interação com os convidados, foi uma verdadeira atração, nossos convidados amaram e levaram uma linda lembrança de nosso casamento pra casa. Além do Rafa que é super solícito e simpático com todos.",
  },
  {
    id: "helena-oikawa",
    name: "Helena Oikawa",
    rating: 5,
    source: "google",
    quote:
      "Fizemos evento corporativo, todos adoraram! O atendente foi super atencioso e solícito. Recomendo.",
  },
  {
    id: "matheus-ribeiro",
    name: "Matheus Ribeiro",
    rating: 5,
    source: "google",
    quote: "Fizeram meu casamento e foram simplesmente incrível!!! Recomendo demais!",
  },
];

export const hasTestimonials = testimonials.length > 0;
