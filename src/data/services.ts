export type Service = {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  description: string[];
  badges?: string[];
  image: string;
  imageAlt: string;
  whatsappMessage: string;
  keywords?: string[];
  accent: "purple" | "pink" | "orange" | "violet";
};

export const services: Service[] = [
  {
    id: "totem-fotografico",
    name: "Totem Fotográfico",
    tagline: "Precisão que mantém o evento em movimento.",
    summary:
      "Captação ágil, impressão integrada e enquadramento mais preciso em uma estrutura desenvolvida pela Imagenow.",
    description: [
      "O Totem Fotográfico da Imagenow combina captura, impressão integrada e envio digital em uma operação fluida, estável e de fácil adaptação ao ambiente.",
      "Um dos diferenciais do modelo está na luz articulada, que favorece o enquadramento de crianças, adultos e pessoas mais altas sem depender de grandes distâncias. A estrutura também conta com uma referência central pensada para melhorar o posicionamento diante da câmera.",
      "Indicado para eventos corporativos, ações de marca e celebrações sociais que precisam de agilidade, boa leitura visual e entrega organizada.",
    ],
    badges: ["Desenvolvido pela Imagenow"],
    image: "/images/hero-bg.png",
    imageAlt: "Totem Fotográfico da Imagenow com luz articulada em evento",
    whatsappMessage:
      "Olá! Gostaria de conversar sobre o Totem Fotográfico para um evento.",
    keywords: ["totem fotográfico", "foto impressa na hora", "eventos corporativos"],
    accent: "purple",
  },
  {
    id: "selfiemobi",
    name: "SelfieMobi",
    tagline: "A ativação circula.",
    summary:
      "Registro itinerante que acompanha a dinâmica do evento e alcança o público onde ele está.",
    description: [
      "Criado para eventos que pedem mobilidade, o SelfieMobi percorre o espaço registrando interações espontâneas, encontros naturais e momentos que acontecem fora de um ponto fixo.",
      "As imagens podem ser enviadas digitalmente e também impressas em uma estação dedicada, mantendo a entrega organizada sem comprometer o fluxo do evento.",
      "Indicado para eventos corporativos, ações de marca, celebrações sociais e projetos com grande circulação de pessoas.",
    ],
    badges: ["Desenvolvido pela Imagenow"],
    image: "/images/hero-bg.png",
    imageAlt: "SelfieMobi da Imagenow circulando em evento",
    whatsappMessage: "Olá! Gostaria de conversar sobre o SelfieMobi para um evento.",
    accent: "pink",
  },
  {
    id: "selfiemobi-2",
    name: "SelfieMobi 2",
    tagline: "Mais controle. Mesma qualidade.",
    summary:
      "Formato interativo com iluminação profissional, operação flexível e participação direta do público.",
    description: [
      "O SelfieMobi 2 amplia as possibilidades do registro móvel, permitindo que a captura seja conduzida pela equipe ou utilizada diretamente pelos convidados.",
      "Com iluminação profissional, interface intuitiva e envio digital imediato, o formato mantém o padrão técnico mesmo em uma dinâmica mais autônoma. A impressão também pode ser realizada em estação dedicada.",
      "Indicado para eventos que buscam agilidade, interação e autonomia sem abrir mão da qualidade visual.",
    ],
    image: "/images/hero-bg.png",
    imageAlt: "SelfieMobi 2 com iluminação profissional para eventos",
    whatsappMessage: "Olá! Gostaria de conversar sobre o SelfieMobi 2 para um evento.",
    accent: "violet",
  },
  {
    id: "lockers-carregadores",
    name: "Lockers carregadores",
    tagline: "Conveniência que mantém o público conectado.",
    summary:
      "Totens carregadores para celulares, pensados para eventos corporativos, feiras e ações de marca.",
    description: [
      "Os lockers carregadores oferecem ao público um ponto seguro e prático para carregar celulares durante o evento, resolvendo uma necessidade real de quem participa.",
      "Além da conveniência, a estrutura cria um ponto de contato útil entre marca e público, podendo ser personalizada de acordo com a identidade visual do projeto.",
      "Indicado para eventos corporativos, feiras, congressos, convenções e ativações com grande circulação de pessoas.",
    ],
    badges: ["Desenvolvido pela Imagenow"],
    image: "/images/hero-bg.png",
    imageAlt: "Lockers carregadores da Imagenow para celulares em evento corporativo",
    whatsappMessage:
      "Olá! Gostaria de conversar sobre os Lockers carregadores para um evento.",
    accent: "orange",
  },
  {
    id: "pola",
    name: "Pola",
    tagline: "Enquanto a festa acontece, a memória se constrói.",
    summary:
      "Registro com estética instantânea e acompanhamento dedicado ao longo da celebração.",
    description: [
      "O Pola acompanha o evento registrando encontros, bastidores e momentos que muitas vezes passam despercebidos durante a celebração.",
      "Cada fotografia é impressa em formato polaroid e reunida em uma entrega especial, construída ao longo do evento de forma sensível e personalizada.",
      "Indicado principalmente para casamentos, aniversários, festas intimistas e celebrações que pedem um registro físico mais afetivo.",
    ],
    image: "/images/hero-bg.png",
    imageAlt: "Fotos estilo polaroid da Imagenow em celebração social",
    whatsappMessage: "Olá! Gostaria de conversar sobre o Pola para um evento.",
    accent: "pink",
  },
  {
    id: "spin-360",
    name: "Spin 360",
    tagline: "Conteúdo em movimento.",
    summary:
      "Vídeos dinâmicos em rotação, com efeitos visuais e entrega rápida para compartilhamento.",
    description: [
      "O Spin 360 cria vídeos em rotação contínua, com efeitos visuais, variações de velocidade, câmera lenta e trilha personalizada.",
      "Com iluminação adequada e operação orientada, o resultado é um conteúdo de forte apelo visual, pronto para ser compartilhado logo após a captura.",
      "Indicado para eventos, festas e ações de marca que buscam impacto, movimento e presença digital.",
    ],
    image: "/images/hero-bg.png",
    imageAlt: "Spin 360 da Imagenow criando vídeo em evento",
    whatsappMessage: "Olá! Gostaria de conversar sobre o Spin 360 para um evento.",
    accent: "purple",
  },
  {
    id: "reelsclip",
    name: "ReelsClip",
    tagline: "Vídeos curtos para ações que pedem compartilhamento.",
    summary:
      "Clipes personalizados com identidade da marca, entregues em formatos rápidos para uso digital.",
    description: [
      "O ReelsClip transforma registros rápidos em vídeos curtos personalizados, com aplicação de identidade visual, marca, campanha ou produto.",
      "A entrega pode incluir efeitos, cortes, câmera lenta, aceleração e elementos gráficos, criando um material pronto para circular em redes sociais ou canais digitais.",
      "Indicado para lançamentos, ações promocionais, ativações de marca e eventos que querem gerar conteúdo ágil.",
    ],
    image: "/images/hero-bg.png",
    imageAlt: "ReelsClip da Imagenow com vídeo curto personalizado para evento",
    whatsappMessage: "Olá! Gostaria de conversar sobre o ReelsClip para um evento.",
    accent: "orange",
  },
  {
    id: "scrapbook",
    name: "Scrapbook",
    tagline: "Memórias que ganham página.",
    summary:
      "Álbum construído ao longo do evento com fotos impressas e mensagens dos convidados.",
    description: [
      "O Scrapbook transforma fotografias em um acervo físico e participativo, construído durante o próprio evento.",
      "Os convidados podem escrever mensagens e dedicatórias ao lado das imagens, criando um material único, personalizado e cheio de presença.",
      "Pode funcionar como atração principal ou integrado a outros formatos fotográficos da Imagenow.",
    ],
    image: "/images/hero-bg.png",
    imageAlt: "Scrapbook com fotos impressas e mensagens dos convidados em evento",
    whatsappMessage: "Olá! Gostaria de conversar sobre o Scrapbook para um evento.",
    accent: "violet",
  },
  {
    id: "audio-guestbook",
    name: "Áudio Guestbook",
    tagline: "Memórias que não se leem. Se escutam.",
    summary:
      "Mensagens de voz gravadas pelos convidados em um telefone cenográfico.",
    description: [
      "O Áudio Guestbook transforma mensagens em registros sonoros únicos, capturando a voz, o tom e a emoção de quem participa.",
      "A dinâmica é simples: os convidados usam o telefone cenográfico para deixar recados espontâneos ao longo do evento, criando um acervo em áudio para ser revisitado depois.",
      "Indicado para celebrações especiais e ações corporativas com depoimentos, feedbacks ou mensagens de marca.",
    ],
    image: "/images/hero-bg.png",
    imageAlt: "Áudio Guestbook com telefone cenográfico para mensagens de convidados",
    whatsappMessage:
      "Olá! Gostaria de conversar sobre o Áudio Guestbook para um evento.",
    accent: "pink",
  },
  {
    id: "totem-interativo-touch",
    name: "Totem Interativo Touch",
    tagline: "Interação que começa no primeiro toque.",
    summary:
      "Tela interativa para comunicação, conteúdo, captação de dados, quizzes e ativações digitais.",
    description: [
      "O Totem Interativo Touch cria um ponto de contato direto entre o público e o conteúdo do evento.",
      "Pode ser usado em recepção, apresentações, catálogos digitais, jogos, quizzes, captação de leads, pesquisas e ações interativas.",
      "Indicado para eventos corporativos, feiras e ativações que precisam organizar informações, estimular participação ou oferecer navegação simples.",
    ],
    image: "/images/hero-bg.png",
    imageAlt: "Totem Interativo Touch da Imagenow em evento corporativo",
    whatsappMessage:
      "Olá! Gostaria de conversar sobre o Totem Interativo Touch para um evento.",
    accent: "purple",
  },
  {
    id: "boomerang-gif",
    name: "Boomerang & GIF",
    tagline: "Movimento que amplia presença.",
    summary:
      "Formato animado para gerar conteúdo dinâmico e compartilhável durante o evento.",
    description: [
      "Boomerangs e GIFs adicionam movimento ao registro, criando conteúdos leves, rápidos e prontos para compartilhamento digital.",
      "Podem ser integrados ao Totem Fotográfico, ao SelfieMobi ou ao SelfieMobi 2, ampliando as possibilidades da ativação sem exigir uma estrutura separada.",
      "Também podem funcionar como formato principal em ações digitais e promocionais.",
    ],
    image: "/images/hero-bg.png",
    imageAlt: "Boomerang e GIF personalizados da Imagenow para eventos",
    whatsappMessage:
      "Olá! Gostaria de conversar sobre Boomerang & GIF para um evento.",
    accent: "orange",
  },
  {
    id: "bottons-com-foto",
    name: "Bottons com foto",
    tagline: "A foto vira algo para usar.",
    summary: "Fotos transformadas em bottons personalizados durante o evento.",
    description: [
      "Os bottons com foto transformam o registro em um item físico, vestível e personalizado.",
      "A produção acontece a partir das imagens capturadas no evento, com possibilidade de aplicar identidade visual, tema, campanha ou marca.",
      "Indicado para ações promocionais, eventos corporativos, campanhas internas e celebrações que buscam uma lembrança diferente e divertida.",
    ],
    image: "/images/hero-bg.png",
    imageAlt: "Bottons personalizados com foto produzidos durante evento",
    whatsappMessage:
      "Olá! Gostaria de conversar sobre Bottons com foto para um evento.",
    accent: "pink",
  },
  {
    id: "posteres-fotograficos",
    name: "Pôsteres fotográficos",
    tagline: "Registros em maior formato.",
    summary:
      "Impressões fotográficas ampliadas para ações, brindes, ambientação ou entregas especiais.",
    description: [
      "Os pôsteres fotográficos ampliam o impacto do registro, transformando imagens do evento em impressões de maior formato.",
      "Podem ser usados como brinde, peça de ambientação, recordação, entrega especial ou ação promocional personalizada.",
      "Indicado para marcas, empresas e celebrações que querem ir além da impressão tradicional.",
    ],
    image: "/images/hero-bg.png",
    imageAlt: "Pôster fotográfico personalizado impresso para evento",
    whatsappMessage:
      "Olá! Gostaria de conversar sobre Pôsteres fotográficos para um evento.",
    accent: "violet",
  },
  {
    id: "projetos-especiais",
    name: "Projetos especiais",
    tagline: "Quando a ideia pede um novo formato.",
    summary: "Soluções sob medida para ações, campanhas e contextos específicos.",
    description: [
      "Os projetos especiais são desenvolvidos a partir de uma necessidade específica do evento, da marca ou da campanha.",
      "Podem envolver inteligência artificial, produtos físicos personalizados, formatos de registro, interações digitais ou combinações entre diferentes soluções da Imagenow.",
      "Indicados para marcas, produtoras, assessorias e empresas que precisam de uma entrega menos padronizada.",
    ],
    image: "/images/hero-bg.png",
    imageAlt: "Projeto especial da Imagenow para ação de marca",
    whatsappMessage:
      "Olá! Gostaria de conversar sobre Projetos especiais para um evento.",
    accent: "purple",
  },
  {
    id: "cabine-fotografica",
    name: "Cabine Fotográfica",
    tagline: "Um clássico repensado pela Imagenow.",
    summary:
      "Cabine fotográfica em desenvolvimento, pensada para unir privacidade, design e operação eficiente.",
    description: [
      "A Cabine Fotográfica Imagenow está em desenvolvimento para atender eventos que pedem um espaço reservado de registro, com iluminação adequada, identidade visual e operação integrada ao fluxo do evento.",
      "A proposta é revisitar um formato clássico com design, acabamento e funcionalidade alinhados ao padrão da Imagenow.",
      "Indicada para eventos sociais, corporativos e ações de marca que buscam uma solução mais reservada para fotos personalizadas.",
    ],
    badges: ["Em desenvolvimento", "Desenvolvido pela Imagenow"],
    image: "/images/hero-bg.png",
    imageAlt: "Cabine Fotográfica Imagenow em desenvolvimento para eventos",
    whatsappMessage:
      "Olá! Gostaria de conversar sobre a Cabine Fotográfica para um evento.",
    accent: "violet",
  },
];

export const contexts = [
  {
    id: "eventos-corporativos",
    title: "Eventos corporativos",
    text: "Convenções, feiras e encontros internos com ativações que geram participação, registro e presença de marca.",
    features: [
      "Convenções, feiras e confraternizações",
      "Participação e presença de marca",
    ],
    image: "/images/hero-bg.png",
    imageAlt: "Ativação fotográfica da Imagenow em evento corporativo",
    tone: "corporate" as const,
    whatsappMessage:
      "Olá! Gostaria de conversar sobre soluções da Imagenow para um evento corporativo.",
  },
  {
    id: "acoes-de-marca",
    title: "Ações de marca",
    text: "Lançamentos, campanhas e ativações promocionais com soluções visuais que conectam público e marca.",
    features: [
      "Campanhas e projetos especiais",
      "Conteúdo visual alinhado à identidade",
    ],
    image: "/images/hero-bg.png",
    imageAlt: "Ativação de marca com registros visuais da Imagenow",
    tone: "brand" as const,
    whatsappMessage:
      "Olá! Gostaria de conversar sobre soluções da Imagenow para uma ação de marca.",
  },
  {
    id: "celebracoes-sociais",
    title: "Celebrações sociais",
    text: "Casamentos, aniversários e festas com registros impressos, digitais e interativos para os convidados.",
    features: [
      "Registros impressos e digitais",
      "Experiências que envolvem os convidados",
    ],
    image: "/images/event-rhythm-banner.png",
    imageAlt: "Registro fotográfico da Imagenow em celebração social",
    tone: "social" as const,
    whatsappMessage:
      "Olá! Gostaria de conversar sobre soluções da Imagenow para uma celebração social.",
  },
] as const;

export const processSteps = [
  {
    n: "01",
    title: "Entendimento",
    text: "Público, local, objetivo, fluxo e duração do evento.",
  },
  {
    n: "02",
    title: "Indicação",
    text: "Escolha do formato mais adequado para a ação.",
  },
  {
    n: "03",
    title: "Personalização",
    text: "Layout, identidade visual, dinâmica e entregas.",
  },
  {
    n: "04",
    title: "Operação",
    text: "Montagem, acompanhamento e atendimento durante o evento.",
  },
  {
    n: "05",
    title: "Entrega",
    text: "Arquivos, registros ou materiais finais conforme o formato contratado.",
  },
] as const;
