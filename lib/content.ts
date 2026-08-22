// Every field below is a candidate for the admin dashboard's page editor.
// Structure now = structure of the future `pages` / `site_settings` DB tables.

export const siteMeta = {
  title: "Cheapest Web Hosting In New Zealand | Just 4.49 NZD | Fast & Secure Hosting Plans",
  description:
    "Get fast, secure managed web hosting in NZ. High-speed servers, CDN, backups, and 24/7 support for WordPress, cloud, and VPS hosting. Choose your plan today.",
  siteName: "Webhosting NZ",
  url: "https://webhosting.co.nz",
};

export const nav = {
  logoAlt: "Webhosting NZ logo",
  links: [
    { label: "Hosting", href: "/web-hosting/" },
    { label: "Domain", href: "/domain/" },
    { label: "Business Email", href: "/business-email-hosting/" },
    { label: "Web Design", href: "/web-design-service/", badge: "New" },
    { label: "Free Tools", href: "/free-tools/" },
    { label: "Blog", href: "/blog/" },
    { label: "Contact", href: "/contact/" },
  ],
  clientAreaLabel: "Client area",
  clientAreaHref: "https://my.webhosting.co.nz/clientarea.php",
};

export const hero = {
  tag: "Fully managed web hosting",
  headline: "Smart web hosting",
  headlineAccent: "in NZ",
  sub: "High-performance hosting for agencies, ecommerce, business and side-hustlers.",
  primaryCta: { label: "Hosting", href: "#hosting-plans" },
  secondaryCta: { label: "Domains", href: "#domains" },
  imageAlt: "Webhosting NZ server illustration",
};

export const logoPartners = [
  { name: "Google Cloud", alt: "Google Cloud logo" },
  { name: "DigitalOcean", alt: "DigitalOcean logo" },
  { name: "AWS", alt: "AWS logo" },
  { name: "Linode", alt: "Linode logo" },
  { name: "MalCare", alt: "MalCare logo" },
  { name: "Cloudflare", alt: "Cloudflare logo" },
  { name: "Object Cache Pro", alt: "Object Cache Pro logo" },
];

export const whyChooseUs = {
  eyebrow: "Why choose us",
  heading: "The best NZ web host for small businesses",
  sub: "WebHosting.co.nz is a New Zealand based web hosting service purpose-built for NZ businesses that need reliable, fast, and affordable hosting without the complexity.",
  items: [
    {
      title: "99.9% uptime guarantee",
      body: "Your site stays online every hour of every day, backed by our enterprise-grade NZ infrastructure.",
      icon: "clock",
    },
    {
      title: "Free SSL certificate",
      body: "Included on every plan. Encrypt traffic and build visitor trust instantly with wildcard SSL.",
      icon: "shield",
    },
    {
      title: "NZ based infrastructure",
      body: "Servers located in Auckland with global CDN coverage for fast local performance.",
      icon: "pin",
    },
    {
      title: "Domain registration",
      body: "Search, register and manage your domain name in one place, integrated with hosting.",
      icon: "search",
    },
    {
      title: "Local support team",
      body: "Talk to real people who understand your business needs. Our NZ team is always available.",
      icon: "users",
    },
    {
      title: "WordPress-optimised",
      body: "From just NZ$5.99/month with 1-click install, staging and a full suite of WordPress tools.",
      icon: "chevrons",
    },
  ],
};

export const plans = {
  eyebrow: "Hosting plans",
  heading: "Choose your hosting plan",
  items: [
    {
      name: "Web Hosting",
      desc: "Reliable hosting with optimized high-speed servers, security, backups and 24/7 support.",
      features: [
        "No website limits",
        "Free CDN and edge cache",
        "Unlimited storage",
        "Unlimited bandwidth",
        "WordPress manager",
      ],
      price: "4.49",
      href: "/web-hosting/",
    },
    {
      name: "WordPress Hosting",
      desc: "Managed WordPress with staging, backups, CDN, cache, SSL and more.",
      features: [
        "WordPress staging",
        "WordPress manager",
        "Free optimisation",
        "WordPress cloning",
        "Free wildcard SSL",
      ],
      price: "5.99",
      href: "/wordpress-hosting/",
    },
    {
      name: "Cloud Servers",
      desc: "Build, deploy and manage all your sites with fast, multi-platform cloud servers.",
      features: [
        "No website limits",
        "Free CDN and edge cache",
        "Stress-free migrations",
        "Free backups",
        "Unlimited SSL",
      ],
      price: "19.47",
      href: "/cloud-servers/",
    },
    {
      name: "VPS Hosting",
      desc: "Easy to scale, fast virtual machines with 100% enterprise SSD storage.",
      features: [
        "Enterprise SSD storage",
        "Instant provisioning",
        "Unlimited bandwidth",
        "1 Tbps+ anti-DDoS",
        "Windows and Linux",
      ],
      price: "10.99",
      href: "/vps-hosting/",
    },
  ],
};

export const solutions = {
  eyebrow: "Who is webhosting.co.nz for?",
  heading: "NZ hosting solutions for every Kiwi website",
  items: [
    {
      title: "Personal websites and blogs",
      body: "Simple setup, free SSL, and a website builder to get a portfolio or side project online fast.",
    },
    {
      title: "Small business and ecommerce",
      body: "Handles ecommerce sites, product catalogues, booking systems and everything in between.",
    },
    {
      title: "Agencies and web designers",
      body: "Supports multiple domains, staging environments and easy cPanel access for every client site.",
    },
    {
      title: "Startups and new websites",
      body: "Register a domain, choose a plan, install WordPress in one click, and go live in minutes.",
    },
  ],
};

export const migration = {
  heading: "Migrate in minutes, not days",
  body: "Already with another provider? Moving to WebHosting.co.nz is free and straightforward. Our one-click migration tool moves your websites, databases and emails automatically, with zero downtime and no risk of data loss.",
  checklist: [
    "No limits, no cost",
    "Your existing site is preserved exactly as-is",
    "Databases and emails move automatically",
    "Zero downtime, no risk of data loss",
  ],
  cta: { label: "Start your free migration", href: "/contact/" },
};

export const performance = {
  eyebrow: "Performance that moves at Kiwi speed",
  heading: "Fast page loads. Better rankings. More conversions.",
  body: [
    "Page speed is a direct SEO ranking factor. Search engines reward faster loading sites with higher positions, and faster sites convert more visitors into paying customers.",
    "Our servers are optimised at every layer: SSD storage, edge caching, CDN, object caching and bot mitigation all work together to deliver fast response times across New Zealand and globally.",
  ],
  caseStudy: {
    label: "Case study: 71% faster",
    quote:
      "A Wellington-based retail client moved to WebHosting.co.nz from an offshore provider. Within two weeks their average page load time dropped from 3.8 seconds to under 1.1 seconds, a 71% improvement that helped their Google rankings and cut their bounce rate.",
  },
  comparison: {
    heading: "NZ-based hosting vs offshore",
    rows: [
      { factor: "Average TTFB (NZ users)", offshore: "400-900ms", nz: "80-150ms" },
      { factor: "Latency for NZ visitors", offshore: "High", nz: "Low" },
      { factor: "CDN included", offshore: "Often extra cost", nz: "Free" },
      { factor: "Support timezone", offshore: "Mismatched", nz: "NZ-aligned" },
    ],
  },
};

export const security = {
  eyebrow: "Security you can count on",
  heading: "Keep your website safe, every day and every night",
  sub: "A single hacker attack or phishing incident can damage customer trust overnight. We take website security seriously so you don't have to lose sleep over it.",
  items: [
    {
      title: "Free SSL certificate",
      body: "Every plan includes a free SSL certificate, automatically activated, encrypting traffic between your site and your visitors.",
    },
    {
      title: "Wildcard SSL coverage",
      body: "WordPress plans include wildcard SSL, covering your main domain and every subdomain with one certificate.",
    },
    {
      title: "Automatic daily backups",
      body: "Regular backups of your files and data mean a bad update or attack never means starting from scratch.",
    },
    {
      title: "Hacker and bot defense",
      body: "Server-level security filters malicious bots and brute-force attempts before they reach your site, monitored 24/7.",
    },
  ],
  banner: [
    "Free SSL on every plan",
    "Wildcard SSL available",
    "Automated daily backups",
    "Bot and hacker mitigation",
    "Phishing protection",
    "Malware scanning",
  ],
};

export const testimonials = {
  heading: "What our clients are saying",
  sub: "See how businesses across New Zealand trust our hosting services for reliability, speed, and support.",
  items: [
    {
      name: "Scott Marphy",
      role: "Small business owner",
      quote:
        "Webhosting NZ improved the performance of my website. The speed, uptime, and support are far better than any host I've used before.",
    },
    {
      name: "Jasmin Ara",
      role: "Fashion store owner",
      quote:
        "WebHosting NZ boosted my store's speed and reliability. Pages load faster, checkout runs smoother, and uptime has been flawless.",
    },
    {
      name: "Mark Phillips",
      role: "Web designer",
      quote:
        "Performance matters, and WebHosting NZ delivers. My clients' sites run faster and issues have dropped drastically.",
    },
  ],
};

export const faq = {
  heading: "Frequently asked questions",
  items: [
    {
      q: "What makes an NZ web hosting provider different from offshore hosting?",
      a: "NZ web hosting means your website files sit on servers physically located in New Zealand, in Auckland. This reduces latency for NZ visitors, resulting in faster page loads and better local SEO than offshore servers add distance to every request.",
    },
    {
      q: "Do you offer free SSL certificates?",
      a: "Yes. Every plan includes a free SSL certificate, automatically configured. WordPress hosting plans include wildcard SSL covering your main domain and all subdomains.",
    },
    {
      q: "How reliable is your uptime?",
      a: "We guarantee 99.9% uptime across all plans, backed by redundant power, continuous monitoring and automated failover at our Auckland data centre.",
    },
    {
      q: "Can I migrate my existing website to WebHosting.co.nz?",
      a: "Yes, and it's free. Our migration tool moves your files, databases and emails automatically with no downtime, typically within minutes.",
    },
    {
      q: "Which hosting plan is right for a small business?",
      a: "Most small businesses start with Web Hosting (from $4.49/month) or WordPress Hosting (from $5.99/month). WordPress sites, especially ecommerce, benefit from the staging, backups and CDN built into the WordPress plan.",
    },
  ],
};

export const footer = {
  tagline: "Powering New Zealand websites with fast, secure and reliable hosting you can trust.",
  services: [
    { label: "Web Hosting", href: "/web-hosting/" },
    { label: "WordPress Hosting", href: "/wordpress-hosting/" },
    { label: "Website Builder", href: "/website-builder-hosting/" },
    { label: "Cloud Servers", href: "/cloud-servers/" },
    { label: "VPS Hosting", href: "/vps-hosting/" },
    { label: "Domains", href: "/domain/" },
  ],
  links: [
    { label: "About us", href: "/about/" },
    { label: "Privacy and policy", href: "/privacy-and-policy/" },
    { label: "Terms and conditions", href: "/terms-and-conditions/" },
    { label: "Knowledgebase", href: "https://my.webhosting.co.nz/index.php?rp=/knowledgebase" },
  ],
  contact: {
    address: "Bizgens Services Limited, 243A Warwick Road, Mayfair, Hastings 4122",
    phone: "+64 022 547 6114",
    email: "info@webhosting.co.nz",
  },
  social: [
    { label: "Facebook", href: "https://www.facebook.com/webhostingnewzealand" },
    { label: "X", href: "https://x.com/webhostingnzx" },
    { label: "Instagram", href: "https://www.instagram.com/webhostingnz/" },
  ],
  copyright: "Copyright \u00A9 Webhosting NZ 2026",
};

// ─── Web Hosting page (/web-hosting/) ───

export const webHostingMeta = {
  title: "Fast & Secure Web Hosting NZ | Affordable SSD Hosting Plans",
  description:
    "Get fast, secure SSD web hosting in NZ with free SSL, backups, staging, CDN, and 24/7 support. Choose from affordable hosting plans built for NZ businesses.",
};

export const webHostingHero = {
  heading: "Web Hosting",
  sub: "Experience fast, secure, and reliable hosting built for New Zealand businesses. Power your website with Webhosting NZ and enjoy unmatched performance and support.",
  imageAlt: "Web hosting NZ banner illustration",
};

export const webHostingPlans = {
  eyebrow: "Web hosting plans",
  heading: "Choose your web hosting plan",
  sub: "Select the perfect web hosting plan tailored to your needs, with fast performance, security, and reliable support.",
  items: [
    {
      name: "Essentials",
      priceMonthly: "4.49",
      priceAnnual: "53.88",
      features: ["1 website", "10 GB SSD storage", "Unlimited bandwidth", "Unlimited mailbox", "Free SSL", "99.99% uptime guarantee", "On demand free backups"],
      href: "https://my.webhosting.co.nz/index.php?rp=/store/web-hosting/essentials",
    },
    {
      name: "Growth",
      priceMonthly: "7.49",
      priceAnnual: "89.88",
      features: ["5 websites", "Unlimited SSD storage", "Unlimited bandwidth", "Unlimited mailbox", "Free SSL", "99.99% uptime guarantee", "On demand free backups"],
      href: "https://my.webhosting.co.nz/index.php?rp=/store/web-hosting/growth",
      featured: true,
    },
    {
      name: "Premium",
      priceMonthly: "9.49",
      priceAnnual: "113.88",
      features: ["10 websites", "Unlimited SSD storage", "Unlimited bandwidth", "Unlimited mailbox", "Free SSL", "99.99% uptime guarantee", "On demand free backups"],
      href: "https://my.webhosting.co.nz/index.php?rp=/store/web-hosting/premium",
    },
    {
      name: "Elite",
      priceMonthly: "14.49",
      priceAnnual: "173.88",
      features: ["Unlimited websites", "Unlimited SSD storage", "Unlimited bandwidth", "Unlimited mailbox", "Free SSL", "99.99% uptime guarantee", "On demand free backups"],
      href: "https://my.webhosting.co.nz/index.php?rp=/store/web-hosting/elite",
    },
  ],
};

export const webHostingComparison = {
  heading: "See full comparison of our web hosting plans",
  sub: "Find the perfect hosting solution for your website by reviewing all features side-by-side.",
  planNames: ["Essentials", "Growth", "Premium", "Elite"],
  rows: [
    { feature: "Websites", values: ["1", "5", "10", "Unlimited"] },
    { feature: "Disk space", values: ["10 GB", "Unlimited", "Unlimited", "Unlimited"] },
    { feature: "Bandwidth", values: ["Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
    { feature: "Subdomains", values: ["Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
    { feature: "10GB free mailboxes", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "Website acceleration suite", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "80+ one-click apps", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "1 Tbps+ DDoS protection", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "Free global premium CDN", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "Free SSL certificate", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "Free automatic malware scans", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "Free website builder", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "On demand backup", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "Free migration", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "99.99% uptime guarantee", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "30 days money back", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "24/7/365 support", values: ["Yes", "Yes", "Yes", "Yes"] },
  ],
};

export const webHostingAdvanced = {
  heading: "Advanced web hosting features",
  sub: "Our web hosting solutions are an easy way to get a great website up and running, with robust features including a domain, SSL certificate, professional email address, and privacy protection, all for free.",
  items: [
    { title: "Unlimited websites", body: "Host as many sites and apps as your server specifications will allow. Easily upgrade any time.", icon: "layers" },
    { title: "Ultra-secure hosting", body: "PCI compliant hosting, malware scanning, 1 Tbps+ DDoS protection, web application firewall, brute force login protection, FTP security lock and 2FA all included.", icon: "shield" },
    { title: "Server optimisations", body: "Managed applications on premium cloud providers for optimal performance. WordPress, Joomla!, Magento, WooCommerce, Laravel, NodeJS and .NET Core optimised.", icon: "server" },
    { title: "Easy management", body: "Our custom-made dashboard is powerful yet simple to use, putting you in full control of servers, apps, domains, email and security.", icon: "dashboard" },
    { title: "Lightning-fast and reliable network", body: "Our multiple-redundant network ensures your site stays fast, even during traffic spikes.", icon: "bolt" },
    { title: "Top rated support 24x7", body: "Our support team are all hosting experts and available around the clock.", icon: "headset" },
  ],
};

export const webHostingApps = {
  heading: "80+ one-click apps",
  body: "Choose from our large library of free one-click apps to quickly launch and enhance your websites. WordPress, Joomla!, Magento, OpenCart, PrestaShop, Laravel, RoundCube, CakePHP, Moodle and many more.",
  includedHeading: "Included in web hosting plans",
  included: [
    "One-click WordPress installs",
    "Fully-featured email",
    "SMTP, POP3 and IMAP protocols supported",
    "Multi-level spam and virus scanning",
    "Advanced DNS manager",
  ],
};

export const webHostingFaq = {
  heading: "Frequently asked questions",
  sub: "Do you have any questions? We have your answers.",
  items: [
    { q: "What is managed web hosting?", a: "Managed web hosting means our team handles all technical tasks, server setup, security, updates, backups, and performance optimization, so you can focus entirely on your website or business." },
    { q: "Do I need technical knowledge to use managed hosting?", a: "No. Managed hosting is designed for users with no technical experience. We manage everything behind the scenes for you." },
    { q: "Are your servers based in New Zealand?", a: "Yes, we offer locally hosted servers to deliver faster loading speeds and better reliability for Kiwi customers." },
    { q: "What support do you offer?", a: "We provide expert support for setup, configuration, troubleshooting, performance improvements, and ongoing management of your hosting services." },
    { q: "Can I upgrade my hosting plan later?", a: "Absolutely. You can upgrade anytime as your website traffic grows, without downtime or data loss." },
    { q: "Do you offer free website migration?", a: "Yes, we provide free migration from your existing hosting provider, with no disruption to your website." },
    { q: "What security features are included?", a: "Our managed hosting includes firewalls, malware scanning, DDoS protection, automatic backups, and regular security updates." },
    { q: "Do you offer WordPress-optimized hosting?", a: "Yes, we provide fully managed WordPress hosting with speed optimization, caching, updates, and enhanced security." },
    { q: "Is email hosting included?", a: "Yes, all hosting plans include professional email accounts with spam protection and easy setup." },
  ],
};

export const webHostingCta = {
  heading: "Not sure which is the best web hosting for you? Talk to our experts.",
  cta: { label: "Contact us", href: "/contact/" },
};

// ─── VPS Hosting page (/vps-hosting/) ───

export const vpsMeta = {
  title: "High-Performance VPS Hosting NZ | Fast SSD Virtual Servers",
  description:
    "Get lightning-fast SSD VPS hosting in NZ with instant deployment, unlimited bandwidth, anti-DDoS protection, and full root access. Choose your VPS plan today.",
};

export const vpsHero = {
  heading: "High Performance SSD VPS Hosting",
  sub: "Lightning-fast VPS with 100% SSD storage, deploy any image or 1-click app, spin up in 50 seconds, and powered by 100% renewable energy.",
};

export const vpsConfigurator = {
  heading: "Choose Your VPS Plan",
  sub: "From personal projects to complex apps, scale with confidence and predictable SSD VPS pricing. All our VPS are powered using 100% renewable energy, which means your sites and apps are too.",
  tiers: [
    { cores: 1, memory: "1 GB", storage: "25 GB", bandwidth: "100 Mbps", price: "23.99" },
    { cores: 2, memory: "2 GB", storage: "50 GB", bandwidth: "100 Mbps", price: "36.99" },
    { cores: 4, memory: "4 GB", storage: "75 GB", bandwidth: "250 Mbps", price: "57.99" },
    { cores: 6, memory: "8 GB", storage: "100 GB", bandwidth: "500 Mbps", price: "114.99" },
    { cores: 8, memory: "16 GB", storage: "200 GB", bandwidth: "1000 Mbps", price: "178.99" },
    { cores: 10, memory: "32 GB", storage: "400 GB", bandwidth: "1000 Mbps", price: "449.99" },
  ],
  note: "Choose your preferred server OS and select from our data centres for optimal performance.",
};

export const vpsManagement = {
  heading: "Choose Your VPS Management Level",
  tiers: [
    {
      name: "Unmanaged VPS",
      tagline: "Self-Configure Your Custom Server",
      features: ["Command line management", "Managed hardware & network", "Choice of operating system", "Full root access"],
    },
    {
      name: "Managed VPS",
      tagline: "100% Worry-Free Managed Server",
      features: ["Easy cPanel control panel", "Managed hardware & network", "24/7 live technical support", "Managed server security"],
    },
  ],
};

export const vpsAdvanced = {
  heading: "Advanced VPS Hosting Features",
  sub: "Powerful VPS hosting with full control, high performance, and flexible configurations to meet all your website and application needs.",
  items: [
    { title: "Enterprise SSD storage", body: "We only use enterprise-level SSDs for maximum speed, capacity and reliability." },
    { title: "Instant provisioning", body: "Deploy your Linux VPS online in less than a minute, and a Windows VPS in under 5 minutes." },
    { title: "Unlimited bandwidth", body: "Genuine unlimited bandwidth, no throttling, ever, backed by redundant high-capacity network uplinks." },
    { title: "Service level guarantee", body: "All VPS servers are backed by uninterruptible power supplies and a network SLA of 99.99%." },
    { title: "1 Tbps+ Anti-DDoS", body: "Advanced anti-DDoS protection for all virtual server hosting, protecting your servers in real time with no added latency." },
    { title: "Windows & Linux support", body: "Deploy Windows and a range of Linux/Unix-like operating system distros, all in one click, or install any other OS and software." },
    { title: "Hardware RAID", body: "All Webhosting NZ VPS use redundant hardware RAID arrays with a battery-backed cache." },
    { title: "NZ data centre", body: "Your data stays hosted at our ISO-compliant, PCI-compliant, green Auckland data centre." },
  ],
};

export const vpsIncluded = {
  heading: "Easy server management",
  eyebrow: "Included in VPS hosting plans",
  body: "The Webhosting NZ control panel enables seamless provisioning, management and customization of your infrastructure, with advanced options such as network management and out-of-band VNC access. Server monitoring shows you exactly what resources your virtual machine is using, including CPU usage, bandwidth, and disk I/O, plus full root access to manage every aspect of your server.",
};

export const vpsFaq = {
  heading: "Frequently asked questions",
  sub: "Do you have any questions? We have your answers.",
  items: [
    { q: "How many IP addresses do I get?", a: "All our VPS hosting comes with one dedicated IP address. You can order additional IP addresses as needed." },
    { q: "What level of support will I receive?", a: "We manage the hardware and network that your virtual private server runs on, and our VPS support team is online 24/7 should any issue arise." },
    { q: "Is bandwidth really unlimited?", a: "Yes. When we offer unlimited bandwidth VPS, we mean it, so you won't hit any traffic limits regardless of the number of requests being made to your VPS." },
    { q: "Are private networks really private?", a: "Yes. When you create your own private network, you're creating a dedicated VLAN in our data centre, which you can assign to as many servers as you like within that data centre." },
    { q: "Are your VPS servers 100% SSD?", a: "Yes, our VPS servers are 100% SSD, giving you a level of performance you won't find from other NZ VPS hosting providers at a comparable price." },
  ],
};

export const vpsCta = {
  heading: "Not sure which is the best VPS for you? Talk to our experts.",
  cta: { label: "Contact us", href: "/contact/" },
};

// ─── WordPress Hosting page (/wordpress-hosting/) ───

export const wpMeta = {
  title: "Managed WordPress Hosting NZ | Fast & Secure WP Hosting",
  description:
    "Get fast, secure managed WordPress hosting in NZ with staging, cloning, SSD storage, backups, CDN, and 24/7 support. Choose your perfect WP hosting plan.",
};

export const wpHero = {
  heading: "Managed WordPress Hosting",
  sub: "Enjoy autoscaling performance, high-frequency compute, staging and cloning tools, backups, email, security, unlimited CDN, and 24/7 expert support, all designed for fast, reliable WordPress hosting.",
};

export const wpPlans = {
  eyebrow: "WordPress hosting plans",
  heading: "The first WordPress hosting you'll love. The last you'll ever need.",
  sub: "From power bloggers to high-traffic ecommerce and agencies, deploy blazing-fast sites across our WordPress-optimised cloud platforms.",
  items: [
    {
      name: "MWP Start",
      priceMonthly: "5.99",
      priceAnnual: "71.88",
      features: ["1 website", "30 GB SSD storage", "Unlimited bandwidth", "Unlimited mailbox", "Free SSL", "Free WordPress cloning", "WordPress staging site", "On demand free backups", "99.99% uptime guarantee"],
      href: "https://my.webhosting.co.nz/index.php?rp=/store/wordpress-hosting/mwp-start",
    },
    {
      name: "MWP Plus",
      priceMonthly: "9.99",
      priceAnnual: "119.88",
      features: ["3 websites", "Unlimited SSD storage", "Unlimited bandwidth", "Unlimited mailbox", "Free SSL", "Free WordPress cloning", "WordPress staging site", "On demand free backups", "99.99% uptime guarantee"],
      href: "https://my.webhosting.co.nz/index.php?rp=/store/wordpress-hosting/mwp-plus",
      featured: true,
    },
    {
      name: "MWP Pro",
      priceMonthly: "14.99",
      priceAnnual: "179.88",
      features: ["10 websites", "Unlimited SSD storage", "Unlimited bandwidth", "Unlimited mailbox", "Free SSL", "Free WordPress cloning", "WordPress staging site", "On demand free backups", "99.99% uptime guarantee"],
      href: "https://my.webhosting.co.nz/index.php?rp=/store/wordpress-hosting/mwp-pro",
    },
    {
      name: "MWP Ultra",
      priceMonthly: "19.99",
      priceAnnual: "239.88",
      features: ["Unlimited websites", "Unlimited SSD storage", "Unlimited bandwidth", "Unlimited mailbox", "Free SSL", "Free WordPress cloning", "WordPress staging site", "On demand free backups", "99.99% uptime guarantee"],
      href: "https://my.webhosting.co.nz/index.php?rp=/store/wordpress-hosting/mwp-ultra",
    },
  ],
};

export const wpComparison = {
  heading: "See full comparison of our WordPress hosting plans",
  sub: "Find the perfect WordPress hosting solution by reviewing all features side by side.",
  planNames: ["MWP Start", "MWP Plus", "MWP Pro", "MWP Ultra"],
  rows: [
    { feature: "WP websites", values: ["1", "3", "10", "Unlimited"] },
    { feature: "Disk space", values: ["30 GB", "Unlimited", "Unlimited", "Unlimited"] },
    { feature: "Bandwidth", values: ["Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
    { feature: "Unlimited 10GB free mailboxes", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "Website acceleration suite", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "1 Tbps+ DDoS protection", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "Free global premium CDN", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "Free SSL certificate", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "Free automatic malware scans", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "On demand backup", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "Free migration", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "StackCache optimisation plugin", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "WordPress staging site", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "WordPress management tools", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "99.99% uptime guarantee", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "30 days money back", values: ["Yes", "Yes", "Yes", "Yes"] },
    { feature: "24/7/365 support", values: ["Yes", "Yes", "Yes", "Yes"] },
  ],
};

export const wpAdvanced = {
  heading: "Advanced WordPress hosting features",
  sub: "Our WordPress hosting solutions are an easy way to get a great site up and running, with robust features including a domain, SSL certificate, professional email address, and privacy protection, all for free.",
  items: [
    { title: "Premium WordPress staging", body: "Safely test new plugins, themes and code in a dedicated staging environment, and one-click deploy changes to your live site.", icon: "layers" },
    { title: "WordPress manager", body: "Manage all your WordPress themes, plugins, users and backups from one central dashboard.", icon: "dashboard" },
    { title: "StackCache", body: "Our proprietary caching technology speeds up page loading automatically and significantly, without any extra work on your part.", icon: "bolt" },
    { title: "Website acceleration suite", body: "Optimise your images and code, including resizing, compression, minification and lazy loading.", icon: "server" },
    { title: "Ultra-secure hosting", body: "Malware scanning, 1 Tbps+ DDoS protection, web application firewall and brute force login protection all included.", icon: "shield" },
    { title: "Top rated support 24x7", body: "Our support team are WordPress hosting enthusiasts, available around the clock with concise, expert replies.", icon: "headset" },
  ],
};

export const wpFaq = {
  heading: "Frequently asked questions",
  sub: "Do you have any questions? We have your answers.",
  items: [
    { q: "How do I install WordPress on my hosting account?", a: "WordPress is installed automatically on every hosting package you create. PHP is optimised specifically for WordPress, including PHP-FPM and OPcache, and the free StackCache plugin works with the CDN for fast loading times." },
    { q: "How do I migrate my WordPress site to a new hosting provider?", a: "You can use our free and unlimited Migration Centre, which moves your websites automatically using FTP. Our support team can help if you have any questions." },
    { q: "Can I use a custom domain name with my WordPress site?", a: "Yes, all Webhosting NZ hosting uses custom domain names. You can buy domains through your control panel at the lowest cost, with no price jump after the first year." },
    { q: "How do I access my WordPress site's files and database on the hosting server?", a: "Our file manager makes it easy to upload, download, edit, delete and create files. You can manage your database from the control panel using phpMyAdmin." },
    { q: "How do I troubleshoot issues with my WordPress site on the hosting server?", a: "Contact our in-house support team, available day and night. We also offer an extensive knowledge base, a free automatic malware scanner, and a staging site so you can test fixes without affecting your live site." },
    { q: "Can I use WordPress hosting for an ecommerce site?", a: "Yes, WordPress can be used to run a full ecommerce store, including with WooCommerce, on any of our WordPress hosting plans." },
  ],
};

export const wpCta = {
  heading: "Not sure which is the best WordPress plan for you? Talk to our experts.",
  cta: { label: "Contact us", href: "/contact/" },
};

// ─── Website Builder Hosting page (/website-builder-hosting/) ───

export const builderMeta = {
  title: "Website Builder Hosting NZ | Easy Drag-and-Drop Site Builder",
  description: "Build your website easily with our website builder hosting.",
};

export const builderHero = {
  heading: "Website Builder",
  sub: "Create a stunning, professional website with easy-to-use tools and powerful features, no coding needed.",
};

export const builderPlans = {
  eyebrow: "Website builder plans",
  heading: "Choose your web builder hosting plan",
  sub: "Our builder plans offer simple tools, fast performance, and everything you need to create a professional website.",
  items: [
    {
      name: "Builder Basic",
      priceMonthly: "3.49",
      priceAnnual: "41.88",
      features: ["1 website", "10 GB SSD storage", "Unlimited bandwidth", "Unlimited mailbox", "Free SSL", "99.99% uptime guarantee", "On demand free backups"],
      href: "https://my.webhosting.co.nz/index.php?rp=/store/website-builder-hosting/builder-basic",
    },
    {
      name: "Builder Standard",
      priceMonthly: "6.49",
      priceAnnual: "77.88",
      features: ["5 websites", "Unlimited SSD storage", "Unlimited bandwidth", "Unlimited mailbox", "Free SSL", "99.99% uptime guarantee", "On demand free backups"],
      href: "https://my.webhosting.co.nz/index.php?rp=/store/website-builder-hosting/builder-standard",
      featured: true,
    },
    {
      name: "Builder Premium",
      priceMonthly: "9.49",
      priceAnnual: "113.88",
      features: ["10 websites", "Unlimited SSD storage", "Unlimited bandwidth", "Unlimited mailbox", "Free SSL", "99.99% uptime guarantee", "On demand free backups"],
      href: "https://my.webhosting.co.nz/index.php?rp=/store/website-builder-hosting/builder-premium",
    },
    {
      name: "Builder Pro",
      priceMonthly: "14.49",
      priceAnnual: "173.88",
      features: ["Unlimited websites", "Unlimited SSD storage", "Unlimited bandwidth", "Unlimited mailbox", "Free SSL", "99.99% uptime guarantee", "On demand free backups"],
      href: "https://my.webhosting.co.nz/index.php?rp=/store/website-builder-hosting/builder-pro",
    },
  ],
};

export const builderAdvanced = {
  heading: "Advanced web builder hosting features",
  sub: "Our web builder hosting solutions are an easy way to get a great website up and running, with robust features including a domain, SSL certificate, professional email address, and privacy protection, all for free.",
  items: [
    { title: "Drag-and-drop editor", body: "Build your website easily with intuitive tools, no coding or technical skills required.", icon: "layers" },
    { title: "Built-in SEO tools", body: "Optimise your pages effortlessly to improve visibility and attract more visitors.", icon: "search" },
    { title: "Unlimited websites", body: "Host as many sites as your server specifications will allow. Easily upgrade any time.", icon: "globe" },
    { title: "Top rated support 24x7", body: "Our support team are all hosting experts and available around the clock.", icon: "headset" },
  ],
};

export const builderIncluded = {
  heading: "So what's in web builder hosting?",
  eyebrow: "Included in web builder hosting plans",
  body: "Everything you need to build, host, and manage a professional website, all in one simple platform: a drag-and-drop website builder to create pages without coding, mobile-responsive designs that look great on every device, built-in SEO tools to optimise your site for search engines, and fast, secure hosting included from day one.",
};

export const builderFaq = {
  heading: "Frequently asked questions",
  sub: "Do you have any questions? We have your answers.",
  items: [
    { q: "What is web builder hosting?", a: "Web builder hosting combines website building tools with reliable hosting, letting you create, manage and publish your website in one platform without technical skills." },
    { q: "Do I need coding knowledge to use it?", a: "No. The drag-and-drop editor and pre-built templates let anyone build a professional website easily without coding." },
    { q: "Are the websites mobile-friendly?", a: "Yes. All templates and designs are fully responsive, so your site looks great on smartphones, tablets and desktops." },
    { q: "Is hosting included with the builder?", a: "Yes. Your web builder hosting plan includes fast, secure and reliable hosting, so your site is live from day one." },
    { q: "Are there SEO and marketing tools included?", a: "Yes. Built-in SEO tools and integrations help optimise your website and attract more visitors." },
  ],
};

export const builderCta = {
  heading: "Not sure which is the best web builder hosting for you? Talk to our experts.",
  cta: { label: "Contact us", href: "/contact/" },
};

// ─── Cloud Servers page (/cloud-servers/) ───

export const cloudMeta = {
  title: "Managed Cloud Servers NZ | Fast Scalable Multi-Platform Hosting",
  description: "Get lightning-fast managed cloud servers in NZ with SSD storage, multi-platform support, and scalable pricing built for agencies, stores and developers.",
};

export const cloudHero = {
  heading: "Managed Cloud Servers",
  sub: "Build, deploy and manage all your sites and apps with lightning-fast, multi-platform cloud servers, perfect for agencies, online stores, developers, multi-site hosting and high-traffic sites.",
};

export const cloudProviders = [
  {
    name: "Webhosting NZ",
    tiers: [
      { plan: "Micro", cpuRam: "1 Core / 1GB RAM", storage: "25GB SSD", bandwidth: "1000GB", price: "19.47" },
      { plan: "Small", cpuRam: "1 Core / 2GB RAM", storage: "50GB SSD", bandwidth: "2000GB", price: "38.97" },
      { plan: "Medium", cpuRam: "2 Core / 4GB RAM", storage: "80GB SSD", bandwidth: "4000GB", price: "77.95" },
      { plan: "Large", cpuRam: "4 Core / 8GB RAM", storage: "160GB SSD", bandwidth: "5000GB", price: "155.91" },
      { plan: "X Large", cpuRam: "8 Core / 16GB RAM", storage: "320GB SSD", bandwidth: "10000GB", price: "233.88" },
      { plan: "2X Large", cpuRam: "12 Core / 32GB RAM", storage: "640GB SSD", bandwidth: "20000GB", price: "448.29" },
      { plan: "4X Large", cpuRam: "16 Core / 32GB RAM", storage: "640GB SSD", bandwidth: "30000GB", price: "779.64" },
      { plan: "8X Large", cpuRam: "24 Core / 64GB RAM", storage: "1280GB SSD", bandwidth: "40000GB", price: "1,364.38" },
      { plan: "16X Large", cpuRam: "32 Core / 96GB RAM", storage: "1440GB SSD", bandwidth: "40000GB", price: "1,949.13" },
      { plan: "32X Large", cpuRam: "48 Core / 128GB RAM", storage: "1920GB SSD", bandwidth: "40000GB", price: "3,118.61" },
    ],
  },
  {
    name: "AWS",
    tiers: [
      { plan: "Micro", cpuRam: "2 Core / 1GB RAM", storage: "20GB SSD", bandwidth: "2GB", price: "24.79" },
      { plan: "Small", cpuRam: "2 Core / 2GB RAM", storage: "20GB SSD", bandwidth: "2GB", price: "40.74" },
      { plan: "Medium", cpuRam: "2 Core / 4GB RAM", storage: "20GB SSD", bandwidth: "2GB", price: "81.49" },
      { plan: "Large", cpuRam: "2 Core / 8GB RAM", storage: "20GB SSD", bandwidth: "2GB", price: "155.91" },
      { plan: "X Large", cpuRam: "4 Core / 16GB RAM", storage: "20GB SSD", bandwidth: "2GB", price: "306.53" },
      { plan: "2X Large", cpuRam: "8 Core / 32GB RAM", storage: "20GB SSD", bandwidth: "2GB", price: "607.76" },
      { plan: "4X Large", cpuRam: "16 Core / 64GB RAM", storage: "20GB SSD", bandwidth: "2GB", price: "1,396.28" },
      { plan: "8X Large", cpuRam: "32 Core / 128GB RAM", storage: "20GB SSD", bandwidth: "2GB", price: "2,787.26" },
    ],
  },
  {
    name: "Google",
    tiers: [
      { plan: "Micro", cpuRam: "1 Core / 3.75GB RAM", storage: "20GB SSD", bandwidth: "2GB", price: "81.49" },
      { plan: "Small", cpuRam: "2 Core / 8GB RAM", storage: "20GB SSD", bandwidth: "2GB", price: "212.62" },
      { plan: "Medium", cpuRam: "4 Core / 16GB RAM", storage: "20GB SSD", bandwidth: "2GB", price: "419.93" },
      { plan: "Large", cpuRam: "8 Core / 32GB RAM", storage: "20GB SSD", bandwidth: "2GB", price: "836.34" },
      { plan: "X Large", cpuRam: "16 Core / 64GB RAM", storage: "20GB SSD", bandwidth: "2GB", price: "1,669.16" },
      { plan: "2X Large", cpuRam: "32 Core / 128GB RAM", storage: "20GB SSD", bandwidth: "2GB", price: "3,333.02" },
      { plan: "4X Large", cpuRam: "48 Core / 192GB RAM", storage: "20GB SSD", bandwidth: "2GB", price: "4,996.88" },
      { plan: "8X Large", cpuRam: "64 Core / 256GB RAM", storage: "20GB SSD", bandwidth: "2GB", price: "6,660.74" },
    ],
  },
];

export const cloudAdvanced = {
  heading: "Advanced cloud server hosting features",
  sub: "Our cloud hosting solutions are an easy way to get a great website up and running, with robust features including a domain, SSL certificate, professional email address, and privacy protection, all for free.",
  items: [
    { title: "Next-gen cloud servers", body: "Enterprise-level cloud servers optimised by us for significantly higher IOPS, perfect for intensive apps and projects.", icon: "bolt" },
    { title: "Unlimited websites", body: "Host as many sites and apps as your server specifications will allow. Easily upgrade any time.", icon: "globe" },
    { title: "Server optimisations", body: "Managed applications on premium cloud providers for optimal performance: PHP, WordPress, Joomla!, Magento, WooCommerce, Laravel, NodeJS and .NET Core optimised.", icon: "server" },
    { title: "Easy management", body: "Our custom-made dashboard is powerful yet simple to use, putting you in full control of servers, apps, domains, email and security.", icon: "dashboard" },
  ],
};

export const cloudSuperCloud = {
  heading: "Join the Super Cloud",
  items: [
    "Transfer effortlessly across Webhosting NZ Cloud, AWS and GCP platforms",
    "Pick and choose from 60+ global data centres, any time",
    "Benefit from a unified management interface and huge economies of scale",
  ],
};

export const cloudFaq = {
  heading: "Frequently asked questions",
  sub: "Do you have any questions? We have your answers.",
  items: [
    { q: "What are Managed Cloud Servers?", a: "Our Managed Cloud Servers give you the power of cloud hosting without the extra work. You don't have to manage the server, install software or keep it updated, we handle all of that, and support is on hand if you need help." },
    { q: "What level of support is provided with Managed Cloud Servers?", a: "You get full access to our NZ-based support team, praised for their speed and clarity of response. They'll help you set up the best solution and are available day and night via live chat and email." },
    { q: "Can I host several websites on Managed Cloud Servers?", a: "Yes. You can host as many sites as capacity allows, partitioning your allocated disk space across each site." },
    { q: "Do I get email with Managed Cloud Servers?", a: "Yes. You get full use of our high-end clustered mail platform, stored separately from your virtual machine, with mailboxes, auto-responders and forwarders manageable from the control panel." },
    { q: "Can I choose another operating system on Managed Cloud Servers?", a: "Managed Cloud Servers run on our bespoke control panel on CentOS 7, and no other OS can be installed. If you need a different OS, an Unmanaged VPS is the better fit." },
    { q: "Do I get SSL certificates with Managed Cloud Servers?", a: "Yes. We offer unlimited Let's Encrypt SSL certificates for any site or app you host, addable in one click from the control panel, renewing automatically every 3 months." },
  ],
};

export const cloudCta = {
  heading: "Not sure which is the best managed cloud server for you? Talk to our experts.",
  cta: { label: "Contact us", href: "/contact/" },
};

// ─── Domain page (/domain/) ───

export const domainMeta = {
  title: "Domain Registration NZ | Buy Cheap NZ & Global Domains",
  description: "Register your domain name in NZ at low, transparent yearly prices. Search .co.nz, .nz, .com, .net, .org and more. Free mailbox, DNS control, and easy domain management.",
};

export const domainHero = {
  heading: "Domain Registration",
  sub: "Search and register your perfect domain name at low, transparent yearly prices, with full DNS control and a free mailbox included.",
};

export const domainTlds = [
  { tld: ".co.nz", price: "33.00", was: "65.99" },
  { tld: ".nz", price: "33.00", was: "45.99" },
  { tld: "kiwi.nz", price: "33.00", was: "38.99" },
  { tld: "ac.nz", price: "33.00", was: "36.99" },
  { tld: ".com", price: "19.99", was: "24.90" },
  { tld: ".net", price: "22.99", was: "30.69" },
  { tld: ".org", price: "18.99", was: "22.39" },
  { tld: ".info", price: "4.99", was: "15.99" },
];

export const domainGuide = {
  heading: "Understanding domain extensions and top-level domains",
  body: "A domain extension, also called a top-level domain or TLD, is the suffix at the end of a web address, such as .co.nz, .com, or .org. Choosing the right extension matters for your brand credibility, local SEO, and how trustworthy your website appears to visitors. We offer all major TLDs so you can select the perfect extension for your online presence.",
  tip: "Register both the .co.nz and the .com variation of your business name. This prevents competitors or cybersquatters from acquiring a variation that matches your domain and confusing your customers. It's a low-cost insurance policy every serious NZ business should consider.",
  steps: [
    { title: "Choose .co.nz", body: "If your business is based in New Zealand and primarily serves a local audience. Strong local SEO signal." },
    { title: "Choose .com", body: "If you plan to operate internationally or want a globally recognised address. No geographic restriction." },
    { title: "Choose .org", body: "If you run a non-profit, charity, or community group. Trustworthy and recognised worldwide." },
    { title: "Choose .nz", body: "For a shorter, modern New Zealand domain, ideal if the .co.nz variation is taken." },
    { title: "Choose .info", body: "For a low-cost domain if you're building a blog or informational site on a tight budget." },
  ],
};

export const domainActions = {
  heading: "Register, transfer and renew your domain name",
  sub: "Webhosting.co.nz is an accredited domain registrar with full DNS control, a clean management dashboard, and transparent pricing.",
  cards: [
    { title: "Register a domain", body: "Get your domain name in minutes. Search for your new domain, select the right extension, and complete your order through our secure checkout.", perks: ["Full DNS control", "Free 10GB mailbox", "Clean dashboard", "Transparent pricing"], cta: "Register a domain" },
    { title: "Transfer your domain", body: "Moving your domain to us is straightforward. Enter your domain name, provide the authorisation (EPP) code, and we handle the rest.", perks: ["Same transparent price", "Full DNS management", "Local NZ support", "Privacy protection"], cta: "Transfer domain to us" },
    { title: "Renew your domain", body: "Never let your domain expire. Our renewal reminders notify you well in advance, and our transparent pricing means no surprise increases.", perks: ["Renewal reminders", "No surprise fees", "Bulk renewal options", "1-click renewal"], cta: "Renew your domain" },
  ],
};

export const domainConfidence = {
  heading: "Host your domain with confidence",
  sub: "Buying a domain is just the beginning. We provide everything you need to build a fast, secure website and keep it performing at its best, from free SSL to Cloudflare-powered infrastructure.",
  items: [
    { title: "Free SSL certificate", body: "HTTPS protects your visitors, secures your data, and is a confirmed Google ranking factor. Activate it in one click from your dashboard.", icon: "shield" },
    { title: "Cloudflare integration", body: "Global CDN performance, faster load times, and reliable DNS management built for scale. Better page speed means better Google rankings.", icon: "globe" },
    { title: "DDoS protection", body: "All domains and hosted websites benefit from enterprise-grade DDoS protection through Cloudflare's global network, at no extra cost.", icon: "shield" },
    { title: "Domain privacy protection", body: "When you register a domain, your details are added to the public WHOIS database by default. Our privacy protection masks your personal information with generic registrar details.", icon: "lock" },
  ],
};

export const domainEmail = {
  heading: "Professional email and business tools",
  sub: "A domain name paired with a professional email address and the right business tools builds the credibility your brand deserves.",
  mailbox: { title: "Professional email address", body: "Create a professional email address that matches your domain, for example hello@yourbusiness.co.nz. Every domain you register includes a free, full-featured 10GB mailbox you can use on any device." },
  marketing: { title: "Marketing tools add-on", body: "Extend your online presence with our suite of marketing tools, from campaign tracking to landing page tools, designed to help small and growing NZ businesses compete online." },
};

export const domainWhyUs = {
  heading: "Low-cost domains, high value features",
  sub: "Don't get caught out by deceptive first-year deals that lock you into high renewal fees.",
  items: [
    { title: "NZ-based provider", body: "We are a New Zealand-based domain registrar. Our support team is local, so you speak to someone who understands the NZ market." },
    { title: "Affordable and transparent", body: "Our pricing is clear and upfront. The price you see at checkout is the price you pay for renewal going forward." },
    { title: "Easy dashboard", body: "Manage every domain name, DNS record, SSL certificate, and email account from a single user-friendly dashboard." },
    { title: "Full DNS control", body: "Manage A records, CNAME, TXT, MX, and SRV. Our nameservers use Google's reliable global network." },
    { title: "Reliable infrastructure", body: "Powered by Cloudflare, giving every domain enterprise-grade speed, security, and DDoS protection." },
    { title: "Real support team", body: "Our friendly support team is available via live chat and email to help you get online and stay online." },
  ],
};

export const domainFaq = {
  heading: "Frequently asked questions about domain registration in New Zealand",
  items: [
    { q: "How do I register a domain name in New Zealand?", a: "Use the domain search tool to check availability for your chosen name, select your preferred extension, add it to your cart and complete secure checkout. Your domain activates instantly, with full DNS control and a free 10GB mailbox ready immediately." },
    { q: "What is the difference between .co.nz and .com?", a: "A .co.nz domain signals your business is based in New Zealand, improving local search visibility and trust with Kiwi visitors. A .com has global recognition with no geographic restriction. Most NZ businesses register both to protect their brand." },
    { q: "Can I transfer my existing domain to Webhosting.co.nz?", a: "Yes. We accept transfers from all major registrars. Enter your domain name and the authorisation (EPP) code from your current registrar, then complete checkout. Transfers typically complete within 24-48 hours with no downtime, at the same price as registration." },
    { q: "What is included with every domain registration?", a: "Every domain includes a free 10GB mailbox, full DNS control (A, CNAME, MX, TXT, SRV records), your management dashboard, transparent renewal pricing, and privacy management tools. Hosted domains also get free SSL and Cloudflare integration." },
    { q: "How much does it cost to renew a domain in New Zealand?", a: "Renewal prices match registration prices, with no promotional first-year deals that jump later. A .co.nz renews at NZ$33.00/yr, .com at NZ$19.99/yr, .org at NZ$18.99/yr, and .info at NZ$4.99/yr." },
    { q: "Do I need a New Zealand address to register a .co.nz domain name?", a: "Yes, the .nz registry requires the registrant to have a New Zealand address or a legitimate connection to New Zealand. Without one, you can register a .com, .org, .net or .info domain instead." },
  ],
};

// ─── Business Email Hosting page (/business-email-hosting/) ───

export const emailMeta = {
  title: "Business Email Hosting NZ | Secure Business Mail",
  description: "Upgrade your brand with professional business email hosting in NZ. Fast webmail, massive storage, daily backups and 99.9% uptime, from NZ$3.99/month.",
};

export const emailHero = {
  heading: "Business Email Hosting",
  sub: "A professional email address establishes instant authority and proves your business is legitimate. Fully-managed, reliable hosting built for professionals, with enterprise-grade security and guaranteed deliverability.",
};

export const emailPlans = {
  eyebrow: "Business email plans",
  heading: "Choose your mailbox size",
  items: [
    { name: "8GB mailbox", priceMonthly: "3.99", features: ["Professional inbox", "Modern webmail", "POP / IMAP / SMTP", "Anti-spam and virus protection", "Daily backups", "250 outbound emails/day"], href: "/contact/" },
    { name: "25GB mailbox", priceMonthly: "contact us", features: ["Everything in 8GB", "Expansive 25GB storage", "Ideal for large attachments and media", "Years of archived email", "250 outbound emails/day"], href: "/contact/" },
  ],
};

export const emailFeatures = {
  heading: "Core features",
  sub: "Premium features designed to streamline workflow and protect corporate data.",
  items: [
    { title: "Professional inbox", body: "Stop advertising other companies. Every message reinforces your brand identity and domain name.", icon: "mail" },
    { title: "Modern webmail", body: "Access your business mail anywhere. Our blazing-fast interface works perfectly on desktops, tablets, and smartphones.", icon: "globe" },
    { title: "POP / IMAP / SMTP", body: "Seamlessly sync your accounts across Apple Mail, Microsoft Outlook, Thunderbird, and all major mobile apps.", icon: "server" },
    { title: "Massive storage", body: "Choose our 8GB mailbox or expansive 25GB option for years of archives, heavy PDF attachments, and high-resolution media storage.", icon: "layers" },
    { title: "Anti-spam and virus", body: "Advanced AI filtering actively blocks malware, phishing attempts, and aggressive spam from reaching you.", icon: "shield" },
    { title: "Daily backups", body: "We run a 100% secure daily backup of your mail infrastructure, with rapid recovery if you accidentally delete a thread.", icon: "clock" },
  ],
};

export const emailDomain = {
  heading: "Use your domain, or buy a new one",
  body: "Our business email hosting adapts to your current setup. If you already own a domain name elsewhere, seamlessly attach it by updating DNS records. Starting fresh? Search and register a new domain for your mail during checkout. Each mailbox includes a generous allowance of 250 outbound emails per day, ensuring your invoices and newsletters are always delivered.",
};

export const emailMigration = {
  heading: "Seamless old email migration",
  body: "Terrified of losing years of historical data? Leave the heavy lifting to us. Our expert support team specialises in zero-downtime email migrations, securely transferring your existing folders and old emails from Google Workspace, Office 365, or cPanel directly into your new mailbox.",
  cta: { label: "Request a migration today", href: "/contact/" },
};

export const emailSecurity = {
  heading: "Enterprise-grade security",
  body: "We've engineered our platform from the ground up with iron-clad security protocols meeting international privacy requirements. Our GDPR-compliant servers support multi-role user management, backed by a guaranteed 99.9% SLA uptime and 24/7 technical support.",
  specs: ["DKIM authentication", "OTP protection", "IP restrictions", "256-bit SSL", "99.9% uptime SLA", "GDPR compliant"],
};

export const emailFaq = {
  heading: "Frequently asked questions",
  items: [
    { q: "What exactly is business email hosting?", a: "Business email hosting lets you operate an email address connected directly to your custom domain (e.g. info@yourcompany.co.nz) rather than a generic provider like Gmail. Our servers are optimised for deliverability, security, anti-spam protection and storage." },
    { q: "Can I use a domain name I already own?", a: "Yes, you can use this email service for a domain already registered elsewhere by updating your MX and DNS records, or buy a new domain during checkout." },
    { q: "How does the old email migration work? Will I lose my data?", a: "You won't lose any data. Our expert technical team securely copies your existing emails, folders, and attachments from your previous host directly into your new mailbox with zero downtime." },
    { q: "Is my business mail secure and backed up daily?", a: "Yes. We use DKIM authentication to help messages bypass junk filters, along with strict anti-spam and antivirus protection, plus a comprehensive daily backup of your entire mailbox." },
    { q: "Can I access my business emails on my mobile phone?", a: "Yes. We support POP, IMAP and SMTP, so you can set up your address on Apple Mail, the Android Gmail app, Outlook, Thunderbird, or our responsive webmail portal." },
    { q: "What is the exact difference between the 8GB and 25GB options?", a: "The 8GB plan (from NZ$3.99/mo) suits standard daily communication and text-based emails. The 25GB option is for power users who frequently send large attachments or need to retain large email archives." },
    { q: "Do you offer an uptime guarantee for email services?", a: "Yes. We back our email infrastructure with a strict 99.9% SLA uptime guarantee, monitored 24/7." },
  ],
};

export const emailCta = {
  heading: "Ready to upgrade? Secure, fast, and professional business email hosting starting from just NZ$3.99 per month.",
  cta: { label: "Create your custom email today", href: "/contact/" },
};

// ─── Web Design Service page (/web-design-service/) ───

export const designMeta = {
  title: "Affordable Web Design Service | With 1 Year Free Hosting",
  description: "We provide modern and clean web design services for NZ businesses, with a free year of hosting included on our most popular package.",
};

export const designHero = {
  heading: "Web Design Service",
  sub: "A modern, custom-built website designed for your business, with clean development, speed optimisation, and a free year of hosting on select packages.",
};

export const designProcess = {
  heading: "How it works",
  steps: [
    { title: "Discovery & Strategy", body: "We sit down (virtually) to understand your business goals, target audience, and competitors. No guesswork." },
    { title: "Visual Design", body: "We craft a custom mockup. You get to see exactly what your site will look like before we write a single line of code." },
    { title: "Development", body: "We build your site on WordPress using clean, lightweight code, and set up security, analytics, and speed optimisation." },
    { title: "Launch & Train", body: "We push the live button, then send you a video tutorial showing exactly how to edit your own content." },
  ],
};

export const designPlans = {
  eyebrow: "Simple pricing",
  heading: "No hidden fees. Just clear value.",
  items: [
    { name: "Starter", priceMonthly: "119", features: ["3 custom pages", "Mobile responsive", "Basic SEO"], href: "/contact/" },
    { name: "Business Pro", priceMonthly: "229", features: ["10 custom pages", "Free 1 year hosting", "Blog and news section", "Advanced SEO and speed"], href: "/contact/", featured: true },
    { name: "Enterprise", priceMonthly: "499", features: ["Unlimited pages", "Full online store", "Payment integration"], href: "/contact/" },
  ],
};

export const designCta = {
  heading: "Ready to level up? Let's discuss your project and see if we're a good fit.",
  cta: { label: "Start your project", href: "/contact/" },
};

// ─── About page (/about/) ───

export const aboutMeta = {
  title: "About Webhosting NZ | Trusted Web Hosting Company In NZ",
  description: "Learn about Webhosting NZ, your trusted New Zealand web hosting partner, providing fast, secure and reliable hosting for businesses nationwide.",
};

export const aboutHero = {
  heading: "About us",
  sub: "Webhosting NZ is dedicated to providing fast, secure, and reliable hosting solutions, helping businesses across New Zealand succeed online.",
};

export const aboutWelcome = {
  heading: "Welcome to Webhosting NZ",
  body: "Welcome to Webhosting NZ, your trusted partner for fast, secure, and reliable web hosting. We provide locally hosted servers, expert support, and high-performance solutions tailored for New Zealand businesses. From shared hosting to VPS and managed WordPress, we empower your online presence with speed, security, and efficiency.",
};

export const aboutDifferent = {
  heading: "What makes us different",
  sub: "Innovative technology, reliable performance, and customer-first service. We combine speed, security, and real human support to deliver hosting that consistently exceeds expectations.",
  items: [
    { title: "Always fast, always reliable", body: "Cloud servers powered by Webhosting NZ Cloud, AWS and Google Cloud, built for maximum speed and reliability with Redis, ElasticSearch, optimised PHP-FPM and OPCache, NGINX edge cache and unlimited CDN.", icon: "bolt" },
    { title: "Global reach", body: "Choose from over 60 data centres around the world and launch your website and apps in a matter of minutes.", icon: "globe" },
    { title: "Easy management", body: "Manage all your servers, websites, email, security, backups and domains from my.webhosting.co.nz, the most advanced and intuitive control panel around.", icon: "dashboard" },
  ],
};

export const aboutMilestones = {
  heading: "Webhosting NZ milestones",
  items: [
    { year: "2022", title: "Market research", body: "We were doing deep research of business opportunities among the competitive digital market." },
    { year: "2023", title: "Outcome of a lot of research", body: "In 2023, we began gaining deep knowledge about web hosting services, web security and development." },
    { year: "2024", title: "Start building", body: "In 2024, we started developing our own hosting services and partnered with world-famous premium hosting and domain providers." },
    { year: "2025", title: "Ready to sell", body: "In 2025, Webhosting NZ became fully ready to sell, offering complete hosting solutions and services to businesses nationwide." },
  ],
};

// ─── Contact page (/contact/) ───

export const contactMeta = {
  title: "Contact Webhosting NZ | Get In Touch With Our Support Team",
  description: "Get in touch with Webhosting NZ. Reach our NZ-based support team by phone, email, or contact form for hosting, domain, and account questions.",
};

export const contactHero = {
  heading: "Contact us",
  sub: "Have a question about hosting, domains, or your account? Our NZ-based team is here to help.",
};

export const contactMethods = [
  { title: "Phone", value: footer.contact.phone, href: `tel:${footer.contact.phone}`, icon: "headset" },
  { title: "Email", value: footer.contact.email, href: `mailto:${footer.contact.email}`, icon: "mail" },
  { title: "Address", value: footer.contact.address, href: "#", icon: "pin" },
];

export const contactForm = {
  heading: "Send us a message",
  sub: "Fill out the form and our team will get back to you as soon as possible.",
};

// ─── Blog page (/blog/) ───

export const blogMeta = {
  title: "Web Hosting Blog NZ | Tips, Guides & Hosting Insights",
  description: "Explore our web hosting blog for guides, tips, and insights on hosting, domains, WordPress, and growing your business online in New Zealand.",
};

export const blogHero = {
  heading: "Blog",
  sub: "Guides, tips, and insights on hosting, domains, and growing your business online in New Zealand.",
};

export const blogPosts = [
  { category: "Hosting Tips", date: "May 17, 2026", title: "Web Hosting and Domain Hosting: What's the Difference and Why You Need Both", excerpt: "Web hosting and domain hosting are closely related, but they are not the same service.", href: "/blog/web-hosting-and-domain-hosting/" },
  { category: "Payment gateways in New Zealand", date: "May 4, 2026", title: "Payment Gateway Integration: A Complete Guide to Payment Gateways in 2026", excerpt: "Payment gateway integration is the process of connecting your website to a secure payment system so customers can pay.", href: "/blog/payment-gateway-integration/" },
  { category: "Website hosting", date: "April 22, 2026", title: "Web Hosting New Zealand: 5 Best & Trusted NZ Plans 2026", excerpt: "Web hosting New Zealand has never been more competitive, or more important, in 2026.", href: "/blog/web-hosting-new-zealand-best-plans/" },
  { category: "Website hosting", date: "April 7, 2026", title: "Web Hosting Services Auckland: Top 5 Providers (2026)", excerpt: "5 providers worth comparing for your business if you're running a business in Auckland.", href: "/blog/web-hosting-services-auckland/" },
  { category: "Website design service", date: "March 31, 2026", title: "2026 NZ Small Business Guide: AI Web Design & Marketing", excerpt: "Mastering the 2026 NZ small business web strategy in the fast-evolving digital landscape.", href: "/blog/nz-small-business-ai-web-design/" },
  { category: "Buy a Domain NZ", date: "March 7, 2026", title: "Buy Domain Names in New Zealand | NZ Domain Registrar", excerpt: "Secure your perfect domain today, and learn how to buy a domain in New Zealand.", href: "/blog/buy-domain-names-nz/" },
];

// ─── Free Google Review QR Code Generator page (/free-google-review-qr-code-generator/) ───

export const qrMeta = {
  title: "Free Google Review QR Code Generator | WebHosting NZ",
  description: "Boost your local SEO with our free Google Review QR code generator. Create a scannable code linking straight to your Google review page.",
};

export const qrHero = {
  heading: "Free Google Review QR Code Generator",
  sub: "Create a professional, scannable QR code that takes customers straight to your Google review page, in seconds.",
};

export const qrSteps = {
  heading: "How to generate your code",
  sub: "Three simple steps to create professional review materials for your business counter or wallet.",
  items: [
    { title: "Paste your review link", body: "Copy your Google Business Profile review link (find it in your Google Business Dashboard) and paste it below." },
    { title: "Add your business name", body: "Enter your business name so it appears on the printed card." },
    { title: "Download & print", body: "Click download to receive a high-resolution PNG file ready to print at home, the office, or a professional print shop." },
  ],
};

export const qrWhy = {
  heading: "Why Google reviews matter",
  sub: "Reviews are the backbone of modern local marketing. Stop hoping customers leave a review and start actively collecting them.",
  items: [
    { title: "Boost local SEO", body: "Google Maps prioritises businesses with high review counts and positive ratings. More 5-star reviews push your business up local search results.", icon: "search" },
    { title: "Remove friction", body: "Typing out a business name and finding the review button is tedious. A scannable QR code takes your customer to the review page in a single second.", icon: "bolt" },
    { title: "Build instant trust", body: "Over 90% of consumers read local reviews before visiting. A high star rating is the ultimate social proof that your services are reliable.", icon: "shield" },
    { title: "Professional appearance", body: "Our generator ensures your review requests don't look like cheap printouts. Provide a premium experience at your cashier desk or tables.", icon: "layers" },
  ],
};

export const qrFaq = {
  heading: "Frequently asked questions",
  items: [
    { q: "Is this QR code generator completely free?", a: "Yes. WebHosting NZ provides this tool entirely for free. There are no hidden fees, subscriptions, or watermarks on your downloaded file." },
    { q: "Do these QR codes ever expire?", a: "No, your generated QR code is static and directly linked to the URL you provide. As long as your Google Business Profile remains active, the QR code will keep working." },
    { q: "How do I print the downloaded card?", a: "The tool exports your design as a high-resolution PNG file. You can print this at home, take it to a local print shop, or upload it to an online printing service." },
    { q: "Where do I find my Google review link?", a: "Open your Google Business Profile, go to 'Get more reviews', and copy the short link shown there. Paste that link into the tool above." },
  ],
};

// ─── Privacy Policy page (/privacy-policy/) ───

export const privacyMeta = {
  title: "Privacy Policy \u2013 Webhosting NZ | Data Protection & Rights",
  description: "Read the Webhosting NZ Privacy Policy. Learn how we collect, use, store, and protect your personal data under the New Zealand Privacy Act 2020.",
};

export const privacySections = [
  { heading: "Who we are", body: "Webhosting NZ (\"we\", \"our\", \"us\") provides web hosting, domains, cloud servers, and related online services in New Zealand. Our website address is https://webhosting.co.nz." },
  { heading: "Comments", body: "When visitors leave comments on our site, we collect the data submitted in the comments form, along with the visitor's IP address and browser user-agent string to help detect spam and abuse. An anonymised hash created from your email address may be provided to the Gravatar service to check if you are using it; you can review Gravatar's privacy policy at automattic.com/privacy. After approval of your comment, your profile image becomes visible to the public within the comment section." },
  { heading: "Media", body: "If you upload images to our website, please ensure images do not contain embedded location data (EXIF GPS). Visitors may download and extract location information from images posted on the site." },
  { heading: "Cookies", body: "If you leave a comment, you may opt in to save your name, email address, and website in cookies for convenience; these last one year. When you visit our login page, we create a temporary cookie to check if your browser accepts cookies, containing no personal data, deleted when you close your browser. When you log in, we set cookies to store your login details and display preferences: login cookies last two days, screen preference cookies last one year, and \"Remember Me\" extends login persistence to two weeks. Logging out removes all login cookies. If you edit or publish a post, an additional cookie storing the post ID is saved, containing no personal information, expiring after one day." },
  { heading: "Embedded content from other websites", body: "Articles on this site may include embedded materials (videos, images, articles, etc.). Embedded content behaves as if you visited the external site directly. These external websites may collect data about you, use their own cookies, embed third-party tracking, and monitor your interaction with their embedded content, especially if you are logged in to those sites." },
  { heading: "Who we share your data with", body: "If you request a password reset, your IP address may be included in the reset email for security and verification purposes. We may also share personal information with trusted third-party service providers such as payment gateways, domain registries, fraud-prevention services, and cloud infrastructure and security partners. All sharing is done in compliance with the New Zealand Privacy Act 2020, and only when necessary to deliver our services." },
  { heading: "How long we retain your data", body: "If you leave a comment, the comment and its metadata are stored indefinitely to recognise and approve future comments without moderation. For registered users, we store the personal information provided in their profile; users may view, edit, or delete their information anytime (except username), and website administrators can also view and modify this data. Billing information, invoices, and transaction records may be retained as required by New Zealand tax laws, typically 7 years." },
  { heading: "What rights you have over your data", body: "Under the New Zealand Privacy Act 2020, you have the right to request a copy of the personal information we hold about you, request correction of inaccurate or incomplete personal information, and request deletion of personal information, subject to legal, security, or administrative retention requirements. You may also request an exported file containing your personal data stored on our systems. To submit a request, please contact our support team." },
  { heading: "Where your data is sent", body: "Visitor comments may be screened through automated spam-detection systems. We may transfer your data to trusted partners located outside New Zealand, such as global cloud providers or domain registries. Where international transfers occur, we ensure the receiving party meets comparable privacy obligations under the NZ Privacy Act." },
  { heading: "Contact us", body: "If you have questions about this Privacy Policy or your personal information, you may contact us: Webhosting NZ \u2013 Privacy Officer, email support@webhosting.co.nz." },
];

// ─── Terms and Conditions page (/terms-and-conditions/) ───

export const termsMeta = {
  title: "Terms And Conditions \u2013 Webhosting NZ | Service Agreement",
  description: "Read the Webhosting NZ Terms and Conditions covering services, payments, refunds, acceptable use, domains, uptime, and liability.",
};

export const termsUpdated = "Last updated: 16-11-2025";

export const termsSections = [
  { heading: "1. Acceptance of terms", body: "By accessing or using our services, you acknowledge that you have read, understood, and accepted these Terms and Conditions. If you do not agree, you must discontinue use of our services immediately." },
  { heading: "2. Services provided", body: "Webhosting NZ provides web hosting, reseller hosting, cloud servers (AWS, GCP, Microsoft Azure, NZ servers), domain registration and DNS services, WordPress hosting and website builder solutions, and professional website setup and support. All services are subject to availability and may be updated or modified at any time." },
  { heading: "3. Customer account", body: "To access certain services, you must create an account. You agree to provide accurate and complete information, keep your login details secure, and notify us immediately of any unauthorized access. You are responsible for all activity that occurs under your account." },
  { heading: "4. Pricing and payments", body: "All prices are listed in NZD unless stated otherwise. Monthly or annual charges apply depending on the selected plan. Webhosting NZ reserves the right to update prices at any time, with prior notice given for renewals. Payments must be made through approved gateways. Failure to pay may result in suspension or termination of services, and invoices must be paid on or before the due date." },
  { heading: "5. Refund policy", body: "Domain registrations, transfers, and renewals are non-refundable. Hosting accounts may be eligible for a refund within the first 7 days if the service is unused or if a valid technical issue is proven. No refunds apply if the customer violates these Terms or acceptable use policies. Refund decisions are at the discretion of Webhosting NZ." },
  { heading: "6. Acceptable Use Policy (AUP)", body: "You agree not to use our services for hosting illegal, harmful, or copyrighted content, sending spam or unsolicited emails, running phishing, malware, proxies, or harmful scripts, overloading servers or degrading service performance, or engaging in activities that violate NZ laws. We reserve the right to suspend or terminate accounts involved in abusive or unlawful activities, without refund." },
  { heading: "7. Resource usage", body: "To protect system performance, Webhosting NZ may limit or restrict excessive CPU, RAM, bandwidth, or storage usage that impacts other users. Dedicated and cloud server plans include their own resource allocations as advertised." },
  { heading: "8. Domain names", body: "By registering a domain with us, you agree to the policies of ICANN, the domain registry, and InternetNZ (for .nz domains), to keeping your WHOIS information accurate, and to renewing domains before expiry to avoid loss. Domain renewal fees are required every year or as specified by the registry." },
  { heading: "9. Service availability (uptime)", body: "We aim to provide 99.9% uptime for hosting and cloud services. However, we cannot be held responsible for downtime caused by external network failures, scheduled maintenance, third-party provider issues (AWS, GCP, data centres), or force majeure events." },
  { heading: "10. Data security and backups", body: "We take reasonable steps to protect your data under the NZ Privacy Act 2020. However, customers are solely responsible for maintaining personal backups, and we are not liable for data loss due to software errors, user action, or external factors. Optional backup services may be available for purchase." },
  { heading: "11. Limitation of liability", body: "To the fullest extent permitted by New Zealand law, Webhosting NZ is not liable for lost profits, data loss, downtime, or indirect damages. Our total liability is limited to the amount you paid for the service during the last billing cycle. We do not guarantee the performance of third-party services or integrations." },
  { heading: "12. Termination of services", body: "We may suspend or terminate services if payments are overdue, you violate Terms or AUP policies, you misuse or abuse system resources, or illegal activity is detected. Upon termination, all data may be permanently deleted without prior notice." },
  { heading: "13. Changes to terms", body: "Webhosting NZ may update these Terms at any time. Changes will be posted on our website, and continued use of services confirms your acceptance of the updated Terms." },
  { heading: "14. Governing law", body: "These Terms are governed by the laws of New Zealand. Any disputes will be resolved in accordance with New Zealand legal processes and jurisdiction." },
  { heading: "15. Contact information", body: "For questions regarding these Terms and Conditions, please contact Webhosting NZ Support Team, email support@webhosting.co.nz." },
];
