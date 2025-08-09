/**
 * Footer Content Component
 * Animated footer content with icon-only contact section
 */

import { motion } from 'framer-motion'
import { Heart, Github, Mail } from 'lucide-react'

export default function FooterContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">ChromaText</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            A modern Discord text formatter built with Next.js 15, featuring neumorphic design 
            and smooth animations. Create beautiful colored text for your Discord messages.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/editor" className="text-gray-600 hover:text-pink-600 transition-colors">
                Text Editor
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/nayandas69/chromatext-discord-formatter" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 transition-colors"
              >
                Source Code
              </a>
            </li>
            <li>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 transition-colors"
              >
                Discord
              </a>
            </li>
          </ul>
        </div>

        {/* Contact - Icons Only */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact</h3>
          <div className="flex space-x-4">
            <a 
              href="mailto:nayanchandradas@hotmail.com"
              className="neomorphic-btn p-3 text-gray-600 hover:text-pink-600 transition-colors"
              title="Email: nayanchandradas@hotmail.com"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/nayandas69"
              target="_blank"
              rel="noopener noreferrer"
              className="neomorphic-btn p-3 text-gray-600 hover:text-pink-600 transition-colors"
              title="GitHub: @nayandas69"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-gray-500 text-sm flex items-center">
          Made with <Heart className="w-4 h-4 text-pink-500 mx-1" /> by nayandas69
        </p>
        <p className="text-gray-500 text-sm mt-2 md:mt-0">
          Licensed under GPL-3.0 • © 2025 ChromaText
        </p>
      </div>
    </motion.div>
  )
}
