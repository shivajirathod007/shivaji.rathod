'use client';
import { useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  download?: boolean | string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  download,
  variant = 'primary',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variantClasses = {
    primary:
      'bg-accent text-on-accent border border-transparent hover:brightness-110 shadow-[0_0_24px_rgba(255,106,61,0.35)] hover:shadow-[0_0_36px_rgba(255,106,61,0.5)]',
    secondary:
      'bg-transparent text-fg border border-border hover:border-fg/60 hover:bg-bg-elevated',
    ghost: 'bg-transparent text-fg-muted hover:text-fg border border-transparent',
  }[variant];

  const inner = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-base transition-all min-h-[48px] cursor-pointer ${variantClasses} ${className}`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} download={download} className="inline-block">
        {inner}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="inline-block">
      {inner}
    </button>
  );
}
