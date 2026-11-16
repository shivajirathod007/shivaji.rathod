'use client';
import { useEffect, useRef } from 'react';

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

// Module-level guards — survive React Strict Mode double-invoke
const SCRIPT_ID = 'cf-turnstile-script';
let scriptLoading = false;

export function TurnstileWidget({ onVerify, onError }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // 1x00000000000000000000BB = Cloudflare always-pass visible test key
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000BB';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderWidget = () => {
      if (!window.turnstile) return;
      // If this container already has a widget iframe, skip
      if (container.querySelector('iframe')) return;
      if (widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(container, {
        sitekey: siteKey,
        callback: onVerify,
        'error-callback': onError ?? (() => {}),
        theme: 'dark',
      });
    };

    if (window.turnstile) {
      renderWidget();
    } else if (!document.getElementById(SCRIPT_ID) && !scriptLoading) {
      scriptLoading = true;
      const prev = window.onTurnstileLoad;
      window.onTurnstileLoad = () => {
        prev?.();
        renderWidget();
      };
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else {
      // Script loading — wait for it
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          renderWidget();
        }
      }, 150);
      return () => clearInterval(interval);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current); } catch {}
        widgetIdRef.current = null;
      }
    };
  // onVerify/onError are stable in parent (setTurnstileToken is a setState setter)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey]);

  return <div ref={containerRef} className="mt-2 min-h-[65px]" />;
}
