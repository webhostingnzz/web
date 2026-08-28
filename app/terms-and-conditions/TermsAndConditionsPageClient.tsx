'use client';

import { useEffect } from 'react';
import pageHtml from '../data/terms_and_conditions_html.json';
import pageScripts from '../data/terms_and_conditions_scripts.json';

export default function TermsAndConditionsPageClient() {
  useEffect(() => {
    let jqLoaded = false;

    const tryRunScripts = () => {
      if (!jqLoaded) return;
      if ((window as any).__whnz_terms_and_conditions_ScriptsRan) return;
      (window as any).__whnz_terms_and_conditions_ScriptsRan = true;
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
