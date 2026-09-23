# Imagenow

Site institucional da Imagenow: soluções visuais para eventos corporativos, ações de marca e celebrações sociais.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Lenis
- React Router
- Lucide React

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Variáveis em `.env`:

- `VITE_WHATSAPP` — número com DDI
- `VITE_EMAIL`
- `VITE_SITE_URL`

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm run preview` — preview do build
- `npm run lint` — ESLint

## Rotas

- `/` — Home
- `/quem-somos` — Página institucional
- `/politica-de-privacidade` — Privacidade

## Assets

Coloque fotografias reais de eventos em `public/images/` e atualize os caminhos em `src/data/services.ts` e nas seções. O hero atual usa `public/images/hero-bg.png`.
