interface SectionLabelProps {
  number: string;
  text: string;
  className?: string;
}

export function SectionLabel({ number, text, className = '' }: SectionLabelProps) {
  return (
    <div className={`mb-3 flex items-baseline gap-2.5 sm:mb-4 ${className}`}>
      <span aria-hidden="true" className="select-none border-r border-accent/35 pr-2.5 text-sm font-medium tabular-nums text-accent-ink">
        {number}
      </span>
      <p className="text-base leading-snug font-semibold text-accent-ink sm:text-lg">
        {text}
      </p>
    </div>
  );
}
