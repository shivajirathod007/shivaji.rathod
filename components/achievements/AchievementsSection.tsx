import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Shield, Users, Trophy, Star } from 'lucide-react';

const ACHIEVEMENTS = [
  {
    category: 'Security Research',
    icon: Shield,
    accent: '#f97316',
    title: 'NASA VDP — P1 Critical Disclosure',
    description:
      'Reported a critical authentication bypass and received a Letter of Recognition.',
    badge: 'NASA Hall of Fame',
  },
  {
    category: 'Community Leadership',
    icon: Users,
    accent: '#38bdf8',
    title: 'Cybersecurity Co-Head, GDGOC',
    description:
      'Lead hands-on security and CTF workshops at VIT Pune.',
    badge: 'GDG Lead',
  },
  {
    category: 'National Competition',
    icon: Trophy,
    accent: '#10b981',
    title: 'National Finalist — India Innovates 2026',
    description:
      'Presented at Bharat Mandapam, New Delhi.',
    badge: 'National Finalist',
  },
  {
    category: 'Hackathon',
    icon: Trophy,
    accent: '#a855f7',
    title: 'NHA Hackathon 2026 — Built AXIOM',
    description:
      'Designed and presented the AXIOM security framework.',
    badge: null,
  },
  {
    category: 'Hackathon',
    icon: Trophy,
    accent: '#f97316',
    title: 'PNB Cybersecurity Hackathon 2026',
    description:
      'Tackled security scenarios for banking systems.',
    badge: null,
  },
  {
    category: 'Leadership & Hackathon',
    icon: Trophy,
    accent: '#38bdf8',
    title: 'UIDAI Data Hackathon 2026 — Team Lead',
    description:
      'Led the team designing secure data pipelines.',
    badge: 'Team Lead',
  },
  {
    category: 'Institutional Leadership',
    icon: Star,
    accent: '#10b981',
    title: 'Head Coordinator — IEI National Conference 2025',
    description:
      'Managed conference operations alongside senior defense officials.',
    badge: 'Head Coordinator',
  },
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="section-space border-t border-border relative">
      <div className="section-container">
        <ScrollReveal className="section-intro">
          <SectionLabel number="05" text="Recognition &amp; Impact" />
          <h2 className="font-display section-title font-bold text-fg tracking-tight">
            Honors &amp; Accomplishments
          </h2>
          <p className="text-fg-muted mt-3 text-base sm:text-lg max-w-xl">
            Responsible disclosures, national competitions, and community leadership.
          </p>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.05}>
              <article className="portfolio-card h-full p-5 transition-colors hover:border-border-strong sm:p-6">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border"
                      style={{
                        backgroundColor: `${item.accent}12`,
                        borderColor: `${item.accent}30`,
                        color: item.accent,
                      }}
                    >
                      <item.icon size={18} aria-hidden="true" />
                    </div>

                    {item.badge && (
                      <span className="rounded-full border border-border bg-bg-elevated/70 px-2.5 py-1 text-xs font-medium text-fg-muted">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <p className="mb-1.5 text-xs font-semibold text-accent-ink">
                    {item.category}
                  </p>
                  <h3 className="mb-2 text-lg leading-snug font-bold text-fg sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="text-sm text-fg-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
