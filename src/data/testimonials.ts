export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

/**
 * Substituir por depoimentos aprovados pelo cliente.
 * Empresas abaixo fazem parte da lista de marcas já atendidas.
 */
export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "A operação acompanhou o fluxo do evento sem atrapalhar a experiência do público.",
    name: "Mariana Costa",
    role: "Produção",
    company: "Cubo Itaú",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "Personalização visual alinhada à marca e entrega organizada do começo ao fim.",
    name: "Rafael Mendes",
    role: "Marketing",
    company: "Smart Fit",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "O SelfieMobi circulou bem pelo espaço e gerou registros espontâneos o tempo todo.",
    name: "Ana Beatriz Lima",
    role: "Eventos",
    company: "Cacau Show",
    rating: 5,
  },
  {
    id: "4",
    quote:
      "Estrutura estável, equipe preparada e resultado consistente em um evento de grande circulação.",
    name: "Pedro Albuquerque",
    role: "Operações",
    company: "LATAM",
    rating: 5,
  },
  {
    id: "5",
    quote:
      "Do briefing à entrega, tudo ficou claro. A ativação entrou no ritmo da festa.",
    name: "Juliana Prado",
    role: "Assessoria",
    company: "Coco Bambu",
    rating: 5,
  },
  {
    id: "6",
    quote:
      "Impressão na hora e envio digital no mesmo fluxo. Prático para o time e para os convidados.",
    name: "Lucas Ferreira",
    role: "Comunicação",
    company: "Dasa",
    rating: 5,
  },
];

export const hasTestimonials = testimonials.length > 0;
