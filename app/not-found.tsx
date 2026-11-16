import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* Decorative grid number */}
      <p className="font-display text-[10rem] font-bold leading-none text-border select-none" aria-hidden="true">
        404
      </p>

      <div className="-mt-8 relative z-10">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent mb-4">
          00 / NOT_FOUND
        </p>
        <h1 className="font-display text-3xl font-bold text-fg mb-3">
          Page not found
        </h1>
        <p className="text-fg-muted max-w-sm mx-auto mb-8 leading-relaxed">
          This URL doesn&apos;t map to anything. It may have been moved, removed, or never existed.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-medium text-white hover:bg-orange/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </div>
    </main>
  );
}
