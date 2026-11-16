# Security Policy

## Supported Versions

This is a personal portfolio website. The latest deployed version on [shivajirathod.dev](https://shivajirathod.dev) is the only supported version.

## Reporting a Vulnerability

If you discover a security vulnerability in this site, please report it responsibly.

**Contact:** shivaji.rathod.in@gmail.com
**Subject:** `[SECURITY] shivajirathod.dev — <brief description>`

Please include:
- A description of the vulnerability and its potential impact
- Steps to reproduce
- Proof-of-concept (screenshots, payloads, etc.)

I will acknowledge reports within 48 hours and aim to resolve confirmed issues within 14 days.

## Scope

In scope: the production site at shivajirathod.dev, the contact form API, XSS/CSRF/injection/auth-bypass vulnerabilities.

Out of scope: denial-of-service, social engineering, physical security, third-party services (Vercel, Cloudflare, Web3Forms, Upstash).

## CSP Implementation Note

This site uses a **static allowlist-based CSP** in `next.config.ts`, not nonce-based.

**Why:** Next.js App Router cannot inject per-request nonces in `next.config.ts` without middleware or an edge runtime. A static allowlist CSP with a strict `script-src` provides the same protection for a predominantly static site without that complexity.

**Trade-off:** `unsafe-inline` is permitted for `style-src` only, as required by Tailwind CSS v4. Style injection cannot create XSS without script execution.
