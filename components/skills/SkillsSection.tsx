import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SkillsGrouped } from './SkillsGrouped';

export function SkillsSection() {
  return (
    <section id="skills" className="py-28 border-t border-white/[0.06] relative">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <ScrollReveal className="mb-8">
          <SectionLabel number="02" text="TECHNICAL STACK" />
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-fg tracking-tight">
            Security &amp; Engineering Matrix
          </h2>
          <p className="text-fg-muted mt-2 text-base sm:text-lg">
            Core offensive, cloud, and defense engineering capabilities.
          </p>
        </ScrollReveal>

        <SkillsGrouped />
      </div>
    </section>
  );
}
