import Link from 'next/link';
import { Mail, Rss, ExternalLink } from 'lucide-react';

/* Brand icons not available in this lucide-react version — inline SVGs */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

import type { FC } from 'react';

type IconComponent = FC<{ size?: number }>;

const SOCIAL_LINKS: { label: string; href: string; Icon: IconComponent }[] = [
  { label: 'GitHub', href: 'https://github.com/shivajirathod007', Icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/shivaji-rathod007', Icon: LinkedinIcon },
  { label: 'TryHackMe', href: 'https://tryhackme.com/p/im.rahasya', Icon: ExternalLink },
  { label: 'Email', href: 'mailto:shivaji.rathod.in@gmail.com', Icon: Mail },
  { label: 'RSS', href: '/rss.xml', Icon: Rss },
];

const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Site: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Contact', href: '/#contact' },
  ],
  Blog: [
    { label: 'All Posts', href: '/blog' },
    { label: 'RSS Feed', href: '/rss.xml' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
  Research: [
    { label: 'Security Policy', href: '/.well-known/security.txt' },
    { label: 'GitHub', href: 'https://github.com/shivajirathod007' },
    { label: 'TryHackMe', href: 'https://tryhackme.com/p/im.rahasya' },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="group relative overflow-hidden border-t border-border bg-bg-surface pt-14 pb-8 sm:pb-12">
      {/* ── Ambient Warm Lighting ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(249, 115, 22, 0.06) 0%, transparent 70%)',
        }}
      />

      {/* ── Colossal Transparent "SHIVAJI" Watermark at Site Base (Address Bar Edge) ── */}
      <div
        className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full overflow-hidden z-0 flex items-end justify-center"
        aria-hidden="true"
      >
        <span
          className="font-display font-black uppercase text-center tracking-tighter leading-[0.72] whitespace-nowrap block text-transparent select-none transition-all duration-700"
          style={{
            fontSize: 'min(21vw, 24rem)',
            WebkitTextStroke: '1.5px color-mix(in srgb, var(--fg) 13%, transparent)',
            backgroundImage:
              'linear-gradient(180deg, color-mix(in srgb, var(--fg) 12%, transparent), color-mix(in srgb, var(--fg) 2%, transparent) 65%, transparent)',
            WebkitBackgroundClip: 'text',
            letterSpacing: '-0.04em',
          }}
        >
          SHIVAJI
        </span>
      </div>

      {/* ── Foreground Footer Links & Content ── */}
      <div className="relative z-10 section-container">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-mono text-sm font-semibold text-fg hover:text-accent-ink transition-colors">
              SR<span className="text-accent-ink">.</span>
            </Link>
            <p className="mt-3 text-sm text-fg-muted max-w-xs">
              Cybersecurity researcher based in Pune, India.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-1 xl:gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={s.label}
                  className="text-fg-muted hover:text-fg transition-colors p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <s.Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-fg-muted mb-4">
                {heading}
              </h3>
              <ul className="space-y-2 list-none">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith('http') ? '_blank' : undefined}
                      rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-fg-muted hover:text-fg transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-fg-muted">
            © {year} Shivaji Rathod. Built with Next.js.
          </p>
          <a
            href="/.well-known/security.txt"
            className="font-mono text-xs text-fg-muted hover:text-volt-ink transition-colors"
          >
            security.txt
          </a>
        </div>
      </div>
    </footer>
  );
}
