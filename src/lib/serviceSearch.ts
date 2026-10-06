import type { Service } from "@/data/services";
import { searchTerms } from "@/data/searchTerms";
import { searchIntents, type SearchIntent } from "@/data/searchIntents";

/**
 * Busca por intenção dos serviços.
 * 1. Reconhece intenções transversais na frase ("foto impressa", "evento corporativo"...).
 * 2. As palavras que sobram são comparadas com nome, dicionário e textos de cada serviço.
 * 3. Soma os pontos e ordena por relevância — não exige a frase exata.
 */

const STOPWORDS = new Set([
  "a", "o", "as", "os", "e", "de", "da", "do", "das", "dos", "em", "no", "na", "nos", "nas",
  "um", "uma", "com", "para", "pra", "pro", "por", "que", "ou", "meu", "minha", "seu", "sua",
  "quero", "queria", "preciso", "procuro", "algo", "tipo", "evento", "eventos",
]);

const WEIGHT = {
  intent: 10,
  name: 6,
  term: 3,
  text: 1,
  phraseExact: 8,
  phraseContained: 4,
};

/** Resultados com menos que esta fração da pontuação do primeiro são descartados (ruído). */
const MIN_RELATIVE_SCORE = 0.2;

export function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const words = (value: string) => normalizeSearch(value).split(" ").filter(Boolean);

/** Termos das intenções, do mais longo para o mais curto (a frase maior vence). */
const intentTerms = searchIntents
  .flatMap((intent) => intent.terms.map((term) => ({ term: normalizeSearch(term), intent })))
  .sort((a, b) => b.term.length - a.term.length);

type ServiceIndex = {
  service: Service;
  name: string[];
  terms: string[];
  text: string[];
  phrases: string[];
};

function indexService(service: Service): ServiceIndex {
  const phrases = [...(searchTerms[service.id] ?? []), ...(service.keywords ?? [])].map(
    normalizeSearch,
  );
  return {
    service,
    name: words(service.name),
    terms: phrases.flatMap((phrase) => phrase.split(" ")),
    text: words(
      [service.tagline, service.summary, ...service.description, ...(service.badges ?? [])].join(
        " ",
      ),
    ),
    phrases,
  };
}

/** A palavra da busca precisa iniciar alguma palavra do serviço (aceita plural: "fotos" → "foto"). */
function hasWord(list: string[], token: string) {
  const singular = token.length > 3 && token.endsWith("s") ? token.slice(0, -1) : token;
  return list.some((word) => word.startsWith(token) || word.startsWith(singular));
}

function parseQuery(normalizedQuery: string, typingLastWord: boolean) {
  const found = new Map<SearchIntent, number>();
  let rest = ` ${normalizedQuery} `;

  for (const { term, intent } of intentTerms) {
    const needle = ` ${term} `;
    const position = rest.indexOf(needle);
    if (position < 0) continue;
    if (!found.has(intent)) found.set(intent, position);
    // Troca por espaços do mesmo tamanho para manter as posições das outras intenções.
    rest = rest.split(needle).join(" ".repeat(needle.length));
  }

  // Intenções na ordem em que aparecem na frase.
  const intents = [...found.entries()].sort((a, b) => a[1] - b[1]).map(([intent]) => intent);

  const tokens = rest.split(" ").filter((token) => token && !STOPWORDS.has(token));

  // Enquanto digita, "casam" já conta como "casamento".
  const last = tokens.at(-1);
  if (typingLastWord && last && last.length >= 3) {
    const partial = intentTerms.find(
      ({ term }) => !term.includes(" ") && term.startsWith(last),
    );
    if (partial) {
      tokens.pop();
      if (!intents.includes(partial.intent)) intents.push(partial.intent);
    }
  }

  return { intents, tokens };
}

function scoreService(
  index: ServiceIndex,
  normalizedQuery: string,
  intents: SearchIntent[],
  tokens: string[],
) {
  const parts = intents.length + tokens.length;
  let score = 0;
  let covered = 0;

  for (const intent of intents) {
    const position = intent.services.indexOf(index.service.id);
    if (position < 0) continue;
    const weight = intent.weight ?? WEIGHT.intent;
    score += weight * (1 - (0.5 * position) / intent.services.length);
    covered += 1;
  }

  for (const token of tokens) {
    const points = hasWord(index.name, token)
      ? WEIGHT.name
      : hasWord(index.terms, token)
        ? WEIGHT.term
        : hasWord(index.text, token)
          ? WEIGHT.text
          : 0;
    if (points) {
      score += points;
      covered += 1;
    }
  }

  // Bônus quando a frase digitada bate com um termo do dicionário do serviço.
  if (normalizedQuery.includes(" ")) {
    if (index.phrases.some((phrase) => phrase === normalizedQuery || phrase.startsWith(normalizedQuery))) {
      score += WEIGHT.phraseExact;
    } else if (
      index.phrases.some((phrase) => phrase.includes(" ") && normalizedQuery.includes(phrase))
    ) {
      score += WEIGHT.phraseContained;
    }
  }

  // Quem atende a mais partes da busca sobe no ranking.
  return parts ? score * (covered / parts) : score;
}

export type ServiceSearchResult = {
  services: Service[];
  /** Intenções reconhecidas na busca, para mostrar ao usuário. */
  intents: string[];
};

export function createServiceSearch(services: Service[]) {
  const indexes = services.map(indexService);

  return (query: string): ServiceSearchResult => {
    const normalizedQuery = normalizeSearch(query);
    if (!normalizedQuery) return { services, intents: [] };

    const typingLastWord = !/\s$/.test(query);
    const { intents, tokens } = parseQuery(normalizedQuery, typingLastWord);
    if (!intents.length && !tokens.length) return { services, intents: [] };

    const scored = indexes
      .map((index, order) => ({
        service: index.service,
        order,
        score: scoreService(index, normalizedQuery, intents, tokens),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.order - b.order);

    const top = scored[0]?.score ?? 0;
    return {
      services: scored
        .filter((item) => item.score >= top * MIN_RELATIVE_SCORE)
        .map((item) => item.service),
      intents: intents.map((intent) => intent.label),
    };
  };
}
