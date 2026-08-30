export interface PricingPlan {
  name: string;
  image: string;
  features: string[];
  monthlyPrice: string;
  annualPrice: string;
  currency: string;
  orderUrl: string;
}

export interface PricingPageData {
  label: string;
  heading: string;
  subtitle: string;
  plans: PricingPlan[];
}

const IMG = {
  advance: 'https://blog.webhosting.co.nz/wp-content/uploads/2025/11/shared-advance-img.png',
  img1: 'https://blog.webhosting.co.nz/wp-content/uploads/2025/11/shared-img1.png',
  standard: 'https://blog.webhosting.co.nz/wp-content/uploads/2024/06/shared-standard-img.png',
  premium: 'https://blog.webhosting.co.nz/wp-content/uploads/2024/06/shared-premium-img.png',
};

export const webHostingPricing: PricingPageData = {
  label: 'WEB HOSTING PLANS',
  heading: 'Choose your web hosting plan',
  subtitle: 'Simple tools, fast performance, and everything you need to run a professional website.',
  plans: [
    {
      name: 'Essentials',
      image: IMG.advance,
      features: ['1 Website', '10 GB SSD Storage', 'Unlimited Bandwidth', 'Unlimited Mailbox', 'Free SSL', '99.99% Uptime Guarantee', 'On demand Free Backups'],
      monthlyPrice: '4.49',
      annualPrice: '53.88',
      currency: 'NZ$',
      orderUrl: 'https://my.webhosting.co.nz/store/web-hosting/essentials',
    },
    {
      name: 'Growth',
      image: IMG.img1,
      features: ['5 Websites', 'Unlimited SSD Storage', 'Unlimited Bandwidth', 'Unlimited Mailbox', 'Free SSL', '99.99% Uptime Guarantee', 'On demand Free Backups'],
      monthlyPrice: '7.49',
      annualPrice: '89.88',
      currency: 'NZ$',
      orderUrl: 'https://my.webhosting.co.nz/store/web-hosting/growth',
    },
    {
      name: 'Premium',
      image: IMG.standard,
      features: ['10 Websites', 'Unlimited SSD Storage', 'Unlimited Bandwidth', 'Unlimited Mailbox', 'Free SSL', '99.99% Uptime Guarantee', 'On demand Free Backups'],
      monthlyPrice: '9.49',
      annualPrice: '113.88',
      currency: 'NZ$',
      orderUrl: 'https://my.webhosting.co.nz/store/web-hosting/premium',
    },
    {
      name: 'Elite',
      image: IMG.premium,
      features: ['Unlimited Websites', 'Unlimited SSD Storage', 'Unlimited Bandwidth', 'Unlimited Mailbox', 'Free SSL', '99.99% Uptime Guarantee', 'On demand Free Backups'],
      monthlyPrice: '14.49',
      annualPrice: '173.88',
      currency: 'NZ$',
      orderUrl: 'https://my.webhosting.co.nz/store/web-hosting/elite',
    },
  ],
};

export const wordpressHostingPricing: PricingPageData = {
  label: 'WORDPRESS HOSTING PLANS',
  heading: 'Choose your WordPress hosting plan',
  subtitle: 'Autoscaling performance and everything you need to run WordPress the right way.',
  plans: [
    {
      name: 'MWP Start',
      image: IMG.advance,
      features: ['1 Website', '30 GB SSD Storage', 'Unlimited Bandwidth', 'Unlimited Mailbox', 'Free SSL', 'Free WordPress Cloning', 'WordPress Staging Site', 'On Demand Free Backups', '99.99% Uptime Guarantee'],
      monthlyPrice: '5.99',
      annualPrice: '71.88',
      currency: 'NZ$',
      orderUrl: 'https://my.webhosting.co.nz/store/wordpress-hosting/mwp-start',
    },
    {
      name: 'MWP Plus',
      image: IMG.img1,
      features: ['3 Websites', 'Unlimited SSD Storage', 'Unlimited Bandwidth', 'Unlimited Mailbox', 'Free SSL', 'Free WordPress Cloning', 'WordPress Staging Site', 'On Demand Free Backups', '99.99% Uptime Guarantee'],
      monthlyPrice: '9.99',
      annualPrice: '119.88',
      currency: 'NZ$',
      orderUrl: 'https://my.webhosting.co.nz/store/wordpress-hosting/mwp-plus',
    },
    {
      name: 'MWP Pro',
      image: IMG.standard,
      features: ['10 Websites', 'Unlimited SSD Storage', 'Unlimited Bandwidth', 'Unlimited Mailbox', 'Free SSL', 'Free WordPress Cloning', 'WordPress Staging Site', 'On Demand Free Backups', '99.99% Uptime Guarantee'],
      monthlyPrice: '14.99',
      annualPrice: '179.88',
      currency: 'NZ$',
      orderUrl: 'https://my.webhosting.co.nz/store/wordpress-hosting/mwp-pro',
    },
    {
      name: 'MWP Ultra',
      image: IMG.premium,
      features: ['Unlimited Websites', 'Unlimited SSD Storage', 'Unlimited Bandwidth', 'Unlimited Mailbox', 'Free SSL', 'Free WordPress Cloning', 'WordPress Staging Site', 'On Demand Free Backups', '99.99% Uptime Guarantee'],
      monthlyPrice: '19.99',
      annualPrice: '239.88',
      currency: 'NZ$',
      orderUrl: 'https://my.webhosting.co.nz/store/wordpress-hosting/mwp-ultra',
    },
  ],
};

export const websiteBuilderPricing: PricingPageData = {
  label: 'BUILDER HOSTING PLANS',
  heading: 'Choose your web builder hosting plan',
  subtitle: 'Simple tools, fast performance, and everything you need to create a professional website.',
  plans: [
    {
      name: 'Builder Basic',
      image: IMG.advance,
      features: ['1 Website', '10 GB SSD Storage', 'Unlimited Bandwidth', 'Unlimited Mailbox', 'Free SSL', '99.99% Uptime Guarantee', 'On demand Free Backups'],
      monthlyPrice: '3.49',
      annualPrice: '41.88',
      currency: 'NZ$',
      orderUrl: 'https://my.webhosting.co.nz/store/website-builder/builder-basic',
    },
    {
      name: 'Builder Standard',
      image: IMG.img1,
      features: ['5 Websites', 'Unlimited SSD Storage', 'Unlimited Bandwidth', 'Unlimited Mailbox', 'Free SSL', '99.99% Uptime Guarantee', 'On demand Free Backups'],
      monthlyPrice: '6.49',
      annualPrice: '77.88',
      currency: 'NZ$',
      orderUrl: 'https://my.webhosting.co.nz/store/website-builder/builder-standard',
    },
    {
      name: 'Builder Premium',
      image: IMG.standard,
      features: ['10 Websites', 'Unlimited SSD Storage', 'Unlimited Bandwidth', 'Unlimited Mailbox', 'Free SSL', '99.99% Uptime Guarantee', 'On demand Free Backups'],
      monthlyPrice: '9.49',
      annualPrice: '113.88',
      currency: 'NZ$',
      orderUrl: 'https://my.webhosting.co.nz/store/website-builder/builder-premium',
    },
    {
      name: 'Builder Pro',
      image: IMG.premium,
      features: ['Unlimited Websites', 'Unlimited SSD Storage', 'Unlimited Bandwidth', 'Unlimited Mailbox', 'Free SSL', '99.99% Uptime Guarantee', 'On demand Free Backups'],
      monthlyPrice: '14.49',
      annualPrice: '173.88',
      currency: 'NZ$',
      orderUrl: 'https://my.webhosting.co.nz/store/website-builder/builder-pro',
    },
  ],
};
