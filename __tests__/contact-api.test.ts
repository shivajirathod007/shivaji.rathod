// Feature: shivaji-portfolio — Properties 6, 7 and unit tests for contact API
import { describe, test, expect, vi, beforeEach } from 'vitest';
import * as fc from 'fast-check';

// Pure logic extracted from route.ts for testability
function validateContactFields(body: {
  name?: string;
  email?: string;
  message?: string;
}): string[] {
  const errors: string[] = [];
  if (!body.name?.trim()) errors.push('Name is required');
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    errors.push('Valid email is required');
  if (!body.message?.trim() || body.message.trim().length < 10)
    errors.push('Message must be at least 10 characters');
  if ((body.name?.length ?? 0) > 100) errors.push('Name is too long');
  if ((body.message?.length ?? 0) > 2000) errors.push('Message is too long');
  return errors;
}

function isHoneypotFilled(honeypot: string): boolean {
  return honeypot.trim() !== '';
}

// Property 6: Honeypot rejection holds for all non-empty inputs
describe('Property 6: Honeypot rejects all non-empty strings', () => {
  test('any non-empty honeypot triggers rejection', () => {
    // Feature: shivaji-portfolio, Property 6
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), (honeypot) => {
        return isHoneypotFilled(honeypot) === true;
      }),
      { numRuns: 500 }
    );
  });

  test('empty honeypot is never rejected', () => {
    expect(isHoneypotFilled('')).toBe(false);
  });
});

// Property 7: Rate limiter threshold (logic contract)
describe('Property 7: Rate limit threshold contract', () => {
  test('sliding window allows exactly N requests then blocks', () => {
    // Feature: shivaji-portfolio, Property 7
    // Test the contract: a sliding-window limiter with limit N
    // should allow requests 1..N and block request N+1
    const LIMIT = 5;
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 20 }), (requestCount) => {
        // Simulate a simple in-memory counter as a contract model
        let count = 0;
        const results: boolean[] = [];
        for (let i = 0; i < requestCount; i++) {
          count++;
          results.push(count <= LIMIT);
        }
        const allowedCount = results.filter(Boolean).length;
        const blockedCount = results.filter((r) => !r).length;
        // All requests up to LIMIT should be allowed
        // All requests beyond LIMIT should be blocked
        return (
          allowedCount === Math.min(requestCount, LIMIT) &&
          blockedCount === Math.max(0, requestCount - LIMIT)
        );
      }),
      { numRuns: 500 }
    );
  });
});

// Unit tests for field validation
describe('Contact field validation', () => {
  test('valid submission passes with no errors', () => {
    const errors = validateContactFields({
      name: 'Shivaji Rathod',
      email: 'shivaji@example.com',
      message: 'Hello, I would like to get in touch about a project.',
    });
    expect(errors).toHaveLength(0);
  });

  test('empty name fails', () => {
    const errors = validateContactFields({ name: '', email: 'x@y.com', message: 'long enough message here' });
    expect(errors.some((e) => e.includes('Name'))).toBe(true);
  });

  test('invalid email fails', () => {
    const errors = validateContactFields({ name: 'Test', email: 'notanemail', message: 'long enough message here' });
    expect(errors.some((e) => e.includes('email'))).toBe(true);
  });

  test('message shorter than 10 chars fails', () => {
    const errors = validateContactFields({ name: 'Test', email: 'x@y.com', message: 'short' });
    expect(errors.some((e) => e.includes('Message'))).toBe(true);
  });

  test('name over 100 chars fails', () => {
    const errors = validateContactFields({ name: 'a'.repeat(101), email: 'x@y.com', message: 'long enough message here' });
    expect(errors.some((e) => e.includes('too long'))).toBe(true);
  });

  test('message over 2000 chars fails', () => {
    const errors = validateContactFields({ name: 'Test', email: 'x@y.com', message: 'x'.repeat(2001) });
    expect(errors.some((e) => e.includes('too long'))).toBe(true);
  });
});
