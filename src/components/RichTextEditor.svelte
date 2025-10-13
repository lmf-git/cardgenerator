<script>
  const { value = '', placeholder = '', onValueChange = (v) => {} } = $props();
  
  let editor = $state(null);
  let cursorPosition = $state(0);

  function insertSymbol(symbol) {
    if (!editor) return;
    
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const symbolText = `{${symbol}}`;
    const newValue = value.substring(0, start) + symbolText + value.substring(end);
    
    onValueChange(newValue);
    
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
    
    const newValue = value.substring(0, start) + formattedText + value.substring(end);
    onValueChange(newValue);
    
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
    <div class="symbol-buttons">
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('fire')}>🔥</button>
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('water')}>💧</button>
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('earth')}>🌍</button>
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('air')}>💨</button>
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('void')}>⚫</button>
      <button type="button" class="symbol-btn" onclick={() => insertSymbol('all')}>✨</button>
    </div>
  </div>
  
  <textarea
    bind:this={editor}
    value={value}
    onchange={(e) => onValueChange(e.target.value)}
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
  }

  .format-buttons,
  .symbol-buttons {
    display: flex;
    gap: 4px;
  }

  .format-buttons {
    border-right: 1px solid #ddd;
    padding-right: 8px;
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
