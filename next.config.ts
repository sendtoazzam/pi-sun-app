import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'http://192.168.100.6', // or whatever the origin is
  ],
};

export default nextConfig;
