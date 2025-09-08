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

    <div bind:this={cardPreviewRef} class="card-container">
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
</main>

<style>
  .container {
    max-width: 75em;
    margin: 0 auto;
    padding: 1.25em;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  header {
    text-align: center;
    margin-bottom: 1.875em;
  }

  header h1 {
    color: #2c3e50;
    margin-bottom: 0.625em;
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
    display: flex;
    gap: 1.25em;
    min-height: 37.5em;
    align-items: start;
  }

  .generator-panel {
    flex: 1;
    padding: 1.25em;
    height: fit-content;
    max-height: 80vh;
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
  }

  .generator-panel::-webkit-scrollbar {
    display: none; /* WebKit */
  }

  .card-container {
    flex: 0 0 25em; /* Fixed width of 400px instead of flexible */
    position: sticky;
    top: 1.25em;
    container-type: inline-size; /* Enable container queries */
  }

  /* Mobile styles */
  @media (max-width: 1024px) {
    .app-layout {
      flex-direction: column;
      gap: 1em;
    }

    .card-container {
      flex: none;
      width: 100%;
      position: static;
      order: -1; /* Show card above form on mobile */
    }

    .generator-panel {
      max-height: none;
      overflow-y: visible;
    }
  }



  .export-controls {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding: 15px;
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin-top: 1.25em;
    justify-content: center;
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


  /* Desktop: always show both panels regardless of hide-mobile class */

  /* Mobile responsive design */
  @media (max-width: 1024px) {
    .app-layout {
      flex-direction: column;
      gap: 20px;
    }

    .generator-panel {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      border: none;
      order: 2;
      max-height: none;
      overflow: visible;
      width: 100%;
      margin: 0;
    }

    .generator-panel.hide-mobile {
      display: block; /* Always show on mobile */
    }

    .preview-panel {
      order: 1;
      background: white;
      padding: 0;
      border-radius: 0;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 50vh;
      width: 100%;
      position: static;
    }

    .export-controls {
      position: static;
      bottom: auto;
      right: auto;
      background: #f8f9fa;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: none;
      z-index: auto;
      display: flex;
      gap: 10px;
      margin-top: 20px;
      justify-content: center;
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
      padding: 5px;
    }

    header h1 {
      font-size: 1.8em;
    }

    .generator-panel {
      padding: 10px;
      border-radius: 0;
      background: white;
    }

    .preview-panel {
      padding: 0;
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