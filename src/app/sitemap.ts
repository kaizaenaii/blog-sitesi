import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://blog-sitemi.com'

  try {
    // Yayınlanan yazıları al
    const { data: posts } = await supabase
      .from('posts')
      .select('slug, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })

    // Statik sayfalar
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/hakkimda`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/iletisim`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ]

    // Blog yazı sayfaları
    const blogPages: MetadataRoute.Sitemap = posts?.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })) || []

    return [...staticPages, ...blogPages]
  } catch (error) {
    console.error('Sitemap oluşturma hatası:', error)
    
    // Hata durumunda en azından statik sayfaları döndür
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ]
  }
}