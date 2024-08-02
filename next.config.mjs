/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/webp', 'image/avif'],
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: "5000"
          },
        ]
      }
};

export default nextConfig;
