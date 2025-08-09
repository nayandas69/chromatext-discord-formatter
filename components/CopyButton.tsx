/**
 * Copy Button Component
 * Animated copy-to-clipboard functionality with success feedback
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  text: string
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  // Modern clipboard API implementation
  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // Use modern Clipboard API
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        textArea.remove()
      }
      
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    success: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  }

  return (
    <motion.button
      className="neomorphic-btn w-full px-6 py-4 flex items-center justify-center space-x-3 font-semibold text-lg"
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      animate={copied ? "success" : "initial"}
      onClick={handleCopy}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex items-center space-x-3 text-green-600"
          >
            <Check className="w-5 h-5" />
            <span>Copied to Clipboard!</span>
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex items-center space-x-3 text-pink-700"
          >
            <Copy className="w-5 h-5" />
            <span>Copy for Discord</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
