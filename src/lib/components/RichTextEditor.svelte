<script>
  export let value = '';
  export let placeholder = 'Enter text...';

  let textareaEl;
  let selection = { start: 0, end: 0 };

  function handleSelectionChange() {
    if (textareaEl) {
      selection = {
        start: textareaEl.selectionStart,
        end: textareaEl.selectionEnd
      };
    }
  }

  function wrapSelection(beforeTag, afterTag) {
    if (!textareaEl) return;
    
    const start = textareaEl.selectionStart;
    const end = textareaEl.selectionEnd;
    const selectedText = value.substring(start, end);
    
    if (selectedText) {
      const newValue = 
        value.substring(0, start) + 
        beforeTag + selectedText + afterTag + 
        value.substring(end);
      
      value = newValue;
      
      // Update cursor position after the inserted tags
      setTimeout(() => {
        textareaEl.focus();
        textareaEl.setSelectionRange(
          start + beforeTag.length, 
          end + beforeTag.length
        );
      }, 0);
    }
  }

  function toggleBold() {
    wrapSelection('**', '**');
  }

  function toggleItalic() {
    wrapSelection('*', '*');
  }

  function insertSymbol(symbolName) {
    if (!textareaEl) return;
    
    const start = textareaEl.selectionStart;
    const symbolCode = `{${symbolName}}`;
    
    const newValue = 
      value.substring(0, start) + 
      symbolCode + 
      value.substring(textareaEl.selectionEnd);
    
    value = newValue;
    
    // Move cursor after the symbol
    setTimeout(() => {
      textareaEl.focus();
      textareaEl.setSelectionRange(start + symbolCode.length, start + symbolCode.length);
    }, 0);
  }

  const commonSymbols = [
    'all', 'fire', 'water', 'earth', 'air', 'void',
    'life', 'death', 'chaos', 'order', 'good', 'evil'
  ];
</script>

<div class="rich-text-editor">
  <!-- Formatting Toolbar -->
  <div class="toolbar">
    <div class="toolbar-group">
      <button 
        type="button" 
        class="toolbar-btn" 
        onclick={toggleBold}
        title="Bold (surround with **)"
      >
        <strong>B</strong>
      </button>
      <button 
        type="button" 
        class="toolbar-btn" 
        onclick={toggleItalic}
        title="Italic (surround with *)"
      >
        <em>I</em>
      </button>
    </div>
    
    <div class="toolbar-group">
      <span class="toolbar-label">Symbols:</span>
      {#each commonSymbols as symbol}
        <button 
          type="button" 
          class="symbol-btn" 
          onclick={() => insertSymbol(symbol)}
          title="Insert {symbol} symbol"
        >
          <img 
            src="/symbols/{symbol}.png" 
            alt="{symbol} symbol" 
            width="16" 
            height="16"
            onerror={(e) => e.target.style.display = 'none'}
          />
        </button>
      {/each}
    </div>
  </div>

  <!-- Text Area -->
  <textarea 
    bind:this={textareaEl}
    bind:value={value}
    {placeholder}
    class="rich-textarea"
    rows="4"
    onselect={handleSelectionChange}
    onkeyup={handleSelectionChange}
    onmouseup={handleSelectionChange}
  ></textarea>

  <!-- Preview -->
  <div class="preview-area">
    <strong>Preview:</strong>
    <div class="preview-content">
      {#if value}
        {@html value
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/\n/g, '<br>')
          .replace(/\{([^}]+)\}/g, '<img src="/symbols/$1.png" alt="$1 symbol" class="inline-symbol" width="16" height="16">')
        }
      {:else}
        <em>Preview will appear here...</em>
      {/if}
    </div>
  </div>

  <!-- Help Text -->
  <small class="help-text">
    Select text and click <strong>B</strong> or <em>I</em> to format. 
    Use {`{symbolname}`} for symbols or click symbol buttons.
  </small>
</div>

<style>
  .rich-text-editor {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: 1em;
    padding: 0.5em;
    background: #f8f9fa;
    border: 1px solid #e1e8ed;
    border-radius: 0.375em;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .toolbar-group {
    display: flex;
    align-items: center;
    gap: 0.25em;
  }

  .toolbar-label {
    font-size: 0.75em;
    color: #6c757d;
    font-weight: 500;
    margin-right: 0.25em;
  }

  .toolbar-btn {
    padding: 0.375em 0.75em;
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 0.25em;
    cursor: pointer;
    font-size: 0.875em;
    transition: all 0.2s ease;
  }

  .toolbar-btn:hover {
    background: #e3f2fd;
    border-color: #3498db;
  }

  .toolbar-btn:active {
    background: #bbdefb;
  }

  .symbol-btn {
    padding: 0.25em;
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 0.25em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    width: 2em;
    height: 2em;
  }

  .symbol-btn:hover {
    background: #e3f2fd;
    border-color: #3498db;
    transform: translateY(-1px);
  }

  .rich-textarea {
    width: 100%;
    padding: 0.75em;
    border: 1px solid #e1e8ed;
    border-top: none;
    border-radius: 0;
    border-bottom-left-radius: 0.375em;
    border-bottom-right-radius: 0.375em;
    font-size: 1em;
    box-sizing: border-box;
    font-family: inherit;
    background: #ffffff;
    resize: vertical;
    min-height: 6em;
  }

  .rich-textarea:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.15);
  }

  .preview-area {
    background: #f8f9fa;
    border: 1px solid #e1e8ed;
    border-radius: 0.375em;
    padding: 0.75em;
    font-size: 0.875em;
  }

  .preview-content {
    margin-top: 0.5em;
    line-height: 1.4;
  }


  .help-text {
    color: #6c757d;
    font-size: 0.75em;
    font-style: italic;
  }
</style>