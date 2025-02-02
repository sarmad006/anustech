/** @type {import('next').NextConfig} */
const nextConfig = {
output: "standalone",
reactStrictMode: true,
typescript: {
    ignoreBuildErrors: true
},
eslint: {
    ignoreDuringBuilds: true
},
images: {
    formats: ['image/webp'],
    remotePatterns: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
};

export default nextConfig;
