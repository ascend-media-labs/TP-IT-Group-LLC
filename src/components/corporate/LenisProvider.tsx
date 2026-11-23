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
  const search = routerState?.location?.search;
  const hash = routerState?.location?.hash;
  const href = routerState?.location?.href;

  // Universal helper to force scroll to top (0, 0)
  const scrollToTop = (immediate = true) => {
    if (typeof window === 'undefined') return;

    // 1. Reset Lenis instance immediately
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    // 2. Reset standard DOM window and document scroll
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // Expose global helper for any button in the app
  if (typeof window !== 'undefined') {
    window.scrollToTop = scrollToTop;
  }

  // 1. Initial Page Load & Refresh Handler
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Disable browser automatic scroll restoration so page always starts from top on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Force scroll to top immediately on initial mount
    scrollToTop(true);

    // Initialize Lenis smooth scroll
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;
      window.__lenis = lenis;

      // Force Lenis to 0 immediately upon creation
      lenis.scrollTo(0, { immediate: true });

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      // Handle pageshow (including back/forward navigation or cache restore)
      const onPageShow = () => {
        scrollToTop(true);
      };
      window.addEventListener('pageshow', onPageShow);

      // Handle beforeunload to ensure next refresh starts at 0
      const onBeforeUnload = () => {
        window.scrollTo(0, 0);
      };
      window.addEventListener('beforeunload', onBeforeUnload);

      // Intercept clicks on links / buttons to ensure same-page clicks and navigations scroll to top
      const handleGlobalClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement)?.closest('a, button');
        if (!target) return;

        const anchor = target as HTMLAnchorElement;
        const hrefAttr = anchor.getAttribute('href');

        // If clicking a link pointing to top or root or same page
        if (hrefAttr) {
          if (hrefAttr === '#' || hrefAttr === '/' || hrefAttr === window.location.pathname) {
            scrollToTop(true);
          }
        }
      };
      document.addEventListener('click', handleGlobalClick, { capture: true });

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('pageshow', onPageShow);
        window.removeEventListener('beforeunload', onBeforeUnload);
        document.removeEventListener('click', handleGlobalClick, { capture: true });
        lenis.destroy();
        lenisRef.current = null;
        window.__lenis = undefined;
      };
    }
  }, []);

  // 2. Route Change Handler (Whenever path, search, or href changes from button click or navigation)
  useEffect(() => {
    // If there is no specific hash anchor, always force scroll to top
    if (!hash || hash === '#' || hash === '#/') {
      scrollToTop(true);

      // Run on next frames to catch dynamic layout shifts or images loading
      const frame1 = requestAnimationFrame(() => {
        scrollToTop(true);
      });
      const timer = setTimeout(() => {
        scrollToTop(true);
      }, 50);

      return () => {
        cancelAnimationFrame(frame1);
        clearTimeout(timer);
      };
    }
  }, [pathname, search, hash, href]);

  return <>{children}</>;
}
