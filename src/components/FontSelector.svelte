<script>
  import { availableGoogleFonts, availableLocalFonts } from '../lib/fonts.js';

  const props = $props();
  let currentFont = $state(props.selectedFont || '');
  let currentFontType = $state(props.selectedFontType || 'local');
  let fonts = $derived(currentFontType === 'google' ? availableGoogleFonts : availableLocalFonts);

  function handleFontTypeChange(event) {
    currentFontType = event.target.value;
    if (!fonts.includes(currentFont)) {
      currentFont = fonts[0];
      props.onFontChange?.(currentFont, currentFontType);
    }
  }

  function handleFontChange(event) {
    currentFont = event.target.value;
    props.onFontChange?.(currentFont, currentFontType);
  }

  const fontTypeId = crypto.randomUUID();
  const fontSelectId = crypto.randomUUID();
</script>

<div class="font-selector">
  <label class="font-label" for={fontSelectId}>{props.label || 'Font'}</label>
  
  <div class="selector-group">
    <select 
      id={fontTypeId}
      class="font-type-select" 
      value={currentFontType} 
      onchange={handleFontTypeChange}
      aria-label="Font type"
    >
      <option value="local">Local Font</option>
      <option value="google">Google Font</option>
    </select>

    <select 
      id={fontSelectId}
      class="font-select" 
      value={currentFont} 
      onchange={handleFontChange}
    >
      {#each fonts as font}
        <option value={font}>{font}</option>
      {/each}
    </select>
  </div>

  <div class="font-preview" style="font-family: {currentFont}">
    {props.previewText || 'Preview Text'}
  </div>
</div>

<style>
  .font-selector {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .font-label {
    font-weight: 500;
    color: #34495e;
    font-size: 0.875em;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .selector-group {
    display: flex;
    gap: 0.5em;
  }

  .font-type-select,
  .font-select {
    padding: 0.5em;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9em;
  }

  .font-type-select {
    flex: 1;
  }

  .font-select {
    flex: 2;
  }

  .font-preview {
    padding: 0.5em;
    border: 1px dashed #ddd;
    border-radius: 4px;
    min-height: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
    font-size: 1.1em;
  }
</style>
