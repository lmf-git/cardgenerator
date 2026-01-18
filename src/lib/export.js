// Handle print layout with settings
export async function prepareForPrint(cardElement, settings) {
  try {
    const printContainer = document.createElement('div');
    printContainer.style.cssText = `
      position: fixed;
      left: -9999px;
      top: 0;
      display: grid;
      grid-gap: ${settings.spaceBetween}mm;
      padding: ${settings.bleedMargin}mm;
      grid-template-columns: repeat(auto-fill, 63mm);
    `;

    // Create copies
    for (let i = 0; i < settings.copiesPerPage; i++) {
      const clone = cardElement.cloneNode(true);
      printContainer.appendChild(clone);
    }

    // Add to document temporarily
    document.body.appendChild(printContainer);
    return printContainer;
  } catch (error) {
    console.error('Error preparing print layout:', error);
    return null;
  }
}
