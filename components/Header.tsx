'use client'

/**
 * Header Component
 * Navigation header with branding and links
 */

import HeaderContent from './HeaderContent'

export default function Header() {
  return (
    <header className="neomorphic-container mx-4 mt-4 mb-8 px-6 py-4 relative">
      <HeaderContent />
    </header>
  )
}
