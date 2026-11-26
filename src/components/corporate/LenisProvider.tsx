import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useRouterState } from '@tanstack/react-router';

declare global {
  interface Window {
    __lenis?: Lenis;
    scrollToTop?: (immediate?: boolean) => void;
  }
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const routerState = useRouterState();
  const pathname = routerState?.location?.pathname;
  const hash = routerState?.location?.hash;
  const prevPathnameRef = useRef<string | undefined>(undefined);
  const prevHashRef = useRef<string | undefined>(undefined);

  // Universal helper to smoothly or immediately scroll to top
  const scrollToTop = (immediate = false) => {
    if (typeof window === 'undefined') return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate });
    }
    window.scrollTo({ top: 0, left: 0, behavior: immediate ? 'instant' : 'smooth' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // Expose global helper
  if (typeof window !== 'undefined') {
    window.scrollToTop = scrollToTop;
  }

  // 1. Initialize Smooth Scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Prevent browser auto-restoration jump on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Initialize Lenis for smooth desktop, laptop & wheel scrolling
    // syncTouch: false leaves touch swipes to hardware-accelerated OS native scrolling
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.0,
      syncTouch: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = undefined;
    };
  }, []);

  // 2. Route & Hash Change Handler
  useEffect(() => {
    const isNewPage = prevPathnameRef.current !== undefined && prevPathnameRef.current !== pathname;
    const isNewHash = prevHashRef.current !== hash && hash && hash !== '#' && hash !== '#/';

    if (isNewHash) {
      const targetId = hash.replace(/^#\/?/, '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(targetEl, { offset: -80 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (isNewPage) {
      scrollToTop(true);
    }

    prevPathnameRef.current = pathname;
    prevHashRef.current = hash;
  }, [pathname, hash]);

  return <>{children}</>;
}
