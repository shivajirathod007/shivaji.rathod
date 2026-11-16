import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogPostCard } from './BlogPostCard';

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: string;
  cover?: string;
}

interface LatestWriteupsStripProps {
  posts: PostMeta[];
}

export function LatestWriteupsStrip({ posts }: LatestWriteupsStripProps) {
  return (
    <section id="writeups" className="py-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent mb-2">
              07 / WRITEUPS
            </p>
            <h2 className="font-display text-3xl font-bold text-fg">Latest Research</h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 font-mono text-sm text-fg-muted hover:text-fg transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="mt-6 sm:hidden">
          <Link
            href="/blog"
            className="flex items-center gap-1.5 font-mono text-sm text-fg-muted hover:text-fg transition-colors"
          >
            View all posts <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
