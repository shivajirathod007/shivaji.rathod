import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { VerticalTimeline, type TimelineEntry } from './VerticalTimeline';

const TIMELINE_DATA: TimelineEntry[] = [
  {
    title: 'Security Engineering Intern (AI Security)',
    org: 'Accion Labs',
    location: 'Pune, India',
    period: '2026 – Present',
    bullets: [
      'Audit production AI for prompt injection and other vulnerabilities.',
      'Support cloud red-team exercises and help automate CI/CD security checks.',
    ],
  },
  {
    title: 'Cybersecurity Co-Head',
    org: 'Google Developer Groups on Campus (GDGOC)',
    location: 'VIT Pune',
    period: '2026 – Present',
    bullets: [
      'Lead security workshops and organize boot camps that have reached 400+ students.',
    ],
  },
  {
    title: 'Independent Security Researcher',
    org: 'NASA Vulnerability Disclosure Program (VDP)',
    location: 'Remote',
    period: '2026 – Present',
    meta: 'HALL OF FAME (P1)',
    bullets: [
      'Disclosed a critical (P1) authentication bypass and received a letter from NASA Security Operations.',
    ],
  },
  {
    title: 'B.Tech in Computer Engineering',
    org: 'Vishwakarma Institute of Technology (VIT Pune)',
    location: 'Pune, India',
    period: '2026 – 2028',
    bullets: [
      'Focus on network security, cryptography, distributed systems, and cloud architecture.',
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="section-space border-t border-border relative">
      <div className="section-container">
        <ScrollReveal className="section-intro">
          <SectionLabel number="03" text="Experience &amp; Education" />
          <h2 className="font-display section-title font-bold text-fg tracking-tight">
            Work &amp; Academic Journey
          </h2>
          <p className="text-fg-muted mt-3 text-base sm:text-lg max-w-xl">
            Security research, engineering, and student leadership.
          </p>
        </ScrollReveal>

        <VerticalTimeline entries={TIMELINE_DATA} />
      </div>
    </section>
  );
}
