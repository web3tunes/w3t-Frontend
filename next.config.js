/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    styledComponents: true,
    images: {
        domains: ['localhost', 'lh3.googleusercontent.com', 'server.web3tunes.co'],
    },
};

module.exports = nextConfig;
