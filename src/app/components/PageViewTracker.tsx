'use client'

import { useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// Supabase bağlantısı
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

interface PageViewTrackerProps {
  slug: string
}

export default function PageViewTracker({ slug }: PageViewTrackerProps) {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        // Ziyaretçinin IP adresini al (basit versiyon)
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

    trackPageView()
  }, [slug])

  return null // Bu component görsel değil, sadece tracking için
}