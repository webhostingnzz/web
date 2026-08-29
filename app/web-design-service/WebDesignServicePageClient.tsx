'use client';

import { useEffect } from 'react';
import pageHtml from '../data/web_design_service_html.json';
import pageScripts from '../data/web_design_service_scripts.json';

// Maps the original WooCommerce product IDs (still present in the ported
// HTML's href attributes) to the Stripe checkout tier keys.
const PRODUCT_ID_TO_TIER: Record<string, string> = {
  '4454': 'starter',
  '4455': 'pro',
  '4456': 'enterprise',
};

export default function WebDesignServicePageClient() {
  useEffect(() => {
    let jqLoaded = false;

    const tryRunScripts = () => {
      if (!jqLoaded) return;
      if ((window as any).__whnz_web_design_service_ScriptsRan) return;
      (window as any).__whnz_web_design_service_ScriptsRan = true;
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

    // Intercept the 3 pricing buttons (originally WooCommerce add-to-cart
    // links) and send the customer to a real Stripe Checkout session instead.
    const handleClick = async (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href*="add-to-cart="]') as HTMLAnchorElement | null;
      if (!target) return;

      const match = target.getAttribute('href')?.match(/add-to-cart=(\d+)/);
      const productId = match?.[1];
      const tier = productId ? PRODUCT_ID_TO_TIER[productId] : undefined;
      if (!tier) return; // not one of our known buttons, let it behave normally

      e.preventDefault();
      const originalText = target.textContent;
      target.textContent = 'Loading…';
      target.style.pointerEvents = 'none';

      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tier }),
        });
        const data = await res.json();
        if (data?.url) {
          window.location.href = data.url;
        } else {
          throw new Error(data?.error || 'Checkout failed to start');
        }
      } catch (err: any) {
        console.error('Checkout error:', err);
        // Temporarily showing the real error message so setup issues can be
        // diagnosed from the browser. Fine to simplify back to a generic
        // message once checkout is confirmed working end-to-end.
        alert(`Checkout could not start: ${err?.message || 'unknown error'}\n\nPlease try again or contact us.`);
        target.textContent = originalText;
        target.style.pointerEvents = '';
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.body.removeChild(jq);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: pageHtml as string }} />;
}
