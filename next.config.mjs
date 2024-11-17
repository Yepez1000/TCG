/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/webp', 'image/avif'], // Enable WebP and AVIF formats
        domains: [
            'i.imgur.com',         // Imgur
            'localhost',           // Localhost for local development
            'lh3.googleusercontent.com', // Google user profile images
        ],
    },
};

export default nextConfig;