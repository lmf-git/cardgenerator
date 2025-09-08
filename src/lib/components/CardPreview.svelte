<script>
  import { cardData } from '../stores.js';
  import SymbolIcon from './SymbolIcon.svelte';
  import ZoneSymbol from './ZoneSymbol.svelte';
  import ControlSymbol from './ControlSymbol.svelte';
  import UFSStatSymbols from './UFSStatSymbols.svelte';

  let card = $state($cardData);
  
  // Sync with store changes
  $effect(() => {
    card = $cardData;
  });

  function formatVersionedCardName(name, version = 1) {
    if (!name || version < 1) {
      return name || '';
    }

    if (version === 1) {
      return name;
    }

    if (version === 2) {
      return `●${name}●`;
    }
    
    if (version === 3) {
      return `●●${name}●●`;
    }

    if (version === 4) {
      return `::${name}::`;
    }

    if (version === 5) {
      return `●::${name}::●`;
    }

    if (version >= 6) {
      const extraColons = ':'.repeat(version - 3);
      return `${extraColons}${name}${extraColons}`;
    }

    return name;
  }
</script>

<div class="ufs-card" class:character-card={card.cardType === 'character'} class:attack-card={card.cardType === 'attack'} class:action-card={card.cardType === 'action'} class:foundation-card={card.cardType === 'foundation'} class:asset-card={card.cardType === 'asset'}>
    <!-- A: Difficulty circle (top-left corner) -->
    <div class="difficulty-circle">{card.difficulty}</div>

    <!-- C: Block modifier (top-right corner) -->
    {#if card.hasBlock === true}
      <div class="block-modifier-corner">
        <ZoneSymbol zone={card.blockZone} size="1em" color="#333" extraClass="block-zone-icon" />
        <span class="block-number">+{card.blockModifier}</span>
      </div>
    {/if}

    <!-- B: Card name (vertical text on left side for non-character, horizontal on top for character) -->
    <div class="card-name-container" class:character-name={card.cardType === 'character'}>
      <span class="vertical-name" class:horizontal-name={card.cardType === 'character'}>{formatVersionedCardName(card.name, card.version) || 'CARD NAME'}</span>
    </div>







    <!-- I: Universe/set info (bottom-left corner) -->
    <div class="universe-set-corner">
      {card.universe || 'UFS'}
    </div>

    <!-- J: Control Value (bottom-right corner) -->
    <div class="control-value-corner">
      <ControlSymbol value={card.controlValue} size="1.25em" color="black" backgroundColor="white" extraClass="control-value-icon" />
    </div>

    <!-- Card Type Label (not shown for character cards) -->
    {#if card.cardType !== 'character'}
      <div class="card-type-label">
        <span class="card-type-text">{card.cardType.toUpperCase()}</span>
      </div>
    {/if}

    <!-- Card Content Layout -->
    <div class="card-content">
      <!-- Art Area -->
      <div class="card-art-section">
        {#if card.cardArt}
          <img src={card.cardArt} alt="Card Art" class="card-art" 
               class:character-art-img={card.cardType === 'character'} />
        {:else}
          <div class="art-placeholder">
            <div class="placeholder-text">Card Artwork</div>
          </div>
        {/if}

        <!-- D & E: Attack zone/speed and damage (middle-right on attack cards) -->
        {#if card.cardType === 'attack'}
          <div class="attack-stats-group">
            <div class="attack-zone-stat">
              <div class="zone-speed-circle">
                <ZoneSymbol zone={card.attackZone} size="0.875em" color="#333" extraClass="attack-zone-icon" />
                <span class="speed-value">{card.speed}</span>
              </div>
            </div>
            <div class="damage-stat">
              <div class="damage-value-circle">
                <span class="damage-value">{card.damage}</span>
              </div>
            </div>
          </div>
        {/if}

        <!-- Character stats for character cards -->
        {#if card.cardType === 'character'}
          <div class="character-stats-group">
            <div class="character-hand-size">
              <UFSStatSymbols type="handsize" value={card.handSize} size="1.5em" extraClass="character-handsize-icon" />
            </div>
            <div class="character-vitality">
              <UFSStatSymbols type="vitality" value={card.maxVitality} size="1.5em" extraClass="character-vitality-icon" />
            </div>
            <div class="character-vital-stats">
              <div class="vital-stat-item">
                <span class="vital-label">G:</span>
                <span class="vital-value">{card.vitalStats.gender || '?'}</span>
              </div>
              <div class="vital-stat-item">
                <span class="vital-label">Ht:</span>
                <span class="vital-value">{card.vitalStats.height || '?'}</span>
              </div>
              <div class="vital-stat-item">
                <span class="vital-label">Wt:</span>
                <span class="vital-value">{card.vitalStats.weight || '?'}</span>
              </div>
              <div class="vital-stat-item">
                <span class="vital-label">Bt:</span>
                <span class="vital-value">{card.vitalStats.bloodType || '?'}</span>
              </div>
            </div>
          </div>
        {/if}
      </div>

      <!-- Info Section -->
      <div class="card-info-section">
        
        <!-- Resource Symbols at top -->
        {#if card.resourceSymbols.length > 0}
          <div class="resource-symbols" class:character-symbols={card.cardType === 'character'}>
            {#each card.resourceSymbols as symbol}
              <SymbolIcon {symbol} size="1.25em" extraClass="resource-symbol-icon" />
            {/each}
          </div>
        {/if}
        
        <!-- Card Text/Abilities -->
        <div class="info-text-area">
          <!-- Keywords -->
          {#if card.keywords.length > 0}
            <div class="keywords-line">
              <strong>
                {#each card.keywords as keyword, i}
                  {keyword}{#if i < card.keywords.length - 1} • {/if}
                {/each}
              </strong>
            </div>
          {/if}
          
          <!-- Main Text -->
          <div class="card-text">
            {#if card.textBox}
              {@html card.textBox
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br>')
                .replace(/\{([^}]+)\}/g, '<img src="/symbols/$1.png" alt="$1 symbol" class="inline-symbol">')
              }
            {:else}
              <em>Card abilities and text</em>
            {/if}
          </div>
        </div>
      </div>

      <!-- Card Meta Footer -->
      <div class="card-meta">
        <span class="info-text">{card.setName || 'Set Name'}</span>
        <span class="info-text">{card.rarity || 'Rarity'}</span>
        <span class="info-text">{card.cardNumber || '000/000'}</span>
        <span class="info-text">{card.artist || 'Artist Name'}</span>
      </div>
    </div>
  </div>

<style>

  .ufs-card {
    --frame-color: #666666;
    --frame-secondary: #888888;
    
    width: 100%;
    aspect-ratio: 5/7; /* UFS card aspect ratio */
    background: var(--frame-color);
    border: 0.3% solid var(--frame-color);
    border-radius: 1.2%;
    position: relative;
    box-shadow: 0 0.6% 2% rgba(0, 0, 0, 0.4);
    font-family: 'Arial Black', Arial, sans-serif;
    overflow: hidden;
    position: relative;
    /* Ensure consistent anti-aliasing */
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    backface-visibility: hidden;
    box-sizing: border-box;
    /* Base font size as percentage of card width - scales consistently */
    font-size: 1.6%; /* 1.6% of card width */
  }


  .card-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

  .card-art-section {
    position: absolute;
    top: 0.8%;
    left: 0.8%;
    right: 0.8%;
    height: 60%;
    background: var(--frame-color);
    overflow: hidden;
    clip-path: polygon(6% 0, 100% 0, 100% 100%, 0 100%, 0 6%);
  }

  /* Removed old header styles - now using absolute positioning */

  /* Art Area */
  .card-art-area {
    position: absolute;
    top: 0.8%;
    left: 0.8%;
    right: 0.8%;
    height: 60%;
    background: var(--frame-color);
    overflow: hidden;
    /* UFS style angled cut - only top-left corner */
    clip-path: polygon(6% 0, 100% 0, 100% 100%, 0 100%, 0 6%);
  }

  .card-art {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Character cards use full card images that extend beyond art area */
  .card-art-area.character-art {
    margin: 0;
    border-radius: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  .card-art.character-art-img {
    object-fit: cover;
    opacity: 0.9;
  }

  /* Info section positioned at bottom 40% of card */
  .card-info-section {
    position: absolute;
    bottom: 3%;
    left: 12%; /* Significant left margin - clear of vertical name */
    right: 4%;
    height: 35%; /* Fixed percentage height for consistent aspect ratio */
    background: rgba(255, 255, 255, 0.95);
    border: 0.8% solid #ccc;
    border-radius: 6% 6% 0 0;
    overflow: hidden;
  }

  /* Ensure character stats are visible over full image */

  .ufs-card:has(.character-art) .text-box-area {
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(0.25em); /* 4px */
    border: 0.125em solid rgba(255, 255, 255, 0.8); /* 2px */
  }


  .ufs-card:has(.character-art) .resource-symbols-bar {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(0.125em); /* 2px */
  }

  .art-placeholder {
    width: 100%;
    height: 100%;
    background: var(--frame-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.875em;
    font-weight: bold;
  }

  /* Removed old overlay styles - now using new positioning system */


  /* Text Box */
  .text-box-area {
    background: rgba(255, 255, 255, 0.95);
    border: 0.25em solid #ccc;
    margin: 0.5em 1.875em;
    padding: 1.5em;
    border-radius: 1em;
    font-size: 0.1875em;
    line-height: 1.2;
    height: 15em;
    overflow: hidden;
  }

  /* Character cards have a swooping text box positioned over full image */
  .text-box-area.character-textbox {
    background: rgba(255, 255, 255, 0.98);
    border: 0.5em solid rgba(139, 69, 19, 0.8);
    margin: 0;
    padding: 1.875em;
    border-radius: 3em 3em 3em 1em;
    position: absolute;
    bottom: 11.25em; /* 18% converted to em */
    left: 7.5em; /* 12% converted to em */
    right: 1.875em; /* 3% converted to em */
    height: 15em; /* 24% converted to em */
    backdrop-filter: blur(1em);
    z-index: 15;
    box-shadow: 0 0.5em 2em rgba(0,0,0,0.3);
  }

  .text-box-area.character-textbox::before {
    content: '';
    position: absolute;
    top: -0.5em;
    left: -0.5em;
    right: -0.5em;
    bottom: -0.5em;
    background: linear-gradient(135deg, var(--frame-color), transparent);
    border-radius: 3em 3em 3em 1em;
    z-index: -1;
    opacity: 0.3;
  }

  .keywords-line {
    margin-bottom: 0.25em;
    color: var(--frame-color);
  }

  .card-text {
    color: #333;
  }




  /* Card Type Indicator */
  .card-type-indicator {
    position: absolute;
    bottom: 1.56em;
    left: 0.5em;
    font-size: 0.375em;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  /* Print Styles */
  @media print {
    .card-preview {
      padding: 0;
    }

    .ufs-card {
      width: 2.5in;
      height: 3.5in;
      box-shadow: none;
    }

    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }

  /* Updated positioning for official UFS layout */
  .difficulty-circle {
    position: absolute;
    top: 3%;
    left: 3%;
    width: 12%;
    height: 8.5%;
    background: white;
    color: black;
    border: 0.2% solid var(--frame-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6%;
    font-weight: bold;
    z-index: 20;
    box-shadow: 0 0.2% 0.5% rgba(0,0,0,0.2);
  }

  .card-name-container {
    position: absolute;
    top: 15%;
    left: 0;
    bottom: 40%;
    width: 9%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, var(--frame-color), var(--frame-secondary));
    z-index: 20;
    padding: 1.5%;
  }

  .vertical-name {
    writing-mode: vertical-lr;
    text-orientation: mixed;
    color: white;
    font-size: 3.2%; /* Direct percentage of card width for fluid scaling */
    font-weight: bold;
    text-shadow: 0.3% 0.3% 0.6% rgba(0,0,0,0.8);
    letter-spacing: 0.3%;
    text-align: center;
    transform: rotate(180deg); /* Flip the text to read correctly */
  }

  /* Character card name - horizontal across top */
  .card-name-container.character-name {
    position: absolute;
    top: 3%; /* Percentage-based positioning */
    left: 50%; /* Center horizontally */
    transform: translateX(-50%); /* Center horizontally */
    height: 8%; /* Percentage-based height */
    width: 80%; /* Percentage-based width */
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, var(--frame-color), var(--frame-secondary));
    border-radius: 4%; /* Percentage-based radius */
    z-index: 20;
  }

  .horizontal-name {
    writing-mode: initial;
    text-orientation: initial;
    color: white;
    font-size: 2.4%; /* Direct percentage of card width for fluid scaling */
    font-weight: bold;
    text-shadow: 0.3% 0.3% 0.6% rgba(0,0,0,0.8);
    letter-spacing: 0.3%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transform: none; /* Remove rotation for horizontal text */
  }

  .block-modifier-corner {
    position: absolute;
    top: 3%;
    right: 3%;
    width: 12%;
    height: 16%;
    background: white;
    border: 0.2% solid var(--frame-color);
    border-radius: 1.5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.1%;
    font-weight: bold;
    gap: 0.3%;
    z-index: 20;
    box-shadow: 0 0.2% 0.5% rgba(0,0,0,0.2);
  }

  .block-number {
    font-size: 0.8%;
    line-height: 1;
    color: var(--frame-color);
  }

  .attack-stats-group {
    position: absolute;
    top: 50%;
    right: 2%; /* Percentage-based positioning */
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 2%; /* Percentage-based gap */
    z-index: 20;
  }

  .attack-zone-stat {
    position: relative;
  }

  .damage-stat {
    position: relative;
  }

  .zone-speed-circle, .damage-value-circle {
    width: 9%; /* Percentage-based sizing */
    height: 6.5%; /* Percentage-based sizing maintaining aspect ratio */
    background: rgba(255, 255, 255, 0.95);
    border: 0.3% solid var(--frame-color);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.3%; /* Percentage-based font size */
    box-shadow: 0 0.3% 0.6% rgba(0,0,0,0.3);
  }

  .speed-value, .damage-value {
    font-size: 1%; /* Percentage-based font size */
    line-height: 1;
    color: var(--frame-color);
  }

  .character-stats-group {
    position: absolute;
    top: 22%; /* Percentage-based positioning */
    right: 3%; /* Percentage-based positioning */
    display: flex;
    flex-direction: column;
    gap: 2%; /* Percentage-based gap */
    z-index: 20;
  }

  .character-hand-size,
  .character-vitality {
    background: rgba(255, 255, 255, 0.95);
    border: 0.8% solid var(--frame-color);
    border-radius: 50%;
    width: 14%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2%; /* Direct percentage of card width for fluid scaling */
    box-shadow: 0 0.5% 1% rgba(0,0,0,0.2);
  }

  .character-vital-stats {
    background: rgba(255, 255, 255, 0.95);
    border: 0.8% solid var(--frame-color);
    border-radius: 2%;
    padding: 2% 3%;
    backdrop-filter: blur(0.5%);
    box-shadow: 0 0.5% 1% rgba(0,0,0,0.2);
  }

  .vital-stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.6%; /* Direct percentage of card width for fluid scaling */
    line-height: 1.2;
    margin-bottom: 0.8%;
  }

  .vital-stat-item:last-child {
    margin-bottom: 0;
  }

  .vital-label {
    font-weight: bold;
    color: var(--frame-color);
    min-width: 0.75em;
  }

  .vital-value {
    color: #333;
    font-weight: 500;
  }

  .universe-set-corner {
    position: absolute;
    bottom: 2%;
    left: 2%;
    font-size: 0.8%; /* Percentage-based font size */
    color: white;
    background: var(--frame-color);
    padding: 0.3% 0.5%;
    border-radius: 0.5%;
    z-index: 20;
  }

  .control-value-corner {
    position: absolute;
    bottom: 2%;
    right: 2%;
    width: 8%; /* Percentage-based sizing */
    height: 5.5%; /* Percentage-based sizing maintaining aspect ratio */
    background: white;
    color: black;
    border: 0.3% solid var(--frame-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3%; /* Percentage-based font size */
    font-weight: bold;
    z-index: 20;
    box-shadow: 0 0.3% 0.6% rgba(0,0,0,0.2);
  }

  .card-type-label {
    position: absolute;
    bottom: 40%; /* Align with bottom of vertical name */
    left: 0;
    background: rgba(255, 255, 255, 0.95);
    padding: 0.8% 1.5%;
    border-radius: 0 1% 1% 0;
    z-index: 21;
    font-weight: bold;
    font-size: 1%; /* Percentage-based font size */
    color: var(--frame-color);
    text-transform: uppercase;
    letter-spacing: 0.1%;
    border-right: 0.3% solid var(--frame-color);
    border-top: 0.3% solid var(--frame-color);
    border-bottom: 0.3% solid var(--frame-color);
  }

  /* Remove duplicate card-info-section - using the absolute positioned one above */

  .resource-symbols {
    position: absolute;
    top: 2%;
    left: 2%;
    right: 2%;
    display: flex;
    align-items: center;
    gap: 1%; /* Percentage-based gap */
    justify-content: flex-start;
    background: rgba(255, 255, 255, 0.8);
    border: 0.2% solid var(--frame-color);
    border-radius: 1%;
    padding: 1% 1.5%;
    height: 8%; /* Percentage-based height */
  }

  .resource-symbols.character-symbols {
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 0;
    padding: 0.5% 0;
    border-bottom: 0.2% solid rgba(var(--frame-color), 0.3);
  }

  .info-text-area {
    position: absolute;
    top: 12%; /* Percentage-based positioning below resource symbols */
    left: 2%;
    right: 2%;
    bottom: 2%;
    overflow-y: auto;
    font-size: 1%; /* Percentage-based font size */
    line-height: 1.3;
  }

  .keywords-line {
    margin-bottom: 1%; /* Percentage-based margin */
    color: var(--frame-color);
    font-weight: 500;
  }

  .card-text {
    color: #333;
    font-weight: normal;
  }

  .inline-symbol {
    height: 1.6%; /* Percentage-based size to match text scaling */
    width: 1.6%; /* Percentage-based size to match text scaling */
    display: inline;
    vertical-align: middle;
  }

  .card-meta {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    z-index: 5;
    box-sizing: border-box;
  }


  .info-text {
    color: black;
    font-size: 0.64%; /* 0.64% of card width (0.4 * 1.6% base) */
    font-weight: 500;
    text-shadow: 
      0 0 0.2% white,
      0 0 0.4% white,
      0 0 0.6% white;
    white-space: nowrap;
  }

  /* Card Type Colors */
  .ufs-card.character-card {
    --frame-color: #8B4513;
    --frame-secondary: #A0522D;
  }

  .ufs-card.attack-card {
    --frame-color: #DC143C;
    --frame-secondary: #FF6B6B;
  }

  .ufs-card.action-card {
    --frame-color: #4169E1;
    --frame-secondary: #6495ED;
  }

  .ufs-card.foundation-card {
    --frame-color: #228B22;
    --frame-secondary: #32CD32;
  }

  .ufs-card.asset-card {
    --frame-color: #9932CC;
    --frame-secondary: #BA55D3;
  }

</style>