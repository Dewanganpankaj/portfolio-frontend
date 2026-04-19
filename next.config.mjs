/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization for external domains if needed
  images: {
    domains: ['avatars.githubusercontent.com', 'github.com'],
  },
};

export default nextConfig;
