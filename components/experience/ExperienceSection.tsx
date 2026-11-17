import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { VerticalTimeline, type TimelineEntry } from './VerticalTimeline';

const TIMELINE_DATA: TimelineEntry[] = [
  {
    title: 'Security Engineering Intern (AI Security)',
    org: 'Accion Labs',
    location: 'Pune, India',
    period: '2025 – Present',
    type: 'work',
    meta: 'AI SECURITY INTERN',
    bullets: [
      'Conduct AI security assessments, prompt-injection auditing, and vulnerability discovery on production enterprise models.',
      'Assist Red Team operations simulating adversarial attacks against cloud-hosted microservices and auth endpoints.',
      'Collaborate with development teams to implement zero-trust guardrails and automated security checks in CI/CD.',
    ],
  },
  {
    title: 'Cybersecurity Co-Head',
    org: 'Google Developer Groups on Campus (GDGOC)',
    location: 'VIT Pune',
    period: '2024 – Present',
    type: 'leadership',
    meta: 'CYBERSECURITY CO-HEAD',
    bullets: [
      'Lead student workshops on web exploitation, CTF strategies, cloud security fundamentals, and defensive engineering.',
      'Organized technical bootcamps reaching 400+ aspiring security researchers and engineers.',
    ],
  },
  {
    title: 'Independent Security Researcher',
    org: 'NASA Vulnerability Disclosure Program (VDP)',
    location: 'Remote',
    period: '2024 – 2025',
    type: 'work',
    meta: 'HALL OF FAME (P1)',
    bullets: [
      'Recognised in NASA\'s VDP Hall of Fame for reporting a critical (P1) authentication bypass affecting NASA infrastructure.',
      'Received official Letter of Recognition from NASA Security Operations.',
    ],
  },
  {
    title: 'B.Tech in Computer Engineering',
    org: 'Vishwakarma Institute of Technology (VIT Pune)',
    location: 'Pune, India',
    period: '2024 – 2028',
    type: 'education',
    meta: 'B.TECH 2028',
    bullets: [
      'Computer Engineering student at VIT Pune focusing on Network Security, Cryptography, Distributed Systems, and Cloud Architecture.',
      'Head Coordinator for the IEI National Conference 2025; active participant in national hackathons and CTF competitions.',
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-28 border-t border-white/[0.06] relative">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <ScrollReveal className="mb-14">
          <SectionLabel number="03" text="EXPERIENCE &amp; EDUCATION" />
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-fg tracking-tight">
            Work &amp; Academic Journey
          </h2>
          <p className="text-fg-muted mt-3 text-lg max-w-xl">
            From reporting P1 vulnerabilities in NASA infrastructure to building AI guardrails at Accion Labs.
          </p>
        </ScrollReveal>

        <VerticalTimeline entries={TIMELINE_DATA} />
      </div>
    </section>
  );
}
