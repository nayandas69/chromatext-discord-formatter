/**
 * Home Content Component
 * Server-rendered home page content with static layout
 */

import Link from 'next/link'

export default function HomeContent() {
  return (
    <div className="text-center max-w-4xl">
      <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-6 animate-fade-in">
        ChromaText
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed animate-slide-up">
        Create stunning colored text for Discord with our modern, 
        neumorphic text formatter. Transform your messages with beautiful ANSI colors.
      </p>
      
      <div className="animate-slide-up">
        <Link 
          href="/editor"
          className="neomorphic-btn inline-flex items-center px-8 py-4 text-lg font-semibold text-pink-700 hover:text-pink-800"
        >
          Start Creating
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
        <div className="neomorphic-container p-6">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy to Use</h3>
          <p className="text-gray-600">Intuitive interface with real-time preview of your colored text</p>
        </div>
        
        <div className="neomorphic-container p-6">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Mobile Friendly</h3>
          <p className="text-gray-600">Fully responsive design that works perfectly on all devices</p>
        </div>
        
        <div className="neomorphic-container p-6">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast & Modern</h3>
          <p className="text-gray-600">Built with Next.js 15 and modern web technologies</p>
        </div>
      </div>
    </div>
  )
}
