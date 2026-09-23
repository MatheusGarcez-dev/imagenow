/**
 * Cadastro de galerias Pixieset.
 *
 * Como adicionar um evento:
 * 1. Publique a coleção no Pixieset (subdomínio: galerias.imagenow.com.br).
 * 2. Inclua um item abaixo com code, galleryUrl e status: "active".
 * 3. Faça o deploy. Não liste galerias publicamente na UI.
 *
 * DNS (fora do código):
 * CNAME  galerias  →  domain.pixieset.com
 * Depois: Pixieset > Settings > Branding > Custom Domain
 */

export type GalleryStatus = "active" | "inactive";

export type GalleryEntry = {
  /** Nome interno / exibição administrativa */
  name: string;
  /** Código digitado pelo participante (case-insensitive) */
  code: string;
  /** URL final no Pixieset (custom domain ou slug) */
  galleryUrl: string;
  /** Data do evento (ISO yyyy-mm-dd), opcional */
  eventDate?: string;
  /** Cliente / marca */
  client?: string;
  status: GalleryStatus;
  /** Após esta data (ISO), o código deixa de redirecionar */
  expiresAt?: string;
  /** Notas internas — não aparecem no site */
  notes?: string;
};

/** Base do subdomínio Pixieset (após DNS configurado) */
export const PIXIESET_BASE_URL = "https://galerias.imagenow.com.br";

/**
 * Exemplos inativos — troque por eventos reais e marque status: "active".
 * O site nunca lista essas entradas; só resolve por código.
 */
export const galleries: GalleryEntry[] = [
  {
    name: "Levi's Piet 2026",
    code: "LEVISPIET2026",
    galleryUrl: `${PIXIESET_BASE_URL}/levispiet2026`,
    eventDate: "2026-01-01",
    client: "Levi's",
    status: "inactive",
    notes: "Exemplo do briefing — ativar quando a coleção existir no Pixieset.",
  },
  {
    name: "Pringles 2026",
    code: "PRINGLES2026",
    galleryUrl: `${PIXIESET_BASE_URL}/pringles2026`,
    eventDate: "2026-01-01",
    client: "Pringles",
    status: "inactive",
    notes: "Exemplo do briefing — ativar quando a coleção existir no Pixieset.",
  },
];

export function normalizeGalleryCode(raw: string) {
  return raw.trim().replace(/\s+/g, "").toUpperCase();
}

function isExpired(entry: GalleryEntry, now = new Date()) {
  if (!entry.expiresAt) return false;
  const end = new Date(`${entry.expiresAt}T23:59:59`);
  return Number.isFinite(end.getTime()) && now > end;
}

export type GalleryLookupResult =
  | { ok: true; entry: GalleryEntry; redirectUrl: string }
  | { ok: false; reason: "empty" | "not_found" | "inactive" | "expired" };

/** Monta URL com UTMs para medir tráfego vindo do site */
export function buildGalleryRedirectUrl(entry: GalleryEntry, code: string) {
  try {
    const url = new URL(entry.galleryUrl);
    if (!url.searchParams.has("utm_source")) {
      url.searchParams.set("utm_source", "imagenow_site");
      url.searchParams.set("utm_medium", "galerias");
      url.searchParams.set("utm_campaign", normalizeGalleryCode(code).toLowerCase());
    }
    return url.toString();
  } catch {
    return entry.galleryUrl;
  }
}

export function findGalleryByCode(raw: string, now = new Date()): GalleryLookupResult {
  const code = normalizeGalleryCode(raw);
  if (!code) return { ok: false, reason: "empty" };

  const entry = galleries.find(
    (item) => normalizeGalleryCode(item.code) === code,
  );

  if (!entry) return { ok: false, reason: "not_found" };
  if (entry.status !== "active") return { ok: false, reason: "inactive" };
  if (isExpired(entry, now)) return { ok: false, reason: "expired" };

  return {
    ok: true,
    entry,
    redirectUrl: buildGalleryRedirectUrl(entry, code),
  };
}
