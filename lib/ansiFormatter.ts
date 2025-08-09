/**
 * ANSI Text Formatter
 * Utilities for formatting text with ANSI color codes for Discord
 */

// ANSI color code mappings for Discord
const ANSI_COLORS: Record<string, { fg: string; bg: string; hex: string }> = {
  black: { fg: '30', bg: '40', hex: '#000000' },
  red: { fg: '31', bg: '41', hex: '#ff0000' },
  green: { fg: '32', bg: '42', hex: '#00ff00' },
  yellow: { fg: '33', bg: '43', hex: '#ffff00' },
  blue: { fg: '34', bg: '44', hex: '#0000ff' },
  magenta: { fg: '35', bg: '45', hex: '#ff00ff' },
  cyan: { fg: '36', bg: '46', hex: '#00ffff' },
  white: { fg: '37', bg: '47', hex: '#ffffff' },
  brightBlack: { fg: '90', bg: '100', hex: '#808080' },
  brightRed: { fg: '91', bg: '101', hex: '#ff8080' },
  brightGreen: { fg: '92', bg: '102', hex: '#80ff80' },
  brightYellow: { fg: '93', bg: '103', hex: '#ffff80' },
  brightBlue: { fg: '94', bg: '104', hex: '#8080ff' },
  brightMagenta: { fg: '95', bg: '105', hex: '#ff80ff' },
  brightCyan: { fg: '96', bg: '106', hex: '#80ffff' },
  brightWhite: { fg: '97', bg: '107', hex: '#ffffff' },
}

// Text formatting options
interface FormatOptions {
  bold?: boolean
  italic?: boolean
  underline?: boolean
}

// Parsed text segment interface
export interface TextSegment {
  text: string
  color?: string
  backgroundColor?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
}

/**
 * Format text with ANSI color codes and styling for Discord
 * @param text - The text to format
 * @param foregroundColor - Foreground color name
 * @param backgroundColor - Background color name
 * @param options - Additional formatting options
 * @returns Formatted text with ANSI codes
 */
export function formatTextWithColors(
  text: string,
  foregroundColor?: string,
  backgroundColor?: string,
  options: FormatOptions = {}
): string {
  if (!text) return ''

  const codes: string[] = []

  // Add formatting codes first
  if (options.bold) codes.push('1')
  if (options.italic) codes.push('3')
  if (options.underline) codes.push('4')

  // Add foreground color
  if (foregroundColor && ANSI_COLORS[foregroundColor]) {
    codes.push(ANSI_COLORS[foregroundColor].fg)
  }

  // Add background color
  if (backgroundColor && ANSI_COLORS[backgroundColor]) {
    codes.push(ANSI_COLORS[backgroundColor].bg)
  }

  // Apply ANSI codes if any formatting is specified
  if (codes.length > 0) {
    // Single ANSI escape sequence with all codes
    return `\u001b[${codes.join(';')}m${text}\u001b[0m`
  }

  return text
}

/**
 * Get the final formatted text ready for Discord
 * @param text - The text with inline ANSI codes
 * @returns Text wrapped in Discord ANSI code block
 */
export function getFinalFormattedText(text: string): string {
  // Clean up any duplicate reset codes
  const cleanedText = text.replace(/\u001b\[0m\u001b\[0m/g, '\u001b[0m')
  
  // Wrap in proper Discord ANSI code block
  return `\`\`\`ansi\n${cleanedText}\n\`\`\``
}

/**
 * Parse formatted text to extract styling information for preview
 * @param text - The formatted text with ANSI codes
 * @returns Array of text segments with styling information
 */
export function parseFormattedText(text: string): TextSegment[] {
  const segments: TextSegment[] = []
  
  // Remove ansi block wrapper if present
  let contentToProcess = text
  const ansiBlockMatch = text.match(/^\`\`\`ansi\n?(.*?)\n?\`\`\`$/s)
  if (ansiBlockMatch) {
    contentToProcess = ansiBlockMatch[1]
  }
  
  // Regular expression to match ANSI codes with escape sequences
  const ansiRegex = /\u001b\[([0-9;]+)m(.*?)(?=\u001b\[0m|\u001b\[[0-9;]+m|$)/g
  let lastIndex = 0
  let match

  while ((match = ansiRegex.exec(contentToProcess)) !== null) {
    // Add text before the ANSI block
    if (match.index > lastIndex) {
      const beforeText = contentToProcess.substring(lastIndex, match.index)
      if (beforeText) {
        segments.push({ text: beforeText })
      }
    }

    // Parse ANSI codes
    const codes = match[1].split(';')
    const segmentText = match[2]
    const segment: TextSegment = { text: segmentText }

    // Parse formatting codes
    codes.forEach(code => {
      switch (code) {
        case '1':
          segment.bold = true
          break
        case '3':
          segment.italic = true
          break
        case '4':
          segment.underline = true
          break
        default:
          // Check for color codes
          Object.entries(ANSI_COLORS).forEach(([colorName, colorData]) => {
            if (code === colorData.fg) {
              segment.color = colorData.hex
            } else if (code === colorData.bg) {
              segment.backgroundColor = colorData.hex
            }
          })
      }
    })

    segments.push(segment)
    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < contentToProcess.length) {
    const remainingText = contentToProcess.substring(lastIndex)
    if (remainingText) {
      // Remove any remaining reset codes
      const cleanText = remainingText.replace(/\u001b\[0m/g, '')
      if (cleanText) {
        segments.push({ text: cleanText })
      }
    }
  }

  // If no ANSI codes found, return the entire text as one segment
  if (segments.length === 0) {
    segments.push({ text: contentToProcess })
  }

  return segments
}

/**
 * Remove all ANSI formatting from text
 * @param text - The formatted text
 * @returns Plain text without formatting
 */
export function stripFormatting(text: string): string {
  // Remove ansi block wrapper
  let cleanText = text.replace(/^\`\`\`ansi\n?(.*?)\n?\`\`\`$/s, '$1')
  // Remove ANSI escape sequences
  cleanText = cleanText.replace(/\u001b\[[0-9;]*m/g, '')
  return cleanText
}

/**
 * Get available color names
 * @returns Array of available color names
 */
export function getAvailableColors(): string[] {
  return Object.keys(ANSI_COLORS)
}

/**
 * Get color hex value by name
 * @param colorName - The color name
 * @returns Hex color value or undefined
 */
export function getColorHex(colorName: string): string | undefined {
  return ANSI_COLORS[colorName]?.hex
}

/**
 * Create a demo text with multiple colors that work well in Discord
 * @returns Demo text with ANSI formatting
 */
export function createDemoText(): string {
  const demoText = 
    `Welcome to ` +
    `\u001b[1;33mChromaText\u001b[0m ` +
    `\u001b[1;36mDiscord\u001b[0m ` +
    `\u001b[1;31mF\u001b[0m\u001b[1;32mo\u001b[0m\u001b[1;33mr\u001b[0m\u001b[1;34mm\u001b[0m\u001b[1;35ma\u001b[0m\u001b[1;36mt\u001b[0m\u001b[1;37mt\u001b[0m\u001b[1;91me\u001b[0m\u001b[1;92mr\u001b[0m!`
  
  return getFinalFormattedText(demoText)
}

/**
 * Test different Discord ANSI combinations
 * @returns Test text with various formatting
 */
export function createTestText(): string {
  const testText = 
    `\u001b[31mRed Text\u001b[0m ` +
    `\u001b[1;32mBold Green\u001b[0m ` +
    `\u001b[4;34mUnderline Blue\u001b[0m ` +
    `\u001b[1;4;35mBold Underline Magenta\u001b[0m`
  
  return getFinalFormattedText(testText)
}
