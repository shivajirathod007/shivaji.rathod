import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import { Children, isValidElement, type ReactNode } from 'react';
import { getPost, getAdjacentPosts, getAllPosts, headingId } from '@/lib/mdx';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ReadingProgressBar } from '@/components/blog/ReadingProgressBar';
import { PostNavigation } from '@/components/blog/PostNavigation';
import { TagChip } from '@/components/blog/TagChip';
import { Disclaimer } from '@/components/blog/Disclaimer';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { formatDate } from '@/lib/utils';
import { Clock, Calendar, Share2 } from 'lucide-react';
import type { Metadata } from 'next';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

function headingText(children: ReactNode): string {
  return Children.toArray(children).map((child) => {
    if (isValidElement<{ children?: ReactNode }>(child)) return headingText(child.props.children);
    return child;
  }).join('');
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      tags: post.tags,
    },
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const adjacent = await getAdjacentPosts(slug);

  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        rehypePlugins: [
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          [rehypePrettyCode as any, {
            theme: { dark: 'github-dark-dimmed', light: 'github-light' },
            keepBackground: false,
          }],
        ],
      },
    },
    components: {
      Disclaimer,
      h2: ({ children, ...props }) => <h2 id={headingId(headingText(children))} {...props}>{children}</h2>,
      h3: ({ children, ...props }) => <h3 id={headingId(headingText(children))} {...props}>{children}</h3>,
    },
  });

  const shareUrl = `https://shivajirathod.dev/blog/${slug}`;
  const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <>
      <Navbar />
      <ReadingProgressBar />
      <main className="min-h-screen pt-20">
        <div className="section-container py-12">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
            <article className="min-w-0 max-w-[720px]">
              <div className="mb-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => <TagChip key={tag} tag={tag} />)}
              </div>
              <h1 className="font-display section-title font-bold text-fg leading-tight mb-6">
                {post.title}
              </h1>
              <p className="text-lg text-fg-muted mb-6 leading-relaxed">{post.summary}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-fg-muted font-mono border-b border-border pb-6 mb-8">
                <span className="flex items-center gap-1.5"><Calendar size={12} />{formatDate(post.date)}</span>
                <span className="flex items-center gap-1.5"><Clock size={12} />{post.readingTime}</span>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="flex items-center gap-1 text-fg-muted"><Share2 size={12} /> Share:</span>
                  <a href={tweetUrl} target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">X/Twitter</a>
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">LinkedIn</a>
                </div>
              </div>
              <div className="prose dark:prose-invert sm:prose-lg max-w-none
                prose-headings:font-display prose-headings:font-bold prose-headings:text-fg
                prose-p:text-fg-muted prose-p:leading-relaxed
                prose-a:text-accent-ink prose-a:no-underline hover:prose-a:underline
                prose-strong:text-fg prose-code:text-volt-ink prose-code:font-mono prose-code:text-sm
                prose-pre:bg-bg-surface prose-pre:border prose-pre:border-border prose-pre:relative prose-pre:text-fg
                prose-blockquote:border-l-accent prose-blockquote:text-fg-muted
                prose-li:text-fg-muted prose-li:marker:text-accent-ink">
                {content}
              </div>
              <PostNavigation prev={adjacent.prev} next={adjacent.next} />
            </article>
            {post.toc.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <TableOfContents items={post.toc} />
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
