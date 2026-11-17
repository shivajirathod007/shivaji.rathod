'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

const curve = 'M 42 0 C 42 40 78 46 78 93 S 18 154 18 208 S 80 268 80 329 S 25 389 25 453 S 76 522 76 579 S 18 642 18 701 S 79 767 79 824 S 26 879 26 934 S 50 980 50 1000';

export function ScrollCurve() {
  const { scrollYProgress } = useScroll({ trackContentSize: true });
  const remaining = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <svg
      className="site-curve"
      viewBox="0 0 100 1000"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="site-curve-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--orange)" />
          <stop offset="38%" stopColor="var(--violet-ink)" />
          <stop offset="72%" stopColor="var(--orange)" />
          <stop offset="100%" stopColor="var(--violet-ink)" />
        </linearGradient>
      </defs>
      <path d={curve} className="site-curve-track" vectorEffect="non-scaling-stroke" />
      <motion.g style={{ strokeDashoffset: remaining }}>
        <path d={curve} className="site-curve-progress" pathLength={1} vectorEffect="non-scaling-stroke" />
      </motion.g>
    </svg>
  );
}
