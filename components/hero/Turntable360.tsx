'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { FRAMES } from '@/lib/turntable-manifest.generated';
import { RotateCcw, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const FRAME_COUNT = FRAMES.length; // 14 frames
const DEGREES_PER_FRAME = 360 / FRAME_COUNT; // ~25.71°

export function Turntable360() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentAngle, setCurrentAngle] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // References for physics and rAF
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const lastPointerXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const bitmapsRef = useRef<(ImageBitmap | null)[]>(new Array(FRAME_COUNT).fill(null));
  const rafIdRef = useRef<number>(0);

  // Helper to get nearest frame index
  const getFrameIndex = (angle: number) => {
    const normalized = ((angle % 360) + 360) % 360;
    return Math.round(normalized / DEGREES_PER_FRAME) % FRAME_COUNT;
  };

  const getOrientationLabel = (angle: number) => {
    const norm = Math.round(((angle % 360) + 360) % 360);
    if (norm >= 338 || norm < 23) return 'FRONT · 0°';
    if (norm >= 23 && norm < 68) return 'FRONT-RIGHT · 45°';
    if (norm >= 68 && norm < 113) return 'RIGHT PROFILE · 90°';
    if (norm >= 113 && norm < 158) return 'REAR-RIGHT · 135°';
    if (norm >= 158 && norm < 203) return 'BACK · 180°';
    if (norm >= 203 && norm < 248) return 'REAR-LEFT · 225°';
    if (norm >= 248 && norm < 293) return 'LEFT PROFILE · 270°';
    return 'FRONT-LEFT · 315°';
  };

  // Render active frame to canvas
  const renderCurrentFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    // Exact single discrete frame - 100% crisp, zero ghosting
    const frameIdx = getFrameIndex(angleRef.current);
    const bitmap = bitmapsRef.current[frameIdx];

    if (bitmap) {
      // Draw bitmap scaled to fit while preserving aspect ratio
      const imgAspect = bitmap.width / bitmap.height;
      const canvasAspect = cw / ch;
      let drawW = cw;
      let drawH = ch;
      let drawX = 0;
      let drawY = 0;

      if (canvasAspect > imgAspect) {
        drawH = ch;
        drawW = ch * imgAspect;
        drawX = (cw - drawW) / 2;
      } else {
        drawW = cw;
        drawH = cw / imgAspect;
        drawY = (ch - drawH) / 2;
      }

      ctx.drawImage(bitmap, drawX, drawY, drawW, drawH);
    }
  }, []);

  // Smooth inertial physics loop
  const updatePhysics = useCallback(() => {
    if (!isDraggingRef.current) {
      if (Math.abs(velocityRef.current) > 0.05) {
        angleRef.current += velocityRef.current;
        velocityRef.current *= 0.88; // Gentle friction deceleration
        renderCurrentFrame();
        setCurrentAngle(Math.round(((angleRef.current % 360) + 360) % 360));
      } else {
        velocityRef.current = 0;
      }
    }
    rafIdRef.current = requestAnimationFrame(updatePhysics);
  }, [renderCurrentFrame]);

  // Load all 14 frames into ImageBitmaps
  useEffect(() => {
    let cancelled = false;

    async function loadAllFrames() {
      // Priority load frame 0 for instant display
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

      // Background load the remaining 13 frames
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
    rafIdRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [renderCurrentFrame, updatePhysics]);

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

  // Pointer drag controls (contained to the portrait)
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    velocityRef.current = 0;
    lastPointerXRef.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || lastPointerXRef.current === null) return;
    const deltaX = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;

    const sensitivity = 0.55;
    const deltaAngle = deltaX * sensitivity;

    angleRef.current += deltaAngle;
    velocityRef.current = deltaAngle * 0.35; // Preserve momentum

    renderCurrentFrame();
    setCurrentAngle(Math.round(((angleRef.current % 360) + 360) % 360));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    isDraggingRef.current = false;
    lastPointerXRef.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  const stepRotation = (direction: 1 | -1) => {
    angleRef.current += direction * DEGREES_PER_FRAME;
    velocityRef.current = 0;
    renderCurrentFrame();
    setCurrentAngle(Math.round(((angleRef.current % 360) + 360) % 360));
  };

  const resetToFront = () => {
    angleRef.current = 0;
    velocityRef.current = 0;
    renderCurrentFrame();
    setCurrentAngle(0);
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* ── Cinematic Studio Spotlight Aura behind the person ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="w-[120%] h-[110%] rounded-full opacity-60 filter blur-[70px]"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(249, 115, 22, 0.22) 0%, rgba(99, 102, 241, 0.15) 45%, transparent 75%)',
          }}
        />
      </div>

      {/* ── Floating Orientation Telemetry Tag ── */}
      <div className="absolute top-2 right-4 sm:right-6 z-20 flex items-center gap-2 font-mono text-xs text-accent bg-[#0d0f18]/80 backdrop-blur-md border border-white/[0.1] px-3 py-1 rounded-full shadow-lg">
        <Compass size={13} className="shrink-0" />
        <span>{getOrientationLabel(currentAngle)}</span>
      </div>

      {/* ── The Immense Standing Portrait Stage (No Boxes, No Bezels) ── */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative z-10 w-full h-[68vh] min-h-[500px] max-h-[760px] flex items-end justify-center touch-none cursor-grab active:cursor-grabbing ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          // Gracefully dissolve bottom of the suit into the background
          maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
        }}
        aria-label="Interactive 360° Portrait of Shivaji Rathod. Drag horizontally to rotate."
        role="region"
      >
        {/* Loading Spinner */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            <span className="font-mono text-xs text-fg-muted tracking-wider">
              LOADING 360° PORTRAIT...
            </span>
          </div>
        )}

        {/* Clean, Full-Resolution Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)]"
        />
      </div>

      {/* ── Sleek Floating Interactive Control Capsule (Minimal Pill) ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-20 -mt-6 sm:-mt-8 flex items-center gap-2 bg-[#0c0e18]/85 backdrop-blur-xl border border-white/[0.12] rounded-full px-3.5 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        {/* Step Left */}
        <button
          type="button"
          onClick={() => stepRotation(-1)}
          aria-label="Rotate left"
          className="p-1.5 rounded-full text-fg-muted hover:text-white hover:bg-white/[0.08] active:scale-95 transition-all"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Status / Drag Hint */}
        <span className="font-mono text-xs font-semibold text-fg tracking-wider uppercase px-2">
          ← DRAG TO ROTATE 360° →
        </span>

        {/* Reset to Front (if turned) */}
        {currentAngle !== 0 && (
          <button
            type="button"
            onClick={resetToFront}
            aria-label="Reset orientation"
            className="flex items-center gap-1 font-mono text-[11px] text-accent hover:text-white bg-accent/10 hover:bg-accent/20 px-2 py-0.5 rounded-full transition-all"
          >
            <RotateCcw size={11} />
            <span>Reset</span>
          </button>
        )}

        {/* Step Right */}
        <button
          type="button"
          onClick={() => stepRotation(1)}
          aria-label="Rotate right"
          className="p-1.5 rounded-full text-fg-muted hover:text-white hover:bg-white/[0.08] active:scale-95 transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </motion.div>
    </div>
  );
}
