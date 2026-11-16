'use client';

import { motion } from 'framer-motion';

interface InteractiveHeadingProps {
  first: string;
  last: string;
}

export function InteractiveHeading({ first, last }: InteractiveHeadingProps) {
  return (
    <h1
      className="font-display font-extrabold text-white leading-[0.92] tracking-tight mb-6 select-none"
      style={{ fontSize: 'clamp(3.6rem, 8.5vw, 6.8rem)' }}
    >
      <span className="block hover:text-accent transition-colors duration-300">
        {first.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block transition-transform duration-200 hover:-translate-y-2 hover:scale-110 hover:text-accent cursor-default"
          >
            {char}
          </motion.span>
        ))}
      </span>
      <span className="block text-white">
        {last.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block transition-transform duration-200 hover:-translate-y-2 hover:scale-110 hover:text-accent cursor-default"
          >
            {char}
          </motion.span>
        ))}
        <motion.span
          animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="inline-block text-accent ml-0.5 drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]"
        >
          .
        </motion.span>
      </span>
    </h1>
  );
}
