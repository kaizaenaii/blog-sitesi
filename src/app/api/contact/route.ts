import { NextRequest, NextResponse } from 'next/server'

// Email gönderme fonksiyonu (Basit versiyon)
async function sendEmail(formData: {
  name: string
  email: string
  subject: string
  message: string
}) {
  // Bu örnekte console'da gösteriyoruz
  // Production'da gerçek email servisi kullanılmalı
  console.log('📧 Yeni İletişim Mesajı:')
  console.log('Ad:', formData.name)
  console.log('Email:', formData.email)
  console.log('Konu:', formData.subject)
  console.log('Mesaj:', formData.message)
  console.log('Tarih:', new Date().toLocaleString('tr-TR'))
  
  // Simüle edilmiş email gönderimi
  return new Promise((resolve) => {
    setTimeout(resolve, 1000) // 1 saniye gecikme
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validasyon
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tüm alanlar zorunludur' },
        { status: 400 }
      )
    }

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir email adresi girin' },
        { status: 400 }
      )
    }

    // Email gönderme
    await sendEmail({ name, email, subject, message })

    return NextResponse.json(
      { message: 'Mesajınız başarıyla gönderildi!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('API Hatası:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu' },
      { status: 500 }
    )
  }
}

// GET metodu (opsiyonel)
export async function GET() {
  return NextResponse.json(
    { message: 'İletişim API çalışıyor' },
    { status: 200 }
  )
}