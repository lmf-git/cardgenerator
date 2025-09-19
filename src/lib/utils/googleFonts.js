// Google Fonts utility for dynamic font loading
import { writable } from 'svelte/store';

// Store for loaded fonts
export const loadedFonts = writable(new Set());

// Popular Google Fonts suitable for card names and types
export const GOOGLE_FONTS = [
  { family: 'Inter', weight: '400,500,600,700' },
  { family: 'Roboto', weight: '400,500,700' },
  { family: 'Lato', weight: '400,700' },
  { family: 'Montserrat', weight: '400,500,600,700' },
  { family: 'Poppins', weight: '400,500,600,700' },
  { family: 'Nunito', weight: '400,600,700' },
  { family: 'Oswald', weight: '400,500,600,700' },
  { family: 'Merriweather', weight: '400,700' },
  { family: 'Lora', weight: '400,500,700' },
  { family: 'Raleway', weight: '400,500,600,700' },
  { family: 'Ubuntu', weight: '400,500,700' },
  { family: 'Cabin', weight: '400,500,600,700' },
  { family: 'Arimo', weight: '400,700' },
  { family: 'Tinos', weight: '400,700' },
  { family: 'Vollkorn', weight: '400,700' },
  { family: 'Alegreya', weight: '400,700' },
  { family: 'Karla', weight: '400,700' },
  { family: 'Bitter', weight: '400,700' },
  { family: 'Cinzel', weight: '400,600' },
  { family: 'Anton', weight: '400' },
  { family: 'Bangers', weight: '400' },
  { family: 'Righteous', weight: '400' }
];

// Default local fonts (current implementation)
export const LOCAL_FONTS = [
  { family: 'ITCBenguiatStd', label: 'ITC Benguiat (Default)' },
  { family: 'OPTICopperplate-Light', label: 'OPTI Copperplate Light' },
  { family: 'Arial', label: 'Arial' },
  { family: 'Times New Roman', label: 'Times New Roman' },
  { family: 'Georgia', label: 'Georgia' },
  { family: 'Helvetica', label: 'Helvetica' }
];

/**
 * Load a Google Font dynamically
 * @param {string} fontFamily - The font family name
 * @param {string} weights - Font weights to load (e.g., "300,400,700")
 * @returns {Promise<void>}
 */
export async function loadGoogleFont(fontFamily, weights = '400') {
  return new Promise((resolve) => {
    // Check if font is already loaded
    loadedFonts.update(fonts => {
      if (fonts.has(fontFamily)) {
        resolve();
        return fonts;
      }

      // Create a link element to load the font
      const link = document.createElement('link');
      link.rel = 'stylesheet';

      // Properly encode font family name for Google Fonts API
      // Replace spaces with + and handle special characters
      const encodedFamily = fontFamily.replace(/\s+/g, '+');
      link.href = `https://fonts.googleapis.com/css2?family=${encodedFamily}:wght@${weights}&display=swap`;

      link.onload = () => {
        loadedFonts.update(fonts => {
          fonts.add(fontFamily);
          return fonts;
        });
        resolve();
      };

      link.onerror = () => {
        console.warn(`Failed to load Google Font: ${fontFamily}, using fallback`);
        // Don't reject, just resolve to allow fallback fonts to work
        resolve();
      };

      document.head.appendChild(link);
      return fonts;
    });
  });
}

/**
 * Preload multiple Google Fonts
 * @param {Array<{family: string, weight: string}>} fonts - Array of font objects
 */
export async function preloadGoogleFonts(fonts) {
  const loadPromises = fonts.map(font =>
    loadGoogleFont(font.family, font.weight)
  );

  try {
    await Promise.all(loadPromises);
    console.log('All Google Fonts loaded successfully');
  } catch (error) {
    console.error('Some fonts failed to load:', error);
  }
}

/**
 * Get all available fonts (local + Google)
 * @returns {Array<{family: string, label: string, type: 'local'|'google'}>}
 */
export function getAllFonts() {
  const localFonts = LOCAL_FONTS.map(font => ({
    ...font,
    type: 'local'
  }));

  const googleFonts = GOOGLE_FONTS.map(font => ({
    family: font.family,
    label: font.family,
    type: 'google'
  }));

  return [...localFonts, ...googleFonts];
}

/**
 * Apply font to an element with proper fallbacks
 * @param {string} fontFamily - The font family to apply
 * @param {string} type - 'local' or 'google'
 * @returns {string} CSS font-family value with fallbacks
 */
export function getFontFamilyCSS(fontFamily, type = 'google') {
  if (type === 'local') {
    switch (fontFamily) {
      case 'ITCBenguiatStd':
        return "'ITCBenguiatStd', serif";
      case 'OPTICopperplate-Light':
        return "'OPTICopperplate-Light', sans-serif";
      default:
        return `${fontFamily}, sans-serif`;
    }
  } else {
    // Google fonts get generic fallbacks
    const serif = ['Merriweather', 'Playfair Display', 'Crimson Text', 'Lora', 'PT Serif', 'Libre Baskerville', 'Tinos', 'Vollkorn', 'Alegreya', 'Cormorant Garamond'];
    const fallback = serif.includes(fontFamily) ? 'serif' : 'sans-serif';
    return `'${fontFamily}', ${fallback}`;
  }
}