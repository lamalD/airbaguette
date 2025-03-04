/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains:[
            'localhost', 
            'beneficial-strength-ca77e606b4.strapiapp.com', 
            'beneficial-strength-ca77e606b4.media.strapiapp.com',
        ],
        remotePatterns: [
            {
              protocol: "https",
              hostname: "beneficial-strength-ca77e606b4.strapiapp.com",
            },
            {
                protocol: "https",
                hostname: "beneficial-strength-ca77e606b4.media.strapiapp.com",
              },
          ],
    }
};

export default nextConfig;
