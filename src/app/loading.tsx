export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
        
        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Yükleniyor...
        </h2>
        <p className="text-gray-500 text-sm">
          İçerik hazırlanıyor, lütfen bekleyin
        </p>
        
        {/* Loading Bar */}
        <div className="mt-6 w-48 mx-auto">
          <div className="bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}