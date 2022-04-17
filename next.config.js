/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/users/:id',
        destination: 'http://localhost:9001/users/:id',
      },
    ];
  },
};

module.exports = nextConfig;
