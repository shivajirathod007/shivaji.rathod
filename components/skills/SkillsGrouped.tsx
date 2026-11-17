import type { CSSProperties } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';

interface SkillMatrixRow {
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  accent: string;
}

const MATRIX_ROWS: SkillMatrixRow[] = [
  {
    title: 'Offensive Security & Red Teaming',
    subtitle: 'RESEARCH · EXPLOITATION · VDP',
    description:
      'Find and validate web, API, and authentication flaws.',
    skills: ['Burp Suite', 'Caido', 'OWASP Top 10', 'Auth Bypass', 'API Security'],
    accent: '#f97316',
  },
  {
    title: 'Cloud Security & Infrastructure',
    subtitle: 'CONTAINERS · LINUX · ZERO-TRUST',
    description:
      'Harden cloud workloads, containers, and Linux servers.',
    skills: ['AWS Security', 'Docker', 'Linux Hardening', 'Zero-Trust', 'Post-Quantum CBOM'],
    accent: '#38bdf8',
  },
  {
    title: 'AI Security & LLM Defense',
    subtitle: 'PROMPT INJECTION · PII · LSTM',
    description:
      'Audit LLMs for prompt injection and build tools that protect sensitive data.',
    skills: ['Prompt Auditing', 'PII Proxies', 'Threat Modeling', 'LSTM Anomaly', 'Scikit-learn'],
    accent: '#10b981',
  },
  {
    title: 'Languages & Backend Systems',
    subtitle: 'FASTAPI · POSTGRESQL · CI/CD',
    description:
      'Build backend services with automated security checks.',
    skills: ['Python', 'FastAPI', 'Java', 'Node.js', 'PostgreSQL', 'GitHub Actions'],
    accent: '#a855f7',
  },
  {
    title: 'CS & Cryptographic Foundations',
    subtitle: 'NETWORKS · CRYPTO · PROTOCOLS',
    description:
      'Analyze network protocols and apply cryptography to real systems.',
    skills: ['Computer Networks', 'Applied Cryptography', 'Operating Systems', 'TCP/IP', 'Linux Internals'],
    accent: '#ef4444',
  },
];

export function SkillsGrouped() {
  return (
    <div className="grid gap-3 sm:gap-4">
      {MATRIX_ROWS.map((row, index) => (
        <ScrollReveal key={row.title} delay={index * 0.04}>
          <article
            className="portfolio-card grid items-center gap-4 p-5 sm:p-6 lg:grid-cols-2 lg:gap-8"
            style={{ '--card-accent': row.accent } as CSSProperties}
          >
            <div>
              <h3 className="text-xl leading-tight font-bold text-fg sm:text-2xl">{row.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted sm:text-base">{row.description}</p>
            </div>
            <div className="lg:border-l lg:border-border lg:pl-6">
              <p className="mb-2 text-xs font-semibold tracking-wide text-accent-ink">{row.subtitle}</p>
              <ul className="flex flex-wrap gap-1.5">
                {row.skills.map((skill) => (
                  <li key={skill} className="rounded-full border border-border bg-bg-surface/70 px-2.5 py-1 text-xs font-medium text-fg-muted sm:text-sm">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </ScrollReveal>
      ))}
    </div>
  );
}
