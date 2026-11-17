import Link from 'next/link';

interface TagChipProps {
  tag: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

const TAG_STYLES: Record<string, string> = {
  CVE: 'bg-orange/15 text-accent-ink border-orange/30',
  'Web Security': 'bg-violet/15 text-violet-ink border-violet/30',
  Web: 'bg-violet/15 text-violet-ink border-violet/30',
  AI: 'bg-volt/15 text-volt-ink border-volt/30',
  'AI Security': 'bg-volt/15 text-volt-ink border-volt/30',
  Cloud: 'bg-sky-400/15 text-sky-ink border-sky-400/30',
  'Cloud Security': 'bg-sky-400/15 text-sky-ink border-sky-400/30',
  Security: 'bg-orange/15 text-accent-ink border-orange/30',
};

function getTagStyle(tag: string): string {
  return TAG_STYLES[tag] ?? 'bg-fg-muted/15 text-fg-muted border-fg-muted/30';
}

export function TagChip({ tag, active = false, href, onClick }: TagChipProps) {
  const baseClasses = `inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-xs font-medium border transition-all ${getTagStyle(tag)} ${active ? 'ring-2 ring-offset-1 ring-offset-bg ring-current' : ''}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {tag}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={`${baseClasses} cursor-pointer hover:opacity-80`}>
        {tag}
      </button>
    );
  }

  return <span className={baseClasses}>{tag}</span>;
}
