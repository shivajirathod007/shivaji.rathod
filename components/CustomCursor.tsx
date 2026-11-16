'use client';
import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const posRef = useRef({ x: -100, y: -100 });
  const outerPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only on fine-pointer (desktop) devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!hasMoved) {
        setHasMoved(true);
        outerPosRef.current = { x: e.clientX, y: e.clientY };
      }

      // Detect if hovering over clickable / interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, [role="button"], input, textarea, .group, canvas');
        setIsHovering(!!interactive);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const animate = () => {
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${posRef.current.x - 3}px, ${posRef.current.y - 3}px, 0)`;
      }

      // Smooth outer follower lag with elastic physics
      outerPosRef.current.x += (posRef.current.x - outerPosRef.current.x) * 0.18;
      outerPosRef.current.y += (posRef.current.y - outerPosRef.current.y) * 0.18;

      if (outerRef.current) {
        const offset = isHovering ? 26 : 16;
        outerRef.current.style.transform = `translate3d(${outerPosRef.current.x - offset}px, ${outerPosRef.current.y - offset}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [hasMoved, isHovering]);

  if (!hasMoved || !isVisible) return null;

  return (
    <>
      {/* Outer interactive follower halo */}
      <div
        ref={outerRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] rounded-full transition-[width,height,background-color,border-color] duration-200 ease-out ${
          isHovering
            ? 'h-13 w-13 border border-accent/60 bg-accent/[0.08] backdrop-blur-[1px] shadow-[0_0_20px_rgba(249,115,22,0.3)]'
            : 'h-8 w-8 border border-white/20 bg-transparent'
        }`}
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />

      {/* Center sharp pointer dot */}
      <div
        ref={innerRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] rounded-full transition-[width,height,background-color] duration-150 ${
          isHovering
            ? 'h-2 w-2 bg-accent shadow-[0_0_12px_rgba(249,115,22,0.8)]'
            : 'h-1.5 w-1.5 bg-accent'
        }`}
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />
    </>
  );
}
