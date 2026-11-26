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

    // Detect touch-first / mobile devices (smartphones, tablets, touchscreens)
    // On touch devices, native momentum scrolling is hardware accelerated by the GPU.
    // Lenis touch interception can cause jitter, over-acceleration, and ghost auto-scrolling.
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isTouchDevice && !prefersReducedMotion) {
      const lenis = new Lenis({
        duration: 0.85, // Crisp, natural response without sluggish momentum
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.85, // Balanced multiplier to prevent Mac trackpad over-acceleration
        touchMultiplier: 1,
        syncTouch: false, // Never hijack native touch events
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
    }
  }, []);

  // 2. Safe Route Change Handler (Only runs when navigating to a different page)
  useEffect(() => {
    if (prevPathnameRef.current !== undefined && prevPathnameRef.current !== pathname) {
      // If navigating to a specific hash anchor, smoothly scroll to that element
      if (hash && hash !== '#' && hash !== '#/') {
        const targetId = hash.replace(/^#\/?/, '');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetEl, { offset: -80 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else {
        // Different page without hash -> scroll to top cleanly
        scrollToTop(true);
      }
    }
    prevPathnameRef.current = pathname;
  }, [pathname, hash]);

  return <>{children}</>;
}
