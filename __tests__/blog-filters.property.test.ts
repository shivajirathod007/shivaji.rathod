// Feature: shivaji-portfolio
// Property 8: Blog tag filter is sound and complete
// Property 9: Blog search filter is sound and complete
import { describe, test, expect } from 'vitest';
import * as fc from 'fast-check';

interface PostMeta {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  draft: boolean;
}

function filterByTag(posts: PostMeta[], tag: string): PostMeta[] {
  return posts.filter((p) => p.tags.includes(tag));
}

function filterBySearch(posts: PostMeta[], query: string): PostMeta[] {
  const q = query.toLowerCase();
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q)
  );
}

const postArb = fc.record({
  slug: fc.stringMatching(/^[0-9a-f]{4,12}$/),
  title: fc.string({ minLength: 1, maxLength: 100 }),
  summary: fc.string({ minLength: 1, maxLength: 200 }),
  tags: fc.array(fc.constantFrom('CVE', 'Web', 'AI', 'Cloud', 'Security'), {
    minLength: 0,
    maxLength: 4,
  }),
  date: fc.constant('2026-01-01'),
  draft: fc.boolean(),
});

const postsArb = fc.array(postArb, { minLength: 0, maxLength: 20 });

describe('Property 8: Tag filter is sound and complete', () => {
  test('every returned post contains the tag (soundness)', () => {
    // Feature: shivaji-portfolio, Property 8
    fc.assert(
      fc.property(postsArb, fc.constantFrom('CVE', 'Web', 'AI', 'Cloud', 'Security'), (posts, tag) => {
        const result = filterByTag(posts, tag);
        return result.every((p) => p.tags.includes(tag));
      }),
      { numRuns: 500 }
    );
  });

  test('no post containing the tag is excluded (completeness)', () => {
    // Feature: shivaji-portfolio, Property 8
    fc.assert(
      fc.property(postsArb, fc.constantFrom('CVE', 'Web', 'AI', 'Cloud', 'Security'), (posts, tag) => {
        const result = filterByTag(posts, tag);
        const matching = posts.filter((p) => p.tags.includes(tag));
        return matching.length === result.length;
      }),
      { numRuns: 500 }
    );
  });
});

describe('Property 9: Search filter is sound and complete', () => {
  test('every returned post matches the query (soundness)', () => {
    // Feature: shivaji-portfolio, Property 9
    fc.assert(
      fc.property(postsArb, fc.string({ minLength: 1, maxLength: 20 }), (posts, query) => {
        const result = filterBySearch(posts, query);
        const q = query.toLowerCase();
        return result.every(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.summary.toLowerCase().includes(q)
        );
      }),
      { numRuns: 500 }
    );
  });

  test('no matching post is excluded (completeness)', () => {
    // Feature: shivaji-portfolio, Property 9
    fc.assert(
      fc.property(postsArb, fc.string({ minLength: 1, maxLength: 20 }), (posts, query) => {
        const result = filterBySearch(posts, query);
        const q = query.toLowerCase();
        const matching = posts.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.summary.toLowerCase().includes(q)
        );
        return matching.length === result.length;
      }),
      { numRuns: 500 }
    );
  });
});
