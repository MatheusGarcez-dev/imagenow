/**
 * Intenções transversais do buscador: termos que retornam vários serviços.
 * `services` vem em ordem de relevância (o primeiro pesa mais).
 * `terms` são as formas como o cliente pode escrever a intenção (sem precisar de acento).
 * Os ids correspondem a services.ts.
 */
export type SearchIntent = {
  label: string;
  terms: string[];
  services: string[];
  /** Peso do primeiro serviço da lista; os seguintes perdem relevância aos poucos. */
  weight?: number;
};

export const searchIntents: SearchIntent[] = [
  {
    label: "foto impressa",
    terms: [
      "foto impressa",
      "fotos impressas",
      "impressão de fotos",
      "impressão de foto",
      "imprimir foto",
      "imprimir fotos",
      "foto para levar",
      "fotos para levar",
      "impressa",
      "impressas",
      "impressão",
    ],
    services: ["totem-fotografico", "selfiemobi", "selfiemobi-2", "pola", "scrapbook"],
  },
  {
    label: "foto na hora",
    terms: [
      "foto na hora",
      "fotos na hora",
      "na hora",
      "foto instantânea",
      "fotos instantâneas",
      "instantânea",
      "instantâneas",
      "impressão instantânea",
    ],
    services: ["totem-fotografico", "selfiemobi", "pola"],
  },
  {
    label: "polaroid",
    terms: ["polaroid", "polaroids", "foto polaroid", "estilo polaroid"],
    services: ["pola", "totem-fotografico", "scrapbook"],
  },
  {
    label: "vídeo para evento",
    terms: [
      "vídeo para evento",
      "vídeos para evento",
      "vídeo de evento",
      "vídeo do evento",
      "vídeo",
      "vídeos",
      "filmagem",
    ],
    services: ["plataforma-360", "boomerang-gif", "reelsclip", "twister"],
  },
  {
    label: "redes sociais",
    terms: [
      "redes sociais",
      "rede social",
      "instagram",
      "tiktok",
      "stories",
      "conteúdo digital",
      "compartilhar",
      "compartilhamento",
    ],
    services: ["plataforma-360", "boomerang-gif", "reelsclip", "fotos-com-ia", "twister"],
  },
  {
    label: "ativação de marca",
    terms: [
      "ativação de marca",
      "ativações de marca",
      "ação de marca",
      "ações de marca",
      "experiência de marca",
      "ativação",
      "ativações",
      "branding",
      "marca",
      "marcas",
      "lançamento",
      "campanha",
    ],
    services: [
      "selfiemobi",
      "signcam",
      "fotos-com-ia",
      "totem-interativo-touch",
      "twister",
      "projetos-especiais",
    ],
  },
  {
    label: "interação",
    terms: [
      "interação",
      "interações",
      "interativo",
      "interativa",
      "interatividade",
      "engajamento",
      "dinâmica",
    ],
    services: [
      "plataforma-360",
      "totem-interativo-touch",
      "twister",
      "signcam",
      "fotos-com-ia",
      "selfiemobi",
    ],
  },
  {
    label: "lembrança",
    terms: ["lembrança", "lembranças", "memória", "memórias", "recordação", "recordações"],
    services: ["totem-fotografico", "pola", "scrapbook", "audio-guestbook"],
  },
  {
    label: "personalizado",
    terms: [
      "personalizado",
      "personalizada",
      "personalizados",
      "personalizadas",
      "personalização",
      "customizado",
      "customizada",
      "sob medida",
      "exclusivo",
    ],
    services: ["signcam", "fotos-com-ia", "scrapbook", "projetos-especiais"],
  },
  {
    label: "brinde",
    terms: [
      "brinde",
      "brindes",
      "lembrancinha",
      "lembrancinhas",
      "presente para convidados",
      "mimo",
    ],
    services: ["totem-fotografico", "pola", "scrapbook", "twister"],
  },
  {
    label: "evento corporativo",
    terms: [
      "evento corporativo",
      "eventos corporativos",
      "corporativo",
      "corporativa",
      "empresa",
      "empresas",
      "empresarial",
      "convenção",
      "feira",
      "feiras",
      "estande",
      "estandes",
      "stand",
      "congresso",
      "confraternização",
      "endomarketing",
    ],
    // Serviços com pesos diferentes conforme a aderência ao contexto corporativo (sem Pola e Áudio Guestbook).
    services: [
      "totem-interativo-touch",
      "totem-fotografico",
      "selfiemobi",
      "selfiemobi-2",
      "fotos-com-ia",
      "twister",
      "plataforma-360",
      "signcam",
      "lockers-carregadores",
      "reelsclip",
      "boomerang-gif",
      "projetos-especiais",
      "scrapbook",
    ],
    weight: 7,
  },
  {
    label: "festa / aniversário",
    terms: [
      "festa",
      "festas",
      "aniversário",
      "aniversários",
      "festa de aniversário",
      "aniversariante",
      "15 anos",
      "debutante",
      "formatura",
    ],
    services: ["totem-fotografico", "selfiemobi", "pola", "scrapbook", "audio-guestbook", "twister"],
  },
  {
    label: "casamento",
    terms: ["casamento", "casamentos", "noivos", "noiva", "noivo", "bodas", "casar"],
    services: ["totem-fotografico", "pola", "scrapbook", "audio-guestbook", "selfiemobi"],
  },
];
