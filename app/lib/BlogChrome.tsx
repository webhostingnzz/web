'use client';

import { useEffect } from 'react';
import headerHtml from '../data/shared_header.json';
import footerHtml from '../data/shared_footer.json';
import navScripts from '../data/shared_nav_scripts.json';

// Shared header + footer wrapper for blog pages (post pages and the index).
// Reuses the exact same nav/header/footer markup and toggle script that every
// other page on the site already uses, so blog pages look identical.
export default function BlogChrome({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let jqLoaded = false;
    let cancelled = false;

    // Deliberately no "already ran" persistent flag here: BlogChrome
    // re-mounts fresh HTML (a new header/footer DOM) on every blog page
    // navigation, including client-side <Link> navigation between the blog
    // index and individual posts. A flag that only allows this to run once
    // per browser session meant the SECOND blog page visited in a session
    // got a nav bar with no working mobile menu or dropdown at all, since
    // the script that wires those up never ran again for the new HTML.
    const tryRunScripts = () => {
      if (!jqLoaded || cancelled) return;
      try {
        // eslint-disable-next-line no-new-func
        const fn = new Function(navScripts as string);
        fn();
      } catch (e) {
        console.error('Blog nav script error:', e);
      }
    };

    const jq = document.createElement('script');
    jq.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
    jq.onload = () => { jqLoaded = true; tryRunScripts(); };
    document.body.appendChild(jq);

    return () => {
      cancelled = true;
      document.body.removeChild(jq);
    };
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headerHtml as string }} />
      {children}
      <div dangerouslySetInnerHTML={{ __html: footerHtml as string }} />
    </>
  );
}
