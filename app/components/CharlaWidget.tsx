'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

// Charla live chat widget (getcharla.com) — a paid subscription product,
// not something built in-house. This replaces an earlier custom-built
// AI + WhatsApp chat widget that was removed.
export default function CharlaWidget() {
  const pathname = usePathname();

  // Internal admin tool, not customer-facing — the support widget doesn't belong here.
  if (pathname?.startsWith('/admin')) return null;

  return (
    <Script id="charla-widget" strategy="afterInteractive">
      {`
        window.addEventListener('load', function() {
          var widgetElement = document.createElement('charla-widget');
          widgetElement.setAttribute("p", "9bfe40c8-9a93-4f2f-9c8c-b0b07df7a7c5");
          document.body.appendChild(widgetElement);
          var widgetCode = document.createElement('script');
          widgetCode.src = 'https://app.charla.com/widget/widget.js';
          document.body.appendChild(widgetCode);
        });
      `}
    </Script>
  );
}
