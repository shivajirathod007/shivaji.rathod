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
  const hasMovedRef = useRef(false);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const enabled = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame: number | undefined;

    const onMove = (e: MouseEvent) => {
      if (!enabled.matches) return;
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setHasMoved(true);
        outerPosRef.current = { x: e.clientX, y: e.clientY };
      }

      const target = e.target;
      const hovering = target instanceof Element &&
        Boolean(target.closest('a, button, [role="button"], input, textarea, .group, canvas'));
      if (hovering !== isHoveringRef.current) {
        isHoveringRef.current = hovering;
        setIsHovering(hovering);
      }
      if (frame === undefined) frame = requestAnimationFrame(animate);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const animate = () => {
      frame = undefined;
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${posRef.current.x - 3}px, ${posRef.current.y - 3}px, 0)`;
      }

      // Smooth outer follower lag with elastic physics
      outerPosRef.current.x += (posRef.current.x - outerPosRef.current.x) * 0.18;
      outerPosRef.current.y += (posRef.current.y - outerPosRef.current.y) * 0.18;

      if (outerRef.current) {
        const offset = isHoveringRef.current ? 26 : 16;
        outerRef.current.style.transform = `translate3d(${outerPosRef.current.x - offset}px, ${outerPosRef.current.y - offset}px, 0)`;
      }
      if (
        Math.abs(posRef.current.x - outerPosRef.current.x) > 0.25 ||
        Math.abs(posRef.current.y - outerPosRef.current.y) > 0.25
      ) {
        frame = requestAnimationFrame(animate);
      }
    };

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, []);

  const visibility = hasMoved && isVisible ? '' : 'invisible';

  return (
    <>
      {/* Outer interactive follower halo */}
      <div
        ref={outerRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] rounded-full transition-[width,height,background-color,border-color] duration-200 ease-out motion-reduce:hidden ${visibility} ${
          isHovering
            ? 'h-13 w-13 border border-accent/60 bg-accent/[0.08] backdrop-blur-[1px] shadow-[0_0_20px_rgba(249,115,22,0.3)]'
            : 'h-8 w-8 border border-border-strong bg-transparent'
        }`}
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />

      {/* Center sharp pointer dot */}
      <div
        ref={innerRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] rounded-full transition-[width,height,background-color] duration-150 motion-reduce:hidden ${visibility} ${
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
