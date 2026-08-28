'use client';

import { useEffect } from 'react';
import pageHtml from '../data/free_google_review_qr_code_generator_html.json';
import pageScripts from '../data/free_google_review_qr_code_generator_scripts.json';

export default function FreeGoogleReviewQrCodeGeneratorPageClient() {
  useEffect(() => {
    let jqLoaded = false;
    let qrLoaded = false;

    const tryRunScripts = () => {
      if (!jqLoaded || !qrLoaded) return;
      if ((window as any).__whnz_free_google_review_qr_code_generator_ScriptsRan) return;
      (window as any).__whnz_free_google_review_qr_code_generator_ScriptsRan = true;
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

    // Required by the QR code generator widget (window.QRCode)
    const qr = document.createElement('script');
    qr.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    qr.onload = () => { qrLoaded = true; tryRunScripts(); };
    document.body.appendChild(qr);

    return () => {
      document.body.removeChild(jq);
      document.body.removeChild(qr);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: pageHtml as string }} />;
}
