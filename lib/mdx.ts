import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export interface PostFrontmatter {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
  cover?: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Post extends PostMeta {
  content: string;
  toc: TocItem[];
}

export function calcReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  return `${mins} min read`;
}

export function extractToc(source: string): TocItem[] {
  const lines = source.split('\n');
  return lines
    .filter((l) => /^#{2,3}\s/.test(l))
    .map((l) => {
      const level = (l.match(/^(#{2,3})/)?.[1].length ?? 2) as 2 | 3;
      const text = l.replace(/^#{2,3}\s/, '').trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-|-$/g, '');
      return { id, text, level };
    });
}

function ensurePostsDir() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  ensurePostsDir();
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'));
  const isDev = process.env.NODE_ENV === 'development';

  const posts: PostMeta[] = files.map((file) => {
    const source = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const { data, content } = matter(source);
    const slug = file.replace(/\.mdx$/, '');
    return {
      slug,
      title: data.title ?? '',
      date: data.date ?? '2025-01-01',
      summary: data.summary ?? '',
      tags: data.tags ?? [],
      draft: data.draft ?? false,
      cover: data.cover,
      readingTime: calcReadingTime(content),
    };
  });

  return posts
    .filter((p) => isDev || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | null> {
  ensurePostsDir();
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  const isDev = process.env.NODE_ENV === 'development';

  if (!isDev && data.draft) return null;

  return {
    slug,
    title: data.title ?? '',
    date: data.date ?? '2025-01-01',
    summary: data.summary ?? '',
    tags: data.tags ?? [],
    draft: data.draft ?? false,
    cover: data.cover,
    readingTime: calcReadingTime(content),
    content,
    toc: extractToc(content),
  };
}

export async function getLatestPosts(n: number): Promise<PostMeta[]> {
  const all = await getAllPosts();
  return all.slice(0, n);
}

export async function getAdjacentPosts(
  slug: string
): Promise<{ prev: PostMeta | null; next: PostMeta | null }> {
  const all = await getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx < all.length - 1 ? all[idx + 1] : null,
    next: idx > 0 ? all[idx - 1] : null,
  };
}
