'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);

  return (
    <button
      type="button"
      disabled={!hydrated}
      onClick={() => setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark')}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-border text-fg-muted transition-colors hover:border-accent hover:text-fg sm:size-9"
    >
      <span className="sr-only hidden dark:block">Switch to light theme</span>
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <Moon size={16} className="hidden dark:block" aria-hidden="true" />
      <Sun size={16} className="dark:hidden" aria-hidden="true" />
    </button>
  );
}
