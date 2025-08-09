/**
 * Controls Component
 * Text formatting controls with animated buttons
 */

import { motion } from 'framer-motion'
import { Bold, Italic, Underline, Palette, RotateCcw } from 'lucide-react'

interface ControlsProps {
  isBold: boolean
  isItalic: boolean
  isUnderline: boolean
  onFormatToggle: (format: 'bold' | 'italic' | 'underline') => void
  onApplyFormatting: () => void
  onReset: () => void
  hasSelection: boolean
}

export default function Controls({
  isBold,
  isItalic,
  isUnderline,
  onFormatToggle,
  onApplyFormatting,
  onReset,
  hasSelection
}: ControlsProps) {

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    active: { 
      scale: 1.05,
      boxShadow: 'inset 4px 4px 8px #d1d5db, inset -4px -4px 8px #ffffff'
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Formatting Controls</h2>
      
      {/* Text Style Toggles */}
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-3">Text Styles</h3>
        <div className="flex flex-wrap gap-3">
          <motion.button
            className={`neomorphic-btn px-4 py-2 flex items-center space-x-2 text-sm font-medium ${
              isBold ? 'text-pink-700' : 'text-gray-700'
            }`}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate={isBold ? "active" : "initial"}
            onClick={() => onFormatToggle('bold')}
          >
            <Bold className="w-4 h-4" />
            <span>Bold</span>
          </motion.button>

          <motion.button
            className={`neomorphic-btn px-4 py-2 flex items-center space-x-2 text-sm font-medium ${
              isItalic ? 'text-pink-700' : 'text-gray-700'
            }`}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate={isItalic ? "active" : "initial"}
            onClick={() => onFormatToggle('italic')}
          >
            <Italic className="w-4 h-4" />
            <span>Italic</span>
          </motion.button>

          <motion.button
            className={`neomorphic-btn px-4 py-2 flex items-center space-x-2 text-sm font-medium ${
              isUnderline ? 'text-pink-700' : 'text-gray-700'
            }`}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate={isUnderline ? "active" : "initial"}
            onClick={() => onFormatToggle('underline')}
          >
            <Underline className="w-4 h-4" />
            <span>Underline</span>
          </motion.button>
        </div>
      </div>

      {/* Action Buttons */}
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-3">Actions</h3>
        <div className="flex flex-wrap gap-3">
          <motion.button
            className={`neomorphic-btn px-6 py-3 flex items-center space-x-2 font-medium ${
              hasSelection 
                ? 'text-pink-700 hover:text-pink-800' 
                : 'text-gray-400 cursor-not-allowed'
            }`}
            variants={buttonVariants}
            initial="initial"
            whileHover={hasSelection ? "hover" : "initial"}
            whileTap={hasSelection ? "tap" : "initial"}
            onClick={onApplyFormatting}
            disabled={!hasSelection}
          >
            <Palette className="w-4 h-4" />
            <span>Apply Formatting</span>
          </motion.button>

          <motion.button
            className="neomorphic-btn px-6 py-3 flex items-center space-x-2 font-medium text-gray-700 hover:text-gray-800"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={onReset}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All</span>
          </motion.button>
        </div>
      </div>

      {/* Help Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="neomorphic-input p-4 rounded-2xl"
      >
        <h4 className="text-sm font-medium text-gray-600 mb-2">How to use:</h4>
        <ol className="text-xs text-gray-500 space-y-1">
          <li>1. Select text in the editor above</li>
          <li>2. Choose colors from the color picker</li>
          <li>3. Toggle text styles (bold, italic, underline)</li>
          <li>4. Click "Apply Formatting" to format selected text</li>
          <li>5. Copy the formatted text for Discord</li>
        </ol>
      </motion.div>
    </div>
  )
}
