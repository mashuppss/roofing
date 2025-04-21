/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**', // Allow any path under this hostname
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**', // Allow any path under this hostname
      },
      // Add other allowed hostnames here if needed
    ],
    // Deprecated 'domains' option (use remotePatterns instead if possible)
    // domains: ['placehold.co', 'via.placeholder.com'],
  },
};

module.exports = nextConfig;