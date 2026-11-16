// lib/turntable-config.ts
// Single source of truth for all Turntable constants.
// Add or remove entries in FRAME_SOURCES and everything else auto-adjusts.

export const FRAME_SOURCES = [
  'PHOTO-1-FRONT.png',
  'PHOTO-2.png',
  'PHOTO-3.png',
  'PHOTO-4.png',
  'PHOTO-5.png',
  'PHOTO-6.png',
  'PHOTO-7.png',
  'PHOTO-8-BACK.png',
  'MIRROR-PHOTO-7.png',
  'MIRROR-PHOTO-6.png',
  'MIRROR-PHOTO-5.png',
  'MIRROR-PHOTO-4.png',
  'MIRROR-PHOTO-3.png',
  'MIRROR-PHOTO-2.png',
] as const;

export const FRAME_COUNT = FRAME_SOURCES.length; // 14

export const DEGREES_PER_FRAME = 360 / FRAME_COUNT; // ~25.714°

// Direction: 1 = body turns right when mouse moves right (globe-spinning feel)
// Set to -1 to flip if it feels backwards after testing
export const ROTATION_DIRECTION: 1 | -1 = 1;

// Hover sensitivity: degrees rotated per pixel of horizontal mouse movement
export const HOVER_SENSITIVITY = 0.35;

// Drag sensitivity: degrees per pixel during click/touch drag
export const DRAG_SENSITIVITY = 0.6;

// Auto-return: after this many ms of inertia with no input, ease back to 0°
export const AUTO_RETURN_TO_FRONT = true;
export const AUTO_RETURN_DELAY_MS = 1500;
export const AUTO_RETURN_DURATION_MS = 800;

// Physics constants
export const FRICTION = 0.88;        // velocity multiplier per rAF tick
export const SPRING_K = 0.04;        // spring constant for auto-return
export const MIN_VELOCITY = 0.01;    // below this, snap velocity to 0

// Cache constants (derived from TURNTABLE_VERSION in the generated manifest)
export const TURNTABLE_CACHE_PREFIX = 'turntable-';
// TURNTABLE_CACHE_NAME and TURNTABLE_CACHE_FLAG are assembled at runtime
// using the TURNTABLE_VERSION from turntable-manifest.generated.ts

// Intro spin: plays once per session
export const INTRO_SPIN_DURATION_MS = 2500;

// Build animation: show if frames not ready within this many ms
export const BUILD_ANIMATION_THRESHOLD_MS = 250;

/**
 * Convert any floating-point angle (degrees) to a valid frame index [0, FRAME_COUNT).
 * Handles negative values, values > 360, and very large values.
 */
export function degreesToFrame(degrees: number): number {
  const normalized = ((degrees % 360) + 360) % 360;
  return Math.floor(normalized / DEGREES_PER_FRAME) % FRAME_COUNT;
}

/**
 * Returns the loading priority order for frames:
 * front first, then alternating outward: [0, 1, 13, 2, 12, 3, 11, 4, 10, 5, 9, 6, 8, 7]
 */
export function getLoadPriorityOrder(): number[] {
  const order: number[] = [0];
  let lo = 1;
  let hi = FRAME_COUNT - 1;
  while (lo <= hi) {
    if (lo <= hi) order.push(lo++);
    if (lo <= hi) order.push(hi--);
  }
  return order;
}

/**
 * Returns the shortest angular delta from `from` to `to` (both in degrees).
 * Result is in (-180, 180].
 */
export function shortestAngleDelta(from: number, to: number): number {
  const delta = ((to - from) % 360 + 540) % 360 - 180;
  return delta;
}
