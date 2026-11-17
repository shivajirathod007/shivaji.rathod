'use client';

import Script from 'next/script';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

export function TurnstileWidget({ onVerify, onError }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [ready, setReady] = useState(false);
  const [size, setSize] = useState<'normal' | 'compact'>();

  // Cloudflare's always-pass test key is used when no local key is configured.
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000BB';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setSize(entry.contentRect.width < 300 ? 'compact' : 'normal');
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const turnstile = window.turnstile;
    if (!container || !turnstile || !ready || !resolvedTheme || !size) return;

    onVerify('');
    const widgetId = turnstile.render(container, {
      sitekey: siteKey,
      callback: onVerify,
      'error-callback': onError ?? (() => {}),
      'expired-callback': () => onVerify(''),
      theme: resolvedTheme,
      size,
    });

    return () => turnstile.remove(widgetId);
  }, [ready, resolvedTheme, size, siteKey, onVerify, onError]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={() => setReady(true)}
      />
      <div ref={containerRef} className={size === 'compact' ? 'mt-2 min-h-[140px]' : 'mt-2 min-h-[65px]'} />
    </>
  );
}
