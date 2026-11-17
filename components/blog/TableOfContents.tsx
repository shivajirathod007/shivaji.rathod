'use client';
import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="space-y-1">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-fg-muted mb-3">
        Contents
      </p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block py-1 text-sm transition-colors ${
            item.level === 3 ? 'pl-4' : ''
          } ${
            activeId === item.id
              ? 'text-accent-ink font-medium'
              : 'text-fg-muted hover:text-fg'
          }`}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}
