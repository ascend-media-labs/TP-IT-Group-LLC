import type { FC } from 'react';

interface CountryFlagProps {
  country: 'us' | 'ca' | 'in' | 'usa' | 'canada' | 'india' | string;
  className?: string;
}

export const CountryFlag: FC<CountryFlagProps> = ({ country, className = 'w-5 h-3.5' }) => {
  const code = (country || '').toLowerCase().trim();

  if (code === 'us' || code === 'usa') {
    return (
      <svg
        viewBox="0 0 640 480"
        className={`inline-block shrink-0 rounded-[2px] shadow-xs border border-slate-200/90 overflow-hidden align-middle ${className}`}
        aria-label="United States Flag"
        role="img"
      >
        <g fillRule="evenodd">
          {/* 13 Red and White Stripes */}
          <path fill="#bd3d44" d="M0 0h640v480H0z" />
          <path fill="#fff" d="M0 36.9h640v36.9H0zm0 73.8h640v37H0zm0 73.9h640v36.9H0zm0 73.8h640v37H0zm0 73.9h640v36.9H0zm0 73.8h640v37H0z" />
          {/* Blue Canton */}
          <path fill="#192f5d" d="M0 0h288v258.5H0z" />
          {/* Stars Grid Pattern */}
          <g fill="#fff">
            {/* Stars Row 1 */}
            <circle cx="28.8" cy="23.5" r="7.5" />
            <circle cx="76.8" cy="23.5" r="7.5" />
            <circle cx="124.8" cy="23.5" r="7.5" />
            <circle cx="172.8" cy="23.5" r="7.5" />
            <circle cx="220.8" cy="23.5" r="7.5" />
            <circle cx="268.8" cy="23.5" r="7.5" />

            {/* Stars Row 2 */}
            <circle cx="52.8" cy="49.5" r="7.5" />
            <circle cx="100.8" cy="49.5" r="7.5" />
            <circle cx="148.8" cy="49.5" r="7.5" />
            <circle cx="196.8" cy="49.5" r="7.5" />
            <circle cx="244.8" cy="49.5" r="7.5" />

            {/* Stars Row 3 */}
            <circle cx="28.8" cy="75.5" r="7.5" />
            <circle cx="76.8" cy="75.5" r="7.5" />
            <circle cx="124.8" cy="75.5" r="7.5" />
            <circle cx="172.8" cy="75.5" r="7.5" />
            <circle cx="220.8" cy="75.5" r="7.5" />
            <circle cx="268.8" cy="75.5" r="7.5" />

            {/* Stars Row 4 */}
            <circle cx="52.8" cy="101.5" r="7.5" />
            <circle cx="100.8" cy="101.5" r="7.5" />
            <circle cx="148.8" cy="101.5" r="7.5" />
            <circle cx="196.8" cy="101.5" r="7.5" />
            <circle cx="244.8" cy="101.5" r="7.5" />

            {/* Stars Row 5 */}
            <circle cx="28.8" cy="127.5" r="7.5" />
            <circle cx="76.8" cy="127.5" r="7.5" />
            <circle cx="124.8" cy="127.5" r="7.5" />
            <circle cx="172.8" cy="127.5" r="7.5" />
            <circle cx="220.8" cy="127.5" r="7.5" />
            <circle cx="268.8" cy="127.5" r="7.5" />

            {/* Stars Row 6 */}
            <circle cx="52.8" cy="153.5" r="7.5" />
            <circle cx="100.8" cy="153.5" r="7.5" />
            <circle cx="148.8" cy="153.5" r="7.5" />
            <circle cx="196.8" cy="153.5" r="7.5" />
            <circle cx="244.8" cy="153.5" r="7.5" />

            {/* Stars Row 7 */}
            <circle cx="28.8" cy="179.5" r="7.5" />
            <circle cx="76.8" cy="179.5" r="7.5" />
            <circle cx="124.8" cy="179.5" r="7.5" />
            <circle cx="172.8" cy="179.5" r="7.5" />
            <circle cx="220.8" cy="179.5" r="7.5" />
            <circle cx="268.8" cy="179.5" r="7.5" />

            {/* Stars Row 8 */}
            <circle cx="52.8" cy="205.5" r="7.5" />
            <circle cx="100.8" cy="205.5" r="7.5" />
            <circle cx="148.8" cy="205.5" r="7.5" />
            <circle cx="196.8" cy="205.5" r="7.5" />
            <circle cx="244.8" cy="205.5" r="7.5" />

            {/* Stars Row 9 */}
            <circle cx="28.8" cy="231.5" r="7.5" />
            <circle cx="76.8" cy="231.5" r="7.5" />
            <circle cx="124.8" cy="231.5" r="7.5" />
            <circle cx="172.8" cy="231.5" r="7.5" />
            <circle cx="220.8" cy="231.5" r="7.5" />
            <circle cx="268.8" cy="231.5" r="7.5" />
          </g>
        </g>
      </svg>
    );
  }

  if (code === 'ca' || code === 'can' || code === 'canada') {
    return (
      <svg
        viewBox="0 0 640 480"
        className={`inline-block shrink-0 rounded-[2px] shadow-xs border border-slate-200/90 overflow-hidden align-middle ${className}`}
        aria-label="Canada Flag"
        role="img"
      >
        {/* Left & Right Red Bars */}
        <path fill="#d80027" d="M0 0h160v480H0zm480 0h160v480H480z" />
        {/* Center White Square */}
        <path fill="#ffffff" d="M160 0h320v480H160z" />
        {/* Authentic 11-pointed Maple Leaf */}
        <path
          fill="#d80027"
          d="M320 80l-21.5 67.8-47.9-33.3 13.9 57.6-53.9-7.7 33.9 46.8-59.8 21.2 50.7 32.2-36.9 48.3 60.8 7.5-14.4 58.8 47.1-36.5 18 57.2 33.9-48.7 6.4 53.8h4.6l6.4-53.8 33.9 48.7 18-57.2 47.1 36.5-14.4-58.8 60.8-7.5-36.9-48.3 50.7-32.2-59.8-21.2 33.9-46.8-53.9 7.7 13.9-57.6-47.9 33.3z"
        />
      </svg>
    );
  }

  // India Flag
  return (
    <svg
      viewBox="0 0 640 480"
      className={`inline-block shrink-0 rounded-[2px] shadow-xs border border-slate-200/90 overflow-hidden align-middle ${className}`}
      aria-label="India Flag"
      role="img"
    >
      {/* Saffron Top Stripe */}
      <path fill="#ff9933" d="M0 0h640v160H0z" />
      {/* White Middle Stripe */}
      <path fill="#ffffff" d="M0 160h640v160H0z" />
      {/* Green Bottom Stripe */}
      <path fill="#128807" d="M0 320h640v160H0z" />
      {/* Ashoka Chakra */}
      <g transform="translate(320, 240)">
        {/* Outer Wheel */}
        <circle cx="0" cy="0" r="60" fill="none" stroke="#000080" strokeWidth="6" />
        {/* Inner Hub */}
        <circle cx="0" cy="0" r="14" fill="#000080" />
        {/* 24 Spokes */}
        <g stroke="#000080" strokeWidth="2.5">
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(0)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(15)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(30)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(45)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(60)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(75)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(90)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(105)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(120)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(135)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(150)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(165)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(180)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(195)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(210)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(225)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(240)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(255)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(270)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(285)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(300)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(315)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(330)" />
          <line x1="0" y1="-14" x2="0" y2="-57" transform="rotate(345)" />
        </g>
      </g>
    </svg>
  );
};
