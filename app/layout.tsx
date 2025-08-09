/**
 * ChromaText - Discord Colored Text Generator
 * 
 * @author nayandas69
 * @email nayanchandradas@hotmail.com
 * @repository https://github.com/nayandas69/chromatext-discord-formatter
 * @license GPL-3.0
 * @version 1.0.0
 * 
 * A modern, neumorphic-styled Discord text formatter with animated color selections
 * Built with Next.js 15, Tailwind CSS, and Framer Motion
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChromaText - Discord Colored Text Generator | Modern ANSI Formatter',
  description: 'Create beautiful colored text for Discord with our modern, neumorphic text formatter. Support for ANSI colors, bold, italic, and more formatting options.',
  keywords: [
    'discord text formatter',
    'colored text discord',
    'ansi colors',
    'discord formatting',
    'text generator',
    'discord markdown',
    'colored messages'
  ],
  authors: [{ name: 'nayandas69', url: 'https://github.com/nayandas69' }],
  creator: 'nayandas69',
  publisher: 'nayandas69',
  robots: 'index, follow',
  openGraph: {
    title: 'ChromaText - Discord Colored Text Generator',
    description: 'Create beautiful colored text for Discord with our modern text formatter',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChromaText - Discord Colored Text Generator',
    description: 'Create beautiful colored text for Discord with our modern text formatter',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ec4899',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-pink-50 to-rose-100 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
