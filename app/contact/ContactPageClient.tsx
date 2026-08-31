'use client';

import { useEffect } from 'react';
import pageHtml from '../data/contact_html.json';
import pageScripts from '../data/contact_scripts.json';

export default function ContactPageClient() {
  useEffect(() => {
    let jqLoaded = false;

    const tryRunScripts = () => {
      if (!jqLoaded) return;
      if ((window as any).__whnz_contact_ScriptsRan) return;
      (window as any).__whnz_contact_ScriptsRan = true;
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

  // Wires up the real contact form submission. Deliberately a SEPARATE
  // effect from the legacy ported script above — that script is fragile
  // scraped WordPress/jQuery code, and if anything in it throws partway
  // through, everything after that point (including a form handler) would
  // silently never run, leaving the form to fall back to a plain HTML
  // submit (a full page reload, hitting a URL with no real backend). This
  // effect attaches the handler independently, so it can't be broken by
  // that other code.
  useEffect(() => {
    const form = document.querySelector('.wpcf7-form') as HTMLFormElement | null;
    if (!form) return;

    const responseOutput = form.querySelector('.wpcf7-response-output') as HTMLElement | null;
    const submitBtn = form.querySelector('input[type="submit"]') as HTMLInputElement | null;

    const showMessage = (text: string, isError: boolean) => {
      if (!responseOutput) return;
      responseOutput.textContent = text;
      responseOutput.setAttribute('aria-hidden', 'false');
      responseOutput.style.display = 'block';
      responseOutput.style.marginTop = '16px';
      responseOutput.style.padding = '12px 16px';
      responseOutput.style.borderRadius = '10px';
      responseOutput.style.fontSize = '14px';
      responseOutput.style.fontWeight = '600';
      if (isError) {
        responseOutput.style.background = 'rgba(225,29,72,0.1)';
        responseOutput.style.color = '#e11d48';
      } else {
        responseOutput.style.background = 'rgba(12,192,223,0.1)';
        responseOutput.style.color = '#0aa5c0';
      }
    };

    const handleSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      e.stopImmediatePropagation();

      const nameInput = form.querySelector('input[name="your-name"]') as HTMLInputElement | null;
      const emailInput = form.querySelector('input[name="your-email"]') as HTMLInputElement | null;
      const subjectInput = form.querySelector('input[name="your-subject"]') as HTMLInputElement | null;
      const messageInput = form.querySelector('textarea[name="your-message"]') as HTMLTextAreaElement | null;

      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const subject = subjectInput?.value.trim() || '';
      const message = messageInput?.value.trim() || '';

      if (!name || !email || !subject || !message) {
        showMessage('Please fill in all fields.', true);
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.value = 'Sending...';
      }

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })
        .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
        .then((result) => {
          if (result.ok) {
            showMessage("Thanks! Your message has been sent — we'll get back to you soon.", false);
            form.reset();
          } else {
            showMessage(result.data.error || 'Something went wrong. Please try again.', true);
          }
        })
        .catch(() => {
          showMessage('Something went wrong. Please check your connection and try again.', true);
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.value = 'Send Message';
          }
        });
    };

    // capture: true so this runs before any other click/submit listener
    // the legacy ported script might also try to attach to the same form.
    form.addEventListener('submit', handleSubmit, true);

    return () => {
      form.removeEventListener('submit', handleSubmit, true);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: pageHtml as string }} />;
}
