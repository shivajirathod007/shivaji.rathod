import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
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
    <section id="writeups" className="section-space border-t border-border">
      <div className="section-container">
        <ScrollReveal className="section-intro flex items-end justify-between gap-4">
          <div>
            <SectionLabel number="07" text="WRITEUPS" />
            <h2 className="font-display section-title font-bold text-fg">Latest Research</h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 font-mono text-sm text-fg-muted hover:text-fg transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
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
