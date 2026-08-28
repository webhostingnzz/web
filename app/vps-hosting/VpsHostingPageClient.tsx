'use client';

import { useEffect } from 'react';
import pageHtml from '../data/vps_hosting_html.json';
import pageScripts from '../data/vps_hosting_scripts.json';

export default function VpsHostingPageClient() {
  useEffect(() => {
    let jqLoaded = false;
    let jqUiLoaded = false;

    const tryRunScripts = () => {
      // The VPS plan slider (`jQuery("#slider").slider(...)`) is a jQuery
      // UI widget, not plain jQuery — both libraries have to be loaded
      // before the ported page script runs, or `.slider is not a function`
      // throws and the whole script (slider init, price/spec updates,
      // Order Now link) silently fails.
      if (!jqLoaded || !jqUiLoaded) return;
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

    // jQuery UI extends jQuery's prototype, so it must not start loading
    // until jQuery core has actually finished executing — load it inside
    // jQuery's onload callback rather than in parallel.
    const jqUi = document.createElement('script');
    jqUi.src = 'https://code.jquery.com/ui/1.13.2/jquery-ui.min.js';
    jqUi.onload = () => { jqUiLoaded = true; tryRunScripts(); };

    const jq = document.createElement('script');
    jq.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
    jq.onload = () => {
      jqLoaded = true;
      document.body.appendChild(jqUi);
    };
    document.body.appendChild(jq);

    return () => {
      document.body.removeChild(jq);
      if (jqUi.parentNode) document.body.removeChild(jqUi);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: pageHtml as string }} />;
}
