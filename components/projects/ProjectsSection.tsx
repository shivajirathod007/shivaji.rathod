import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { BentoGrid } from './BentoGrid';

export function ProjectsSection() {
  return (
    <section id="projects" className="py-28 border-t border-white/[0.06] relative">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <ScrollReveal className="mb-14">
          <SectionLabel number="04" text="FEATURED WORK" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-fg tracking-tight">
                Systems &amp; Security Tools
              </h2>
              <p className="text-fg-muted mt-3 text-lg max-w-xl">
                Production-tested tools spanning exposure intelligence, post-quantum cryptography, AI prompt sanitization, and adaptive defense.
              </p>
            </div>
            <a
              href="https://github.com/shivajirathod007"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline font-medium"
            >
              View GitHub Profile →
            </a>
          </div>
        </ScrollReveal>

        <BentoGrid />
      </div>
    </section>
  );
}
