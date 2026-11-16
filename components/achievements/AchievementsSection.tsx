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
      'Discovered and responsibly disclosed a P1 (Critical) authentication-bypass vulnerability affecting NASA infrastructure. Received an official Letter of Recognition and Hall of Fame induction.',
    badge: 'NASA Hall of Fame',
  },
  {
    category: 'Community Leadership',
    icon: Users,
    accent: '#38bdf8',
    title: 'Cybersecurity Co-Head, GDGOC',
    description:
      'Lead the cybersecurity track at Google Developer Groups on Campus (VIT Pune), conducting practical workshops on offensive security, CTFs, and defense.',
    badge: 'GDG Lead',
  },
  {
    category: 'National Competition',
    icon: Trophy,
    accent: '#10b981',
    title: 'National Finalist — India Innovates 2026',
    description:
      'Selected as a National Finalist at India Innovates 2026, presenting innovations at Bharat Mandapam, New Delhi.',
    badge: 'National Finalist',
  },
  {
    category: 'Hackathon',
    icon: Trophy,
    accent: '#a855f7',
    title: 'NHA Hackathon 2026 — Built AXIOM',
    description:
      'Competed in the National Health Authority (NHA) Hackathon 2026, designing and presenting the AXIOM security framework.',
    badge: null,
  },
  {
    category: 'Hackathon',
    icon: Trophy,
    accent: '#f97316',
    title: 'PNB Cybersecurity Hackathon 2026',
    description:
      'Competed in the Punjab National Bank Cybersecurity Hackathon, tackling enterprise-grade banking threat scenarios.',
    badge: null,
  },
  {
    category: 'Leadership & Hackathon',
    icon: Trophy,
    accent: '#38bdf8',
    title: 'UIDAI Data Hackathon 2026 — Team Lead',
    description:
      'Led the engineering and security team at the UIDAI National Data Hackathon, architecting secure data pipeline solutions.',
    badge: 'Team Lead',
  },
  {
    category: 'Institutional Leadership',
    icon: Star,
    accent: '#10b981',
    title: 'Head Coordinator — IEI National Conference 2025',
    description:
      'Head Coordinator for the Institution of Engineers (India) National Conference 2025, orchestrating operations alongside senior defense officials.',
    badge: 'Head Coordinator',
  },
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-28 border-t border-white/[0.06] relative">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <ScrollReveal className="mb-14">
          <SectionLabel number="05" text="RECOGNITION &amp; IMPACT" />
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-fg tracking-tight">
            Honors &amp; Accomplishments
          </h2>
          <p className="text-fg-muted mt-3 text-lg max-w-xl">
            National finalist appearances, community leadership, and official security disclosures.
          </p>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.05}>
              <div className="group rounded-2xl border border-white/[0.08] bg-[#0d0f18]/80 backdrop-blur-md p-6 h-full flex flex-col justify-between hover:border-white/[0.2] transition-all hover:shadow-xl hover:shadow-black/40">
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
                      <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <p className="font-mono text-[11px] font-semibold text-fg-muted uppercase tracking-wider mb-1.5">
                    {item.category}
                  </p>
                  <h3 className="font-display font-bold text-fg text-lg mb-2.5 leading-snug group-hover:text-accent transition-colors">
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
