<script>
  import { cardData } from '../stores.js';
  import RichTextEditor from './RichTextEditor.svelte';

  const CARD_TYPES = {
    CHARACTER: 'character',
    ATTACK: 'attack', 
    ACTION: 'action',
    FOUNDATION: 'foundation',
    ASSET: 'asset'
  };

  const ZONES = {
    HIGH: 'high',
    MID: 'mid', 
    LOW: 'low'
  };

  const KEYWORDS = [
    'Ranged', 'Throw', 'Unique', 'Terrain', 'Kick',
    'Punch', 'Weapon', 'Reversal'
  ];

  const RESOURCE_SYMBOLS = [
    'all', 'fire', 'water', 'earth', 'air', 'void', 
    'life', 'death', 'chaos', 'order', 'good', 'evil', 'energy'
  ];

  let card = $state($cardData);
  
  // Update store when card changes
  $effect(() => {
    cardData.set(card);
  });


  // Handle file upload for card art
  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        card.cardArt = e.target.result;
        cardData.set(card);
      };
      reader.readAsDataURL(file);
    }
  }

  // Dropdown options
  const cardTypeOptions = Object.values(CARD_TYPES).map(type => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1)
  }));

  const zoneOptions = Object.values(ZONES).map(zone => ({
    value: zone,
    label: zone.charAt(0).toUpperCase() + zone.slice(1)
  }));

  const rarityOptions = [
    { value: 'common', label: 'Common' },
    { value: 'uncommon', label: 'Uncommon' },
    { value: 'rare', label: 'Rare' },
    { value: 'ultra-rare', label: 'Ultra Rare' },
    { value: 'starter', label: 'Starter' }
  ];

  const versionOptions = [
    { value: 1, label: 'Version 1' },
    { value: 2, label: 'Version 2 (●Name●)' },
    { value: 3, label: 'Version 3 (●●Name●●)' },
    { value: 4, label: 'Version 4 (::Name::)' },
    { value: 5, label: 'Version 5 (●::Name::●)' },
    { value: 6, label: 'Version 6 (:::Name:::)' },
    { value: 7, label: 'Version 7 (::::Name::::)' },
    { value: 8, label: 'Version 8 (:::::Name:::::)' }
  ];



  // Add/remove keywords
  function toggleKeyword(keyword) {
    if (card.keywords.includes(keyword)) {
      card.keywords = card.keywords.filter(k => k !== keyword);
    } else {
      card.keywords.push(keyword);
    }
    cardData.set(card);
  }

  // Custom keyword functionality
  let customKeyword = $state('');
  
  function addCustomKeyword() {
    if (customKeyword.trim() && !card.keywords.includes(customKeyword.trim())) {
      card.keywords = [...card.keywords, customKeyword.trim()];
      customKeyword = '';
      cardData.set(card);
    }
  }

  function removeKeyword(keyword) {
    card.keywords = card.keywords.filter(k => k !== keyword);
    cardData.set(card);
  }

  // Add/remove resource symbols
  function toggleResourceSymbol(symbol) {
    if (!Array.isArray(card.resourceSymbols)) {
      card.resourceSymbols = [];
    }
    
    if (card.resourceSymbols.includes(symbol)) {
      card.resourceSymbols = card.resourceSymbols.filter(s => s !== symbol);
    } else {
      card.resourceSymbols = [...card.resourceSymbols, symbol];
    }
    cardData.set(card);
  }

</script>

<div class="card-generator">
  <h2>Card Generator</h2>


  <!-- Basic Card Info -->
  <fieldset class="form-section">
    <legend>Basic Information</legend>
    
    <div class="form-group">
      <label for="card-name">Card Name</label>
      <input 
        id="card-name" 
        type="text" 
        class="form-input"
        bind:value={card.name} 
        placeholder="Enter card name"
      />
    </div>

    <div class="form-group">
      <label for="card-version">Card Version</label>
      <select class="form-select" bind:value={card.version}>
        {#each versionOptions as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
      <small class="form-helper">Different versions of the same character use dot notation around the name</small>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="card-type">Card Type</label>
        <select class="form-select" bind:value={card.cardType}>
          <option value="">Select card type</option>
          {#each cardTypeOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>

      <div class="form-group">
        <label for="difficulty">Difficulty</label>
        <input 
          id="difficulty" 
          type="number" 
          class="form-input"
          min="0" 
          max="10" 
          bind:value={card.difficulty}
        />
      </div>

      <div class="form-group">
        <label for="control-value">Control Value</label>
        <input 
          id="control-value" 
          type="number" 
          class="form-input"
          min="0" 
          max="10" 
          bind:value={card.controlValue}
        />
      </div>
    </div>
  </fieldset>

  <!-- Character Specific Fields -->
  {#if card.cardType === CARD_TYPES.CHARACTER}
    <fieldset class="form-section">
      <legend>Character Stats</legend>
      
      <div class="form-row">
        <div class="form-group">
          <label for="hand-size">Hand Size</label>
          <input 
            id="hand-size" 
            type="number" 
            class="form-input"
            min="1" 
            max="10" 
            bind:value={card.handSize}
          />
        </div>

        <div class="form-group">
          <label for="max-vitality">Max Vitality</label>
          <input 
            id="max-vitality" 
            type="number" 
            class="form-input"
            min="1" 
            max="50" 
            bind:value={card.maxVitality}
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="gender">Gender</label>
          <input 
            id="gender" 
            type="text" 
            class="form-input"
            bind:value={card.vitalStats.gender}
            placeholder="M/F/Other"
          />
        </div>

        <div class="form-group">
          <label for="height">Height</label>
          <input 
            id="height" 
            type="text" 
            class="form-input"
            bind:value={card.vitalStats.height}
            placeholder="5'8&quot;"
          />
        </div>

        <div class="form-group">
          <label for="weight">Weight</label>
          <input 
            id="weight" 
            type="text" 
            class="form-input"
            bind:value={card.vitalStats.weight}
            placeholder="150 lbs"
          />
        </div>

        <div class="form-group">
          <label for="blood-type">Blood Type</label>
          <input 
            id="blood-type" 
            type="text" 
            class="form-input"
            bind:value={card.vitalStats.bloodType}
            placeholder="O+"
          />
        </div>
      </div>
    </fieldset>
  {/if}

  <!-- Attack Specific Fields -->
  {#if card.cardType === CARD_TYPES.ATTACK}
    <fieldset class="form-section">
      <legend>Attack Stats</legend>
      
      <div class="form-row">
        <div class="form-group">
          <label for="attack-zone">Attack Zone</label>
          <select class="form-select" bind:value={card.attackZone}>
            <option value="">Select attack zone</option>
            {#each zoneOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>

        <div class="form-group">
          <label for="speed">Speed</label>
          <input 
            id="speed" 
            type="number" 
            class="form-input"
            min="0" 
            max="10" 
            bind:value={card.speed}
          />
        </div>

        <div class="form-group">
          <label for="damage">Damage</label>
          <input 
            id="damage" 
            type="number" 
            class="form-input"
            min="0" 
            max="10" 
            bind:value={card.damage}
          />
        </div>
      </div>
    </fieldset>
  {/if}

  <!-- Block Properties -->
  <fieldset class="form-section">
    <legend>Block Properties</legend>
    
    <div class="form-group">
      <label class="checkbox-label">
        <input 
          type="checkbox" 
          class="form-checkbox"
          bind:checked={card.hasBlock}
        />
        This card has a block
      </label>
    </div>

    {#if card.hasBlock}
      <div class="form-row">
        <div class="form-group">
          <label for="block-zone">Block Zone</label>
          <select class="form-select" bind:value={card.blockZone}>
            <option value="">Select block zone</option>
            {#each zoneOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>

        <div class="form-group">
          <label for="block-modifier">Block Modifier</label>
          <input 
            id="block-modifier" 
            type="number" 
            class="form-input"
            min="0" 
            max="5" 
            bind:value={card.blockModifier}
          />
        </div>
      </div>
    {/if}
  </fieldset>

  <!-- Resource Symbols -->
  <fieldset class="form-section">
    <legend>Resource Symbols</legend>
    <div class="resource-symbol-grid">
      {#each RESOURCE_SYMBOLS as symbol}
        <div class="symbol-option" class:selected={card.resourceSymbols.includes(symbol)}>
          <button 
            type="button"
            class="symbol-button"
            onclick={() => toggleResourceSymbol(symbol)}
            title="{symbol} symbol"
          >
            <img 
              src="/symbols/{symbol}.png" 
              alt="{symbol} symbol" 
              width="24" 
              height="24"
            />
            <span class="symbol-name">{symbol}</span>
          </button>
        </div>
      {/each}
    </div>
    <small class="form-helper">Click symbols to add/remove them from the card</small>
  </fieldset>

  <!-- Keywords -->
  <fieldset class="form-section">
    <legend>Keywords</legend>
    
    <!-- Custom keyword input -->
    <div class="form-group">
      <label for="custom-keyword">Add Custom Keyword</label>
      <div class="custom-keyword-input">
        <input 
          id="custom-keyword"
          type="text" 
          class="form-input"
          bind:value={customKeyword}
          placeholder="Enter custom keyword"
          onkeydown={(e) => e.key === 'Enter' && addCustomKeyword()}
        />
        <button 
          type="button"
          class="add-keyword-btn"
          onclick={addCustomKeyword}
          disabled={!customKeyword.trim()}
        >
          Add
        </button>
      </div>
    </div>

    <!-- Current keywords with remove buttons -->
    {#if card.keywords.length > 0}
      <div class="current-keywords">
        <label>Current Keywords</label>
        <div class="keyword-tags">
          {#each card.keywords as keyword}
            <div class="keyword-tag">
              <span>{keyword}</span>
              <button 
                type="button"
                class="remove-keyword-btn"
                onclick={() => removeKeyword(keyword)}
                title="Remove keyword"
              >
                ×
              </button>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Preset keywords -->
    <div class="keyword-grid">
      {#each KEYWORDS as keyword}
        <label class="keyword-option">
          <input 
            type="checkbox" 
            class="form-checkbox"
            checked={card.keywords.includes(keyword)}
            onchange={() => toggleKeyword(keyword)}
          />
          <span class="keyword-name">{keyword}</span>
        </label>
      {/each}
    </div>
  </fieldset>

  <!-- Text Box -->
  <fieldset class="form-section">
    <legend>Card Text</legend>
    <div class="form-group">
      <label for="text-box">Card Text / Abilities</label>
      <RichTextEditor 
        bind:value={card.textBox}
        placeholder="Enter card text and abilities..."
      />
    </div>
  </fieldset>

  <!-- Additional Info -->
  <fieldset class="form-section">
    <legend>Additional Information</legend>
    
    <div class="form-row">
      <div class="form-group">
        <label for="universe">Universe</label>
        <input 
          id="universe" 
          type="text" 
          class="form-input"
          bind:value={card.universe}
          placeholder="Street Fighter, Tekken, etc."
        />
      </div>

      <div class="form-group">
        <label for="rarity">Rarity</label>
        <select class="form-select" bind:value={card.rarity}>
          <option value="">Select rarity</option>
          {#each rarityOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="set-name">Set Name</label>
        <input 
          id="set-name" 
          type="text" 
          class="form-input"
          bind:value={card.setName}
          placeholder="Shadowar 01"
        />
      </div>

      <div class="form-group">
        <label for="card-number">Card Number</label>
        <input 
          id="card-number" 
          type="text" 
          class="form-input"
          bind:value={card.cardNumber}
          placeholder="001/150"
        />
      </div>
    </div>

    <div class="form-group">
      <label for="artist">Artist Credits</label>
      <input 
        id="artist" 
        type="text" 
        class="form-input"
        bind:value={card.artist}
        placeholder="Artist Name"
      />
    </div>

    <div class="form-group">
      <label for="card-art">Card Art</label>
      <input 
        id="card-art" 
        type="file" 
        class="form-input"
        accept="image/*" 
        onchange={handleImageUpload}
      />
    </div>
  </fieldset>
</div>

<style>
  .card-generator {
    max-height: 37.5em; /* 600px */
    overflow-y: auto;
    padding-right: 0.625em; /* 10px */
    font-size: 1rem;
  }

  @media (max-width: 1024px) {
    .card-generator {
      max-height: none;
      overflow-y: visible;
      padding-right: 0;
    }
  }

  .card-generator h2 {
    margin-top: 0;
    margin-bottom: 1.25em; /* 20px */
    color: #2c3e50;
    font-size: 1.5em;
  }

  .form-section {
    border: 0.0625em solid #e1e8ed; /* 1px */
    border-radius: 0.5em; /* 8px */
    padding: 1.25em; /* 20px */
    margin-bottom: 1.5em; /* 24px */
    background: #ffffff;
    box-shadow: 0 0.125em 0.25em rgba(0,0,0,0.05);
    transition: all 0.2s ease;
  }

  .form-section:hover {
    border-color: #cbd6e0;
    box-shadow: 0 0.25em 0.5em rgba(0,0,0,0.08);
  }

  .form-section legend {
    font-weight: 600;
    color: #2c3e50;
    padding: 0 0.75em; /* 12px */
    font-size: 1.1em;
    background: #ffffff;
  }

  .form-group {
    margin-bottom: 1.25em; /* 20px */
  }

  .form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(9.375em, 1fr)); /* 150px */
    gap: 1em; /* 16px */
    margin-bottom: 1.25em; /* 20px */
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5em; /* 8px */
    font-weight: 500;
    color: #34495e;
    font-size: 0.875em;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .form-input, 
  .form-select,
  .form-textarea {
    width: 100%;
    padding: 0.75em; /* 12px */
    border: 0.125em solid #e1e8ed; /* 2px */
    border-radius: 0.375em; /* 6px */
    font-size: 1em;
    box-sizing: border-box;
    font-family: inherit;
    background: #ffffff;
    transition: all 0.2s ease;
  }

  .form-input:focus, 
  .form-select:focus,
  .form-textarea:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 0.1875em rgba(52, 152, 219, 0.15); /* 3px */
    background: #fbfcfd;
  }

  .form-input:hover:not(:focus), 
  .form-select:hover:not(:focus),
  .form-textarea:hover:not(:focus) {
    border-color: #cbd6e0;
  }


  .checkbox-label {
    display: flex !important;
    align-items: center;
    gap: 0.625em; /* 10px */
    cursor: pointer;
    padding: 0.5em 0; /* 8px */
    font-size: 0.9em;
    transition: color 0.2s ease;
  }

  .checkbox-label:hover {
    color: #2c3e50;
  }

  .form-checkbox {
    width: auto;
    margin: 0;
    transform: scale(1.1);
  }

  .keyword-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(7.5em, 1fr)); /* 120px */
    gap: 0.75em; /* 12px */
    padding: 0.5em 0; /* 8px */
  }

  .keyword-option {
    display: flex;
    align-items: center;
    gap: 0.5em; /* 8px */
    font-size: 0.875em; /* 14px */
    cursor: pointer;
    padding: 0.375em 0.625em; /* 6px 10px */
    border-radius: 0.25em; /* 4px */
    transition: all 0.2s ease;
  }

  .keyword-option:hover {
    background: #f8f9fa;
    transform: translateY(-0.0625em); /* -1px */
  }


  .keyword-name {
    text-transform: capitalize;
    font-weight: 500;
  }

  .resource-symbol-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(5em, 1fr)); /* 80px */
    gap: 0.5em; /* 8px */
    padding: 0.5em 0; /* 8px */
  }

  .symbol-option {
    display: flex;
    justify-content: center;
  }

  .symbol-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25em; /* 4px */
    padding: 0.5em; /* 8px */
    background: #ffffff;
    border: 0.125em solid #e1e8ed; /* 2px */
    border-radius: 0.375em; /* 6px */
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.75em; /* 12px */
    min-width: 3.5em; /* 56px */
  }

  .symbol-button:hover {
    border-color: #3498db;
    background: #f8f9fa;
    transform: translateY(-0.0625em); /* -1px */
  }

  .symbol-option.selected .symbol-button {
    border-color: #3498db;
    background: #e3f2fd;
    box-shadow: 0 0 0 0.125em rgba(52, 152, 219, 0.15); /* 2px */
  }

  .symbol-name {
    text-transform: capitalize;
    font-weight: 500;
    color: #2c3e50;
    text-align: center;
    line-height: 1;
  }

  .form-helper {
    display: block;
    margin-top: 0.5em;
    font-size: 0.75em;
    color: #6c757d;
    font-style: italic;
  }



  /* Scrollbar styling */
  .card-generator::-webkit-scrollbar {
    width: 0.375em; /* 6px */
  }

  .card-generator::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 0.1875em; /* 3px */
  }

  .card-generator::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 0.1875em; /* 3px */
  }

  .card-generator::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }

  /* Select dropdown styling */
  .form-select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236c757d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1rem;
    padding-right: 2.5rem;
  }

  .form-select::-ms-expand {
    display: none;
  }

  /* Custom keyword styles */
  .custom-keyword-input {
    display: flex;
    gap: 0.5em;
  }

  .custom-keyword-input .form-input {
    flex: 1;
  }

  .add-keyword-btn {
    padding: 0.75em 1.5em;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 0.375em;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .add-keyword-btn:hover:not(:disabled) {
    background: #2980b9;
    transform: translateY(-1px);
  }

  .add-keyword-btn:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
  }

  .current-keywords {
    margin-bottom: 1.25em;
  }

  .current-keywords label {
    display: block;
    margin-bottom: 0.5em;
    font-weight: 500;
    color: #34495e;
    font-size: 0.875em;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .keyword-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
  }

  .keyword-tag {
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.375em 0.75em;
    background: #e3f2fd;
    border: 1px solid #3498db;
    border-radius: 1.25em;
    font-size: 0.875em;
    font-weight: 500;
    color: #2c3e50;
  }

  .remove-keyword-btn {
    background: none;
    border: none;
    color: #e74c3c;
    cursor: pointer;
    font-size: 1.2em;
    font-weight: bold;
    padding: 0;
    width: 1.25em;
    height: 1.25em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
  }

  .remove-keyword-btn:hover {
    background: #e74c3c;
    color: white;
  }
</style>