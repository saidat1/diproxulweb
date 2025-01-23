import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns:[
      {
        protocol:"https",
        hostname: "**",
        
      }
    ] // Add your external image domains here
  },
}

export default nextConfig
