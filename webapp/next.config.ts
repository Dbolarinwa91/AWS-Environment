/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
 
  
  // Add headers to allow loading Spline scripts
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://unpkg.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://prod.spline.design https://unpkg.com; img-src 'self' blob: data:; worker-src 'self' blob:; frame-src 'self'"
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;