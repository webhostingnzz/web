'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Every core page's content is raw scraped WordPress HTML rendered via
// dangerouslySetInnerHTML — meaning every nav link, footer link, and button
// is a plain <a href="..."> tag. Plain <a> tags always trigger a full
// browser page reload (re-download everything, re-run every script from
// scratch), which is exactly why navigation has felt slow: none of these
// links get Next.js's instant, prefetched client-side navigation the way a
// <Link> component would. This intercepts clicks on same-site links and
// routes them through Next.js's router instead, without touching anything
// that genuinely needs a normal browser navigation.
export default function FastNav() {
  const router = useRouter();

  useEffect(() => {
    const isInternalPageLink = (anchor: HTMLAnchorElement): URL | null => {
      const href = anchor.getAttribute('href');
      if (!href) return null;
      if (anchor.target && anchor.target !== '_self') return null;
      if (anchor.hasAttribute('download')) return null;
      if (href.startsWith('mailto:') || href.startsWith('tel:')) return null;
      if (href.startsWith('#')) return null;
      if (href.includes('add-to-cart=')) return null;
      if (anchor.hasAttribute('data-no-fastnav')) return null;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return null;
      }
      if (url.origin !== window.location.origin) return null;
      return url;
    };

    // Warm the cache the moment the pointer reaches a link, so by the time
    // the click actually registers, the page is often already fetched.
    const handlePointerEnter = (e: Event) => {
      const anchor = (e.target as HTMLElement)?.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;
      const url = isInternalPageLink(anchor);
      if (!url) return;
      router.prefetch(url.pathname);
    };

    const handleClick = (e: MouseEvent) => {
      // Only plain left-clicks with no modifier keys — anything else (middle
      // click, ctrl/cmd+click, shift+click) is the user asking for a new tab
      // or window, which must go through normal browser behavior.
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement)?.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;
      const url = isInternalPageLink(anchor);
      if (!url) return;

      e.preventDefault();
      router.push(url.pathname + url.search + url.hash);
    };

    // `focusin` covers keyboard tab-navigation reaching a link, `mouseover`
    // covers mouse hover; both are cheap to attach at the document level.
    document.addEventListener('mouseover', handlePointerEnter);
    document.addEventListener('focusin', handlePointerEnter);
    document.addEventListener('touchstart', handlePointerEnter, { passive: true });
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('mouseover', handlePointerEnter);
      document.removeEventListener('focusin', handlePointerEnter);
      document.removeEventListener('touchstart', handlePointerEnter);
      document.removeEventListener('click', handleClick);
    };
  }, [router]);

  return null;
}
