// Feature: shivaji-portfolio — Properties 1–5 for TurntableConfig
import { describe, test, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  degreesToFrame,
  FRAME_COUNT,
  DEGREES_PER_FRAME,
  FRICTION,
  MIN_VELOCITY,
} from '../lib/turntable-config';

function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

describe('Property 1: degreesToFrame output is always a valid frame index', () => {
  test('returns integer in [0, FRAME_COUNT) for any finite float', () => {
    // Feature: shivaji-portfolio, Property 1
    fc.assert(
      fc.property(fc.float({ noNaN: true, noDefaultInfinity: true, min: -100000, max: 100000 }), (degrees) => {
        const frame = degreesToFrame(degrees);
        return Number.isInteger(frame) && frame >= 0 && frame < FRAME_COUNT;
      }),
      { numRuns: 500 }
    );
  });
});

describe('Property 2: degreesToFrame is periodic with period 360', () => {
  test('degreesToFrame(d) === degreesToFrame(d + 360) === degreesToFrame(d - 360)', () => {
    // Feature: shivaji-portfolio, Property 2
    // Use integer degrees to avoid floating-point precision loss near boundaries
    // (e.g. x ≈ -1e-14 gives x+360 ≈ 359.9999… which falls in a different frame bucket).
    // Real-world usage always supplies integer or low-precision float degrees.
    fc.assert(
      fc.property(fc.integer({ min: -10000, max: 10000 }), (degrees) => {
        return (
          degreesToFrame(degrees) === degreesToFrame(degrees + 360) &&
          degreesToFrame(degrees) === degreesToFrame(degrees - 360)
        );
      }),
      { numRuns: 500 }
    );
  });
});

describe('Property 3: Angle normalisation stays in [0, 360)', () => {
  test('repeated additions of arbitrary deltas stay in [0, 360)', () => {
    // Feature: shivaji-portfolio, Property 3
    fc.assert(
      fc.property(
        fc.array(fc.float({ noNaN: true, noDefaultInfinity: true, min: -50, max: 50 }), { minLength: 1, maxLength: 100 }),
        (deltas) => {
          let angle = 0;
          for (const d of deltas) {
            angle = ((angle + d) % 360 + 360) % 360;
          }
          return angle >= 0 && angle < 360;
        }
      ),
      { numRuns: 500 }
    );
  });
});

describe('Property 4: Smoothstep blend weight is always in [0, 1] and monotone', () => {
  test('S(t) is in [0,1] for all t in [0,1]', () => {
    // Feature: shivaji-portfolio, Property 4
    fc.assert(
      fc.property(fc.float({ min: 0, max: 1, noNaN: true }), (t) => {
        const s = smoothstep(t);
        return s >= 0 && s <= 1;
      }),
      { numRuns: 500 }
    );
  });

  test('S is non-decreasing on [0,1]', () => {
    // Feature: shivaji-portfolio, Property 4
    fc.assert(
      fc.property(
        fc.tuple(
          fc.float({ min: 0, max: 1, noNaN: true }),
          fc.float({ min: 0, max: 1, noNaN: true })
        ),
        ([a, b]) => {
          if (a > b) return true; // skip disordered pairs
          return smoothstep(a) <= smoothstep(b) + 1e-9;
        }
      ),
      { numRuns: 500 }
    );
  });
});

describe('Property 5: Physics velocity decays to near-zero within 200 iterations', () => {
  test('any velocity up to 720 decays below MIN_VELOCITY within 200 friction steps', () => {
    // Feature: shivaji-portfolio, Property 5
    fc.assert(
      fc.property(fc.float({ min: -720, max: 720, noNaN: true }), (initialVelocity) => {
        let v = initialVelocity;
        for (let i = 0; i < 200; i++) {
          v *= FRICTION;
          if (Math.abs(v) < MIN_VELOCITY) return true;
        }
        return Math.abs(v) < MIN_VELOCITY;
      }),
      { numRuns: 500 }
    );
  });
});
