'use client'

import Link from 'next/link'

export default function NotFound() {
  const goBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="max-w-md mx-auto">
          {/* 404 Numarası */}
          <div className="text-6xl md:text-9xl font-bold text-blue-600 mb-4 animate-pulse">
            404
          </div>
          
          {/* Emoji */}
          <div className="text-4xl md:text-6xl mb-4">
            😵‍💫
          </div>
          
          {/* Başlık */}
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Sayfa Bulunamadı
          </h1>
          
          {/* Açıklama */}
          <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
            Aradığınız sayfa mevcut değil, taşınmış veya silinmiş olabilir. 
            Ana sayfadan devam edebilirsiniz.
          </p>
          
          {/* Butonlar */}
          <div className="space-y-4">
            <Link 
              href="/"
              className="inline-block bg-blue-600 text-white px-6 md:px-8 py-3 rounded-lg hover:bg-blue-700 font-medium text-sm md:text-base transition-colors"
            >
              🏠 Ana Sayfaya Dön
            </Link>
            <br />
            <Link 
              href="/admin"
              className="inline-block text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base"
            >
              📊 Admin Paneli
            </Link>
          </div>
          
          {/* Yardımcı Linkler */}
          <div className="mt-8 p-4 md:p-6 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">
              🔍 Aradığınızı bulamadınız mı?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <Link 
                href="/"
                className="flex items-center text-gray-600 hover:text-blue-600 p-2 rounded hover:bg-gray-50"
              >
                📰 Son Yazılar
              </Link>
              <Link 
                href="/hakkimda"
                className="flex items-center text-gray-600 hover:text-blue-600 p-2 rounded hover:bg-gray-50"
              >
                👨‍💻 Hakkımda
              </Link>
              <Link 
                href="/iletisim"
                className="flex items-center text-gray-600 hover:text-blue-600 p-2 rounded hover:bg-gray-50"
              >
                📧 İletişim
              </Link>
              <button 
                onClick={goBack}
                className="flex items-center text-gray-600 hover:text-blue-600 p-2 rounded hover:bg-gray-50 text-left"
              >
                ← Geri Git
              </button>
            </div>
          </div>
          
          {/* İstatistik */}
          <div className="mt-6 text-xs md:text-sm text-gray-500">
            Hata Kodu: 404 | Sayfa bulunamadı
          </div>
        </div>
      </div>
    </div>
  )
}