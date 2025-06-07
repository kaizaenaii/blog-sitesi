'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Sayfa hatası:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="max-w-md mx-auto">
          {/* Hata Emojisi */}
          <div className="text-6xl mb-4">
            💥
          </div>
          
          {/* Başlık */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Bir Hata Oluştu!
          </h1>
          
          {/* Açıklama */}
          <p className="text-gray-600 mb-6 text-lg">
            Üzgünüz, beklenmedik bir hata oluştu. Lütfen sayfayı yenilemeyi deneyin.
          </p>
          
          {/* Butonlar */}
          <div className="space-y-4">
            <button
              onClick={() => reset()}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              🔄 Yeniden Dene
            </button>
            <br />
            <Link 
              href="/"
              className="inline-block text-blue-600 hover:text-blue-700 font-medium"
            >
              🏠 Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}