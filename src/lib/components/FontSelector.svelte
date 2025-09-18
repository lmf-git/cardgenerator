<script>
  import { onMount } from 'svelte';
  import { getAllFonts, loadGoogleFont, getFontFamilyCSS } from '../utils/googleFonts.js';

  export let selectedFont = 'ITCBenguiatStd';
  export let selectedFontType = 'local';
  export let label = 'Font';
  export let previewText = 'Sample Text';
  export let onFontChange = () => {};

  let fonts = [];
  let isLoading = false;
  let previewStyle = '';

  onMount(() => {
    fonts = getAllFonts();
    updatePreviewStyle();
  });

  async function handleFontChange(event) {
    const selectedValue = event.target.value;
    const [fontFamily, fontType] = selectedValue.split('|');

    selectedFont = fontFamily;
    selectedFontType = fontType;

    if (fontType === 'google') {
      isLoading = true;
      try {
        // Find the font weights for this Google Font
        const googleFont = fonts.find(f => f.family === fontFamily && f.type === 'google');
        if (googleFont) {
          // For now, just load with default weights
          await loadGoogleFont(fontFamily, '300,400,500,600,700');
        }
      } catch (error) {
        console.error('Failed to load font:', error);
      }
      isLoading = false;
    }

    updatePreviewStyle();
    onFontChange(fontFamily, fontType);
  }

  function updatePreviewStyle() {
    const fontFamily = getFontFamilyCSS(selectedFont, selectedFontType);
    previewStyle = `font-family: ${fontFamily}; font-size: 14px; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background: #f9f9f9; margin-top: 8px;`;
  }

  $: if (selectedFont && selectedFontType) {
    updatePreviewStyle();
  }
</script>

<div class="font-selector">
  <label for="font-select" class="font-label">{label}</label>

  <select
    id="font-select"
    class="font-select"
    value="{selectedFont}|{selectedFontType}"
    on:change={handleFontChange}
    disabled={isLoading}
  >
    {#each fonts as font}
      <option value="{font.family}|{font.type}">
        {font.label} {#if font.type === 'google'}(Google){/if}
      </option>
    {/each}
  </select>

  {#if isLoading}
    <div class="loading-indicator">Loading font...</div>
  {/if}

  <!-- Font Preview -->
  <div class="font-preview" style={previewStyle}>
    {previewText}
  </div>

  <small class="font-helper">
    {#if selectedFontType === 'google'}
      Google Font - loaded dynamically
    {:else}
      Local font - available in your system
    {/if}
  </small>
</div>

<style>
  .font-selector {
    margin-bottom: 1.25em;
  }

  .font-label {
    display: block;
    margin-bottom: 0.5em;
    font-weight: 500;
    color: #34495e;
    font-size: 0.875em;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .font-select {
    width: 100%;
    padding: 0.75em;
    border: 0.125em solid #e1e8ed;
    border-radius: 0.375em;
    font-size: 1em;
    box-sizing: border-box;
    font-family: inherit;
    background: #ffffff;
    transition: all 0.2s ease;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236c757d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1rem;
    padding-right: 2.5rem;
  }

  .font-select:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 0.1875em rgba(52, 152, 219, 0.15);
    background-color: #fbfcfd;
  }

  .font-select:hover:not(:focus) {
    border-color: #cbd6e0;
  }

  .font-select:disabled {
    background-color: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
  }

  .font-preview {
    margin-top: 0.5em;
    min-height: 2em;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
  }

  .loading-indicator {
    margin-top: 0.5em;
    padding: 0.5em;
    color: #6c757d;
    font-size: 0.875em;
    font-style: italic;
  }

  .font-helper {
    display: block;
    margin-top: 0.5em;
    font-size: 0.75em;
    color: #6c757d;
    font-style: italic;
  }
</style>