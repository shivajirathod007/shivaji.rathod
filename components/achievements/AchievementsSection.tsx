import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Shield, Users, Trophy, Star, Award, CheckCircle } from 'lucide-react';

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
          <SectionLabel number="05" text="RECOGNITION &amp; IMPACT" />
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
              <div className="group rounded-2xl border border-border bg-bg-surface p-4 sm:p-6 h-full flex flex-col justify-between hover:border-border-strong transition-all hover:shadow-xl hover:shadow-panel-shadow">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `${item.accent}12`,
                        borderColor: `${item.accent}30`,
                        color: item.accent,
                      }}
                    >
                      <item.icon size={20} />
                    </div>

                    {item.badge && (
                      <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full font-medium bg-emerald-500/10 text-volt-ink border border-emerald-500/20">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <p className="font-mono text-[11px] font-semibold text-fg-muted uppercase tracking-wider mb-1.5">
                    {item.category}
                  </p>
                  <h3 className="font-display font-bold text-fg text-lg mb-2.5 leading-snug group-hover:text-accent-ink transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-fg-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
