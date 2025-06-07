import { createClient } from '@supabase/supabase-js'
import { Metadata } from 'next'

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

// Ana sayfa SEO metadata
export const metadata: Metadata = {
  title: 'Ana Sayfa',
  description: 'Blog Sitemi ana sayfası. En son yazılar, teknoloji, kişisel gelişim ve deneyimler hakkında içerikler.',
  keywords: ['blog', 'ana sayfa', 'teknoloji', 'kişisel gelişim', 'son yazılar', 'türkçe blog'],
  openGraph: {
    title: 'Blog Sitemi - En Son Yazılar',
    description: 'Teknoloji, kişisel gelişim ve yaşam deneyimleri hakkında en güncel yazılar.',
    url: 'https://blog-sitemi.com',
    type: 'website',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Sitemi Ana Sayfa',
      },
    ],
  },
  twitter: {
    title: 'Blog Sitemi - En Son Yazılar',
    description: 'Teknoloji, kişisel gelişim ve yaşam deneyimleri hakkında en güncel yazılar.',
    card: 'summary_large_image',
  },
  alternates: {
    canonical: '/',
  },
}

// Veritabanından blog yazılarını çeken fonksiyon
async function getBlogPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3)

    if (error) {
      console.error('Veri çekme hatası:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Bağlantı hatası:', error)
    return []
  }
}

export default async function Home() {
  const posts = await getBlogPosts()

  // Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Blog Sitemi",
    "description": "Teknoloji, kişisel gelişim ve yaşam deneyimleri hakkında yazılar",
    "url": "https://blog-sitemi.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://blog-sitemi.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "author": {
      "@type": "Person",
      "name": "Blog Sitemi"
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
        {/* Navigasyon - Mobil Dostu */}
        <nav className="bg-white shadow-md" role="navigation" aria-label="Ana navigasyon">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4 md:space-x-8">
                <h1 className="text-xl md:text-2xl font-bold text-blue-600">
                  <a href="/" aria-label="Blog Sitemi Ana Sayfa">
                    Blog Sitemi
                  </a>
                </h1>
                {/* Masaüstü Menü */}
                <div className="hidden lg:flex space-x-6">
                  <a 
                    href="/" 
                    className="text-gray-700 hover:text-blue-600 font-medium text-sm focus-visible:focus"
                    aria-current="page"
                  >
                    Ana Sayfa
                  </a>
                  <a 
                    href="/blog" 
                    className="text-gray-700 hover:text-blue-600 font-medium text-sm focus-visible:focus"
                  >
                    Blog
                  </a>
                  <a 
                    href="/hakkimda" 
                    className="text-gray-700 hover:text-blue-600 font-medium text-sm focus-visible:focus"
                  >
                    Hakkımda
                  </a>
                  <a 
                    href="/iletisim" 
                    className="text-gray-700 hover:text-blue-600 font-medium text-sm focus-visible:focus"
                  >
                    İletişim
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className="hidden md:block bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-blue-700 text-sm focus-visible:focus"
                  aria-label="Yeni yazı yaz"
                >
                  Yazı Yaz
                </button>
                {/* Mobil Menü Butonu */}
                <button 
                  className="lg:hidden p-2 text-gray-600 hover:text-gray-900 focus-visible:focus"
                  aria-label="Menüyü aç"
                  aria-expanded="false"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Mobil Menü (Gizli, gelecekte JavaScript ile açılabilir) */}
            <div className="lg:hidden border-t border-gray-200 py-4 hidden" id="mobile-menu">
              <div className="flex flex-col space-y-3">
                <a href="/" className="text-gray-700 hover:text-blue-600 font-medium py-2 focus-visible:focus">
                  📱 Ana Sayfa
                </a>
                <a href="/blog" className="text-gray-700 hover:text-blue-600 font-medium py-2 focus-visible:focus">
                  📝 Blog
                </a>
                <a href="/hakkimda" className="text-gray-700 hover:text-blue-600 font-medium py-2 focus-visible:focus">
                  👨‍💻 Hakkımda
                </a>
                <a href="/iletisim" className="text-gray-700 hover:text-blue-600 font-medium py-2 focus-visible:focus">
                  📧 İletişim
                </a>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm mt-2 focus-visible:focus">
                  ✍️ Yazı Yaz
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Bölümü - Mobil Optimized */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 md:py-20" aria-labelledby="hero-heading">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 id="hero-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              Hoş Geldiniz!
            </h2>
            <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90 leading-relaxed">
              Düşüncelerimi, deneyimlerimi ve öğrendiklerimi paylaştığım kişisel blogum
            </p>
            <button 
              className="bg-white text-blue-600 px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 text-sm md:text-base focus-visible:focus transition-colors"
              aria-label="Blog yazılarını keşfet"
            >
              📚 Yazıları Keşfet
            </button>
          </div>
        </section>

        {/* Blog Yazıları - Mobil Responsive Grid */}
        <main className="max-w-6xl mx-auto px-4 py-8 md:py-12" role="main">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              📰 Son Yazılar
            </h3>
            <a 
              href="/blog" 
              className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base focus-visible:focus"
              aria-label="Tüm blog yazılarını görüntüle"
            >
              Tümünü Gör →
            </a>
          </div>
          
          {posts.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <span className="text-4xl md:text-6xl mb-4 block" aria-hidden="true">📝</span>
              <p className="text-gray-500 text-base md:text-lg">
                Henüz blog yazısı bulunmuyor veya veriler yüklenemiyor.
              </p>
              <div className="mt-4">
                <div className="skeleton h-8 w-48 mx-auto rounded"></div>
              </div>
            </div>
          ) : (
            <div 
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
              role="region"
              aria-label="Blog yazıları listesi"
            >
              {posts.map((post: Post, index: number) => {
                const gradients = [
                  'from-blue-400 to-purple-500',
                  'from-green-400 to-blue-500', 
                  'from-purple-400 to-pink-500'
                ]
                
                return (
                  <article 
                    key={post.id} 
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    itemScope 
                    itemType="https://schema.org/BlogPosting"
                  >
                    <div 
                      className={`h-32 md:h-48 bg-gradient-to-r ${gradients[index % 3]} aspect-ratio-16-9`}
                      role="img"
                      aria-label={`${post.title} yazısının kapak görseli`}
                    ></div>
                    <div className="p-4 md:p-6">
                      <h4 
                        className="text-lg md:text-xl font-semibold mb-2 text-gray-900 line-clamp-2"
                        itemProp="headline"
                      >
                        <a 
                          href={`/blog/${post.slug}`}
                          className="hover:text-blue-600 focus-visible:focus"
                          aria-label={`${post.title} yazısını oku`}
                        >
                          {post.title}
                        </a>
                      </h4>
                      <p 
                        className="text-gray-600 mb-4 text-sm md:text-base line-clamp-3"
                        itemProp="description"
                      >
                        {post.excerpt}
                      </p>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
                        <time 
                          className="text-xs md:text-sm text-gray-500"
                          dateTime={post.created_at}
                          itemProp="datePublished"
                        >
                          📅 {new Date(post.created_at).toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                        <a 
                          href={`/blog/${post.slug}`} 
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base focus-visible:focus inline-flex items-center"
                          aria-label={`${post.title} yazısının devamını oku`}
                        >
                          Devamını Oku 
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    
                    {/* Hidden structured data */}
                    <div itemProp="author" itemScope itemType="https://schema.org/Person" className="hidden">
                      <span itemProp="name">Blog Sitemi</span>
                    </div>
                    <meta itemProp="dateModified" content={post.created_at} />
                    <meta itemProp="url" content={`https://blog-sitemi.com/blog/${post.slug}`} />
                  </article>
                )
              })}
            </div>
          )}

          {/* Loading skeletons for better UX */}
          {posts.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-32 md:h-48 skeleton"></div>
                  <div className="p-4 md:p-6">
                    <div className="skeleton h-6 mb-2 rounded"></div>
                    <div className="skeleton h-4 mb-1 rounded"></div>
                    <div className="skeleton h-4 mb-4 w-3/4 rounded"></div>
                    <div className="flex justify-between items-center">
                      <div className="skeleton h-4 w-24 rounded"></div>
                      <div className="skeleton h-4 w-20 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Footer - Mobil Responsive */}
        <footer className="bg-gray-900 text-white py-8 md:py-12" role="contentinfo">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <div className="md:col-span-2 lg:col-span-1">
                <h5 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                  📝 Blog Sitemi
                </h5>
                <p className="text-gray-400 text-sm md:text-base">
                  Kişisel blog sitem. Düşüncelerimi ve deneyimlerimi paylaşıyorum.
                </p>
              </div>
              <div>
                <h6 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">📄 Sayfalar</h6>
                <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                  <li><a href="/" className="hover:text-white focus-visible:focus">Ana Sayfa</a></li>
                  <li><a href="/blog" className="hover:text-white focus-visible:focus">Blog</a></li>
                  <li><a href="/hakkimda" className="hover:text-white focus-visible:focus">Hakkımda</a></li>
                  <li><a href="/iletisim" className="hover:text-white focus-visible:focus">İletişim</a></li>
                </ul>
              </div>
              <div>
                <h6 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">🏷️ Kategoriler</h6>
                <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                  <li><a href="#" className="hover:text-white focus-visible:focus">Teknoloji</a></li>
                  <li><a href="#" className="hover:text-white focus-visible:focus">Kişisel</a></li>
                  <li><a href="#" className="hover:text-white focus-visible:focus">Eğitim</a></li>
                  <li><a href="#" className="hover:text-white focus-visible:focus">Seyahat</a></li>
                </ul>
              </div>
              <div>
                <h6 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">🌐 Takip Et</h6>
                <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                  <li>
                    <a 
                      href="https://twitter.com/blogsitemi" 
                      className="hover:text-white focus-visible:focus"
                      aria-label="Twitter'da takip et"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://linkedin.com/company/blogsitemi" 
                      className="hover:text-white focus-visible:focus"
                      aria-label="LinkedIn'de takip et"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://instagram.com/blogsitemi" 
                      className="hover:text-white focus-visible:focus"
                      aria-label="Instagram'da takip et"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://github.com/blogsitemi" 
                      className="hover:text-white focus-visible:focus"
                      aria-label="GitHub'da takip et"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-sm md:text-base">
              <p>
                &copy; {new Date().getFullYear()} Blog Sitemi. Tüm hakları saklıdır. 
                <span className="block md:inline md:ml-2 mt-1 md:mt-0">
                  ❤️ ile Türkiye'de yapıldı.
                </span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}