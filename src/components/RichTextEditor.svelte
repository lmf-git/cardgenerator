<script>
  let { value = $bindable(''), placeholder = '' } = $props();

  let editor = $state(null);
  let cursorPosition = $state(0);

  function insertSymbol(symbol) {
    if (!editor) return;

    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const symbolText = `{${symbol}}`;
    value = value.substring(0, start) + symbolText + value.substring(end);

    // Update cursor position after symbol
    setTimeout(() => {
      editor.selectionStart = start + symbolText.length;
      editor.selectionEnd = start + symbolText.length;
      editor.focus();
    }, 0);
  }

  function insertFormatting(tag) {
    if (!editor) return;

    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selectedText = value.substring(start, end);

    let formattedText;
    switch(tag) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      default:
        return;
    }

    value = value.substring(0, start) + formattedText + value.substring(end);

    // Maintain selection
    setTimeout(() => {
      if (selectedText.length > 0) {
        editor.selectionStart = start;
        editor.selectionEnd = start + formattedText.length;
      } else {
        editor.selectionStart = start + formattedText.length;
        editor.selectionEnd = start + formattedText.length;
      }
      editor.focus();
    }, 0);
  }

  // Save cursor position when it changes
  function handleSelect() {
    cursorPosition = editor.selectionStart;
  }
</script>

<div class="rich-editor">
  <div class="toolbar">
    <div class="format-buttons">
      <button type="button" class="format-btn" onclick={() => insertFormatting('bold')} title="Bold">
        <strong>B</strong>
      </button>
      <button type="button" class="format-btn" onclick={() => insertFormatting('italic')} title="Italic">
        <em>I</em>
      </button>
    </div>
    <div class="symbol-buttons-container">
      <div class="symbol-buttons">
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('all')} title="All">
        <img src="/symbols/all.png" alt="all" class="symbol-icon" />
      </button>
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('fire')} title="Fire">
        <img src="/symbols/fire.png" alt="fire" class="symbol-icon" />
      </button>
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('water')} title="Water">
        <img src="/symbols/water.png" alt="water" class="symbol-icon" />
      </button>
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('earth')} title="Earth">
        <img src="/symbols/earth.png" alt="earth" class="symbol-icon" />
      </button>
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('air')} title="Air">
        <img src="/symbols/air.png" alt="air" class="symbol-icon" />
      </button>
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('void')} title="Void">
        <img src="/symbols/void.png" alt="void" class="symbol-icon" />
      </button>
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('life')} title="Life">
        <img src="/symbols/life.png" alt="life" class="symbol-icon" />
      </button>
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('death')} title="Death">
        <img src="/symbols/death.png" alt="death" class="symbol-icon" />
      </button>
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('chaos')} title="Chaos">
        <img src="/symbols/chaos.png" alt="chaos" class="symbol-icon" />
      </button>
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('order')} title="Order">
        <img src="/symbols/order.png" alt="order" class="symbol-icon" />
      </button>
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('good')} title="Good">
        <img src="/symbols/good.png" alt="good" class="symbol-icon" />
      </button>
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('evil')} title="Evil">
        <img src="/symbols/evil.png" alt="evil" class="symbol-icon" />
      </button>
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('infinity')} title="Infinity">
        <img src="/symbols/infinity.png" alt="infinity" class="symbol-icon" />
      </button>
    </div>
    <small class="symbol-hint">Click symbols or type {`{symbolname}`} (e.g., {`{fire}`}, {`{water}`})</small>
    </div>
  </div>
  
  <textarea
    bind:this={editor}
    bind:value={value}
    {placeholder}
    class="editor-textarea"
    onselect={handleSelect}
  ></textarea>
</div>

<style>
  .rich-editor {
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
  }

  .toolbar {
    display: flex;
    gap: 8px;
    padding: 8px;
    background: #f8f9fa;
    border-bottom: 1px solid #ddd;
    flex-wrap: wrap;
  }

  .format-buttons,
  .symbol-buttons {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }

  .format-buttons {
    border-right: 1px solid #ddd;
    padding-right: 8px;
  }

  .symbol-buttons-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .symbol-buttons {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }

  .symbol-hint {
    font-size: 11px;
    color: #6c757d;
    font-style: italic;
    line-height: 1.2;
  }

  .format-btn,
  .symbol-btn {
    padding: 4px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    font-size: 14px;
    min-width: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .format-btn:hover,
  .symbol-btn:hover {
    background: #e9ecef;
    border-color: #ced4da;
  }

  .symbol-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
    display: block;
  }

  .editor-textarea {
    width: 100%;
    min-height: 120px;
    padding: 12px;
    border: none;
    resize: vertical;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.5;
  }

  .editor-textarea:focus {
    outline: none;
  }
</style>
