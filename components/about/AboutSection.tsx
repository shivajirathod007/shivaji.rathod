import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { MapPin, Mail, ExternalLink, ShieldCheck, Award } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="section-space border-t border-border relative">
      <div className="section-container">
        <ScrollReveal>
          <SectionLabel number="01" text="PROFILE &amp; BACKGROUND" />
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-6">
          {/* Main Story (7 cols) */}
          <ScrollReveal delay={0.1} className="lg:col-span-7 space-y-6">
            <h2
              className="font-display font-bold text-fg leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)' }}
            >
              Security research <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-ink to-amber-ink">
                grounded in engineering.
              </span>
            </h2>

            <div className="space-y-4 text-fg-muted text-base sm:text-lg leading-relaxed font-normal">
              <p>
                I am a cybersecurity researcher and Computer Engineering student at <strong className="text-fg font-medium">VIT Pune</strong>, specializing in cloud security, vulnerability research, and application security. My work bridges both offensive and defensive disciplines — identifying systemic vulnerabilities before attackers do, and architecting systems that resist compromise.
              </p>
              <p>
                As a Security Engineering Intern at <strong className="text-fg font-medium">Accion Labs</strong>, I conduct AI security assessments, support Red Team adversarial simulations, and help engineering teams embed security into automated CI/CD pipelines. Recognised in <strong className="text-fg font-medium">NASA&apos;s VDP Hall of Fame for reporting a critical (P1) authentication bypass</strong> and received an official Letter of Recognition.
              </p>
              <p>
                I build pragmatic security tools: from an exposure intelligence platform with post-quantum cryptography migration metrics (TRINETRA), to a privacy proxy that redacts PII before prompts reach external LLMs (AI-RAKSHAK), and an adaptive WAF.
              </p>
            </div>
          </ScrollReveal>

          {/* Quick Info & Verification Panel (5 cols) */}
          <ScrollReveal delay={0.2} className="lg:col-span-5 space-y-5">
            {/* Highlights Card */}
            <div className="rounded-2xl border border-border bg-bg-surface p-4 sm:p-6 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-ink">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-fg text-base">Key Distinction</h4>
                  <p className="font-mono text-xs text-accent-ink">NASA VDP Hall of Fame (P1 Recognition)</p>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={16} className="text-accent-ink shrink-0" />
                  <span className="text-fg-muted">Pune, Maharashtra, India</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-accent-ink shrink-0" />
                  <a
                    href="mailto:shivaji.rathod.in@gmail.com"
                    className="text-fg-muted hover:text-fg transition-colors font-mono text-xs"
                  >
                    shivaji.rathod.in@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <ShieldCheck size={16} className="text-volt-ink shrink-0" />
                  <span className="text-fg-muted">PGP / Responsible Disclosure Verified</span>
                </div>
              </div>
            </div>

            {/* Social / Profiles Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { label: 'GitHub', href: 'https://github.com/shivajirathod007' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/shivaji-rathod007' },
                { label: 'TryHackMe', href: 'https://tryhackme.com/p/im.rahasya' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 px-1.5 py-3 sm:p-3.5 rounded-xl border border-border bg-fg/[0.02] text-xs font-mono text-fg-muted hover:text-fg hover:border-accent/40 hover:bg-accent/5 transition-all text-center min-h-[64px]"
                >
                  <ExternalLink size={14} className="text-accent-ink" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
