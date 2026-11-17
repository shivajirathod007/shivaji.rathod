import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SkillsGrouped } from './SkillsGrouped';

export function SkillsSection() {
  return (
    <section id="skills" className="section-space border-t border-border relative">
      <div className="section-container">
        <ScrollReveal className="mb-8">
          <SectionLabel number="02" text="Technical Stack" />
          <h2 className="font-display section-title font-bold text-fg tracking-tight">
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
