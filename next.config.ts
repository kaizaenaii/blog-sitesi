/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Build sırasında ESLint'i devre dışı bırak
  },
  typescript: {
    ignoreBuildErrors: false, // TypeScript hatalarını kontrol et
  },
  experimental: {
    turbo: {
      // Turbopack ayarları
    }
  }
}

export default nextConfig