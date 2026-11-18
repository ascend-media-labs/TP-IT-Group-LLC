import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface AnimatedCounterProps {
  value: string;
  label: string;
  suffix?: string;
}

export function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false, margin: '-30px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Check if value is numeric or has numbers
    const numMatch = value.match(/\d[\d,]*/);
    if (!numMatch) {
      setDisplayValue(value);
      return;
    }

    const rawNumStr = numMatch[0].replace(/,/g, '');
    const targetNum = parseInt(rawNumStr, 10);
    const prefix = value.slice(0, numMatch.index);
    const suffix = value.slice((numMatch.index || 0) + numMatch[0].length);

    let start = 0;
    const duration = 1600; // ms
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(start + (targetNum - start) * ease);

      setDisplayValue(`${prefix}${current.toLocaleString()}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center group">
      <div className="font-mono text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 group-hover:text-[#d7192a] transition-colors tabular-nums">
        {displayValue}
      </div>
      <div className="mt-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-500">
        {label}
      </div>
    </div>
  );
}

