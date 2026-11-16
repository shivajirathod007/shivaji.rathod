'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, Download, UserCheck } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { InteractiveHeading } from './InteractiveHeading';

// Lazy-load turntable so it doesn't block LCP
const Turntable360 = dynamic(
  () => import('./Turntable360').then((m) => ({ default: m.Turntable360 })),
  { ssr: false }
);

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
};

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-20"
    >
      {/* ── Ambient Background Lighting ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 75% 45%, rgba(249, 115, 22, 0.10) 0%, transparent 60%),
            radial-gradient(ellipse 55% 50% at 20% 60%, rgba(99, 102, 241, 0.08) 0%, transparent 60%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">

          {/* ── LEFT: Editorial Typography (7 Columns) ── */}
          <motion.div
            className="lg:col-span-7 max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Eyebrow Accent Line (Ref: Sushmita Dasari) */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-8 bg-accent rounded-full" aria-hidden="true" />
              <p className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                Cybersecurity Researcher · Cloud Security
              </p>
            </motion.div>

            {/* Huge Interactive Name with Character Hover Pop */}
            <motion.div variants={fadeUp}>
              <InteractiveHeading first="SHIVAJI" last="RATHOD" />
            </motion.div>

            {/* Editorial Dual-Type Subtitle */}
            <motion.div variants={fadeUp} className="mb-6">
              <p className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                Uncovering critical vulnerabilities.
                <br />
                <span className="font-serif italic font-normal text-white/90 text-2xl sm:text-3xl">
                  Engineering what&apos;s next.
                </span>
              </p>
            </motion.div>

            {/* Description Text */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-fg-muted leading-relaxed mb-9 max-w-xl font-normal"
            >
              Final-year Computer Engineering student at <strong className="text-white font-medium">VIT Pune</strong> and Security Researcher at <strong className="text-white font-medium">Accion Labs</strong>. Inducted into the <strong className="text-accent font-medium">NASA Hall of Fame</strong> for responsibly reporting a critical P1 authentication bypass.
            </motion.p>

            {/* High-Contrast Action Pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                href="/#projects"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/#about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.04] text-white border border-white/[0.15] font-medium text-sm hover:border-white/[0.3] hover:bg-white/[0.08] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <UserCheck size={16} className="text-accent" />
                <span>ABOUT ME</span>
              </Link>

              <a
                href="/Shivaji_Rathod_CV.pdf"
                download="Shivaji_Rathod_CV.pdf"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-fg-muted hover:text-white font-mono text-xs uppercase tracking-wider hover:bg-white/[0.04] transition-all"
              >
                <Download size={15} />
                <span>CV</span>
              </a>
            </motion.div>

            {/* Verified Statistics Bar */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 sm:grid-cols-4 gap-4 pt-8 border-t border-white/[0.08]"
            >
              <div>
                <span className="font-display font-bold text-2xl sm:text-3xl text-accent block">
                  NASA
                </span>
                <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mt-0.5">
                  Hall of Fame (P1)
                </p>
              </div>

              <div className="border-l border-white/[0.08] pl-4">
                <span className="font-display font-bold text-2xl sm:text-3xl text-fg block">
                  Accion Labs
                </span>
                <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mt-0.5">
                  AI &amp; Red Team
                </p>
              </div>

              <div className="border-l border-white/[0.08] pl-4">
                <span className="font-display font-bold text-2xl sm:text-3xl text-fg block">
                  GDGOC
                </span>
                <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mt-0.5">
                  Track Lead
                </p>
              </div>

              <div className="hidden sm:block border-l border-white/[0.08] pl-4">
                <span className="font-display font-bold text-2xl sm:text-3xl text-fg block">
                  VIT Pune
                </span>
                <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mt-0.5">
                  B.Tech 2026
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Massive Standing 3D Portrait (5 Columns) ── */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end items-center relative"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          >
            <Turntable360 />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
