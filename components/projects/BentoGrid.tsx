import { ScrollReveal } from '@/components/ScrollReveal';
import { SpotlightBorderCard } from './SpotlightBorderCard';

const PROJECTS = [
  {
    id: 'trinetra',
    title: 'TRINETRA',
    subtitle: 'Exposure Intelligence Platform',
    description: 'Maps exposed infrastructure, inventories cryptography (CBOM), and estimates post-quantum migration timelines.',
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
    description: 'Replaces sensitive data with deterministic placeholders before prompts reach external LLMs.',
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
    description: 'Detects network anomalies with LSTM and autoencoder models. Showcased to 800+ attendees at DIPEX 2025.',
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
    description: 'Built a case-management system with role-based access, piloted at Warje Police Station.',
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
      {PROJECTS.map((project, index) => (
        <ScrollReveal
          key={project.id}
          delay={index * 0.05}
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
        </ScrollReveal>
      ))}
    </div>
  );
}
