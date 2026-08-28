'use client';

import { useEffect } from 'react';

// FAQ accordions (Elementor's "Toggle" widget) need JS to actually show/hide
// the answer when the question is clicked — Elementor normally provides this
// itself, but that JS isn't part of the page content we ported, so it never
// worked anywhere on the site. This is a single global fix that covers every
// page's FAQ section at once.
export default function GlobalScripts() {
  useEffect(() => {
    if ((window as any).__whnzFaqInit) return;
    (window as any).__whnzFaqInit = true;

    document.addEventListener('click', (e) => {
      const title = (e.target as HTMLElement)?.closest('.elementor-tab-title') as HTMLElement | null;
      if (!title) return;
      e.preventDefault();

      const item = title.closest('.elementor-toggle-item');
      if (!item) return;
      const content = item.querySelector('.elementor-tab-content') as HTMLElement | null;
      if (!content) return;

      const isOpen = title.classList.contains('elementor-active');

      // Close this item if already open, otherwise open it (and close siblings
      // within the same accordion, matching typical FAQ behavior).
      const toggleGroup = title.closest('.elementor-toggle');
      if (toggleGroup) {
        toggleGroup.querySelectorAll('.elementor-tab-title.elementor-active').forEach((el) => {
          if (el !== title) {
            el.classList.remove('elementor-active');
            el.setAttribute('aria-expanded', 'false');
            const siblingItem = el.closest('.elementor-toggle-item');
            const siblingContent = siblingItem?.querySelector('.elementor-tab-content') as HTMLElement | null;
            if (siblingContent) {
              siblingContent.classList.remove('elementor-active');
              siblingContent.style.display = 'none';
            }
          }
        });
      }

      if (isOpen) {
        title.classList.remove('elementor-active');
        title.setAttribute('aria-expanded', 'false');
        content.classList.remove('elementor-active');
        content.style.display = 'none';
      } else {
        title.classList.add('elementor-active');
        title.setAttribute('aria-expanded', 'true');
        content.classList.add('elementor-active');
        content.style.display = 'block';
      }
    });
  }, []);

  return null;
}
