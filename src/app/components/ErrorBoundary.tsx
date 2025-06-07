'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error Boundary yakaladı:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="text-6xl mb-6">😵‍💫</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Bir Şeyler Ters Gitti!
            </h1>
            <p className="text-gray-600 mb-6">
              Beklenmedik bir hata oluştu. Sayfayı yenilemeyi deneyin veya ana sayfaya dönün.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
              >
                🔄 Sayfayı Yenile
              </button>
              <a 
                href="/"
                className="block w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 font-medium"
              >
                🏠 Ana Sayfaya Dön
              </a>
            </div>
            
            {/* Development modunda hata detayı */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Hata Detayları (Development)
                </summary>
                <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}