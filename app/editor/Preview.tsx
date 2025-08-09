/**
 * Preview Component
 * Real-time preview of formatted text with Discord-like styling
 */

import { motion } from 'framer-motion'
import { parseFormattedText } from '@/lib/ansiFormatter'

interface PreviewProps {
  text: string
}

export default function Preview({ text }: PreviewProps) {
  // Parse the formatted text to extract styling information
  const parsedSegments = parseFormattedText(text)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center">
        <span className="w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mr-2"></span>
        Live Preview
      </h2>
      
      {/* Discord-like preview container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="neomorphic-input p-6 min-h-[120px] font-mono text-sm leading-relaxed"
        style={{ 
          backgroundColor: '#36393f',
          color: '#dcddde',
          borderRadius: '8px'
        }}
      >
        <div className="mb-2 text-xs text-gray-400 border-b border-gray-600 pb-2">
          Discord Preview
        </div>
        
        <div className="whitespace-pre-wrap break-words">
          {parsedSegments.map((segment, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              style={{
                color: segment.color || '#dcddde',
                backgroundColor: segment.backgroundColor || 'transparent',
                fontWeight: segment.bold ? 'bold' : 'normal',
                fontStyle: segment.italic ? 'italic' : 'normal',
                textDecoration: segment.underline ? 'underline' : 'none',
              }}
            >
              {segment.text}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Raw ANSI Code Preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="neomorphic-input p-4 rounded-2xl"
      >
        <h3 className="text-sm font-medium text-gray-600 mb-2">Raw ANSI Code:</h3>
        <code className="text-xs text-gray-500 font-mono break-all">
          {text}
        </code>
      </motion.div>

      {/* Character Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xs text-gray-500 text-right"
      >
        Characters: {text.length} / 2000
      </motion.div>
    </div>
  )
}
