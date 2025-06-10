/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_ACTIONS || false;
const repoName = 'Banjara0.2'; // Your repo name

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: isGithubPages ? `/${repoName}` : '',
  assetPrefix: isGithubPages ? `/${repoName}/` : '',
  images: {
    unoptimized: true,
  },
  experimental: {
    // Disable features that might be causing issues
    serverComponentsExternalPackages: [],
    optimizeCss: false,
    scrollRestoration: false,
    // Disable RSC data fetching for static exports
    appDir: true,
    serverActions: false,
  },
  // Increase the timeout for file operations
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
  // Disable source maps in development to reduce file operations
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.devtool = 'eval';
    }
    
    // Handle "browser is not defined" errors
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;