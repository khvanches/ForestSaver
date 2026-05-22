/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true"

const nextConfig = {
  output: isGithubPages ? "export" : "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
