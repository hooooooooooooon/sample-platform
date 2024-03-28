/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "upload.wikimedia.org",
      },
      {
        hostname: "imagedelivery.net",
      },
    ],
  },
};

export default nextConfig;
