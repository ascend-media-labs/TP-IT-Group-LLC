import logoDark from '@/assets/logo.png';
import logoLight from '@/assets/logo-white.png';

interface TPITLogoProps {
  className?: string;
  inverted?: boolean;
  alt?: string;
}

export function TPITLogo({
  className = "h-7 md:h-8 w-auto",
  inverted = false,
  alt = "TP iT GROUP LLC",
}: TPITLogoProps) {
  return (
    <img
      src={inverted ? logoLight : logoDark}
      alt={alt}
      className={`${className} object-contain block`}
      width={814}
      height={61}
      loading="eager"
    />
  );
}
