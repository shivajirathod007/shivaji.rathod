import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PostNavigationProps {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

export function PostNavigation({ prev, next }: PostNavigationProps) {
  return (
    <nav className="flex items-center justify-between gap-4 border-t border-border pt-8 mt-12" aria-label="Post navigation">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex max-w-[48%] flex-col gap-1 hover:text-fg transition-colors"
        >
          <span className="font-mono text-xs text-fg-muted flex items-center gap-1">
            <ArrowLeft size={12} /> Previous
          </span>
          <span className="text-sm font-medium text-fg-muted group-hover:text-fg line-clamp-2">
            {prev.title}
          </span>
        </Link>
      ) : <div />}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex max-w-[48%] flex-col items-end gap-1 hover:text-fg transition-colors text-right"
        >
          <span className="font-mono text-xs text-fg-muted flex items-center gap-1">
            Next <ArrowRight size={12} />
          </span>
          <span className="text-sm font-medium text-fg-muted group-hover:text-fg line-clamp-2">
            {next.title}
          </span>
        </Link>
      ) : <div />}
    </nav>
  );
}
