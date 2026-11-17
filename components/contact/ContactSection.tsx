import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ContactForm } from './ContactForm';
import { Mail, GitBranch, Link, ExternalLink } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="section-space border-t border-border">
      <div className="section-container">
        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] lg:gap-14">
          {/* Left: copy */}
          <ScrollReveal>
            <SectionLabel number="08" text="Contact" />
            <h2 className="font-display section-title font-bold text-fg mb-4">
              Let&apos;s work together
            </h2>
            <p className="text-fg-muted leading-relaxed mb-8 max-w-md">
              Open to security engineering roles, research collaborations, and responsible disclosure.
            </p>

            <div className="max-w-sm divide-y divide-border border-y border-border">
              {[
                { icon: Mail, label: 'shivaji.rathod.in@gmail.com', href: 'mailto:shivaji.rathod.in@gmail.com' },
                { icon: GitBranch, label: 'GitHub', href: 'https://github.com/shivajirathod007' },
                { icon: Link, label: 'LinkedIn', href: 'https://linkedin.com/in/shivaji-rathod007' },
                { icon: ExternalLink, label: 'TryHackMe', href: 'https://tryhackme.com/p/im.rahasya' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex min-h-12 items-center gap-3 py-2 text-sm font-medium text-fg transition-colors hover:text-accent-ink"
                >
                  <item.icon size={15} className="text-accent-ink shrink-0" />
                  {item.label}
                </a>
              ))}
            </div>
          </ScrollReveal>

          {/* Right: form */}
          <ScrollReveal delay={0.1} className="portfolio-card min-w-0 p-4 [--card-accent:var(--orange)] sm:p-6 lg:p-8">
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
