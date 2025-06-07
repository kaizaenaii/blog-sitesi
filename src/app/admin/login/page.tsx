'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Basit şifre kontrolü
    if (password === 'admin123') {
      // LocalStorage'a auth durumunu kaydet
      localStorage.setItem('blog_admin_auth', 'true')
      router.push('/admin')
    } else {
      setError('Yanlış şifre! Doğru şifre: admin123')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🔒 Admin Girişi
            </h1>
            <p className="text-gray-600">
              Admin paneline erişim için şifrenizi girin
            </p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Şifresi
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Şifrenizi girin..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {loading ? '🔄 Giriş yapılıyor...' : '🚀 Giriş Yap'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-700 text-sm">
              ← Ana Sayfaya Dön
            </a>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
            <p className="text-yellow-800 text-sm">
              💡 <strong>Test Şifresi:</strong> admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}