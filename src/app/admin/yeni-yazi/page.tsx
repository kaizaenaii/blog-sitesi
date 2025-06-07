'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// Supabase bağlantısı
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default function YeniYaziPage() {
  const [baslik, setBaslik] = useState('')
  const [slug, setSlug] = useState('')
  const [ozet, setOzet] = useState('')
  const [icerik, setIcerik] = useState('')
  const [yayinlansin, setYayinlansin] = useState(false)
  const [yukleniyor, setYukleniyor] = useState(false)
  const [mesaj, setMesaj] = useState('')

  // Başlıktan otomatik slug oluşturma
  const baslikDegisti = (yeniBaslik: string) => {
    setBaslik(yeniBaslik)
    
    // Türkçe karakterleri değiştir ve slug oluştur
    const yeniSlug = yeniBaslik
      .toLowerCase()
      .replace(/ş/g, 's')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    
    setSlug(yeniSlug)
  }

  // Yazıyı kaydetme fonksiyonu
  const yaziKaydet = async (e: React.FormEvent) => {
    e.preventDefault()
    setYukleniyor(true)
    setMesaj('')

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            title: baslik,
            slug: slug,
            excerpt: ozet,
            content: icerik,
            published: yayinlansin
          }
        ])

      if (error) {
        setMesaj('❌ Hata: ' + error.message)
      } else {
        setMesaj('✅ Yazı başarıyla kaydedildi!')
        // Formu temizle
        setBaslik('')
        setSlug('')
        setOzet('')
        setIcerik('')
        setYayinlansin(false)
      }
    } catch (error) {
      setMesaj('❌ Bağlantı hatası: ' + error)
    } finally {
      setYukleniyor(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <a 
              href="/admin" 
              className="text-blue-600 hover:text-blue-700"
            >
              ← Admin Panel
            </a>
            <h1 className="text-2xl font-bold text-gray-900">
              ✍️ Yeni Yazı Ekle
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Mesaj */}
        {mesaj && (
          <div className={`mb-6 p-4 rounded-lg ${
            mesaj.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {mesaj}
          </div>
        )}

        {/* Form */}
        <form onSubmit={yaziKaydet} className="bg-white rounded-lg shadow-sm p-6">
          {/* Başlık */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📝 Yazı Başlığı *
            </label>
            <input
              type="text"
              value={baslik}
              onChange={(e) => baslikDegisti(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Yazınızın başlığını girin..."
              required
            />
          </div>

          {/* Slug */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔗 URL Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="url-slug"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Yazının URL'inde görünecek kısım: /blog/{slug}
            </p>
          </div>

          {/* Özet */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📄 Yazı Özeti *
            </label>
            <textarea
              value={ozet}
              onChange={(e) => setOzet(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Yazınızın kısa özeti..."
              required
            />
          </div>

          {/* İçerik */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📖 Yazı İçeriği *
            </label>
            <textarea
              value={icerik}
              onChange={(e) => setIcerik(e.target.value)}
              rows={15}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Yazınızın tam içeriğini buraya yazın..."
              required
            />
          </div>

          {/* Yayınlama Seçeneği */}
          <div className="mb-8">
            <div className="flex items-center">
              <input
                id="yayinla"
                type="checkbox"
                checked={yayinlansin}
                onChange={(e) => setYayinlansin(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="yayinla" className="ml-2 block text-sm text-gray-900">
                🌐 Yazıyı hemen yayınla (işaretlenmezse taslak olarak kaydedilir)
              </label>
            </div>
          </div>

          {/* Butonlar */}
          <div className="flex justify-between items-center">
            <a 
              href="/admin" 
              className="text-gray-600 hover:text-gray-800"
            >
              ← İptal
            </a>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={yukleniyor}
                className={`px-6 py-3 rounded-lg font-medium ${
                  yukleniyor
                    ? 'bg-gray-400 cursor-not-allowed'
                    : yayinlansin
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {yukleniyor ? (
                  '⏳ Kaydediliyor...'
                ) : yayinlansin ? (
                  '🚀 Yayınla'
                ) : (
                  '💾 Taslak Kaydet'
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Yardım */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            💡 İpuçları
          </h3>
          <ul className="text-blue-800 space-y-2">
            <li>• Başlığı yazdığınızda URL slug'ı otomatik oluşturulur</li>
            <li>• Özet kısmı ana sayfada görünecek</li>
            <li>• Taslak olarak kaydedip sonra yayınlayabilirsiniz</li>
            <li>• İçerikte satır başları korunur</li>
          </ul>
        </div>
      </div>
    </div>
  );
}