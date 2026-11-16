'use client';

import { SpotlightBorderCard } from './SpotlightBorderCard';
import { PrivateBadge } from './PrivateBadge';

const PROJECTS = [
  {
    id: 'trinetra',
    title: 'TRINETRA',
    subtitle: 'Exposure Intelligence Platform',
    description: [
      'Architected a hybrid local-cloud backend to scan and map an enterprise\'s public-facing infrastructure and potential shadow assets.',
      'Analyzed TLS, API, and SSH configurations to generate Cryptographic Bills of Materials (CBOM).',
      'Applied Mosca\'s inequality to estimate post-quantum cryptography migration timelines.',
    ],
    tech: ['Python', 'FastAPI', 'SSLyze'],
    date: 'Feb – Jul 2026',
    link: 'https://github.com/shivajirathod007/TRINETRA',
    accentColor: '#ff6a3d',
    span: 2,
  },
  {
    id: 'ai-rakshak',
    title: 'AI-RAKSHAK',
    subtitle: 'Privacy-Preserving LLM Proxy',
    description: [
      'Designed a hybrid architecture to intercept and sanitize user prompts before transmission to external LLMs.',
      'Implemented local PII detection with deterministic placeholders so raw sensitive data is never sent externally.',
    ],
    tech: ['FastAPI', 'SQLite', 'Custom NER'],
    date: 'Dec 2025 – Apr 2026',
    link: 'https://github.com/KVarad777/EDI-Prompt-Privacy-Preserving-System',
    accentColor: '#7c5cff',
    span: 1,
  },
  {
    id: 'awaf',
    title: 'AWAF',
    subtitle: 'Adaptive Web Application Firewall',
    description: [
      'Built a firewall using LSTM and Autoencoder models for anomaly-based network threat detection.',
      'Showcased to 800+ attendees at DIPEX 2025.',
    ],
    tech: ['Node.js', 'Python', 'TensorFlow'],
    date: 'Sep 2024 – Apr 2025',
    link: 'https://github.com/shivajirathod007/Adaptive-WAF',
    accentColor: '#c6f432',
    span: 1,
  },
  {
    id: 'sanketdarshak',
    title: 'SanketDarshak',
    subtitle: 'Maharashtra Police CMS',
    description: [
      'Led the team building a case-management system piloted at Warje Police Station.',
      'Implemented role-based access control and automated database triggers.',
    ],
    tech: ['Flutter', 'Node.js', 'Supabase'],
    date: 'Sep 2025 – Mar 2026',
    isPrivate: true,
    accentColor: '#38bdf8',
    span: 2,
  },
];

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
      {PROJECTS.map((project) => (
        <div
          key={project.id}
          className={project.span === 2 ? 'md:col-span-2' : 'md:col-span-1'}
        >
          <SpotlightBorderCard
            title={project.title}
            subtitle={project.subtitle}
            description={project.description}
            tech={project.tech}
            date={project.date}
            link={project.link}
            isPrivate={project.isPrivate}
            accentColor={project.accentColor}
          />
        </div>
      ))}
    </div>
  );
}
