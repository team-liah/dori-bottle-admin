/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["antd"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BASE_API_URL || "https://api.doribottle-id.co.kr"}/admin/api/:path*`,
      },
    ];
  },
  images: {
    domains: ["doribottle-asset.s3.ap-northeast-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
