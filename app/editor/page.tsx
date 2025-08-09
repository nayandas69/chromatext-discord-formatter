'use client'

/**
 * ChromaText Editor Page
 * Main text formatting interface with color pickers and preview
 */

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TextEditor from '@/components/TextEditor'
import ColorPicker from './ColorPicker'
import Preview from './Preview'
import Controls from './Controls'
import CopyButton from '@/components/CopyButton'
import { formatTextWithColors } from '@/lib/ansiFormatter'
import dynamic from 'next/dynamic'

const EditorContent = dynamic(() => import('./EditorContent'), { ssr: false })

// Interface for text formatting state
interface FormattingState {
  text: string
  selectedText: string
  selectionStart: number
  selectionEnd: number
  foregroundColor: string
  backgroundColor: string
  isBold: boolean
  isItalic: boolean
  isUnderline: boolean
}

export default function EditorPage() {
  // Main formatting state
  const [formatting, setFormatting] = useState<FormattingState>({
    text: 'Welcome to ChromaText Discord Formatter! Select text and apply colors.',
    selectedText: '',
    selectionStart: 0,
    selectionEnd: 0,
    foregroundColor: '',
    backgroundColor: '',
    isBold: false,
    isItalic: false,
    isUnderline: false,
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <EditorContent />
      </main>
      <Footer />
    </div>
  )
}
