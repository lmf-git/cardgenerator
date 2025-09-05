<script>
  import { cardData } from '../stores.js';

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
    'Combo', 'Ranged', 'Throw', 'Unique', 'Terrain', 'Kick',
    'Punch', 'Weapon', 'Breaker', 'Multiple', 'Powerful', 
    'Reversal', 'Stun', 'Desperation'
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



  // Add/remove keywords
  function toggleKeyword(keyword) {
    if (card.keywords.includes(keyword)) {
      card.keywords = card.keywords.filter(k => k !== keyword);
    } else {
      card.keywords.push(keyword);
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
    <div class="form-group">
      <label for="resource-symbols">Resource Symbols (comma-separated)</label>
      <input 
        id="resource-symbols" 
        type="text" 
        class="form-input"
        bind:value={card.resourceSymbols}
        placeholder="all, fire, water, etc."
      />
      <small class="form-helper">Enter resource symbols separated by commas</small>
    </div>
  </fieldset>

  <!-- Keywords -->
  <fieldset class="form-section">
    <legend>Keywords</legend>
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
      <textarea 
        id="text-box" 
        rows="4" 
        class="form-textarea"
        bind:value={card.textBox}
        placeholder="Enter card text and abilities..."
      ></textarea>
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
</style>