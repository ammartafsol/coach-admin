/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["storage.googleapis.com","wajba-bucket.s3.us-east-2.amazonaws.com","lh3.googleusercontent.com",]
      },
      output: "standalone",
};

export default nextConfig;
