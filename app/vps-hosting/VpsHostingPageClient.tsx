'use client';

import { useEffect } from 'react';
import pageHtml from '../data/vps_hosting_html.json';
import pageScripts from '../data/vps_hosting_scripts.json';

export default function VpsHostingPageClient() {
  useEffect(() => {
    let jqLoaded = false;

    const tryRunScripts = () => {
      // The page's own ported script already bundles a COMPLETE jQuery UI
      // (widget factory + mouse mixin + the slider widget itself) — it's
      // the original theme's local, non-CDN jQuery UI that got scraped in
      // along with the rest of the page. We only need jQuery core loaded;
      // loading jQuery UI separately from the CDN on top of that caused two
      // competing widget registrations, which is why the slider rendered
      // but dragging didn't work (mouse-interaction binding got tangled
      // between the two copies).
      if (!jqLoaded) return;
      if ((window as any).__whnz_vps_hosting_ScriptsRan) return;
      (window as any).__whnz_vps_hosting_ScriptsRan = true;
      try {
        // eslint-disable-next-line no-new-func
        const fn = new Function(pageScripts as string);
        fn();
        document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true, cancelable: true }));
      } catch (e) {
        console.error('Ported script error:', e);
      }
    };

    const jq = document.createElement('script');
    jq.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
    jq.onload = () => { jqLoaded = true; tryRunScripts(); };
    document.body.appendChild(jq);

    return () => {
      document.body.removeChild(jq);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: pageHtml as string }} />;
}
