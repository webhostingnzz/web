'use client';

import { usePathname } from 'next/navigation';

// Fades each page in on load/navigation. The `key={pathname}` forces React
// to treat every route change as a fresh mount of this wrapper, which
// re-triggers the CSS animation each time — masking the brief flash/glitch
// that can happen while a page's own scripts (nav toggle, jQuery widgets,
// etc.) finish initializing after navigation.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="whnz-page-transition">
      {children}
    </div>
  );
}
