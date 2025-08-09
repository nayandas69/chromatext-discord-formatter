/**
 * Clipboard Utilities
 * Modern clipboard API with fallback support
 */

/**
 * Copy text to clipboard using modern API with fallback
 * @param text - Text to copy to clipboard
 * @returns Promise that resolves when copy is successful
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Check if modern Clipboard API is available
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers or non-secure contexts
      return fallbackCopyTextToClipboard(text)
    }
  } catch (err) {
    console.error('Failed to copy text: ', err)
    return fallbackCopyTextToClipboard(text)
  }
}

/**
 * Fallback copy method for older browsers
 * @param text - Text to copy
 * @returns Success status
 */
function fallbackCopyTextToClipboard(text: string): boolean {
  try {
    const textArea = document.createElement('textarea')
    textArea.value = text
    
    // Avoid scrolling to bottom
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    const successful = document.execCommand('copy')
    document.body.removeChild(textArea)
    
    return successful
  } catch (err) {
    console.error('Fallback copy failed: ', err)
    return false
  }
}

/**
 * Check if clipboard API is supported
 * @returns Boolean indicating clipboard support
 */
export function isClipboardSupported(): boolean {
  return !!(navigator.clipboard && window.isSecureContext) || 
         !!(document.queryCommandSupported && document.queryCommandSupported('copy'))
}

/**
 * Read text from clipboard (if permissions allow)
 * @returns Promise with clipboard text or null
 */
export async function readFromClipboard(): Promise<string | null> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      const text = await navigator.clipboard.readText()
      return text
    }
    return null
  } catch (err) {
    console.error('Failed to read from clipboard: ', err)
    return null
  }
}
