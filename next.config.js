/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/singIn",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
