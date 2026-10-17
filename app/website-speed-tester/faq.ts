// Shown on /website-speed-tester and used for its FAQPage structured data.
export const SPEED_TEST_FAQ: { q: string; a: string }[] = [
  {
    q: 'Is this website speed checker free?',
    a: 'Yes. The NZ Website Speed Test is free to use and you do not need to sign up. To keep it fast for everyone, each visitor can run a handful of tests per hour.',
  },
  {
    q: 'Can I test mobile and desktop performance?',
    a: 'Every test checks both. We run Google PageSpeed Insights for mobile and desktop at the same time, and you can switch between them in your results. Your overall grade weights mobile a little higher because most New Zealanders browse on their phones.',
  },
  {
    q: 'Why does hosting location matter for NZ websites?',
    a: 'Data has to travel between your server and your visitors. A site hosted in the United States or Europe is more than 10,000 km from Auckland, which adds delay to every request. Hosting in New Zealand, or using a CDN with NZ locations, keeps that trip short.',
  },
  {
    q: 'Why do my results change between tests?',
    a: 'Speed tests are affected by server load, network conditions, caching, ads and third-party scripts, so scores move a few points between runs. Run a test two or three times and look at the trend rather than a single number.',
  },
  {
    q: 'What do LCP, CLS and INP mean?',
    a: 'They are Google’s Core Web Vitals. Largest Contentful Paint (LCP) is when the main content appears, Cumulative Layout Shift (CLS) measures how much the page jumps around while loading, and Interaction to Next Paint (INP) measures how quickly the page reacts when someone taps or clicks.',
  },
  {
    q: 'How can I improve my website speed?',
    a: 'Start with the top fixes in your results. The most common wins are smaller images, fewer plugins and third-party scripts, page caching, and fast hosting located close to your visitors.',
  },
];
