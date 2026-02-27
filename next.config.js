/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    // Set basePath to repository name if not on a custom domain
    basePath: "/registro-museografico-digita",
};

module.exports = nextConfig;
