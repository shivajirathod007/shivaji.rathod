'use client';
import { useReducedMotion } from 'framer-motion';

const ALL_SKILLS = [
  'Cloud Security', 'Web App Security', 'Vulnerability Research', 'Penetration Testing',
  'Threat Intelligence', 'Responsible Disclosure', 'Python', 'Java', 'C++', 'SQL',
  'MySQL', 'PostgreSQL', 'Supabase', 'Firebase', 'Spring Boot', 'FastAPI', 'Node.js',
  'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Linux', 'Caido', 'Wireshark', 'Nmap',
  'OWASP', 'TensorFlow', 'Scikit-learn', 'LSTM', 'Autoencoders',
];

export function SkillsMarquee() {
  const reduced = useReducedMotion();
  const doubled = [...ALL_SKILLS, ...ALL_SKILLS];

  if (reduced) {
    return (
      <div className="flex flex-wrap gap-2 py-4">
        {ALL_SKILLS.map((s) => (
          <span key={s} className="font-mono text-xs px-3 py-1 rounded-full border border-border text-fg-muted">
            {s}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden py-4" aria-label="Skills marquee">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-bg to-transparent" />
      <div
        className="flex gap-3 w-max"
        style={{ animation: 'marquee 40s linear infinite' }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'running')}
      >
        {doubled.map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="font-mono text-xs px-3 py-1.5 rounded-full border border-border text-fg-muted whitespace-nowrap hover:border-accent hover:text-fg transition-colors"
          >
            {s}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
