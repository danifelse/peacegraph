/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://peacegraph.vercel.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
