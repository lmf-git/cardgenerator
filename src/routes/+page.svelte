<script>
  import { cardData, printSettings } from '../lib/stores.js';
  import CardGenerator from '../lib/components/CardGenerator.svelte';
  import CardPreview from '../lib/components/CardPreview.svelte';
  import { exportCardToPDF, exportCardToPNG } from '../lib/export.js';

  let showEditMobile = $state(false);
  let cardPreviewRef = $state(null);
  let isExporting = $state(false);

  // Export functions
  async function exportToPDF() {
    if (!cardPreviewRef) return;
    
    isExporting = true;
    const cardElement = cardPreviewRef.querySelector('.ufs-card');
    const success = await exportCardToPDF(cardElement, `${$cardData.name || 'ufs-card'}.pdf`);
    
    if (success) {
      alert('PDF exported successfully!');
    } else {
      alert('Failed to export PDF. Please try again.');
    }
    isExporting = false;
  }

  async function exportToPNG() {
    if (!cardPreviewRef) return;
    
    isExporting = true;
    const cardElement = cardPreviewRef.querySelector('.ufs-card');
    const success = await exportCardToPNG(cardElement, `${$cardData.name || 'ufs-card'}.png`);
    
    if (success) {
      alert('PNG exported successfully!');
    } else {
      alert('Failed to export PNG. Please try again.');
    }
    isExporting = false;
  }
</script>

<main class="container">
  <header>
    <h1>
      <span class="title-full">Universal Fighting System Card Generator</span>
      <span class="title-mobile">UFS Card Generator</span>
    </h1>
    <p>Create and print custom UFS cards</p>
  </header>

  <div class="app-layout">
    <div class="generator-panel" class:hide-mobile={!showEditMobile}>
      <CardGenerator />
    </div>

    <div class="preview-panel">
      <div class="preview-controls">
        <div class="mobile-edit-toggle">
          <button 
            onclick={() => showEditMobile = !showEditMobile}
            class="edit-btn"
          >
            {showEditMobile ? '👁️ Preview' : '✏️ Edit'}
          </button>
        </div>
      </div>

      <div bind:this={cardPreviewRef} class="preview-container">
        <CardPreview />
      </div>
    </div>

    <div class="export-controls">
      <button onclick={() => window.print()} class="print-btn">
        🖨️ Print
      </button>
      <button onclick={exportToPDF} class="export-btn" disabled={isExporting}>
        {isExporting ? 'Exporting...' : '📄 PDF'}
      </button>
      <button onclick={exportToPNG} class="export-btn" disabled={isExporting}>
        {isExporting ? 'Exporting...' : '🖼️ PNG'}
      </button>
    </div>
  </div>
</main>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  header {
    text-align: center;
    margin-bottom: 30px;
  }

  header h1 {
    color: #2c3e50;
    margin-bottom: 10px;
  }

  .title-mobile {
    display: none;
  }

  .title-full {
    display: inline;
  }

  header p {
    color: #7f8c8d;
    font-size: 1.1em;
  }

  .app-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    min-height: 600px;
    align-items: start;
  }

  .generator-panel {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #e9ecef;
    height: fit-content;
    max-height: 80vh;
    overflow-y: auto;
  }

  .preview-panel {
    background: #ffffff;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #e9ecef;
    position: sticky;
    top: 20px;
    position: relative; /* For absolute positioned export controls */
  }

  .preview-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: space-between;
    align-items: center;
  }

  .mobile-edit-toggle {
    display: none;
  }

  .export-controls {
    position: absolute;
    bottom: -60px;
    right: 0;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .edit-btn, .print-btn, .export-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .edit-btn {
    background: #3498db;
    color: white;
  }

  .edit-btn:hover {
    background: #2980b9;
  }

  .print-btn {
    background: #27ae60;
    color: white;
  }

  .print-btn:hover {
    background: #229954;
  }

  .export-btn {
    background: #8e44ad;
    color: white;
  }

  .export-btn:hover:not(:disabled) {
    background: #7d3c98;
  }

  .export-btn:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }

  .preview-container {
    display: block;
  }

  /* Desktop: always show both panels regardless of hide-mobile class */

  /* Mobile responsive design */
  @media (max-width: 1024px) {
    .app-layout {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .generator-panel {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      order: 2;
      max-height: none;
      overflow: visible;
    }

    .generator-panel.hide-mobile {
      display: block; /* Always show on mobile */
    }

    .preview-panel {
      order: 1;
      background: white;
      padding: 0;
      border-radius: 0;
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 50vh;
    }

    .mobile-edit-toggle {
      display: none; /* Hide toggle buttons on mobile */
    }

    .preview-controls {
      position: static;
      margin-bottom: 15px;
      padding: 15px;
      border-bottom: none;
      box-shadow: none;
      order: 3;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .export-controls {
      position: static;
      bottom: auto;
      left: auto;
      right: auto;
      background: #f8f9fa;
      padding: 15px;
      border-top: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: none;
      z-index: auto;
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    .title-mobile {
      display: inline;
    }

    .title-full {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 10px;
    }

    header h1 {
      font-size: 1.8em;
    }

    .generator-panel,
    .preview-panel {
      padding: 15px;
    }

    .edit-btn, .print-btn, .export-btn {
      flex: 1;
      min-height: 48px; /* Better touch targets */
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 5px;
    }

    header {
      margin-bottom: 15px;
    }

    header h1 {
      font-size: 1.5em;
    }

    .app-layout {
      gap: 15px;
    }
  }

  @media print {
    .container {
      max-width: none;
      margin: 0;
      padding: 0;
    }

    .app-layout {
      grid-template-columns: 1fr;
      gap: 0;
    }

    .generator-panel {
      display: none;
    }

    .preview-controls {
      display: none;
    }

    .preview-panel {
      background: white;
      border: none;
      padding: 0;
    }
  }
</style>