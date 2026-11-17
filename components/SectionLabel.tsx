interface SectionLabelProps {
  number: string;
  text: string;
  className?: string;
}

export function SectionLabel({ number, text, className = '' }: SectionLabelProps) {
  return (
    <div className={`mb-4 flex items-center gap-3 sm:mb-5 ${className}`}>
      <span className="font-mono text-xs font-bold text-accent-ink tracking-widest select-none">
        {number}
      </span>
      <span className="h-px flex-none w-8 bg-accent/40" aria-hidden="true" />
      <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent-ink sm:text-sm">
        {text}
      </p>
    </div>
  );
}
