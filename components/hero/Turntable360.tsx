'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { FRAMES } from '@/lib/turntable-manifest.generated';

const FRAME_COUNT = FRAMES.length; // 14 frames
const DEGREES_PER_FRAME = 360 / FRAME_COUNT; // ~25.71°

export function Turntable360() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth lerp physics state
  const targetAngleRef = useRef(0);
  const currentAngleRef = useRef(0);
  const isPointerDownRef = useRef(false);
  const lastPointerXRef = useRef<number | null>(null);
  const dragVelocityRef = useRef(0);

  const bitmapsRef = useRef<(ImageBitmap | null)[]>(new Array(FRAME_COUNT).fill(null));
  const rafIdRef = useRef<number>(0);

  // Helper to map continuous angle to nearest discrete frame
  const getFrameIndex = (angle: number) => {
    const normalized = ((angle % 360) + 360) % 360;
    return Math.round(normalized / DEGREES_PER_FRAME) % FRAME_COUNT;
  };

  // Render current frame to canvas
  const renderCurrentFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    // Exact single discrete frame - 100% crisp, zero ghosting
    const frameIdx = getFrameIndex(currentAngleRef.current);
    const bitmap = bitmapsRef.current[frameIdx];

    if (bitmap) {
      const imgAspect = bitmap.width / bitmap.height;
      const canvasAspect = cw / ch;

      // Safe maximum width with at least 5% breathing room on each side so shoulders NEVER clip
      const maxAllowedW = cw * 0.94;
      let drawW: number;
      let drawH: number;

      if (canvasAspect > imgAspect) {
        drawH = ch;
        drawW = ch * imgAspect;
        if (drawW > maxAllowedW) {
          drawW = maxAllowedW;
          drawH = drawW / imgAspect;
        }
      } else {
        drawW = maxAllowedW;
        drawH = drawW / imgAspect;
      }

      const drawX = (cw - drawW) / 2;
      // Position head near the top with clean breathing room
      const drawY = 12;

      // Match the fade to the bitmap bounds, which vary relative to the stage on resize.
      const maskSize = `${(drawW / cw) * 100}% ${(drawH / ch) * 100}%`;
      if (canvas.style.getPropertyValue('--portrait-mask-size') !== maskSize) {
        canvas.style.setProperty('--portrait-mask-size', maskSize);
      }

      ctx.drawImage(bitmap, drawX, drawY, drawW, drawH);
    }
  }, []);

  // Butter-smooth 60fps lerp animation loop
  const animationLoop = useCallback(() => {
    if (isPointerDownRef.current) {
      // While dragging: apply velocity
      targetAngleRef.current += dragVelocityRef.current;
      dragVelocityRef.current *= 0.85;
    }

    // Smooth lerp: current angle slides toward target angle with elastic damping
    const delta = targetAngleRef.current - currentAngleRef.current;
    if (Math.abs(delta) > 0.04) {
      currentAngleRef.current += delta * 0.14; // Smooth interpolation factor
      renderCurrentFrame();
    } else if (currentAngleRef.current !== targetAngleRef.current) {
      currentAngleRef.current = targetAngleRef.current;
      renderCurrentFrame();
    }

    rafIdRef.current = requestAnimationFrame(animationLoop);
  }, [renderCurrentFrame]);

  // Load all 14 frames into ImageBitmaps
  useEffect(() => {
    let cancelled = false;

    async function loadAllFrames() {
      // 1. Priority load frame 0 for instant sharp render
      try {
        const resp0 = await fetch(FRAMES[0].desktop);
        const blob0 = await resp0.blob();
        const bitmap0 = await createImageBitmap(blob0);
        if (cancelled) return;
        bitmapsRef.current[0] = bitmap0;
        setIsLoaded(true);
        renderCurrentFrame();
      } catch (err) {
        console.error('Failed to load initial turntable frame', err);
      }

      // 2. Load the rest of the 13 frames sequentially
      for (let i = 1; i < FRAME_COUNT; i++) {
        if (cancelled) return;
        try {
          const resp = await fetch(FRAMES[i].desktop);
          const blob = await resp.blob();
          const bmp = await createImageBitmap(blob);
          if (!cancelled) {
            bitmapsRef.current[i] = bmp;
          }
        } catch (e) {
          console.warn(`Turntable frame ${i} load failed`, e);
        }
      }
    }

    loadAllFrames();
    rafIdRef.current = requestAnimationFrame(animationLoop);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [renderCurrentFrame, animationLoop]);

  // DPR-aware dynamic canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          renderCurrentFrame();
        }
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [renderCurrentFrame]);

  // ─── HOVER TO ROTATE HANDLERS ──────────────────────────────────────────────
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;

    if (isPointerDownRef.current) {
      // Dragging mode (Touch or Click-Drag)
      if (lastPointerXRef.current !== null) {
        const deltaX = e.clientX - lastPointerXRef.current;
        lastPointerXRef.current = e.clientX;
        const dragSensitivity = 0.65;
        targetAngleRef.current += deltaX * dragSensitivity;
        dragVelocityRef.current = deltaX * 0.4;
      }
    } else {
      // Natural Hover Mode: As cursor moves across the avatar, it rotates smoothly!
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width; // 0.0 to 1.0

      // Map 0 -> -180 deg, 0.5 -> 0 deg (center/front), 1.0 -> +180 deg
      // Smooth continuous full 360 rotation mapped across the avatar width
      const targetDeg = (relativeX - 0.5) * 360;
      targetAngleRef.current = targetDeg;
    }
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    isPointerDownRef.current = false;
    lastPointerXRef.current = null;
    dragVelocityRef.current = 0;

    // Smoothly spring back to front (0°) on mouse leave
    targetAngleRef.current = 0;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDownRef.current = true;
    lastPointerXRef.current = e.clientX;
    dragVelocityRef.current = 0;
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isPointerDownRef.current = false;
    lastPointerXRef.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  return (
    <div className="relative w-full flex items-center justify-center select-none @container">
      {/* ── Ambient Studio Backlight (Subtle, Seamless, No Box Outline) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        aria-hidden="true"
      >
        {/* Soft, Warm Studio Halo */}
        <div
          className="w-[460px] sm:w-[580px] h-[460px] sm:h-[580px] rounded-full filter blur-[110px] opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 36%, rgba(249, 115, 22, 0.24) 0%, rgba(220, 38, 38, 0.1) 40%, rgba(99, 102, 241, 0.05) 60%, transparent 75%)',
          }}
        />
      </div>

      {/* Standing avatar stage */}
      <div
        ref={containerRef}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerLeave}
        className="relative z-10 w-full max-w-[700px] h-[min(125cqw,36rem)] lg:h-[84vh] lg:min-h-[600px] lg:max-h-[900px] flex items-end justify-center cursor-ew-resize touch-pan-y"
        aria-label="Interactive 360° Portrait of Shivaji Rathod. Hover cursor horizontally to rotate."
        role="img"
      >
        {/* Loading Spinner */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="pointer-events-none h-full w-full object-contain"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 3% 49%, rgb(0 0 0 / 0.92) 61%, rgb(0 0 0 / 0.58) 75%, rgb(0 0 0 / 0.18) 89%, transparent 99%), linear-gradient(to right, transparent, black 11% 89%, transparent)',
            maskPosition: 'center top',
            maskRepeat: 'no-repeat',
            maskSize: 'var(--portrait-mask-size, 100% 100%)',
            maskComposite: 'intersect',
          }}
        />
      </div>
    </div>
  );
}
