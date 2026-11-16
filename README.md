# Shivaji Rathod — Portfolio

Personal portfolio and security blog for Shivaji Rathod (handle: Shivazzz), a cybersecurity researcher based in Pune, India.

**Live site:** https://shivajirathod.dev

## Tech Stack

- Next.js 16 (App Router, TypeScript strict mode)
- Tailwind CSS v4 with custom design tokens
- Framer Motion for UI animation
- HTML Canvas 2D — 360° turntable avatar
- MDX blog (`content/posts/*.mdx`) — no database
- Web3Forms + Cloudflare Turnstile — contact form
- Upstash Redis — serverless rate limiting
- Vercel free tier — hosting

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/shivajirathod007/shivajirathod-portfolio.git
cd shivajirathod-portfolio
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | Source |
|---|---|
| `WEB3FORMS_ACCESS_KEY` | [web3forms.com](https://web3forms.com) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Dashboard → Turnstile |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Same Turnstile widget |
| `UPSTASH_REDIS_REST_URL` | [console.upstash.com](https://console.upstash.com) |
| `UPSTASH_REDIS_REST_TOKEN` | Same Upstash database |

### 3. Run dev server

```bash
npm run dev
```

## Turntable Avatar

The 360° avatar frames are **pre-committed** to `public/turntable/` and `lib/turntable-manifest.generated.ts`. Vercel does not run the photo pipeline.

### Replacing photos (local only)

1. Put updated PNG files in `PHOTOS-BG/` at the workspace root (parent of `portfolio/`)
2. `npm run photos`
3. Commit the generated files in `public/turntable/` and `lib/turntable-manifest.generated.ts`

## Adding a Blog Post

1. Create `content/posts/your-slug.mdx`
2. Add frontmatter:
   ```yaml
   ---
   title: "Post Title"
   date: "2026-01-15"
   summary: "One sentence description."
   tags: ["CVE", "Web Security"]
   draft: false
   ---
   ```
3. Write MDX content below
4. `git push` — Vercel deploys automatically

Posts with `draft: true` are hidden in production.

## Deploying to Vercel

1. Push repository to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Set Root Directory to the repo root (or `portfolio/` if nested)
4. Add all env vars from `.env.example` under Settings → Environment Variables
5. Deploy

No build-time photo processing is needed — frames are pre-committed.

## Running Tests

```bash
npm test          # run all tests once
npm run test:watch  # watch mode
```

## Security

See [SECURITY.md](./SECURITY.md) for the vulnerability disclosure policy.

# shivaji.rathod
