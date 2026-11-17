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
      className="relative min-h-svh flex items-center justify-center overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-(--section-gutter) lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 items-center">

          {/* ── LEFT: Editorial Typography (6 Columns) ── */}
          <motion.div
            className="min-w-0 lg:col-span-6 w-full max-w-2xl @container motion-reduce:*:opacity-100! motion-reduce:*:transform-none!"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Eyebrow Accent Line */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-8 shrink-0 bg-accent rounded-full" aria-hidden="true" />
              <p className="font-mono text-xs font-semibold text-accent-ink tracking-widest uppercase">
                Cybersecurity Researcher · Cloud Security
              </p>
            </motion.div>

            {/* Huge Interactive Name with Character Hover Pop */}
            <motion.div variants={fadeUp}>
              <InteractiveHeading first="SHIVAJI" last="RATHOD" />
            </motion.div>

            {/* Editorial Dual-Type Subtitle */}
            <motion.div variants={fadeUp} className="mb-7 sm:mb-8">
              <p className="font-display text-2xl sm:text-3xl font-bold text-fg tracking-tight leading-snug">
                Finding vulnerabilities.
                <br />
                <span className="font-serif italic font-normal text-accent-ink text-3xl sm:text-4xl">
                  Building defenses.
                </span>
              </p>
            </motion.div>

            {/* High-Contrast Action Buttons in Sentence Case */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              {/* Primary Orange Button */}
              <Link
                href="/#projects"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-accent text-on-accent font-semibold text-sm hover:brightness-110 shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Explore my work</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Outline Button */}
              <Link
                href="/#about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-fg/[0.04] text-fg border border-border-strong font-medium text-sm hover:border-border-strong hover:bg-fg/[0.08] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <UserCheck size={16} className="text-accent-ink" />
                <span>About me</span>
              </Link>

              {/* Real Third Button: Download CV */}
              <a
                href="/Shivaji_Rathod_CV.pdf"
                download="Shivaji_Rathod_CV.pdf"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-fg/[0.04] text-fg border border-border-strong font-medium text-sm hover:border-accent/50 hover:bg-accent/10 hover:text-accent-ink hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Download size={16} />
                <span>Download CV</span>
              </a>
            </motion.div>

            {/* Verified Statistics Bar (Matching CV specifications) */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 @lg:grid-cols-4 gap-4 sm:gap-5 pt-6 sm:pt-8 border-t border-border"
            >
              <div>
                <span className="font-display font-bold text-2xl sm:text-3xl text-accent-ink block">
                  NASA
                </span>
                <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mt-1">
                  HALL OF FAME (P1)
                </p>
              </div>

              <div className="border-l border-border pl-4">
                <span className="font-display font-bold text-2xl sm:text-3xl text-fg block">
                  Accion Labs
                </span>
                <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mt-1">
                  AI SECURITY INTERN
                </p>
              </div>

              <div className="@lg:border-l border-border @lg:pl-4">
                <span className="font-display font-bold text-2xl sm:text-3xl text-fg block">
                  GDGOC
                </span>
                <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mt-1">
                  CYBERSECURITY CO-HEAD
                </p>
              </div>

              <div className="border-l border-border pl-4">
                <span className="font-display font-bold text-2xl sm:text-3xl text-fg block">
                  VIT Pune
                </span>
                <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mt-1">
                  B.TECH 2028
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Massive Standing 3D Portrait (6 Columns — Wide Section) ── */}
          <motion.div
            className="lg:col-span-6 flex justify-center lg:justify-end items-end relative w-full min-w-0 lg:-mt-12 lg:-mb-12 motion-reduce:opacity-100! motion-reduce:transform-none!"
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
