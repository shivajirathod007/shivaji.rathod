import { Lock } from 'lucide-react';
export function PrivateBadge() {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-full border border-fg-muted/30 text-fg-muted bg-bg-elevated">
      <Lock size={10} /> Private
    </span>
  );
}
