'use client'

import { useState } from 'react'
import Link from 'next/link'

interface MobileMenuProps {
  currentPath?: string
}

export default function MobileMenu({ currentPath = '/' }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { href: '/', label: 'Ana Sayfa', icon: '🏠' },
    { href: '/blog', label: 'Blog', icon: '📝' },
    { href: '/hakkimda', label: 'Hakkımda', icon: '👨‍💻' },
    { href: '/iletisim', label: 'İletişim', icon: '📧' },
    { href: '/admin', label: 'Admin', icon: '⚙️' },
  ]

  return (
    <>
      {/* Hamburger Button */}
      <button 
        className="lg:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menüyü aç/kapat"
        aria-expanded={isOpen}
      >
        <svg 
          className={`w-6 h-6 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">📱 Menü</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
              aria-label="Menüyü kapat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${currentPath === item.href 
                    ? 'bg-blue-100 text-blue-700 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
                {currentPath === item.href && (
                  <span className="ml-auto text-blue-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">Blog Sitemi</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-600">
                  <span className="text-xl">🐦</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600">
                  <span className="text-xl">💼</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600">
                  <span className="text-xl">🐱</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600">
                  <span className="text-xl">📷</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}