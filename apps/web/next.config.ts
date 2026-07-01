import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(process.cwd(), '../../'),
  transpilePackages: ['@repo/ui'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
  },
}

export default nextConfig
