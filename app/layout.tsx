import './globals.css';
import GlobalScripts from './GlobalScripts';
import PageTransition from './lib/PageTransition';
import FastNav from './lib/FastNav';

export const metadata = {
  metadataBase: new URL('https://webhosting.co.nz'),
  title: 'Webhosting NZ',
  description: 'Fast, secure NZ web hosting, domains, and email.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <body className="wp-singular page-template page-template-elementor_header_footer page wp-theme-hostiko theme-hostiko woocommerce-no-js elementor-default elementor-template-full-width elementor-kit-10 elementor-page">
        <GlobalScripts />
        <FastNav />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
