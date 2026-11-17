'use client';

interface InteractiveHeadingProps {
  first: string;
  last: string;
}

export function InteractiveHeading({ first, last }: InteractiveHeadingProps) {
  return (
    <h1
      className="font-display font-extrabold text-fg leading-[0.92] tracking-tight mb-6 select-none"
      style={{ fontSize: 'min(clamp(3.6rem, 8.5vw, 6.8rem), 20cqw)' }}
    >
      <span className="block hover:text-accent-ink transition-colors duration-300">
        {first.split('').map((char, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-200 hover:-translate-y-2 hover:scale-110 hover:text-accent-ink cursor-default"
          >
            {char}
          </span>
        ))}
      </span>
      <span className="block text-fg">
        {last.split('').map((char, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-200 hover:-translate-y-2 hover:scale-110 hover:text-accent-ink cursor-default"
          >
            {char}
          </span>
        ))}
        <span
          className="inline-block text-accent-ink ml-0.5 drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]"
        >
          .
        </span>
      </span>
    </h1>
  );
}
