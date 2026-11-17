'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

// 7 items max, with Capabilities -> Skills, and Achievements + Credentials -> Recognition
const NAV_LINKS = [
  { label: 'About',          href: '/#about' },
  { label: 'Skills',         href: '/#skills' },
  { label: 'Experience',     href: '/#experience' },
  { label: 'Projects',       href: '/#projects' },
  { label: 'Recognition',    href: '/#recognition' },
  { label: 'Writeups',       href: '/blog' },
  { label: 'Contact',        href: '/#contact' },
];

const SECTION_IDS = [
  'hero',
  'about',
  'skills',
  'experience',
  'projects',
  'recognition',
  'achievements',
  'certifications',
  'contact',
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // While hero is in view (near the top of the page), clear active section!
      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When hero is intersecting, clear active section!
            if (entry.target.id === 'hero') {
              setActiveSection('');
            } else if (
              entry.target.id === 'recognition' ||
              entry.target.id === 'achievements' ||
              entry.target.id === 'certifications'
            ) {
              setActiveSection('recognition');
            } else {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isActive = (href: string) => {
    if (!activeSection) return false;
    if (href === '/blog') return false;
    const target = href.replace('/#', '');
    return activeSection === target;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-5 pointer-events-none">
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 py-3 rounded-full pointer-events-auto transition-all duration-300 ${scrolled
            ? 'bg-[#090b12]/92 backdrop-blur-xl border border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
            : 'bg-transparent border border-transparent'
            }`}
          aria-label="Main navigation"
        >
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none"
            aria-label="Shivaji Rathod — home"
          >
            <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/35 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
              <span className="font-mono text-xs font-bold tracking-wider">SR</span>
            </div>
            <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-accent transition-colors">
              Shivaji Rathod
            </span>
          </Link>

          {/* Desktop Nav Links (Max 7 items) */}
          <ul className="hidden lg:flex items-center gap-1.5 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:text-white ${isActive(link.href)
                    ? 'text-white font-semibold'
                    : 'text-fg-muted hover:bg-white/[0.04]'
                    }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full border border-white/[0.18] bg-white/[0.08]"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Action & Controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Primary Orange Nav Button: Download CV */}
            <a
              href="/Shivaji_Rathod_CV.pdf"
              download="Shivaji_Rathod_CV.pdf"
              className="hidden sm:inline-flex items-center gap-2 h-9 px-5 rounded-full text-xs sm:text-sm font-semibold bg-accent text-white hover:brightness-110 shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all"
            >
              <Download size={14} />
              <span>Download CV</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/[0.12] bg-white/[0.04] text-fg-muted hover:text-white transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-drawer"
              role="dialog"
              aria-label="Navigation menu"
              aria-modal="true"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-[#0a0c14] border-l border-white/[0.1] p-7 lg:hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08]">
                  <span className="font-display font-bold text-lg text-white">
                    Shivaji Rathod
                  </span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-lg text-fg-muted hover:text-white transition-colors"
                    aria-label="Close navigation menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                <ul className="flex flex-col gap-2 list-none m-0 p-0">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block px-4 py-2.5 rounded-xl text-base transition-colors ${isActive(link.href)
                          ? 'text-accent bg-accent/10 border border-accent/20 font-semibold'
                          : 'text-fg-muted hover:text-white hover:bg-white/[0.04]'
                          }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/[0.08]">
                <a
                  href="/Shivaji_Rathod_CV.pdf"
                  download="Shivaji_Rathod_CV.pdf"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full h-11 rounded-xl text-sm font-semibold bg-accent text-white"
                >
                  <Download size={15} />
                  <span>Download CV</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
