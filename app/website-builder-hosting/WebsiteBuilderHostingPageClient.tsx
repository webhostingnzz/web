'use client';

import { useEffect } from 'react';
import pageHtml from '../data/website_builder_hosting_html.json';
import pageScripts from '../data/website_builder_hosting_scripts.json';
import PricingCards from '../components/PricingCards';
import DomSectionReplacer from '../components/DomSectionReplacer';
import { websiteBuilderPricing } from '../data/pricingPlans';

// Fix for the plan comparison table (Essentials/Growth/Premium/Elite tabs).
// The original theme's JS for this isn't part of the page content, so this
// replicates it: clicking a tab shows that plan's name+price header cell
// and hides the others (everything else in the table already shows all
// 4 columns correctly without JS).
function initComparisonTableTabs() {
    document.querySelectorAll('.Comprison_pricingplan').forEach(function(wrapper) {
        const tabs = wrapper.querySelectorAll('.tabs-list');
        const headingCells = wrapper.querySelectorAll('td.main-tld-heading');
        const pricingBoxes = wrapper.querySelectorAll('th .pricing-box');

        if (!tabs.length || !headingCells.length) return;

        tabs.forEach(function(tab, index) {
            tab.addEventListener('click', function() {
                tabs.forEach(function(t) { t.classList.remove('active', 'default'); });
                tab.classList.add('active', 'default');

                headingCells.forEach(function(cell, i) {
                    (cell as HTMLElement).style.display = (i === index) ? 'table-cell' : 'none';
                });

                pricingBoxes.forEach(function(box, i) {
                    const th = box.closest('th');
                    if (!th) return;
                    if (i === index) {
                        th.classList.add('active', 'default');
                    } else {
                        th.classList.remove('active', 'default');
                    }
                });
            });
        });
    });
}

export default function WebsiteBuilderHostingPageClient() {
  useEffect(() => {
    // Run independently of jQuery — this fix doesn't need it.
    if (!(window as any).__whnz_website_builder_hosting_TabsInit) {
      (window as any).__whnz_website_builder_hosting_TabsInit = true;
      initComparisonTableTabs();
    }


    let jqLoaded = false;

    const tryRunScripts = () => {
      if (!jqLoaded) return;
      if ((window as any).__whnz_website_builder_hosting_ScriptsRan) return;
      (window as any).__whnz_website_builder_hosting_ScriptsRan = true;
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

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: pageHtml as string }} />
      <DomSectionReplacer targetId="pricing-sec">
        <PricingCards data={websiteBuilderPricing} />
      </DomSectionReplacer>
    </>
  );
}
