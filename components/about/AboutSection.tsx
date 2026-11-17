import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { MapPin, Mail, ExternalLink, ShieldCheck, Award } from 'lucide-react';

const PROFILE_LINKS = [
  { label: 'GitHub', href: 'https://github.com/shivajirathod007' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/shivaji-rathod007' },
  { label: 'TryHackMe', href: 'https://tryhackme.com/p/im.rahasya' },
];

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-space border-t border-border">
      <div className="section-container">
        <ScrollReveal className="section-intro">
          <SectionLabel number="01" text="PROFILE &amp; BACKGROUND" />
          <h2 id="about-heading" className="section-title font-display font-bold text-fg">
            Security research{' '}
            <span className="mt-1 block font-serif font-normal italic text-accent-ink">
              grounded in engineering.
            </span>
          </h2>
        </ScrollReveal>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-14">
          <div className="space-y-6 text-base leading-relaxed text-fg-muted sm:text-lg">
            <ScrollReveal delay={0.05} className="space-y-4">
              <p className="max-w-[44ch] text-xl leading-snug font-medium text-pretty text-fg sm:text-2xl">
                I’m a cybersecurity researcher who loves breaking things (ethically, of course) just to figure out how to make them harder to break.
              </p>
              <p className="max-w-[55ch]">
                I hunt vulnerabilities, explore cloud security, and build AI defenses. Away from the terminal, I’m curious about psychology, philosophy, and the assumptions behind the systems we trust.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <blockquote className="border-l-2 border-accent pl-4 font-serif text-[clamp(1.65rem,3vw,2.35rem)] leading-tight italic text-pretty text-fg sm:pl-6">
                Curiosity is my default setting. <span className="text-accent-ink">Security is just where I put it to work.</span>
              </blockquote>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.12} className="min-w-0 rounded-2xl border border-border bg-linear-to-br from-bg-surface to-bg-elevated p-4 sm:p-6">
            <div className="flex items-start gap-3 border-b border-border pb-5">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-accent/20 bg-accent/10 text-accent-ink">
                <Award size={20} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-mono text-xs font-semibold tracking-wider text-accent-ink uppercase">Key Distinction</h3>
                <p className="mt-1 font-display text-xl leading-tight font-bold text-fg">NASA VDP Hall of Fame (P1 Recognition)</p>
              </div>
            </div>

            <ul className="space-y-3 py-5 text-sm text-fg-muted">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="shrink-0 text-accent-ink" aria-hidden="true" />
                Pune, Maharashtra, India
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-accent-ink" aria-hidden="true" />
                <a href="mailto:shivaji.rathod.in@gmail.com" className="font-mono text-xs transition-colors hover:text-fg">
                  shivaji.rathod.in@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck size={16} className="shrink-0 text-volt-ink" aria-hidden="true" />
                PGP / Responsible Disclosure Verified
              </li>
            </ul>

            <ul className="grid grid-cols-3 gap-2 border-t border-border pt-4">
              {PROFILE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 flex-wrap items-center justify-center gap-x-1.5 gap-y-1 rounded-lg py-2 text-center font-mono text-xs text-fg-muted transition-colors hover:bg-accent/10 hover:text-accent-ink"
                  >
                    {label}
                    <ExternalLink size={12} className="shrink-0 text-accent-ink" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
