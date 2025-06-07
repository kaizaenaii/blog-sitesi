'use client'

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animate-reverse mx-auto"></div>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Yükleniyor...
        </h2>
        <p className="text-gray-500 text-sm">
          İçerik hazırlanıyor, lütfen bekleyin
        </p>
        
        {/* Progress Dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  )
}