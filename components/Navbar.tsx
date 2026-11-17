'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const drawerRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const sections = pathname === '/'
      ? NAV_LINKS.flatMap(({ href }) => {
          const section = href.startsWith('/#') && document.getElementById(href.slice(2));
          return section ? [section] : [];
        }).reverse()
      : [];
    let frame: number | undefined;

    const update = () => {
      frame = undefined;
      setScrolled(window.scrollY > 20);
      const trigger = Math.max(100, window.innerHeight * 0.25);
      const active = sections.find((section) => section.getBoundingClientRect().top <= trigger);
      setActiveSection(active?.id ?? '');
    };

    const scheduleUpdate = () => {
      if (frame === undefined) frame = requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)');
    const closeOnDesktop = () => {
      if (desktop.matches) drawerRef.current?.close();
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  const isActive = (href: string) => href === '/blog'
    ? pathname.startsWith('/blog')
    : pathname === '/' && activeSection === href.slice(2);

  const closeDrawer = () => drawerRef.current?.close();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3 sm:py-5 pointer-events-none">
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full pointer-events-auto transition-[background-color,border-color,box-shadow] duration-200 ${scrolled || pathname !== '/'
            ? 'bg-bg/92 backdrop-blur-xl border border-border shadow-xl shadow-panel-shadow'
            : 'bg-transparent border border-transparent'
            }`}
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-fg transition-colors hover:text-accent-ink"
          >
            Home
          </Link>

          {/* Desktop Nav Links (Max 7 items) */}
          <ul className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? (link.href === '/blog' ? 'page' : 'location') : undefined}
                  className={`relative block whitespace-nowrap px-2.5 xl:px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:text-fg ${isActive(link.href)
                    ? 'text-fg font-semibold'
                    : 'text-fg-muted hover:bg-fg/[0.04]'
                    }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 pointer-events-none rounded-full border border-border-strong bg-fg/[0.08]"
                      transition={reducedMotion ? { duration: 0 } : { type: 'spring', bounce: 0.2, duration: 0.3 }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Action & Controls */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {/* Primary Orange Nav Button: Download CV */}
            <a
              href="/Shivaji_Rathod_CV.pdf"
              download="Shivaji_Rathod_CV.pdf"
              className="hidden sm:inline-flex items-center gap-2 h-9 px-3 xl:px-5 whitespace-nowrap rounded-full text-xs sm:text-sm font-semibold bg-accent text-on-accent hover:brightness-110 transition-colors"
            >
              <Download size={14} />
              <span>Download CV</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className="lg:hidden inline-flex items-center justify-center size-11 sm:size-9 rounded-full border border-border bg-fg/[0.04] text-fg-muted hover:text-fg transition-colors"
              type="button"
              onClick={() => {
                drawerRef.current?.showModal();
                setMobileOpen(true);
              }}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      <dialog
        ref={drawerRef}
        id="mobile-drawer"
        aria-label="Navigation menu"
        onClose={() => setMobileOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDrawer();
        }}
        className="mobile-drawer fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-80 max-w-full overflow-y-auto overscroll-contain border-l border-border bg-bg-surface text-fg"
      >
        <div className="flex min-h-full flex-col justify-between gap-6 p-5 sm:p-7">
          <div>
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-border pb-4">
              <span className="font-display text-lg font-bold">Navigation</span>
              <button
                type="button"
                autoFocus
                onClick={closeDrawer}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-fg-muted transition-colors hover:text-fg"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? (link.href === '/blog' ? 'page' : 'location') : undefined}
                    className={`block min-h-11 rounded-xl border px-4 py-2.5 text-base transition-colors ${isActive(link.href)
                      ? 'border-accent/20 bg-accent/10 font-semibold text-accent-ink'
                      : 'border-transparent text-fg-muted hover:bg-fg/[0.04] hover:text-fg'
                    }`}
                    onClick={closeDrawer}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border pt-6">
            <a
              href="/Shivaji_Rathod_CV.pdf"
              download="Shivaji_Rathod_CV.pdf"
              onClick={closeDrawer}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent text-sm font-semibold text-on-accent transition-colors hover:bg-orange/90"
            >
              <Download size={15} />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Navbar;
