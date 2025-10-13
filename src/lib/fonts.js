export function getFontFamilyCSS(fontFamily, fontType = 'local') {
  if (fontType === 'google') {
    return `"${fontFamily}", Arial, sans-serif`;
  }
  return fontFamily;
}

export const availableGoogleFonts = [
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Oswald',
  'Source Sans Pro',
  'Raleway',
  'PT Sans',
  'Noto Sans',
  'Ubuntu'
];

export const availableLocalFonts = [
  'ITCBenguiatStd',
  'OPTICopperplate-Light',
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia'
];
