'use client'

import { useState } from 'react'
import { Metadata } from 'next'

// İletişim formu durumları
interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function IletisimPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Form verilerini güncelleme
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Form gönderme
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccessMessage('✅ Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağım.')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        setErrorMessage('❌ Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      setErrorMessage('❌ Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigasyon */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4 md:space-x-8">
              <a href="/" className="text-xl md:text-2xl font-bold text-blue-600">
                Blog Sitemi
              </a>
              <div className="hidden lg:flex space-x-6">
                <a href="/" className="text-gray-700 hover:text-blue-600 font-medium text-sm">
                  Ana Sayfa
                </a>
                <a href="/blog" className="text-gray-700 hover:text-blue-600 font-medium text-sm">
                  Blog
                </a>
                <a href="/hakkimda" className="text-gray-700 hover:text-blue-600 font-medium text-sm">
                  Hakkımda
                </a>
                <a href="/iletisim" className="text-blue-600 font-semibold text-sm">
                  İletişim
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="hidden md:block bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                Yazı Yaz
              </button>
              <button className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Ana İçerik */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Başlık */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            📧 İletişim
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Sorularınız, önerileriniz veya işbirliği teklifleriniz için benimle iletişime geçebilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* İletişim Bilgileri */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                📍 İletişim Bilgileri
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-blue-600 text-xl">📧</span>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href="mailto:info@blogsitemi.com" className="text-blue-600 hover:text-blue-700">
                      info@blogsitemi.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-blue-600 text-xl">📱</span>
                  <div>
                    <p className="font-medium text-gray-900">Telefon</p>
                    <a href="tel:+905551234567" className="text-blue-600 hover:text-blue-700">
                      +90 555 123 45 67
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-blue-600 text-xl">📍</span>
                  <div>
                    <p className="font-medium text-gray-900">Konum</p>
                    <p className="text-gray-600">İstanbul, Türkiye</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-blue-600 text-xl">⏰</span>
                  <div>
                    <p className="font-medium text-gray-900">Yanıt Süresi</p>
                    <p className="text-gray-600">24 saat içinde</p>
                  </div>
                </div>
              </div>

              {/* Sosyal Medya */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">🌐 Sosyal Medya</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <span className="text-xl">📘</span>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <span className="text-xl">🐦</span>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <span className="text-xl">💼</span>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <span className="text-xl">📷</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* İletişim Formu */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                ✍️ Mesaj Gönder
              </h2>

              {/* Başarı/Hata Mesajları */}
              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ad Soyad */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      👤 Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      📧 Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="email@ornek.com"
                    />
                  </div>
                </div>

                {/* Konu */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    📝 Konu *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Mesajınızın konusu"
                  />
                </div>

                {/* Mesaj */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    💬 Mesaj *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                {/* Gönder Butonu */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                      loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Gönderiliyor...
                      </span>
                    ) : (
                      '🚀 Mesaj Gönder'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* SSS Bölümü */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            ❓ Sık Sorulan Sorular
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Ne kadar sürede yanıt alırım?</h3>
              <p className="text-gray-600">Genellikle 24 saat içinde tüm mesajları yanıtlarım. Acil durumlar için telefon numaramı kullanabilirsiniz.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Hangi konularda yardım edebilirsiniz?</h3>
              <p className="text-gray-600">Web geliştirme, blog yazarlığı, teknik danışmanlık ve işbirliği önerileri konularında yardım edebilirim.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Proje teklifleri kabul ediyor musunuz?</h3>
              <p className="text-gray-600">Evet! Freelance projeler ve işbirliği teklifleri için benimle iletişime geçebilirsiniz.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}