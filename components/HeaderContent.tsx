/**
 * Header Content Component
 * Animated header content with mobile responsive navigation
 */

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Github, Home, Menu, X } from 'lucide-react'

export default function HeaderContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between max-w-6xl mx-auto"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-3 group">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center"
        >
          <Palette className="w-5 h-5 text-white" />
        </motion.div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            ChromaText
          </h1>
          <p className="text-xs text-gray-500">Discord Text Formatter</p>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4">
        <Link
          href="/"
          className="neomorphic-btn p-3 text-gray-700 hover:text-pink-600 transition-colors"
          title="Home"
        >
          <Home className="w-5 h-5" />
        </Link>
        
        <Link
          href="/editor"
          className="neomorphic-btn px-4 py-2 text-gray-700 hover:text-pink-600 font-medium transition-colors"
        >
          Editor
        </Link>
        
        <a
          href="https://github.com/nayandas69/chromatext-discord-formatter"
          target="_blank"
          rel="noopener noreferrer"
          className="neomorphic-btn p-3 text-gray-700 hover:text-pink-600 transition-colors"
          title="View on GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden neomorphic-btn p-3 text-gray-700 hover:text-pink-600 transition-colors"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-4 right-4 mt-2 md:hidden neomorphic-container p-4 z-50"
          >
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="neomorphic-btn p-3 text-gray-700 hover:text-pink-600 transition-colors flex items-center space-x-3"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              
              <Link
                href="/editor"
                onClick={() => setIsMenuOpen(false)}
                className="neomorphic-btn p-3 text-gray-700 hover:text-pink-600 transition-colors flex items-center space-x-3"
              >
                <Palette className="w-5 h-5" />
                <span>Editor</span>
              </Link>
              
              <a
                href="https://github.com/nayandas69/chromatext-discord-formatter"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="neomorphic-btn p-3 text-gray-700 hover:text-pink-600 transition-colors flex items-center space-x-3"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
