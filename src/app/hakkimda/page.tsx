'use client'

import { useState } from 'react'

export default function HakkimdaPage() {
  const [activeTab, setActiveTab] = useState('genel')

  // Beceriler data
  const skills = [
    { name: 'JavaScript', level: 90, icon: '🟨' },
    { name: 'React', level: 85, icon: '⚛️' },
    { name: 'Next.js', level: 80, icon: '▲' },
    { name: 'TypeScript', level: 75, icon: '🔷' },
    { name: 'Node.js', level: 70, icon: '🟢' },
    { name: 'Python', level: 65, icon: '🐍' },
    { name: 'CSS/Tailwind', level: 88, icon: '🎨' },
    { name: 'Git/GitHub', level: 85, icon: '📚' },
  ]

  // Deneyimler data
  const experiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Şirketi',
      period: '2022 - Devam Ediyor',
      description: 'Modern web uygulamaları geliştirme, takım liderliği ve mentorluk.'
    },
    {
      title: 'Full Stack Developer',
      company: 'Startup Şirketi',
      period: '2020 - 2022',
      description: 'E-ticaret platformu geliştirme, API tasarımı ve veritabanı yönetimi.'
    },
    {
      title: 'Junior Developer',
      company: 'Yazılım Ajansı',
      period: '2018 - 2020',
      description: 'Web sitesi geliştirme, müşteri projeleri ve teknik destek.'
    },
  ]

  // Eğitim data
  const education = [
    {
      title: 'Bilgisayar Mühendisliği',
      school: 'İstanbul Teknik Üniversitesi',
      period: '2014 - 2018',
      description: 'Yazılım geliştirme, algoritma ve veri yapıları odaklı eğitim.'
    },
    {
      title: 'Web Development Bootcamp',
      school: 'Online Eğitim Platformu',
      period: '2017',
      description: 'Modern web teknolojileri ve full-stack development.'
    },
  ]

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
                <a href="/hakkimda" className="text-blue-600 font-semibold text-sm">
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

      {/* Hero Bölümü */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Profil Fotoğrafı */}
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-6xl md:text-7xl">👨‍💻</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Merhaba, Ben [Adınız]! 👋
          </h1>
          <p className="text-lg md:text-xl mb-6 opacity-90 max-w-2xl mx-auto">
            Full Stack Developer, Blog Yazarı ve Teknoloji Tutkunu. 
            Modern web teknolojileri ile kullanıcı deneyimi odaklı çözümler geliştiriyorum.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/iletisim" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              📧 İletişime Geç
            </a>
            <a 
              href="/cv.pdf" 
              target="_blank"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              📄 CV İndir
            </a>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Tab Navigasyonu */}
        <div className="flex flex-wrap justify-center mb-8 bg-white rounded-lg p-2 shadow-sm">
          {[
            { id: 'genel', label: '👤 Genel', icon: '👤' },
            { id: 'beceriler', label: '🚀 Beceriler', icon: '🚀' },
            { id: 'deneyim', label: '💼 Deneyim', icon: '💼' },
            { id: 'egitim', label: '🎓 Eğitim', icon: '🎓' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab İçerikleri */}
        {activeTab === 'genel' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hakkımda Yazısı */}
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🎯 Hakkımda
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Merhaba! Ben [Adınız], 6+ yıllık deneyime sahip bir Full Stack Developer'ım. 
                  Modern web teknolojileri kullanarak kullanıcı deneyimi odaklı, performant ve 
                  ölçeklenebilir web uygulamaları geliştiriyorum.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  React, Next.js, Node.js ve modern JavaScript ekosistemi konularında uzmanım. 
                  Özellikle frontend development ve kullanıcı arayüzü tasarımı konularında 
                  tutkulu bir geliştiriciyim.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Bu blog üzerinden öğrendiklerimi, deneyimlerimi ve teknoloji dünyasındaki 
                  gelişmeleri paylaşmayı seviyorum. Aynı zamanda açık kaynak projelere 
                  katkıda bulunur ve developer topluluğunun bir parçası olmaya çalışırım.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Boş zamanlarımda yeni teknolojiler öğrenir, kitap okur ve fotoğrafçılık 
                  yaparım. Kahve ve kod yazmanın mükemmel bir kombinasyon olduğuna inanırım! ☕
                </p>
              </div>
            </div>

            {/* Hızlı Bilgiler */}
            <div className="space-y-6">
              {/* İstatistikler */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  📊 Hızlı Bilgiler
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">6+</div>
                    <div className="text-sm text-gray-600">Yıl Deneyim</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">50+</div>
                    <div className="text-sm text-gray-600">Tamamlanan Proje</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">25+</div>
                    <div className="text-sm text-gray-600">Blog Yazısı</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">10k+</div>
                    <div className="text-sm text-gray-600">Kod Satırı</div>
                  </div>
                </div>
              </div>

              {/* Hobiler */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  🎨 Hobiler & İlgi Alanları
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <span>📚</span>
                    <span className="text-gray-700">Kitap Okuma</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📸</span>
                    <span className="text-gray-700">Fotoğrafçılık</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🎵</span>
                    <span className="text-gray-700">Müzik</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🏃‍♂️</span>
                    <span className="text-gray-700">Koşu</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🎮</span>
                    <span className="text-gray-700">Gaming</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>✈️</span>
                    <span className="text-gray-700">Seyahat</span>
                  </div>
                </div>
              </div>

              {/* İletişim */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  🌐 Beni Takip Edin
                </h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors">
                    <span className="text-xl">🐦</span>
                    <span>@blogsitemi</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors">
                    <span className="text-xl">💼</span>
                    <span>linkedin.com/in/blogsitemi</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors">
                    <span className="text-xl">🐱</span>
                    <span>github.com/blogsitemi</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors">
                    <span className="text-xl">📷</span>
                    <span>instagram.com/blogsitemi</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'beceriler' && (
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              🚀 Teknik Beceriler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{skill.icon}</span>
                      <span className="font-medium text-gray-900">{skill.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'deneyim' && (
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 mt-2 md:mt-0">{exp.period}</span>
                </div>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'egitim' && (
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{edu.title}</h3>
                    <p className="text-blue-600 font-medium">{edu.school}</p>
                  </div>
                  <span className="text-sm text-gray-500 mt-2 md:mt-0">{edu.period}</span>
                </div>
                <p className="text-gray-700">{edu.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}