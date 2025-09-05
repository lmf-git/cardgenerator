import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Export card as PDF
export async function exportCardToPDF(cardElement, filename = 'ufs-card.pdf') {
  try {
    // Create high-quality canvas from the card element
    const canvas = await html2canvas(cardElement, {
      scale: 3, // High DPI for print quality
      useCORS: true,
      backgroundColor: '#ffffff',
      width: 750, // 2.5 inches * 300 DPI
      height: 1050, // 3.5 inches * 300 DPI
    });

    // Calculate dimensions for PDF (2.5" x 3.5" card)
    const cardWidth = 2.5; // inches
    const cardHeight = 3.5; // inches
    
    // Create PDF in portrait orientation with letter size
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter'
    });

    // Center the card on the page
    const pageWidth = 8.5; // letter width
    const pageHeight = 11; // letter height
    const x = (pageWidth - cardWidth) / 2;
    const y = (pageHeight - cardHeight) / 2;

    // Add the canvas image to PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', x, y, cardWidth, cardHeight);

    // Add crop marks for printing
    addCropMarks(pdf, x, y, cardWidth, cardHeight);

    // Save the PDF
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}

// Add crop marks to PDF for professional printing
function addCropMarks(pdf, x, y, width, height) {
  const markLength = 0.125; // 1/8 inch crop marks
  const markOffset = 0.0625; // 1/16 inch from card edge
  
  // Set line color and width for crop marks
  pdf.setDrawColor(0, 0, 0);
  pdf.setLineWidth(0.005);

  // Top-left crop marks
  pdf.line(x - markOffset - markLength, y - markOffset, x - markOffset, y - markOffset); // horizontal
  pdf.line(x - markOffset, y - markOffset - markLength, x - markOffset, y - markOffset); // vertical

  // Top-right crop marks  
  pdf.line(x + width + markOffset, y - markOffset, x + width + markOffset + markLength, y - markOffset); // horizontal
  pdf.line(x + width + markOffset, y - markOffset - markLength, x + width + markOffset, y - markOffset); // vertical

  // Bottom-left crop marks
  pdf.line(x - markOffset - markLength, y + height + markOffset, x - markOffset, y + height + markOffset); // horizontal
  pdf.line(x - markOffset, y + height + markOffset, x - markOffset, y + height + markOffset + markLength); // vertical

  // Bottom-right crop marks
  pdf.line(x + width + markOffset, y + height + markOffset, x + width + markOffset + markLength, y + height + markOffset); // horizontal
  pdf.line(x + width + markOffset, y + height + markOffset, x + width + markOffset, y + height + markOffset + markLength); // vertical
}

// Export card as high-resolution PNG image
export async function exportCardToPNG(cardElement, filename = 'ufs-card.png') {
  try {
    const canvas = await html2canvas(cardElement, {
      scale: 3, // 300 DPI equivalent
      useCORS: true,
      backgroundColor: '#ffffff',
      width: 750, // 2.5 inches * 300 DPI  
      height: 1050, // 3.5 inches * 300 DPI
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