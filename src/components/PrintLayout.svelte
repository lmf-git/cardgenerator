<script>
  import { printSettings } from '../lib/stores.js';
  import CardPreview from './CardPreview.svelte';

  let { onClose } = $props();

  // A4 dimensions in mm
  const pageWidth = 210;
  const pageHeight = 297;

  // Card dimensions
  const cardWidth = 63;
  const cardHeight = 88;

  // Calculate grid layout using all print settings
  function calculateLayout(settings) {
    // Total space each card needs including bleed and spacing
    const totalCardWidth = cardWidth + (2 * settings.bleedMargin) + settings.spaceBetween;
    const totalCardHeight = cardHeight + (2 * settings.bleedMargin) + settings.spaceBetween;

    // Page margins: need space for bleed/crop marks + printer safe margin
    // Minimum 10mm for printer safety (most printers can't print to edge)
    const minMargin = 10;
    const pageMargin = Math.max(minMargin, settings.bleedMargin + 3, settings.spaceBetween);

    const availableWidth = pageWidth - (2 * pageMargin) + settings.spaceBetween;
    const availableHeight = pageHeight - (2 * pageMargin) + settings.spaceBetween;

    const cardsPerRow = Math.floor(availableWidth / totalCardWidth);
    const cardsPerColumn = Math.floor(availableHeight / totalCardHeight);
    const maxCardsPerPage = Math.max(1, cardsPerRow * cardsPerColumn);

    return { cardsPerRow, cardsPerColumn, maxCardsPerPage, pageMargin };
  }

  let layout = $derived(calculateLayout($printSettings));
  let totalPages = $derived(Math.ceil($printSettings.copiesPerPage / layout.maxCardsPerPage));

  function getCardPositions(pageIndex) {
    const positions = [];
    const startIndex = pageIndex * layout.maxCardsPerPage;
    const endIndex = Math.min(startIndex + layout.maxCardsPerPage, $printSettings.copiesPerPage);

    const bleed = $printSettings.bleedMargin;
    const space = $printSettings.spaceBetween;
    const totalCardWidth = cardWidth + (2 * bleed) + space;
    const totalCardHeight = cardHeight + (2 * bleed) + space;

    for (let i = startIndex; i < endIndex; i++) {
      const localIndex = i - startIndex;
      const row = Math.floor(localIndex / layout.cardsPerRow);
      const col = localIndex % layout.cardsPerRow;

      // Position includes page margin + bleed margin for this card
      const x = layout.pageMargin + bleed + col * totalCardWidth;
      const y = layout.pageMargin + bleed + row * totalCardHeight;

      positions.push({ x, y, index: i });
    }

    return positions;
  }

  function handlePrint() {
    window.print();
  }

  // Crop mark offset based on bleed margin
  let cropOffset = $derived(Math.max(3, $printSettings.bleedMargin));
</script>

<div class="print-layout-page">
  <div class="toolbar no-print">
    <button class="back-btn" onclick={onClose}>← Back to Editor</button>
    <div class="page-info">
      <span>{$printSettings.copiesPerPage} card{$printSettings.copiesPerPage > 1 ? 's' : ''} on {totalPages} page{totalPages > 1 ? 's' : ''}</span>
      <span class="settings-info">Page margin: {layout.pageMargin}mm | Bleed: {$printSettings.bleedMargin}mm | Space: {$printSettings.spaceBetween}mm</span>
    </div>
    <button class="print-btn" onclick={handlePrint}>Print</button>
  </div>

  <div class="pages-container no-print">
    {#each Array(totalPages) as _, pageIndex}
      <div class="page-wrapper">
        <div class="a4-page">
          {#each getCardPositions(pageIndex) as pos}
            <div
              class="card-slot"
              style="left: {pos.x}mm; top: {pos.y}mm;"
            >
              {#if $printSettings.bleedMargin > 0}
                <div class="crop-mark top-left" style="top: -{cropOffset}mm; left: -{cropOffset}mm;"></div>
                <div class="crop-mark top-right" style="top: -{cropOffset}mm; right: -{cropOffset}mm;"></div>
                <div class="crop-mark bottom-left" style="bottom: -{cropOffset}mm; left: -{cropOffset}mm;"></div>
                <div class="crop-mark bottom-right" style="bottom: -{cropOffset}mm; right: -{cropOffset}mm;"></div>
              {/if}
              <CardPreview />
            </div>
          {/each}
        </div>
        {#if totalPages > 1}
          <div class="page-label">Page {pageIndex + 1}</div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<!-- Print-only content - completely separate from screen display -->
<div class="print-only">
  {#each Array(totalPages) as _, pageIndex}
    <div class="print-page">
      {#each getCardPositions(pageIndex) as pos}
        <div
          class="print-card-slot"
          style="left: {pos.x}mm; top: {pos.y}mm;"
        >
          {#if $printSettings.bleedMargin > 0}
            <div class="crop-mark top-left" style="top: -{cropOffset}mm; left: -{cropOffset}mm;"></div>
            <div class="crop-mark top-right" style="top: -{cropOffset}mm; right: -{cropOffset}mm;"></div>
            <div class="crop-mark bottom-left" style="bottom: -{cropOffset}mm; left: -{cropOffset}mm;"></div>
            <div class="crop-mark bottom-right" style="bottom: -{cropOffset}mm; right: -{cropOffset}mm;"></div>
          {/if}
          <CardPreview />
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .print-layout-page {
    min-height: 100vh;
    background: #2c3e50;
  }

  .toolbar {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    background: #34495e;
    border-bottom: 1px solid #2c3e50;
  }

  .back-btn {
    padding: 10px 20px;
    background: #6c757d;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .back-btn:hover {
    background: #5a6268;
  }

  .page-info {
    color: #ecf0f1;
    font-size: 14px;
    text-align: center;
  }

  .settings-info {
    display: block;
    font-size: 12px;
    color: #bdc3c7;
    margin-top: 2px;
  }

  .print-btn {
    padding: 10px 24px;
    background: #27ae60;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .print-btn:hover {
    background: #229954;
  }

  .pages-container {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }

  .page-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .a4-page {
    width: 210mm;
    height: 297mm;
    background: white;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    transform-origin: top center;
    transform: scale(0.45);
    margin-bottom: calc(-297mm * 0.55);
  }

  .page-label {
    color: #bdc3c7;
    font-size: 14px;
    margin-top: calc(-297mm * 0.55 + 8px);
  }

  .card-slot, .print-card-slot {
    position: absolute;
    width: 63mm;
    height: 88mm;
  }

  /* Crop marks */
  .crop-mark {
    position: absolute;
    z-index: 10;
  }

  .crop-mark::before,
  .crop-mark::after {
    content: '';
    position: absolute;
    background: black;
  }

  .crop-mark.top-left::before {
    width: 3mm;
    height: 0.2mm;
    bottom: 0;
    right: 0;
  }
  .crop-mark.top-left::after {
    width: 0.2mm;
    height: 3mm;
    bottom: 0;
    right: 0;
  }

  .crop-mark.top-right::before {
    width: 3mm;
    height: 0.2mm;
    bottom: 0;
    left: 0;
  }
  .crop-mark.top-right::after {
    width: 0.2mm;
    height: 3mm;
    bottom: 0;
    left: 0;
  }

  .crop-mark.bottom-left::before {
    width: 3mm;
    height: 0.2mm;
    top: 0;
    right: 0;
  }
  .crop-mark.bottom-left::after {
    width: 0.2mm;
    height: 3mm;
    top: 0;
    right: 0;
  }

  .crop-mark.bottom-right::before {
    width: 3mm;
    height: 0.2mm;
    top: 0;
    left: 0;
  }
  .crop-mark.bottom-right::after {
    width: 0.2mm;
    height: 3mm;
    top: 0;
    left: 0;
  }

  /* Print-only content - hidden on screen */
  .print-only {
    display: none;
  }

  /* Print styles */
  @media print {
    .print-layout-page {
      display: none;
    }

    .print-only {
      display: block;
      position: static;
      margin: 0;
      padding: 0;
    }

    .print-page {
      width: 210mm;
      min-height: 200mm;
      max-height: 297mm;
      position: relative;
      overflow: visible;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      page-break-after: always;
      page-break-inside: avoid;
    }

    .print-page:last-child {
      page-break-after: avoid;
    }

    .print-only {
      overflow: visible;
    }

    .print-card-slot {
      position: absolute;
      width: 63mm;
      height: 88mm;
    }

    * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      box-sizing: border-box;
    }

    @page {
      size: A4;
      margin: 0;
    }

    :global(html),
    :global(body) {
      margin: 0;
      padding: 0;
      width: 210mm;
      height: auto;
      overflow: visible;
    }
  }

  /* Responsive scaling */
  @media screen and (max-width: 900px) {
    .a4-page {
      transform: scale(0.35);
      margin-bottom: calc(-297mm * 0.65);
    }
    .page-label {
      margin-top: calc(-297mm * 0.65 + 8px);
    }
  }

  @media screen and (max-width: 600px) {
    .a4-page {
      transform: scale(0.25);
      margin-bottom: calc(-297mm * 0.75);
    }
    .page-label {
      margin-top: calc(-297mm * 0.75 + 8px);
    }

    .toolbar {
      padding: 10px 12px;
      flex-wrap: wrap;
      gap: 8px;
    }

    .page-info {
      order: 3;
      width: 100%;
      text-align: center;
    }
  }
</style>
