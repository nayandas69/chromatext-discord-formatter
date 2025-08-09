'use client'

/**
 * Editor Content Component
 * Main editor functionality with improved Discord ANSI formatting
 */

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import TextEditor from '@/components/TextEditor'
import ColorPicker from './ColorPicker'
import Preview from './Preview'
import Controls from './Controls'
import CopyButton from '@/components/CopyButton'
import { formatTextWithColors, getFinalFormattedText, createDemoText, createTestText } from '@/lib/ansiFormatter'

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

export default function EditorContent() {
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

  // Handle text selection changes
  const handleTextSelection = useCallback((
    text: string,
    selectedText: string,
    selectionStart: number,
    selectionEnd: number
  ) => {
    setFormatting(prev => ({
      ...prev,
      text,
      selectedText,
      selectionStart,
      selectionEnd,
    }))
  }, [])

  // Handle color selection
  const handleColorSelect = useCallback((color: string, type: 'foreground' | 'background') => {
    setFormatting(prev => ({
      ...prev,
      [type === 'foreground' ? 'foregroundColor' : 'backgroundColor']: color,
    }))
  }, [])

  // Handle formatting toggles
  const handleFormatToggle = useCallback((format: 'bold' | 'italic' | 'underline') => {
    const formatKey = `is${format.charAt(0).toUpperCase() + format.slice(1)}` as keyof FormattingState
    setFormatting(prev => ({
      ...prev,
      [formatKey]: !prev[formatKey],
    }))
  }, [])

  // Apply formatting to selected text
  const applyFormatting = useCallback(() => {
    if (formatting.selectionStart === formatting.selectionEnd) return

    const { text, selectionStart, selectionEnd, foregroundColor, backgroundColor, isBold, isItalic, isUnderline } = formatting
    
    const beforeText = text.substring(0, selectionStart)
    const selectedText = text.substring(selectionStart, selectionEnd)
    const afterText = text.substring(selectionEnd)
    
    const formattedText = formatTextWithColors(
      selectedText,
      foregroundColor,
      backgroundColor,
      { bold: isBold, italic: isItalic, underline: isUnderline }
    )
    
    const newText = beforeText + formattedText + afterText
    
    setFormatting(prev => ({
      ...prev,
      text: newText,
      selectedText: '',
      selectionStart: 0,
      selectionEnd: 0,
    }))
  }, [formatting])

  // Reset all formatting
  const resetFormatting = useCallback(() => {
    setFormatting(prev => ({
      ...prev,
      text: 'Welcome to ChromaText Discord Formatter! Select text and apply colors.',
      foregroundColor: '',
      backgroundColor: '',
      isBold: false,
      isItalic: false,
      isUnderline: false,
    }))
  }, [])

  // Load demo text
  const loadDemo = useCallback(() => {
    const demoText = 'Welcome to ChromaText! Try selecting text and applying colors.'
    setFormatting(prev => ({
      ...prev,
      text: demoText,
      selectedText: '',
      selectionStart: 0,
      selectionEnd: 0,
    }))
  }, [])

  // Load test text
  const loadTest = useCallback(() => {
    const testText = 'Red Text Bold Green Underline Blue Bold Underline Magenta'
    setFormatting(prev => ({
      ...prev,
      text: testText,
      selectedText: '',
      selectionStart: 0,
      selectionEnd: 0,
    }))
  }, [])

  // Get the final text for copying (wrapped in ansi block)
  const finalText = getFinalFormattedText(formatting.text)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-2">
          Text Editor
        </h1>
        <p className="text-gray-600">Select text and apply colors to create beautiful Discord messages</p>
        <div className="mt-4 neomorphic-input p-4 rounded-2xl">
          <p className="text-sm text-gray-600 mb-3">
            <strong>💡 Discord Setup:</strong> Enable "Use slash commands and preview emojis, mentions, and markdown syntax as you type" in Discord settings.
          </p>
          <p className="text-xs text-gray-500 mb-3">
            <strong>Note:</strong> Background colors may not work consistently in all Discord clients. Foreground colors and text formatting work best.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={loadDemo}
              className="neomorphic-btn px-4 py-2 text-sm font-medium text-pink-700 hover:text-pink-800"
            >
              Load Demo
            </button>
            <button
              onClick={loadTest}
              className="neomorphic-btn px-4 py-2 text-sm font-medium text-pink-700 hover:text-pink-800"
            >
              Load Test Text
            </button>
          </div>
        </div>
      </div>

      {/* Main Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Editor and Controls */}
        <div className="space-y-6">
          {/* Text Editor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="neomorphic-container p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Text Editor</h2>
            <TextEditor
              text={formatting.text}
              onTextSelection={handleTextSelection}
            />
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="neomorphic-container p-6"
          >
            <Controls
              isBold={formatting.isBold}
              isItalic={formatting.isItalic}
              isUnderline={formatting.isUnderline}
              onFormatToggle={handleFormatToggle}
              onApplyFormatting={applyFormatting}
              onReset={resetFormatting}
              hasSelection={formatting.selectionStart !== formatting.selectionEnd}
            />
          </motion.div>
        </div>

        {/* Right Column - Color Pickers and Preview */}
        <div className="space-y-6">
          {/* Color Pickers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="neomorphic-container p-6"
          >
            <ColorPicker
              selectedForeground={formatting.foregroundColor}
              selectedBackground={formatting.backgroundColor}
              onColorSelect={handleColorSelect}
            />
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="neomorphic-container p-6"
          >
            <Preview text={finalText} />
          </motion.div>

          {/* Copy Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CopyButton text={finalText} />
          </motion.div>
        </div>
      </div>

      {/* Selection Info */}
      {formatting.selectedText && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 neomorphic-container p-4"
        >
          <p className="text-sm text-gray-600">
            Selected: <span className="font-mono bg-pink-100 px-2 py-1 rounded">{formatting.selectedText}</span>
          </p>
        </motion.div>
      )}

      {/* Final Output Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 neomorphic-container p-4"
      >
        <h3 className="text-sm font-medium text-gray-600 mb-2">Final Discord Output:</h3>
        <code className="text-xs text-gray-500 font-mono break-all block bg-gray-50 p-2 rounded">
          {finalText}
        </code>
      </motion.div>
    </motion.div>
  )
}
