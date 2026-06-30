import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(process.cwd(), '../../'),
  transpilePackages: ['@repo/ui'],
}

export default nextConfig
