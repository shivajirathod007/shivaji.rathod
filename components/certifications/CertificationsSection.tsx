import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ExternalLink, CheckCircle2, Clock, Shield } from 'lucide-react';

const COMPLETED = [
  {
    name: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google / Coursera',
    link: 'https://coursera.org/share/2b7069ea998014f2bda3aa57ae2c7c31',
    date: 'Verified',
  },
  {
    name: 'Fortinet Certified Associate in Cybersecurity',
    issuer: 'Fortinet',
    link: 'https://www.credly.com/badges/a7a57c1e-66e7-48a5-aa76-64f1127b1ac6/public_url',
    date: 'Verified via Credly',
  },
  {
    name: 'Cyber Threat Intelligence',
    issuer: 'ARCX',
    link: 'https://arcx.io/verify-certificate?id=f6ecb8a2fbdcea1bac80eca56aa601e20830e818&k=0da905aa6fa1416b8ed408fe2015abc7',
    date: 'Verified',
  },
  {
    name: 'Computer and Digital Forensics',
    issuer: 'Udemy',
    link: 'https://www.udemy.com/certificate/UC-f4c47756-4cdf-4574-855c-5ef85567c80f',
    date: 'Verified',
  },
];

const IN_PROGRESS = [
  { name: 'CompTIA Security+', target: 'Target: 2026', desc: 'Enterprise security, threats & vulnerabilities' },
  { name: 'AWS Certified Cloud Practitioner', target: 'In Prep', desc: 'Cloud infrastructure & shared security model' },
  { name: 'CCNA Academic Certificate', target: 'Coursework', desc: 'Networking protocols, routing & switching' },
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-28 border-t border-white/[0.06] relative">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <ScrollReveal className="mb-14">
          <SectionLabel number="06" text="CREDENTIALS &amp; AUDITS" />
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-fg tracking-tight">
            Certifications &amp; Training
          </h2>
          <p className="text-fg-muted mt-3 text-lg max-w-xl">
            Industry-standard certifications validating hands-on threat defense, forensics, and network security.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Completed */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Verified Certifications
              </h3>
            </div>

            <div className="space-y-3.5">
              {COMPLETED.map((cert) => (
                <a
                  key={cert.name}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#0d0f18]/80 backdrop-blur-md p-4 sm:p-5 hover:border-emerald-500/40 hover:bg-emerald-500/[0.02] transition-all min-h-[56px]"
                >
                  <div>
                    <h4 className="text-base font-semibold text-fg group-hover:text-emerald-300 transition-colors">
                      {cert.name}
                    </h4>
                    <p className="font-mono text-xs text-fg-muted mt-0.5">{cert.issuer}</p>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-fg-muted group-hover:text-emerald-400 transition-colors shrink-0"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* In Progress */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-fg-muted" />
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-fg-muted">
                Active Targets
              </h3>
            </div>

            <div className="space-y-3.5">
              {IN_PROGRESS.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.06] border-dashed bg-white/[0.01] p-4 sm:p-5"
                >
                  <div>
                    <h4 className="text-base font-medium text-fg-muted">{cert.name}</h4>
                    <p className="font-mono text-xs text-fg-muted/60 mt-0.5">{cert.desc}</p>
                  </div>
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] text-fg-muted border border-white/[0.08] shrink-0">
                    {cert.target}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
