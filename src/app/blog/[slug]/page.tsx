'use client'

import { useState, useEffect, use } from 'react'
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'

// Supabase bağlantısı
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Post tipini tanımlayalım
interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  created_at: string
  published: boolean
}

// Sayfa parametreleri tipi
interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default function BlogPost({ params }: PageProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Params'ı unwrap et
  const resolvedParams = use(params)

  // Yazıyı çeken fonksiyon
  const getPost = async (slug: string): Promise<Post | null> => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (error) {
        console.error('Yazı çekme hatası:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Bağlantı hatası:', error)
      return null
    }
  }

  // Analytics tracking fonksiyonu
  const trackPageView = async (slug: string) => {
    try {
      const visitorIP = 'visitor-' + Date.now() + Math.random()
      
      await supabase
        .from('page_views')
        .insert([
          {
            post_slug: slug,
            visitor_ip: visitorIP
          }
        ])
      
      console.log('📊 Sayfa görüntüleme kaydedildi:', slug)
    } catch (error) {
      console.error('Analytics kayıt hatası:', error)
    }
  }

  // Sayfa yüklendiğinde çalışacak
  useEffect(() => {
    const loadPost = async () => {
      const postData = await getPost(resolvedParams.slug)
      setPost(postData)
      setLoading(false)

      // Eğer yazı bulunursa analytics kaydet ve SEO güncellemesi yap
      if (postData) {
        trackPageView(postData.slug)
        
        // Dinamik title güncelleme
        document.title = `${postData.title} | Blog Sitemi`
        
        // Meta description güncelleme
        const metaDesc = document.querySelector('meta[name="description"]')
        if (metaDesc) {
          metaDesc.setAttribute('content', postData.excerpt)
        }

        // Open Graph meta güncelleme
        const ogTitle = document.querySelector('meta[property="og:title"]')
        if (ogTitle) {
          ogTitle.setAttribute('content', postData.title)
        }

        const ogDesc = document.querySelector('meta[property="og:description"]')
        if (ogDesc) {
          ogDesc.setAttribute('content', postData.excerpt)
        }
      }
    }

    loadPost()
  }, [resolvedParams.slug])

  // Yükleniyor durumu
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yazı yükleniyor...</p>
        </div>
      </div>
    )
  }

  // Yazı bulunamazsa 404
  if (!post) {
    notFound()
  }

  // Structured Data için JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": "https://blog-sitemi.com/og-article.jpg",
    "author": {
      "@type": "Person",
      "name": "Blog Sitemi",
      "url": "https://blog-sitemi.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Blog Sitemi",
      "logo": {
        "@type": "ImageObject",
        "url": "https://blog-sitemi.com/logo.png"
      }
    },
    "datePublished": post.created_at,
    "dateModified": post.created_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://blog-sitemi.com/blog/${post.slug}`
    }
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
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
                  <a href="/iletisim" className="text-gray-700 hover:text-blue-600 font-medium text-sm">
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

        {/* Blog Yazısı İçeriği */}
        <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="mb-6 md:mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <a href="/" className="hover:text-blue-600">Ana Sayfa</a>
              </li>
              <li>/</li>
              <li>
                <a href="/blog" className="hover:text-blue-600">Blog</a>
              </li>
              <li>/</li>
              <li className="text-gray-900 truncate max-w-xs">{post.title}</li>
            </ol>
          </nav>

          {/* Geri Dön Linki */}
          <a href="/" className="text-blue-600 hover:text-blue-700 mb-6 md:mb-8 inline-block text-sm md:text-base">
            ← Ana Sayfaya Dön
          </a>

          {/* Yazı Başlığı */}
          <header className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-gray-600 space-x-2 md:space-x-4 text-sm md:text-base">
              <span>📅 {new Date(post.created_at).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
              <span className="hidden md:inline">•</span>
              <span>⏱️ 5 dakika okuma</span>
              <span className="hidden md:inline">•</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs md:text-sm">
                Kişisel
              </span>
            </div>
          </header>

          {/* Yazı Görseli */}
          <div className="mb-6 md:mb-8">
            <div className="h-48 md:h-64 lg:h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg"></div>
          </div>

          {/* Yazı Özeti */}
          <div className="mb-6 md:mb-8">
            <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Yazı İçeriği */}
          <div className="prose prose-sm md:prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-base md:text-lg">
              {post.content}
            </div>
          </div>

          {/* Yazı Sonu */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div>
                <p className="text-gray-600 text-sm md:text-base">Bu yazıyı beğendiyseniz paylaşmayı unutmayın!</p>
              </div>
              <div className="flex space-x-3 md:space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm md:text-base">
                  👍 Beğen
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm md:text-base">
                  📤 Paylaş
                </button>
              </div>
            </div>
          </div>

          {/* İlgili Yazılar */}
          <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-200">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
              📚 Diğer Yazılar
            </h3>
            <div className="text-center">
              <a 
                href="/" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium text-sm md:text-base"
              >
                Tüm Yazıları Görüntüle
              </a>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}