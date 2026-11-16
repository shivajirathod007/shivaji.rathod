import { Suspense } from 'react';
import { getAllPosts } from '@/lib/mdx';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { BlogListSkeleton } from '@/components/blog/BlogListSkeleton';
import { TagChip } from '@/components/blog/TagChip';
import { SectionLabel } from '@/components/SectionLabel';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Security research writeups, CVE analyses, and technical articles by Shivaji Rathod.',
};

interface BlogPageProps {
  searchParams: Promise<{ tag?: string; q?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const tag = params.tag;
  const q = params.q;
  const allPosts = await getAllPosts();
  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags)));

  const filtered = allPosts.filter((post) => {
    const tagMatch = !tag || post.tags.includes(tag);
    const qLower = q?.toLowerCase() ?? '';
    const searchMatch = !q || post.title.toLowerCase().includes(qLower) || post.summary.toLowerCase().includes(qLower);
    return tagMatch && searchMatch;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
          <SectionLabel number="✦" text="BLOG" />
          <h1 className="font-display text-5xl font-bold text-fg mb-4">Security Research</h1>
          <p className="text-fg-muted mb-10 max-w-xl">
            CVE writeups, vulnerability research, and technical notes. {allPosts.length} article{allPosts.length !== 1 ? 's' : ''}.
          </p>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <a href="/blog" className={`inline-flex items-center px-3 py-1 rounded-full font-mono text-xs border transition-all ${!tag ? 'bg-accent/15 text-accent border-accent/40' : 'border-border text-fg-muted hover:border-fg-muted'}`}>
                All
              </a>
              {allTags.map((t) => (
                <a key={t} href={`/blog?tag=${encodeURIComponent(t)}${q ? `&q=${encodeURIComponent(q)}` : ''}`}>
                  <TagChip tag={t} active={tag === t} />
                </a>
              ))}
            </div>
          )}

          <form method="get" action="/blog" className="mb-10">
            {tag && <input type="hidden" name="tag" value={tag} />}
            <input
              type="search"
              name="q"
              defaultValue={q ?? ''}
              placeholder="Search posts…"
              className="w-full max-w-md rounded-md border border-border bg-bg-surface px-4 py-2.5 text-sm text-fg placeholder-fg-muted focus:outline-none focus:ring-2 focus:ring-orange transition-colors"
            />
          </form>

          <Suspense fallback={<BlogListSkeleton />}>
            {filtered.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post) => <BlogPostCard key={post.slug} post={post} />)}
              </div>
            ) : (
              <p className="text-fg-muted py-12 text-center font-mono">
                No posts found{tag ? ` for tag "${tag}"` : ''}{q ? ` matching "${q}"` : ''}.
              </p>
            )}
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
