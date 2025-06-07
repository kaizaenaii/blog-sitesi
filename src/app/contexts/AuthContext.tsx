'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Sayfa yüklendiğinde session kontrolü
  useEffect(() => {
    const authStatus = localStorage.getItem('blog_admin_auth')
    setIsAuthenticated(authStatus === 'true')
    setLoading(false)
  }, [])

  const login = (password: string) => {
    // Basit şifre kontrolü (production'da daha güvenli olmalı)
    if (password === 'admin123') {
      setIsAuthenticated(true)
      localStorage.setItem('blog_admin_auth', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('blog_admin_auth')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}