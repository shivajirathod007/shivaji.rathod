'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';

export interface TimelineEntry {
  title: string;
  org: string;
  location?: string;
  period: string;
  bullets?: string[];
  meta?: string;
}

interface VerticalTimelineProps {
  entries: TimelineEntry[];
}

export function VerticalTimeline({ entries }: VerticalTimelineProps) {
  const timelineRef = useRef<HTMLOListElement>(null);
  const [path, setPath] = useState('');
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.85', 'end 0.45'],
    trackContentSize: true,
  });
  const remaining = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useLayoutEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const markers = [...timeline.querySelectorAll<HTMLElement>('[data-journey-marker]')];
    const updatePath = () => {
      const bounds = timeline.getBoundingClientRect();
      const points = markers.map((marker) => {
        const rect = marker.getBoundingClientRect();
        return { x: rect.left + rect.width / 2 - bounds.left, y: rect.top + rect.height / 2 - bounds.top };
      });
      const [first] = points;
      if (!first) {
        setPath('');
        return;
      }

      const segments = points.slice(1).map((point, index) => {
        const previous = points[index];
        const midpoint = (previous.y + point.y) / 2;
        return `C ${previous.x} ${midpoint}, ${point.x} ${midpoint}, ${point.x} ${point.y}`;
      });
      setPath([`M ${first.x} ${first.y}`, ...segments].join(' '));
    };

    updatePath();
    const observer = new ResizeObserver(updatePath);
    observer.observe(timeline);
    for (const row of timeline.children) observer.observe(row);
    return () => observer.disconnect();
  }, [entries]);

  return (
    <div className="relative">
      <svg className="pointer-events-none absolute inset-0 size-full" fill="none" aria-hidden="true" focusable="false">
        <path d={path} className="stroke-accent-ink/25" strokeWidth={2} />
        <motion.g style={{ strokeDashoffset: remaining }}>
          <path
            d={path}
            pathLength={1}
            strokeDasharray="1 1"
            strokeWidth={3}
            strokeLinecap="round"
            className="stroke-accent-ink motion-reduce:[stroke-dashoffset:0]"
          />
        </motion.g>
      </svg>
      <ol ref={timelineRef} className="relative space-y-6 md:space-y-4">
        {entries.map((entry, index) => (
          <li key={entry.title} className="relative grid pl-10 md:grid-cols-[minmax(0,1fr)_6rem_minmax(0,1fr)] md:pl-0">
            <span
              data-journey-marker
              aria-hidden="true"
              className={`absolute top-8 z-10 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-ink ring-4 ring-bg ${
                index % 2 === 0 ? 'left-3 md:left-[calc(50%+1.5rem)]' : 'left-6 md:left-[calc(50%-1.5rem)]'
              }`}
            />
            <ScrollReveal
              delay={index * 0.04}
              className={`portfolio-card min-w-0 p-4 sm:p-6 ${index % 2 === 0 ? 'md:col-start-3' : 'md:col-start-1'}`}
            >
              <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <p className="text-sm font-semibold tabular-nums text-accent-ink">{entry.period}</p>
                {entry.location && <p className="text-xs text-fg-muted sm:text-sm">{entry.location}</p>}
              </div>

              <div>
                <h3 className="text-xl leading-tight font-bold text-fg sm:text-2xl">{entry.title}</h3>
                <p className="mt-1 text-sm font-medium text-fg-muted sm:text-base">{entry.org}</p>
                {entry.meta && (
                  <p className="mt-2 text-xs font-semibold tracking-wide text-volt-ink">{entry.meta}</p>
                )}
                {entry.bullets && entry.bullets.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-fg-muted marker:text-accent-ink sm:text-base">
                    {entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
              </div>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
