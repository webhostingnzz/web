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
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const el = ref.current;
    if (!el) return;
    el.classList.remove('whnz-page-transition');
    // Force a reflow so the browser registers the class removal before we
    // re-add it — otherwise the animation won't restart.
    void el.offsetWidth;
    el.classList.add('whnz-page-transition');
  }, [pathname]);

  return (
    <div ref={ref} className="whnz-page-transition">
      {children}
    </div>
  );
}
