# ForestSaver — Architecture

## System Overview

```mermaid
graph TB
    subgraph Client["Browser (Client)"]
        UI[Next.js Pages]
    end

    subgraph VPS["VPS (Ubuntu, Russia)"]
        NGINX["nginx<br/>port 80/443"]
        APP["Next.js App<br/>Docker · port 3000"]
        ENV[".env<br/>Secrets"]
    end

    CF["Cloudflare Worker<br/>dry-hill-25de.khvanches.workers.dev"]
    TG["Telegram Bot API<br/>api.telegram.org"]
    MAIL["mail.ru SMTP<br/>smtp.mail.ru:465"]

    subgraph CI["CI/CD"]
        GH["GitHub<br/>khvanches/ForestSaver"]
        GA[GitHub Actions]
        GHCR["GitHub Container Registry<br/>ghcr.io/khvanches/forestsaver"]
    end

    UI -->|HTTPS| NGINX
    NGINX -->|proxy_pass :3000| APP
    APP -->|reads| ENV
    APP -->|POST /sendMessage| CF
    CF -->|forwarded request| TG
    APP -->|SMTP| MAIL

    GH -->|push to main| GA
    GA -->|docker build & push| GHCR
    GA -->|SSH deploy| VPS
    GHCR -->|docker pull| APP
```

---

## Order Flow (POST /api/order)

```mermaid
sequenceDiagram
    actor User
    participant Form as Gift Form
    participant API as /api/order
    participant PDF as generateCertificate
    participant CW as Cloudflare Worker
    participant TG as Telegram Bot
    participant SMTP as mail.ru SMTP
    participant Owner as podariles@mail.ru

    User->>Form: Fill form (name, email, recipient, tier)
    Form->>API: POST /api/order
    API->>CW: POST /bot{token}/sendMessage
    CW->>TG: forward (hostname swapped)
    TG-->>Owner: 🌲 Новая заявка (short notice)
    API->>PDF: generateCertificate({ recipient, certNumber, date })
    PDF-->>API: Buffer (PDF)
    API->>SMTP: sendEmail(subject, html, [pdf attachment])
    SMTP-->>Owner: Email + certificate-YYYYMMDD-XXXX.pdf
    API-->>Form: { ok: true }
    Form-->>User: Success screen
```

---

## Certificate Generation

```mermaid
flowchart LR
    PNG["certificate-template.png<br/>A4 landscape · 841×595 pt"] --> PDF
    TTF["Roboto-Regular.ttf<br/>Cyrillic font"] --> PDF
    DATA["{ recipient, certNumber, date }"] --> PDF

    subgraph PDF["pdf-lib · lib/certificate.ts"]
        BG[Draw background image]
        NAME["Draw name<br/>size=42 · y=318 · centered"]
        DATE["Draw date<br/>x=255 · y=200 · size=11"]
        CERT["Draw cert number<br/>x=490 · y=200 · size=11"]
    end

    PDF --> BUF[Buffer → email attachment]
```

---

## CI/CD Pipeline

```mermaid
flowchart LR
    DEV["Local dev<br/>git push"] --> GH["GitHub<br/>main branch"]
    GH --> GA["GitHub Actions<br/>deploy.yml"]

    subgraph GA
        BUILD["docker buildx<br/>linux/amd64<br/>Dockerfile.amd64"]
        PUSH["push to<br/>ghcr.io"]
        SSH["SSH to VPS<br/>deploy user"]
        DEPLOY["docker compose pull<br/>docker compose up -d"]
        SMOKE["curl localhost:3000<br/>smoke test"]
    end

    BUILD --> PUSH --> SSH --> DEPLOY --> SMOKE
    GA -->|secrets| SECRETS["SSH_HOST<br/>SSH_USER<br/>SSH_PRIVATE_KEY (base64)"]
```

---

## Infrastructure

```
podariles.ru (DNS A → VPS IP)
    │
    ▼
nginx (Let's Encrypt TLS)
    │  proxy_pass http://localhost:3000
    ▼
Docker container (ghcr.io/khvanches/forestsaver:latest)
    │
    ├── Next.js App (standalone output)
    ├── /public/images/   — compressed JPEGs (~4 MB total)
    ├── /public/fonts/    — Roboto-Regular.ttf
    └── reads .env        — /home/deploy/forestsaver/.env

Telegram blocked on VPS → routed via Cloudflare Worker (free tier, 100k req/day)
```

---

## Key Files

| Path | Role |
|------|------|
| `app/api/order/route.ts` | Order handler: Telegram + email + PDF |
| `app/api/contact/route.ts` | Contact handler: Telegram + email |
| `lib/certificate.ts` | PDF certificate generator |
| `lib/email.ts` | Nodemailer wrapper (mail.ru SMTP) |
| `components/gift-section.tsx` | Order form + dialog (currently shows mailto fallback) |
| `Dockerfile.amd64` | Production image (linux/amd64) |
| `.github/workflows/deploy.yml` | CI/CD pipeline |
