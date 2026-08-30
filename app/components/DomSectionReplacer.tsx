'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Hides the element with the given id (leaving the original HTML completely
// untouched in the DOM/string - just visually hidden) and mounts `children`
// into a fresh element inserted right after it via a React portal.
//
// This is deliberately much safer than trying to cut the original scraped
// HTML string apart at a specific point: that approach requires correctly
// matching nested tags in raw HTML, and getting that wrong can silently
// corrupt everything below the cut point. This approach never re-parses or
// modifies the original HTML at all.
export default function DomSectionReplacer({
  targetId,
  children,
}: {
  targetId: string;
  children: React.ReactNode;
}) {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    target.style.display = 'none';
    const originalId = target.id;
    target.removeAttribute('id');

    const container = document.createElement('div');
    // Move the id onto the new visible container, so any existing
    // "#pricing-sec" links (like the hero's "View Plans" button) still
    // scroll to the right, now-visible place.
    container.id = originalId;
    container.style.scrollMarginTop = '100px';
    target.insertAdjacentElement('afterend', container);
    setPortalNode(container);

    return () => {
      // If this component ever unmounts, restore the original section
      // instead of leaving the page in a broken state.
      target.style.display = '';
      target.id = originalId;
      container.remove();
    };
  }, [targetId]);

  if (!portalNode) return null;
  return createPortal(children, portalNode);
}
