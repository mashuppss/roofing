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
        pathname: '/roofing', // Allow any path under this hostname
      },
      // Add other allowed hostnames here if needed
    ],
    unoptimized: true, // Disable image optimization if using next/image
  },

  // Add the output export configuration
  output: 'export',

  // Optional: Configure basePath if deploying to a subdirectory
  // basePath: '/your-repo-name', // Replace 'your-repo-name'
};

export default nextConfig;