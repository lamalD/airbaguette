/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains:[
            'localhost', 
            'https://beneficial-strength-ca77e606b4.strapiapp.com', 
            'https://beneficial-strength-ca77e606b4.media.strapiapp.com',
        ]
    }
};

export default nextConfig;
