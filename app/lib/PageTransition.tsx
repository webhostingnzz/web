'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Fades each page in on navigation, WITHOUT unmounting/remounting the page
// tree. An earlier version used `key={pathname}` to force a fresh mount on
// every route change — but that also forced every child component's own
// useEffect (jQuery loading, nav script init, etc.) to re-run from scratch
// on EVERY navigation, even to a page already visited in this session,
// which made the whole site feel much heavier. This version only restarts
// a CSS animation on the wrapper div itself; the children underneath are
// never destroyed, so their scripts only ever run once per page load.
//
// IMAGE FADE-IN FIX (mobile glitch):
// The old approach used a blind CSS `animation` on every <img>, which
// starts the instant the tag is parsed — NOT when the image has actually
// finished downloading. On fast connections the two roughly lined up by
// coincidence; on slower mobile connections the animation finished before
// the image data arrived, so it faded in early and then the real image
// popped in on top a moment later. This version instead listens for each
// image's real `load` event (or checks `img.complete` for already-cached
// ones) before fading it in, so the fade always lines up with when the
// image is genuinely ready, on any connection speed.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      const el = ref.current;
      if (el) {
        el.classList.remove('whnz-page-transition');
        // Force a reflow so the browser registers the class removal before
        // we re-add it — otherwise the animation won't restart.
        void el.offsetWidth;
        el.classList.add('whnz-page-transition');
      }
    }

    // Fade in every image on the page based on its REAL load state, not a
    // fixed timer. Runs on every navigation so images on newly-shown pages
    // get covered too.
    const container = ref.current;
    if (!container) return;

    const images = container.querySelectorAll('img');
    const cleanupFns: Array<() => void> = [];

    images.forEach((img) => {
      const el = img as HTMLImageElement;

      if (el.complete && el.naturalWidth > 0) {
        // Already loaded/cached — show it immediately, no fade needed.
        el.style.opacity = '1';
        return;
      }

      el.style.opacity = '0';
      el.style.transition = 'opacity 0.35s ease-out';

      const onLoad = () => {
        el.style.opacity = '1';
      };
      // If the image fails to load entirely, still reveal it (shows the
      // browser's broken-image icon rather than leaving it invisible
      // forever) so a bad image URL doesn't look like the page is stuck.
      const onError = () => {
        el.style.opacity = '1';
      };

      el.addEventListener('load', onLoad, { once: true });
      el.addEventListener('error', onError, { once: true });
      cleanupFns.push(() => {
        el.removeEventListener('load', onLoad);
        el.removeEventListener('error', onError);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, [pathname]);

  return (
    <div ref={ref} className="whnz-page-transition">
      {children}
    </div>
  );
}
