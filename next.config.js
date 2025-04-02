/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:8000', 'www.skillpay.co.uk', 'skillpay.co.uk'],
    },
  },
  // Make sure we're using the App Router
  output: 'standalone',
};

export default nextConfig;