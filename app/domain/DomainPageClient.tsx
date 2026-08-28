'use client';

import { useEffect } from 'react';
import domainHtml from '../data/domain_html.json';
import domainScripts from '../data/domain_scripts.json';

export default function DomainPageClient() {
  useEffect(() => {
    let jqLoaded = false;

    const tryRunScripts = () => {
      if (!jqLoaded) return;
      if ((window as any).__whnzDomainScriptsRan) return;
      (window as any).__whnzDomainScriptsRan = true;
      try {
        // eslint-disable-next-line no-new-func
        const fn = new Function(domainScripts as string);
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

  return <div dangerouslySetInnerHTML={{ __html: domainHtml as string }} />;
}
