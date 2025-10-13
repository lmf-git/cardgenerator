import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Export card as PDF
export async function exportCardToPDF(cardElement, filename = 'ufs-card.pdf', settings = {
  copiesPerPage: 1,
  bleedMargin: 0.125,
  spaceBetween: 0.25
}) {
  try {
    // Get the exact bounds of the card element
    const rect = cardElement.getBoundingClientRect();
    
    // Create high-quality canvas from the card element with precise cropping
    const canvas = await html2canvas(cardElement, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff',
      x: 0,
      y: 0,
      width: rect.width,
      height: rect.height,
      scrollX: 0,
      scrollY: 0
    });

    // Card dimensions (2.5" x 3.5")
    const cardWidth = 2.5;
    const cardHeight = 3.5;
    
    // Page dimensions (letter size)
    const pageWidth = 8.5;
    const pageHeight = 11;

    // Calculate max cards per row and column based on settings
    const totalCardWidth = cardWidth + (2 * settings.bleedMargin) + settings.spaceBetween;
    const totalCardHeight = cardHeight + (2 * settings.bleedMargin) + settings.spaceBetween;
    
    const cardsPerRow = Math.floor((pageWidth - settings.spaceBetween) / totalCardWidth);
    const cardsPerColumn = Math.floor((pageHeight - settings.spaceBetween) / totalCardHeight);
    const maxCardsPerPage = cardsPerRow * cardsPerColumn;

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter'
    });

    let currentPage = 1;
    let cardsPlaced = 0;

    while (cardsPlaced < settings.copiesPerPage) {
      if (cardsPlaced > 0 && cardsPlaced % maxCardsPerPage === 0) {
        pdf.addPage();
        currentPage++;
      }

      const pagePosition = cardsPlaced % maxCardsPerPage;
      const row = Math.floor(pagePosition / cardsPerRow);
      const col = pagePosition % cardsPerRow;

      const x = settings.spaceBetween + col * totalCardWidth + settings.bleedMargin;
      const y = settings.spaceBetween + row * totalCardHeight + settings.bleedMargin;

      // Add the card image
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', x, y, cardWidth, cardHeight);

      // Add crop marks
      addCropMarks(pdf, x, y, cardWidth, cardHeight, settings.bleedMargin);

      cardsPlaced++;
    }

    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}

// Update crop marks to include bleed margin
function addCropMarks(pdf, x, y, width, height, bleed) {
  const markLength = 0.125;
  const markOffset = bleed;
  
  pdf.setDrawColor(0, 0, 0);
  pdf.setLineWidth(0.005);

  // Top-left crop marks
  pdf.line(x - markOffset, y - markOffset, x - markOffset + markLength, y - markOffset);
  pdf.line(x - markOffset, y - markOffset, x - markOffset, y - markOffset + markLength);

  // Top-right crop marks
  pdf.line(x + width + markOffset - markLength, y - markOffset, x + width + markOffset, y - markOffset);
  pdf.line(x + width + markOffset, y - markOffset, x + width + markOffset, y - markOffset + markLength);

  // Bottom-left crop marks
  pdf.line(x - markOffset, y + height + markOffset - markLength, x - markOffset, y + height + markOffset);
  pdf.line(x - markOffset, y + height + markOffset, x - markOffset + markLength, y + height + markOffset);

  // Bottom-right crop marks
  pdf.line(x + width + markOffset - markLength, y + height + markOffset, x + width + markOffset, y + height + markOffset);
  pdf.line(x + width + markOffset, y + height + markOffset, x + width + markOffset, y + height + markOffset - markLength);
}

// Export card as high-resolution PNG image
export async function exportCardToPNG(cardElement, filename = 'ufs-card.png') {
  try {
    // Get the exact bounds of the card element
    const rect = cardElement.getBoundingClientRect();

    const canvas = await html2canvas(cardElement, {
      scale: 3, // 300 DPI equivalent
      useCORS: true,
      backgroundColor: '#ffffff',
      x: 0,
      y: 0,
      width: rect.width,
      height: rect.height,
      scrollX: 0,
      scrollY: 0
    });

    // Convert to blob and download
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png', 1.0);
    
    return true;
  } catch (error) {
    console.error('Error generating PNG:', error);
    return false;
  }
}

// Handle print layout with settings
export async function prepareForPrint(cardElement, settings) {
  try {
    const printContainer = document.createElement('div');
    printContainer.style.cssText = `
      position: fixed;
      left: -9999px;
      top: 0;
      display: grid;
      grid-gap: ${settings.spaceBetween}in;
      padding: ${settings.bleedMargin}in;
      grid-template-columns: repeat(auto-fill, 2.5in);
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