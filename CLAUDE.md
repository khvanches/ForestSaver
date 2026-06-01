# LesVozrozhdeniye — Project Context

Pet project for friends. Single-page landing for a tree-planting initiative in the Smolensk region of Russia.

## What the project does

The site sells a "gift tree": a buyer pays, receives a certificate with GPS coordinates of their tree. Three tiers: one tree (250 ₽), grove of 5 trees (1 000 ₽), VIP planting (3 000 ₽).

Contacts and the order form are **placeholders** — email, phone, address are fictional; the form shows a success screen but sends nothing.

## Stack

- **Next.js 16** + **React 19** + **TypeScript**
- **Tailwind CSS 4** + **shadcn/ui** (Radix UI)
- **Fonts:** Playfair Display (`--font-serif`) and Source Sans 3 (`--font-sans`)
- **Icons:** lucide-react
- **Analytics:** @vercel/analytics (wired up in layout.tsx)
- **Site language:** Russian; code and comments — Russian; config files — English

## Separate pages

| Route | File | Notes |
|-------|------|-------|
| `/privacy` | app/privacy/page.tsx | Privacy policy. Operator details are placeholder — marked as `[ОПЕРАТОР: ...]` |

---

## Page sections (render order)

| Component | File | Anchor | What it does |
|-----------|------|--------|--------------|
| HeroSection | components/hero-section.tsx | — | Forest photo, logo, headline, 2 CTAs, 3 stats |
| AboutSection | components/about-section.tsx | `about` | 4 benefit cards |
| GallerySection | components/gallery-section.tsx | `gallery` | 4 photos from Smolensk region (2×2 grid) |
| ProgressSection | components/progress-section.tsx | — | SVG progress ring (7 609 / 10 000 trees) + 6 reviews |
| ServicesSection | components/services-section.tsx | — | Accordion: 4 service types |
| EndangeredSection | components/endangered-section.tsx | — | Dying forests: photo + 3 threats + CTA |
| GiftSection | components/gift-section.tsx | `gift` | 3 pricing options, button → #contact |
| ContactSection | components/contact-section.tsx | `contact` | Placeholder contacts + placeholder form |
| Footer | components/footer.tsx | — | Logo + copyright |

## Hardcoded data (no backend)

- Trees planted: **7 609** (goal 10 000) — `progress-section.tsx:39-40`
- Hero stats: **7 000+** trees, **12** ha, **2 500+** certificates — `hero-section.tsx:71-83`
- Reviews: 6 items, all fictional — `progress-section.tsx:6-36`
- Gallery images in `public/images/`: our_forest1.jpg, our_forest2.jpg, our_forest3.jpg, our_forest4.png, dying-forest.jpg

## Deployment

**Flow:** push to `main` → GitHub Actions → build Docker image (linux/amd64) → push to `ghcr.io/khvanches/forestsaver:latest` → SSH to server → `docker compose pull && up -d`

| What | Value |
|------|-------|
| Domain | pirogylkin.duckdns.org |
| Server | VPS, nginx + Docker |
| Path on server | `/home/deploy/forestsaver` |
| Docker image | `ghcr.io/khvanches/forestsaver:latest` |
| SSH user | `deploy` |

**Required GitHub Secrets:** `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`

**Dockerfiles:** two files — `Dockerfile` (local builds/tests), `Dockerfile.amd64` (server deploy, linux/amd64).

**next.config.mjs:** `output: "standalone"` for Docker; `output: "export"` when `GITHUB_PAGES=true`.

**Workflows:**
- `.github/workflows/deploy.yml` — main: build + push to ghcr.io + SSH deploy
- `.github/workflows/github-pages.yml` — static export to GitHub Pages (alternative channel)

Full first-time server setup instructions: `.github/DEPLOY_SETUP.md`

## What's not done yet

- Order form not connected to a backend (no email sending, Telegram bot, etc.)
- Contact details are fictional — need to be replaced with real ones
- All stats are hardcoded, no CMS or API
- Privacy policy operator details are placeholder (`[ОПЕРАТОР: ...]` in app/privacy/page.tsx) — fill in when legal entity is set up

## Infrastructure state (as of 2026-06-01)

- CI/CD pipeline is live: push to `main` → build → deploy to VPS
- HTTPS working via Let's Encrypt certs at `/etc/letsencrypt/live/pirogylkin.duckdns.org/`
- nginx config: `/etc/nginx/sites-available/pirogylkin.duckdns.org.conf` (HTTPS reverse proxy → port 3000)
- n8n was removed from the server; forestsaver now owns the domain
- `SSH_PRIVATE_KEY` secret in GitHub is stored as **base64** (`base64 -i ~/.ssh/id_deploy`), decoded in workflow
