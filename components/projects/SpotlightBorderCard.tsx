'use client';
import { useRef } from 'react';
import { ExternalLink, Lock } from 'lucide-react';
import { PrivateBadge } from './PrivateBadge';

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
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-2xl border border-border bg-bg-surface p-4 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-2xl hover:shadow-panel-shadow overflow-hidden flex flex-col justify-between ${className}`}
    >
      {/* Top accent accent glow bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 opacity-60 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />

      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--x, 0px) var(--y, 0px), ${accentColor}12, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 mb-3">
          <div>
            {subtitle && (
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-ink mb-1.5">
                {subtitle}
              </p>
            )}
            <h3 className="font-display font-bold text-2xl text-fg tracking-tight group-hover:text-accent-ink transition-colors">
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
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
              </a>
            ) : null}
          </div>
        </div>

        <p className="font-mono text-xs text-fg-muted mb-4">{date}</p>

        <p className="mb-5 max-w-prose text-sm leading-relaxed text-fg-muted">{description}</p>
      </div>

      <div className="relative z-10 pt-4 border-t border-border flex flex-wrap gap-2">
        {tech.map((t) => (
          <span
            key={t}
            className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-fg/[0.04] border border-border text-fg-muted group-hover:border-border-strong transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
