import { ScrollReveal } from '@/components/ScrollReveal';
import { ShieldAlert, Cloud, Code2, BrainCircuit } from 'lucide-react';

const SKILL_GROUPS = [
  {
    label: 'Offensive & Defensive Security',
    icon: ShieldAlert,
    accent: '#f97316',
    skills: [
      'Vulnerability Research',
      'Web & API Security',
      'Penetration Testing',
      'Auth Bypass Discovery',
      'Threat Intelligence',
      'Burp Suite & Caido',
      'Wireshark & Nmap',
      'OWASP Top 10',
    ],
  },
  {
    label: 'Cloud & Infrastructure',
    icon: Cloud,
    accent: '#38bdf8',
    skills: [
      'AWS Security',
      'Docker & Containers',
      'Kubernetes Basics',
      'Linux Hardening',
      'CI/CD Pipelines',
      'Zero-Trust Architecture',
      'Post-Quantum CBOM',
    ],
  },
  {
    label: 'Engineering & Languages',
    icon: Code2,
    accent: '#a855f7',
    skills: [
      'Python',
      'Java',
      'FastAPI',
      'Node.js',
      'PostgreSQL',
      'Supabase',
      'SQL & Database Security',
      'Git & GitHub Actions',
    ],
  },
  {
    label: 'AI Security & Machine Learning',
    icon: BrainCircuit,
    accent: '#10b981',
    skills: [
      'LLM Prompt Injection Auditing',
      'PII Detection & Redaction',
      'TensorFlow & Scikit-learn',
      'Anomaly Detection (LSTM)',
      'Autoencoders for Network Defense',
    ],
  },
];

export function SkillsGrouped() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      {SKILL_GROUPS.map((group, i) => (
        <ScrollReveal key={group.label} delay={i * 0.08}>
          <div className="group relative rounded-2xl border border-white/[0.08] bg-[#0d0f18]/80 backdrop-blur-md p-6 hover:border-white/[0.18] transition-all duration-300 hover:shadow-xl hover:shadow-black/30 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center border"
                  style={{
                    backgroundColor: `${group.accent}12`,
                    borderColor: `${group.accent}30`,
                    color: group.accent,
                  }}
                >
                  <group.icon size={18} />
                </div>
                <h3 className="font-display font-bold text-lg text-fg tracking-tight">
                  {group.label}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-fg-muted hover:text-fg hover:border-white/[0.15] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
