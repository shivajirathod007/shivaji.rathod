import Link from 'next/link';
import { Clock, Calendar } from 'lucide-react';
import { TagChip } from './TagChip';
import { formatDate } from '@/lib/utils';

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: string;
  cover?: string;
}

interface BlogPostCardProps {
  post: PostMeta;
  featured?: boolean;
}

export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block rounded-lg border border-border bg-bg-surface p-4 sm:p-6 transition-all hover:border-fg-muted hover:-translate-y-0.5 hover:shadow-lg hover:shadow-panel-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange ${featured ? 'md:p-8' : ''}`}
    >
      {/* Top accent line */}
      <div className="mb-4 h-[2px] w-10 rounded-full bg-accent group-hover:w-16 transition-all duration-300" />

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
      )}

      {/* Title */}
      <h3 className={`font-display font-bold text-fg group-hover:text-accent-ink transition-colors ${featured ? 'text-2xl' : 'text-lg'} leading-tight mb-2`}>
        {post.title}
      </h3>

      {/* Summary */}
      <p className="text-fg-muted text-sm leading-relaxed line-clamp-2 mb-4">
        {post.summary}
      </p>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-fg-muted font-mono">
        <span className="flex items-center gap-1">
          <Calendar size={12} />
          {formatDate(post.date)}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {post.readingTime}
        </span>
      </div>
    </Link>
  );
}
