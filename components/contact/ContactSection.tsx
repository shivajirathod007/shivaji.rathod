import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ContactForm } from './ContactForm';
import { Mail, GitBranch, Link, ExternalLink } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: copy */}
          <ScrollReveal>
            <SectionLabel number="08" text="CONTACT" />
            <h2 className="font-display text-4xl font-bold text-fg mb-4">
              Let&apos;s work together
            </h2>
            <p className="text-fg-muted leading-relaxed mb-8 max-w-md">
              I am open to security engineering roles, collaborative research, responsible disclosure, and interesting problems in cloud and application security.
            </p>

            <div className="space-y-3">
              {[
                { icon: Mail, label: 'shivaji.rathod.in@gmail.com', href: 'mailto:shivaji.rathod.in@gmail.com' },
                { icon: GitBranch, label: 'github.com/shivajirathod007', href: 'https://github.com/shivajirathod007' },
                { icon: Link, label: 'linkedin.com/in/shivaji-rathod007', href: 'https://linkedin.com/in/shivaji-rathod007' },
                { icon: ExternalLink, label: 'TryHackMe: im.rahasya', href: 'https://tryhackme.com/p/im.rahasya' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 text-sm text-fg-muted hover:text-fg transition-colors min-h-[44px]"
                >
                  <item.icon size={15} className="text-accent shrink-0" />
                  {item.label}
                </a>
              ))}
            </div>
          </ScrollReveal>

          {/* Right: form */}
          <ScrollReveal delay={0.15}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
