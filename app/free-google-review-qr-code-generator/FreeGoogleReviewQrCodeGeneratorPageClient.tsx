'use client';

import { useEffect } from 'react';
import pageHtml from '../data/free_google_review_qr_code_generator_html.json';
import pageScripts from '../data/free_google_review_qr_code_generator_scripts.json';

export default function FreeGoogleReviewQrCodeGeneratorPageClient() {
  useEffect(() => {
    let jqLoaded = false;
    let qrLoaded = false;
    let html2canvasLoaded = false;
    // If no API key is configured, don't block the rest of the tool waiting
    // on a script that will never load — the manual URL field still works
    // fine without the autocomplete search.
    const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    let mapsLoaded = !mapsApiKey;

    const tryRunScripts = () => {
      if (!jqLoaded || !qrLoaded || !html2canvasLoaded || !mapsLoaded) return;
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

    // Required by the "Download" button (whnzDownloadCard renders the
    // styled card to a PNG via window.html2canvas) — this was missing
    // entirely, so Download silently failed with a JS error before.
    const html2canvas = document.createElement('script');
    html2canvas.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    html2canvas.onload = () => { html2canvasLoaded = true; tryRunScripts(); };
    document.body.appendChild(html2canvas);

    // Powers the "start typing your business name" autocomplete search box
    // (window.google.maps.places.Autocomplete). Only loaded when a key is
    // configured — this key is meant to be public and restricted by domain
    // in Google Cloud Console, not kept secret.
    let maps: HTMLScriptElement | null = null;
    if (mapsApiKey) {
      maps = document.createElement('script');
      maps.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=places`;
      maps.onload = () => { mapsLoaded = true; tryRunScripts(); };
      document.body.appendChild(maps);
    }

    return () => {
      document.body.removeChild(jq);
      document.body.removeChild(qr);
      document.body.removeChild(html2canvas);
      if (maps) document.body.removeChild(maps);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: pageHtml as string }} />;
}
