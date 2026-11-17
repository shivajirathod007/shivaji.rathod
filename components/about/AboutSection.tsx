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
        <ScrollReveal className="mb-8 sm:mb-12">
          <SectionLabel number="01" text="PROFILE &amp; BACKGROUND" />
          <h2 id="about-heading" className="font-display text-[clamp(2.4rem,5.6vw,4.5rem)] font-bold leading-none text-fg">
            Security research{' '}
            <span className="mt-1 block font-serif font-normal italic text-accent-ink">
              grounded in engineering.
            </span>
          </h2>
        </ScrollReveal>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
          <div className="space-y-6 text-base leading-relaxed text-fg-muted sm:text-lg">
            <ScrollReveal delay={0.05} className="space-y-5">
              <p className="max-w-[34ch] text-[clamp(1.3rem,2.6vw,1.85rem)] leading-snug font-medium text-pretty text-fg">
                I’m a cybersecurity researcher who loves breaking things (ethically, of course) just to figure out how to make them harder to break.
              </p>
              <p>
                From hunting vulnerabilities and exploring cloud security to building AI-powered defense systems, I enjoy turning curiosity into real-world solutions.
              </p>
              <p className="border-l-2 border-accent pl-4 font-serif text-[clamp(1.65rem,3vw,2.25rem)] leading-tight italic text-accent-ink sm:pl-6">
                <strong className="font-normal">If something looks secure, my first question is: “But what if it isn&apos;t?”</strong>
              </p>
            </ScrollReveal>

            <ScrollReveal className="space-y-5">
              <p>
                Beyond terminals and exploits, I&apos;m fascinated by psychology, philosophy, and understanding how people think. Because sometimes, the biggest vulnerability isn&apos;t in the code — it&apos;s in the assumptions behind it.
              </p>
              <p>
                I believe in <strong className="font-semibold text-fg">questioning everything, building things that matter, and learning something new every day.</strong>
              </p>
              <p>
                And when I&apos;m not staring at a terminal, I&apos;m probably overthinking life, reading about something completely unrelated, or finding another rabbit hole to explore.
              </p>
            </ScrollReveal>

            <ScrollReveal className="border-t border-border pt-6">
              <p className="max-w-[30ch] font-serif text-[clamp(1.85rem,3.5vw,2.8rem)] leading-tight italic text-pretty text-fg">
                <strong className="font-normal">Curiosity is my default setting. <span className="text-accent-ink">Security is just where I put it to work.</span></strong>
              </p>
            </ScrollReveal>
          </div>

          <div className="min-w-0 space-y-8">
            <ScrollReveal delay={0.12} className="rounded-2xl border border-border bg-bg-surface p-4 sm:p-6">
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

            <ScrollReveal className="space-y-4 border-t border-border pt-6 text-sm leading-relaxed text-fg-muted sm:text-base">
              <h3 className="font-display text-xl font-bold text-fg">Research &amp; engineering</h3>
              <p>
                I am a cybersecurity researcher and Computer Engineering student at <strong className="text-fg font-medium">VIT Pune</strong>, specializing in cloud security, vulnerability research, and application security. My work bridges both offensive and defensive disciplines — identifying systemic vulnerabilities before attackers do, and architecting systems that resist compromise.
              </p>
              <p>
                As a Security Engineering Intern at <strong className="text-fg font-medium">Accion Labs</strong>, I conduct AI security assessments, support Red Team adversarial simulations, and help engineering teams embed security into automated CI/CD pipelines. Recognised in <strong className="text-fg font-medium">NASA&apos;s VDP Hall of Fame for reporting a critical (P1) authentication bypass</strong> and received an official Letter of Recognition.
              </p>
              <p>
                I build pragmatic security tools: from an exposure intelligence platform with post-quantum cryptography migration metrics (TRINETRA), to a privacy proxy that redacts PII before prompts reach external LLMs (AI-RAKSHAK), and an adaptive WAF.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
