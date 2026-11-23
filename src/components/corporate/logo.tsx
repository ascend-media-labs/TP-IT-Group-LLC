import logoDark from '@/assets/logo.png';
import logoLight from '@/assets/logo-white.png';

interface TPITLogoProps {
  className?: string;
  inverted?: boolean;
  alt?: string;
}

export function TPITLogo({
  className = "h-7 sm:h-8 md:h-8.5 w-auto",
  inverted = false,
  alt = "TP iT GROUP LLC - Innovating Beyond Boundaries",
}: TPITLogoProps) {
  return (
    <img
      src={inverted ? logoLight : logoDark}
      alt={alt}
      className={`${className} object-contain block`}
      width={1024}
      height={134}
      loading="eager"
    />
  );
}
