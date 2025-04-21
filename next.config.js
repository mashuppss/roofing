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

  // Add the output export configuration
  output: 'export',

  // Optional: Configure basePath if deploying to a subdirectory
  // basePath: '/your-repo-name', // Replace 'your-repo-name'

  // Optional: Disable image optimization if using next/image
  // images: {
  //   unoptimized: true,
  // },
};

export default nextConfig;