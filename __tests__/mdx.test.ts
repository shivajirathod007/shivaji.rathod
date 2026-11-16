import { describe, test, expect } from 'vitest';
import { calcReadingTime, extractToc } from '../lib/mdx';

describe('calcReadingTime', () => {
  test('short post under 1 min reads as 1 min', () => {
    const content = 'word '.repeat(50);
    expect(calcReadingTime(content)).toBe('1 min read');
  });

  test('200 words = 1 min', () => {
    const content = 'word '.repeat(200);
    expect(calcReadingTime(content)).toBe('1 min read');
  });

  test('400 words = 2 min', () => {
    const content = 'word '.repeat(400);
    expect(calcReadingTime(content)).toBe('2 min read');
  });

  test('empty content = 1 min', () => {
    expect(calcReadingTime('')).toBe('1 min read');
  });
});

describe('extractToc', () => {
  test('extracts h2 headings', () => {
    const source = '## Introduction\nsome text\n## Conclusion\n';
    const toc = extractToc(source);
    expect(toc).toHaveLength(2);
    expect(toc[0]).toMatchObject({ level: 2, text: 'Introduction', id: 'introduction' });
    expect(toc[1]).toMatchObject({ level: 2, text: 'Conclusion', id: 'conclusion' });
  });

  test('extracts h3 headings with level 3', () => {
    const source = '### Sub-section\n';
    const toc = extractToc(source);
    expect(toc[0].level).toBe(3);
  });

  test('ignores h1 headings', () => {
    const source = '# Title\n## Section\n';
    const toc = extractToc(source);
    expect(toc).toHaveLength(1);
    expect(toc[0].text).toBe('Section');
  });

  test('generates slug id from heading text', () => {
    const source = '## Root Cause Analysis\n';
    const toc = extractToc(source);
    expect(toc[0].id).toBe('root-cause-analysis');
  });

  test('returns empty array for content with no headings', () => {
    const source = 'Just a paragraph with no headings.';
    expect(extractToc(source)).toHaveLength(0);
  });
});
