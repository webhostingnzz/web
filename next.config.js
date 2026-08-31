/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
  // Force www.webhosting.co.nz to permanently redirect to the non-www
  // version. Without this, both addresses serve identical content, which
  // Google can treat as duplicate pages splitting your ranking signals
  // instead of counting them as one.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.webhosting.co.nz' }],
        destination: 'https://webhosting.co.nz/:path*',
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
