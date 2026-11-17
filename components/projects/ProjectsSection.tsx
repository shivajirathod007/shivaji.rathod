import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { BentoGrid } from './BentoGrid';

export function ProjectsSection() {
  return (
    <section id="projects" className="section-space border-t border-border relative">
      <div className="section-container">
        <ScrollReveal className="section-intro">
          <SectionLabel number="04" text="Featured Work" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display section-title font-bold text-fg tracking-tight">
                Systems &amp; Security Tools
              </h2>
              <p className="text-fg-muted mt-3 text-base sm:text-lg max-w-xl">
                Tools for exposure mapping, prompt privacy, and threat detection.
              </p>
            </div>
            <a
              href="https://github.com/shivajirathod007"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-accent-ink hover:underline font-medium"
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
