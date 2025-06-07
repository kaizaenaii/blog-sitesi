'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

// Supabase bağlantısı
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Yazı tipini tanımlayalım
interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  created_at: string
  published: boolean
}

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [pageViews, setPageViews] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Çıkış yapma fonksiyonu
  const handleLogout = () => {
    localStorage.removeItem('blog_admin_auth')
    router.push('/admin/login')
  }

  // Tüm yazıları çeken fonksiyon
  const getAllPosts = async (): Promise<Post[]> => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Yazılar çekme hatası:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Bağlantı hatası:', error)
      return []
    }
  }

  // Sayfa görüntüleme sayılarını çeken fonksiyon
  const getPageViews = async (): Promise<Record<string, number>> => {
    try {
      const { data, error } = await supabase
        .from('page_views')
        .select('post_slug')

      if (error) {
        console.error('Analytics çekme hatası:', error)
        return {}
      }

      // Her slug için sayım yap
      const viewCounts: Record<string, number> = {}
      data?.forEach((view) => {
        viewCounts[view.post_slug] = (viewCounts[view.post_slug] || 0) + 1
      })

      return viewCounts
    } catch (error) {
      console.error('Analytics bağlantı hatası:', error)
      return {}
    }
  }

  // Sayfa yüklendiğinde verileri çek
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const postsData = await getAllPosts()
      const viewsData = await getPageViews()
      
      setPosts(postsData)
      setPageViews(viewsData)
      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Veriler yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header - Çıkış Butonu Eklendi */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                📊 Admin Panel
              </h1>
              <a 
                href="/" 
                className="text-blue-600 hover:text-blue-700 text-sm"
                target="_blank"
              >
                🌐 Siteyi Görüntüle
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <a 
                href="/admin/yeni-yazi" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium text-sm"
              >
                ✍️ Yeni Yazı
              </a>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium text-sm"
              >
                🚪 Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* İstatistikler */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
                <span className="text-xl md:text-2xl">📝</span>
              </div>
              <div className="ml-3 md:ml-4">
                <p className="text-xs md:text-sm font-medium text-gray-600">Toplam Yazı</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">{posts.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 md:p-3 bg-green-100 rounded-lg">
                <span className="text-xl md:text-2xl">✅</span>
              </div>
              <div className="ml-3 md:ml-4">
                <p className="text-xs md:text-sm font-medium text-gray-600">Yayınlanan</p>
                <p className="text-xl md:text-2xl font-bold text-green-600">
                  {posts.filter(post => post.published).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 md:p-3 bg-yellow-100 rounded-lg">
                <span className="text-xl md:text-2xl">⏳</span>
              </div>
              <div className="ml-3 md:ml-4">
                <p className="text-xs md:text-sm font-medium text-gray-600">Taslak</p>
                <p className="text-xl md:text-2xl font-bold text-yellow-600">
                  {posts.filter(post => !post.published).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 md:p-3 bg-purple-100 rounded-lg">
                <span className="text-xl md:text-2xl">👁️</span>
              </div>
              <div className="ml-3 md:ml-4">
                <p className="text-xs md:text-sm font-medium text-gray-600">Toplam Görüntülenme</p>
                <p className="text-xl md:text-2xl font-bold text-purple-600">
                  {Object.values(pageViews).reduce((a, b) => a + b, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Yazı Listesi */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-4 md:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              📚 Blog Yazıları
            </h2>
          </div>
          
          {posts.length === 0 ? (
            <div className="p-8 md:p-12 text-center">
              <span className="text-4xl md:text-6xl mb-4 block">📝</span>
              <p className="text-gray-500 text-lg mb-4">Henüz yazı bulunmuyor.</p>
              <a 
                href="/admin/yeni-yazi" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                İlk Yazınızı Oluşturun
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Başlık
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Görüntülenme
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarih
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-4 md:px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {post.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            /{post.slug}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className={`inline-flex px-2 md:px-3 py-1 text-xs font-semibold rounded-full ${
                          post.published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.published ? '✅ Yayında' : '⏳ Taslak'}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                        👁️ {pageViews[post.slug] || 0}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm font-medium">
                        <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-3">
                          <a 
                            href={`/blog/${post.slug}`} 
                            className="text-blue-600 hover:text-blue-700 text-xs md:text-sm"
                            target="_blank"
                          >
                            👁️ Görüntüle
                          </a>
                          <a 
                            href={`/admin/duzenle/${post.id}`} 
                            className="text-indigo-600 hover:text-indigo-700 text-xs md:text-sm"
                          >
                            ✏️ Düzenle
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Hızlı İşlemler */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🚀 Hızlı İşlemler
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="/admin/yeni-yazi" 
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors"
            >
              <span className="block text-2xl mb-2">✍️</span>
              <span className="text-sm font-medium">Yeni Yazı Yaz</span>
            </a>
            <a 
              href="/" 
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors"
              target="_blank"
            >
              <span className="block text-2xl mb-2">🌐</span>
              <span className="text-sm font-medium">Siteyi Görüntüle</span>
            </a>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
              <span className="block text-2xl mb-2">📊</span>
              <span className="text-sm font-medium">Analytics Aktif!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}