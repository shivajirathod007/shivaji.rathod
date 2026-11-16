import { ScrollReveal } from '@/components/ScrollReveal';

export interface TimelineEntry {
  title: string;
  org: string;
  location?: string;
  period: string;
  bullets?: string[];
  meta?: string;
  type: 'work' | 'education' | 'leadership';
}

interface VerticalTimelineProps {
  entries: TimelineEntry[];
}

export function VerticalTimeline({ entries }: VerticalTimelineProps) {
  return (
    <div className="relative">
      {/* Central spine line */}
      <div
        className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-accent/50 via-white/10 to-transparent -translate-x-1/2"
        aria-hidden="true"
      />

      <div className="space-y-12">
        {entries.map((entry, i) => {
          const isEven = i % 2 === 0;
          return (
            <ScrollReveal key={i} delay={i * 0.08} direction={isEven ? 'left' : 'right'}>
              <div
                className={`relative flex flex-col md:flex-row ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-6 md:gap-12 pl-10 md:pl-0 items-start`}
              >
                {/* Node marker on the line */}
                <div
                  className="absolute left-4 md:left-1/2 top-7 -translate-x-1/2 flex items-center justify-center z-10"
                  aria-hidden="true"
                >
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-[#090a0f] bg-accent shadow-[0_0_12px_rgba(249,115,22,0.6)]" />
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-[calc(50%-2rem)] ${
                    isEven ? 'md:ml-auto md:pr-0' : 'md:mr-auto md:pl-0'
                  }`}
                >
                  <div className="rounded-2xl border border-white/[0.08] bg-[#0d0f18]/80 backdrop-blur-md p-6 hover:border-white/[0.18] transition-all hover:shadow-xl hover:shadow-black/40">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                        {entry.period}
                      </span>
                      {entry.location && (
                        <span className="font-mono text-xs text-fg-muted">
                          {entry.location}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-xl text-fg mb-1">
                      {entry.title}
                    </h3>
                    <p className="text-sm font-medium text-fg-muted mb-4">
                      {entry.org}
                    </p>

                    {entry.meta && (
                      <div className="mb-4 inline-block font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                        {entry.meta}
                      </div>
                    )}

                    {entry.bullets && entry.bullets.length > 0 && (
                      <ul className="space-y-2 pt-2 border-t border-white/[0.06]">
                        {entry.bullets.map((bullet, j) => (
                          <li
                            key={j}
                            className="text-sm text-fg-muted leading-relaxed flex items-start gap-2.5"
                          >
                            <span className="text-accent mt-1.5 shrink-0 text-xs">◆</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
