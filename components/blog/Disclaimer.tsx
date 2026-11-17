import { AlertTriangle } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="my-6 flex gap-3 rounded-lg border border-orange/30 bg-orange/5 p-4">
      <AlertTriangle size={18} className="mt-0.5 shrink-0 text-accent-ink" />
      <p className="text-sm text-fg-muted">
        <strong className="text-fg">Security research disclosure.</strong>{' '}
        This content is for educational purposes and authorised testing only. Do not use these techniques on systems you do not own or have explicit written permission to test.
      </p>
    </div>
  );
}
