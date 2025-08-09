/**
 * Color Picker Component
 * Animated color selection interface with Discord compatibility notes
 */

import { motion } from 'framer-motion'

// ANSI color mappings for Discord
const DISCORD_COLORS = {
  // Standard colors (work well in Discord)
  black: { hex: '#000000', ansi: '30', works: 'foreground' },
  red: { hex: '#ff0000', ansi: '31', works: 'both' },
  green: { hex: '#00ff00', ansi: '32', works: 'both' },
  yellow: { hex: '#ffff00', ansi: '33', works: 'both' },
  blue: { hex: '#0000ff', ansi: '34', works: 'both' },
  magenta: { hex: '#ff00ff', ansi: '35', works: 'both' },
  cyan: { hex: '#00ffff', ansi: '36', works: 'both' },
  white: { hex: '#ffffff', ansi: '37', works: 'foreground' },
  
  // Bright colors (better Discord support)
  brightBlack: { hex: '#808080', ansi: '90', works: 'both' },
  brightRed: { hex: '#ff8080', ansi: '91', works: 'both' },
  brightGreen: { hex: '#80ff80', ansi: '92', works: 'both' },
  brightYellow: { hex: '#ffff80', ansi: '93', works: 'both' },
  brightBlue: { hex: '#8080ff', ansi: '94', works: 'both' },
  brightMagenta: { hex: '#ff80ff', ansi: '95', works: 'both' },
  brightCyan: { hex: '#80ffff', ansi: '96', works: 'both' },
  brightWhite: { hex: '#ffffff', ansi: '97', works: 'foreground' },
}

interface ColorPickerProps {
  selectedForeground: string
  selectedBackground: string
  onColorSelect: (color: string, type: 'foreground' | 'background') => void
}

export default function ColorPicker({ 
  selectedForeground, 
  selectedBackground, 
  onColorSelect 
}: ColorPickerProps) {
  
  // Animation variants for color buttons
  const colorButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
    selected: { scale: 1.2, boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)' }
  }

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Color Selection</h2>
      
      {/* Foreground Colors */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
          <span className="w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mr-2"></span>
          Foreground (Text Color)
        </h3>
        <motion.div 
          className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {Object.entries(DISCORD_COLORS).map(([colorName, colorData]) => (
            <motion.button
              key={`fg-${colorName}`}
              className="color-btn relative"
              style={{ backgroundColor: colorData.hex }}
              variants={colorButtonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              animate={selectedForeground === colorName ? "selected" : "initial"}
              onClick={() => onColorSelect(colorName, 'foreground')}
              title={`Foreground: ${colorName} (${colorData.works === 'both' ? 'Works well' : 'Limited support'})`}
            >
              {selectedForeground === colorName && (
                <motion.div
                  className="absolute inset-0 border-2 border-pink-500 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <span className="sr-only">Select {colorName} for text color</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Background Colors */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
          <span className="w-4 h-4 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full mr-2"></span>
          Background Color
        </h3>
        <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Note:</strong> Background colors may not work consistently across all Discord clients. Use foreground colors for best results.
          </p>
        </div>
        <motion.div 
          className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {Object.entries(DISCORD_COLORS).map(([colorName, colorData]) => (
            <motion.button
              key={`bg-${colorName}`}
              className="color-btn relative opacity-75"
              style={{ backgroundColor: colorData.hex }}
              variants={colorButtonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              animate={selectedBackground === colorName ? "selected" : "initial"}
              onClick={() => onColorSelect(colorName, 'background')}
              title={`Background: ${colorName} (May not work in all Discord clients)`}
            >
              {selectedBackground === colorName && (
                <motion.div
                  className="absolute inset-0 border-2 border-pink-500 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <span className="sr-only">Select {colorName} for background color</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Selected Colors Display */}
      {(selectedForeground || selectedBackground) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="neomorphic-input p-4 rounded-2xl"
        >
          <h4 className="text-sm font-medium text-gray-600 mb-2">Selected Colors:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedForeground && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                Text: {selectedForeground}
              </span>
            )}
            {selectedBackground && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                Background: {selectedBackground} (Limited support)
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
