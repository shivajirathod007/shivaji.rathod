'use client';

import { ArrowUpRight } from 'lucide-react';
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
      'Vulnerability research, web and API exploitation, authentication bypass analysis, and OWASP Top 10 security auditing.',
    skills: ['Burp Suite', 'Caido', 'OWASP Top 10', 'Auth Bypass', 'API Security'],
    accent: '#f97316',
  },
  {
    title: 'Cloud Security & Infrastructure',
    subtitle: 'CONTAINERS · LINUX · ZERO-TRUST',
    description:
      'Hardened cloud deployments, Docker container isolation, Linux server hardening, zero-trust policies, and post-quantum CBOM.',
    skills: ['AWS Security', 'Docker', 'Linux Hardening', 'Zero-Trust', 'Post-Quantum CBOM'],
    accent: '#38bdf8',
  },
  {
    title: 'AI Security & LLM Defense',
    subtitle: 'PROMPT INJECTION · PII · LSTM',
    description:
      'Auditing LLM prompt injections, real-time PII redaction proxies, machine learning anomaly detection, and AI threat modeling.',
    skills: ['Prompt Auditing', 'PII Proxies', 'Threat Modeling', 'LSTM Anomaly', 'Scikit-learn'],
    accent: '#10b981',
  },
  {
    title: 'Languages & Backend Systems',
    subtitle: 'FASTAPI · POSTGRESQL · CI/CD',
    description:
      'Production-grade backend engineering with Python, FastAPI, Java, Node.js, PostgreSQL, and automated CI/CD security workflows.',
    skills: ['Python', 'FastAPI', 'Java', 'Node.js', 'PostgreSQL', 'GitHub Actions'],
    accent: '#a855f7',
  },
  {
    title: 'CS & Cryptographic Foundations',
    subtitle: 'NETWORKS · CRYPTO · PROTOCOLS',
    description:
      'Deep systems foundations across computer networks, applied cryptography, network protocol analysis, and operating system internals.',
    skills: ['Computer Networks', 'Applied Cryptography', 'Operating Systems', 'TCP/IP', 'Linux Internals'],
    accent: '#ef4444',
  },
];

export function SkillsGrouped() {
  return (
    <div className="w-full divide-y divide-white/[0.08] border-y border-white/[0.08] mt-8">
      {MATRIX_ROWS.map((row, i) => (
        <ScrollReveal key={row.title} delay={i * 0.06}>
          <div className="group relative py-8 sm:py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-300 hover:bg-white/[0.02] px-4 -mx-4 rounded-2xl">
            {/* Left: Huge Title + Descriptive Subtext (Matching Reference) */}
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-125 shrink-0"
                  style={{ backgroundColor: row.accent }}
                  aria-hidden="true"
                />
                <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight group-hover:text-accent transition-colors">
                  {row.title}
                </h3>
              </div>
              <p className="text-fg-muted text-sm sm:text-base leading-relaxed pl-5 sm:pl-5.5">
                {row.description}
              </p>
            </div>

            {/* Right: Subtitle + Stack Badges + Circular Action Indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 lg:justify-end shrink-0 pl-5 lg:pl-0">
              <div className="flex flex-col sm:items-end gap-2.5">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent/80">
                  {row.subtitle}
                </span>
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  {row.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs sm:text-sm px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-fg-muted group-hover:text-white group-hover:border-white/[0.18] group-hover:bg-white/[0.07] transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Circular Action Indicator (Ref: Reference image button on far right) */}
              <div
                className="hidden sm:flex w-10 h-10 rounded-full border border-white/15 items-center justify-center text-white/50 group-hover:text-white group-hover:border-accent group-hover:bg-accent group-hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all shrink-0"
                aria-hidden="true"
              >
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
