<script>
  import { cardData, printSettings } from '../lib/stores.js';
  import CardGenerator from '../components/CardGenerator.svelte';
  import CardPreview from '../components/CardPreview.svelte';
  import PrintLayout from '../components/PrintLayout.svelte';
  import { exportCardToPDF, exportCardToPNG } from '../lib/export.js';
  import { downloadJSON, readJSONFile } from '../lib/io.js';

  let showEditMobile = $state(false);
  let cardPreviewRef = $state(null);
  let isExporting = $state(false);
  let showPrintLayout = $state(false);

  // Export functions
  async function exportToPDF() {
    if (!cardPreviewRef) return;
    
    isExporting = true;
    const cardElement = cardPreviewRef.querySelector('.ufs-card');
    const success = await exportCardToPDF(cardElement, `${$cardData.name || 'ufs-card'}.pdf`, $printSettings);
    
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

  // Save/Load functions
  function saveConfig() {
    const filename = `${$cardData.name || 'ufs-card'}-config.json`;
    downloadJSON($cardData, filename);
  }

  async function loadConfig(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const data = await readJSONFile(file);
      cardData.set(data);
      alert('Configuration loaded successfully!');
    } catch (error) {
      alert('Error loading configuration: ' + error.message);
    }
    event.target.value = ''; // Reset file input
  }

</script>

{#if showPrintLayout}
  <PrintLayout onClose={() => showPrintLayout = false} />
{:else}
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

      <div class="print-settings">
        <h3>Print Settings</h3>
        <div class="settings-grid">
          <div class="setting-group">
            <label for="copies">Copies per page</label>
            <input
              id="copies"
              type="number"
              min="1"
              max="9"
              bind:value={$printSettings.copiesPerPage}
            />
          </div>

          <div class="setting-group">
            <label for="bleed">Bleed margin (mm)</label>
            <input
              id="bleed"
              type="number"
              min="0"
              max="12"
              step="1"
              bind:value={$printSettings.bleedMargin}
            />
          </div>

          <div class="setting-group">
            <label for="space">Space between cards (mm)</label>
            <input
              id="space"
              type="number"
              min="0"
              max="25"
              step="1"
              bind:value={$printSettings.spaceBetween}
            />
          </div>
        </div>
      </div>

      <div class="export-controls">
        <button onclick={() => showPrintLayout = true} class="print-btn">
          Print Layout
        </button>
        <button onclick={exportToPDF} class="export-btn" disabled={isExporting}>
          {isExporting ? 'Exporting...' : 'PDF'}
        </button>
        <button onclick={exportToPNG} class="export-btn" disabled={isExporting}>
          {isExporting ? 'Exporting...' : 'PNG'}
        </button>
        <button onclick={saveConfig} class="config-btn save-btn">
          💾 Save
        </button>
        <label class="config-btn load-btn">
          📂 Load
          <input
            type="file"
            accept=".json"
            onchange={loadConfig}
            style="display: none;"
          />
        </label>
      </div>
    </div>

    <div bind:this={cardPreviewRef} class="card-container">
      <CardPreview />
    </div>
  </div>
</main>
{/if}

<style>
  :global(html), :global(body) {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }

  .container {
    max-width: 75em;
    margin: 0 auto;
    padding: 1.25em;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
  }

  header {
    text-align: center;
    margin-bottom: 1em;
    flex-shrink: 0;
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
    flex: 1;
    min-height: 0;
    align-items: stretch;
  }

  .generator-panel {
    flex: 1;
    padding: 1.25em;
    overflow-y: auto;
    min-height: 0;
  }

  .card-container {
    flex: 0 0 66mm; /* Fixed width to accommodate 63mm card + margin */
    position: sticky;
    top: 1.25em;
    display: flex;
    justify-content: center;
    /* Container queries now handled by the card itself */
  }

  /* Mobile styles */
  @media (max-width: 1024px) {
    .container {
      height: auto;
      max-height: 100vh;
      overflow-y: auto;
    }

    .app-layout {
      flex-direction: column;
      gap: 1em;
      flex: none;
    }

    .card-container {
      flex: none;
      position: static;
      order: -1;
      width: 100%;
    }

    .generator-panel {
      flex: none;
      overflow-y: visible;
    }
  }



  .export-controls {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding: 15px;
    background: #e9ecef;
    border-radius: 8px;
    margin-top: 1.25em;
    justify-content: center;
  }


  .print-btn, .export-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
    white-space: nowrap;
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

  .config-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .save-btn {
    background: #2ecc71;
    color: white;
  }

  .save-btn:hover {
    background: #27ae60;
  }

  .load-btn {
    background: #3498db;
    color: white;
    display: inline-block;
  }

  .load-btn:hover {
    background: #2980b9;
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
      max-height: 70vh;
      overflow-y: auto;
      margin: 0;
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


    .print-btn, .export-btn {
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

  /* Print Styles - Hide main content, let PrintLayout handle printing */
  @media print {
    .container {
      display: none;
    }
  }

  .print-settings {
    margin-top: 1.5em;
    padding: 15px;
    background: #e9ecef;
    border-radius: 8px;
  }

  .print-settings h3 {
    margin: 0 0 15px 0;
    color: #2c3e50;
    font-size: 1.1em;
  }

  .settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }

  .setting-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .setting-group label {
    font-size: 0.9em;
    color: #495057;
  }

  .setting-group input {
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 0.9em;
  }

  .setting-group input:focus {
    outline: none;
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.2rem rgba(13,110,253,.25);
  }

  @media (max-width: 768px) {
    .settings-grid {
      grid-template-columns: 1fr;
    }
  }
</style>