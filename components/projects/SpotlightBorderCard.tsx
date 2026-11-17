import type { CSSProperties } from 'react';
import { ExternalLink, Lock } from 'lucide-react';

export interface SpotlightBorderCardProps {
  title: string;
  subtitle?: string;
  description: string;
  tech: string[];
  date: string;
  link?: string;
  isPrivate?: boolean;
  accentColor: string;
  className?: string;
}

export function SpotlightBorderCard({
  title,
  subtitle,
  description,
  tech,
  date,
  link,
  isPrivate,
  accentColor,
  className = '',
}: SpotlightBorderCardProps) {
  return (
    <article
      className={`portfolio-card flex h-full flex-col justify-between p-5 transition-colors hover:border-border-strong sm:p-7 ${className}`}
      style={{ '--card-accent': accentColor } as CSSProperties}
    >
      <div>
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 mb-3">
          <div>
            {subtitle && (
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-ink mb-1.5">
                {subtitle}
              </p>
            )}
            <h3 className="font-display font-bold text-2xl text-fg tracking-tight">
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isPrivate ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-amber-500/10 text-amber-ink border border-amber-500/20">
                <Lock size={11} /> Internal
              </span>
            ) : link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${title} on GitHub`}
                className="p-2 rounded-lg text-fg-muted hover:text-fg hover:bg-fg/[0.06] transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            ) : null}
          </div>
        </div>

        <p className="font-mono text-xs text-fg-muted mb-4">{date}</p>

        <p className="mb-5 max-w-prose text-sm leading-relaxed text-fg-muted">{description}</p>
      </div>

      <div className="pt-4 border-t border-border flex flex-wrap gap-2">
        {tech.map((t) => (
          <span
            key={t}
            className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-fg/[0.04] border border-border text-fg-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
