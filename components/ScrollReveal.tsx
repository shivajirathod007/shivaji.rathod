'use client';
import { ReactNode, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  once?: boolean;
  className?: string;
  /** 'up' (default) | 'left' | 'right' | 'scale' */
  direction?: 'up' | 'left' | 'right' | 'scale';
}

export function ScrollReveal({
  children,
  delay = 0,
  once = true,
  className = '',
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-8% 0px -8% 0px' });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  const initial: Record<string, number | string> = { opacity: 0 };
  if (direction === 'up')    { initial.y = 36; }
  if (direction === 'left')  { initial.x = -36; }
  if (direction === 'right') { initial.x = 36; }
  if (direction === 'scale') { initial.scale = 0.94; initial.y = 16; }

  const animate = inView
    ? { opacity: 1, y: 0, x: 0, scale: 1 }
    : initial;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
