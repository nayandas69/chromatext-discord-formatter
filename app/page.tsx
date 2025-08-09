/**
 * ChromaText Home Page
 * Main landing page with navigation to editor
 */

import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomeContent from '@/components/HomeContent'

export const metadata: Metadata = {
  title: 'ChromaText - Modern Discord Text Formatter',
  description: 'Transform your Discord messages with beautiful colored text using our modern neumorphic text formatter.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <HomeContent />
      </main>
      
      <Footer />
    </div>
  )
}
