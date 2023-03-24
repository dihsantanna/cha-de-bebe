/** @type {import('next').NextConfig} */
const nextConfig = {
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
