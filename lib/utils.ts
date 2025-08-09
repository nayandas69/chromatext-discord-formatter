/**
 * Utility Functions
 * Common utility functions for the application
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine class names with Tailwind CSS merge
 * @param inputs - Class names to combine
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Debounce function to limit function calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Format file size in human readable format
 * @param bytes - Size in bytes
 * @returns Formatted size string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Validate text length for Discord messages
 * @param text - Text to validate
 * @returns Validation result
 */
export function validateDiscordText(text: string): {
  isValid: boolean
  message?: string
  length: number
} {
  const maxLength = 2000
  const length = text.length
  
  if (length === 0) {
    return {
      isValid: false,
      message: 'Text cannot be empty',
      length
    }
  }
  
  if (length > maxLength) {
    return {
      isValid: false,
      message: `Text exceeds Discord's ${maxLength} character limit`,
      length
    }
  }
  
  return {
    isValid: true,
    length
  }
}
