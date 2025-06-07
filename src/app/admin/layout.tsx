'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Auth durumunu kontrol et
    const authStatus = localStorage.getItem('blog_admin_auth')
    const isLoggedIn = authStatus === 'true'
    
    setIsAuthenticated(isLoggedIn)
    setLoading(false)

    // Eğer login sayfasında değilse ve giriş yapmamışsa login'e yönlendir
    if (!isLoggedIn && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [router, pathname])

  const handleLogout = () => {
    localStorage.removeItem('blog_admin_auth')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Kimlik doğrulanıyor...</p>
        </div>
      </div>
    )
  }

  // Login sayfasında layout uygulanmasın
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Giriş yapmamışsa login'e yönlendir
  if (!isAuthenticated) {
    return null
  }

  return (
    <div>
      {/* Logout butonu ekleyebilirsiniz */}
      <div className="hidden">
        <button onClick={handleLogout} className="text-red-600">
          🚪 Çıkış Yap
        </button>
      </div>
      {children}
    </div>
  )
}