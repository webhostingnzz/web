'use client';

import { useEffect } from 'react';
import homeHtml from '../data/home_html.json';
import homeScripts from '../data/home_scripts.json';

// Standalone tab-switcher for the "Global data centre locations" section
// (Webhosting NZ / AWS / Google Cloud). Plain JS, no external library
// needed, and runs independently of anything else on the page.
function initDataCentreTabs() {
  const container = document.getElementById('hostiko_custom_tabs');
  if (!container) return;
  const tabLinks = container.querySelectorAll('a[data-toggle="tab"]');
  if (!tabLinks.length) return;

  tabLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = link.getAttribute('href');
      if (!targetSelector) return;
      const targetPane = container.querySelector(targetSelector);
      if (!targetPane) return;

      tabLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');

      container.querySelectorAll('.tab-pane').forEach((pane) => {
        pane.classList.remove('show', 'active');
      });
      targetPane.classList.add('show', 'active');
    });
  });
}

export default function HomePageClient() {
  useEffect(() => {
    // Run the tab-switcher immediately — it's plain JS with no
    // dependencies, so it must NOT wait on jQuery/Lottie/anything else
    // loading from a CDN. Guarded so it only binds once even if this
    // effect re-runs (e.g. React StrictMode in dev).
    if (!(window as any).__whnzTabsInit) {
      (window as any).__whnzTabsInit = true;
      initDataCentreTabs();
    }

    let jqLoaded = false;
    let lottieLoaded = false;

    const tryRunScripts = () => {
      if (!jqLoaded || !lottieLoaded) return;
      if ((window as any).__whnzScriptsRan) return;
      (window as any).__whnzScriptsRan = true;
      try {
        // eslint-disable-next-line no-new-func
        const fn = new Function(homeScripts as string);
        fn();
        document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true, cancelable: true }));
      } catch (e) {
        console.error('Ported script error:', e);
      }
    };

    // Load jQuery (required by the domain-search AJAX widget)
    const jq = document.createElement('script');
    jq.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
    jq.onload = () => { jqLoaded = true; tryRunScripts(); };
    document.body.appendChild(jq);

    // Load lottie-web (required by the performance-comparison speedometer animation)
    const lottie = document.createElement('script');
    lottie.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
    lottie.onload = () => { lottieLoaded = true; tryRunScripts(); };
    document.body.appendChild(lottie);

    return () => {
      document.body.removeChild(jq);
      document.body.removeChild(lottie);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: homeHtml as string }} />;
}
