/**
 * Text Editor Component
 * Main text input area with selection tracking
 */

import { useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TextEditorProps {
  text: string
  onTextSelection: (text: string, selectedText: string, start: number, end: number) => void
}

export default function TextEditor({ text, onTextSelection }: TextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Handle text selection and changes
  const handleSelectionChange = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    
    onTextSelection(textarea.value, selectedText, start, end)
  }, [onTextSelection])

  // Handle text input changes
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    
    onTextSelection(textarea.value, selectedText, start, end)
  }, [onTextSelection])

  // Set up event listeners for selection changes
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const handleMouseUp = () => handleSelectionChange()
    const handleKeyUp = () => handleSelectionChange()

    textarea.addEventListener('mouseup', handleMouseUp)
    textarea.addEventListener('keyup', handleKeyUp)
    textarea.addEventListener('select', handleSelectionChange)

    return () => {
      textarea.removeEventListener('mouseup', handleMouseUp)
      textarea.removeEventListener('keyup', handleKeyUp)
      textarea.removeEventListener('select', handleSelectionChange)
    }
  }, [handleSelectionChange])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        className="neomorphic-input w-full h-40 p-4 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
        placeholder="Type your message here... Select text to apply colors and formatting."
        maxLength={2000}
        spellCheck={false}
      />
      
      {/* Character counter */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-pink-50 px-2 py-1 rounded-lg">
        {text.length}/2000
      </div>
    </motion.div>
  )
}
