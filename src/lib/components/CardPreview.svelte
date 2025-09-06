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
</script>

<div class="ufs-card" class:character-card={card.cardType === 'character'} class:attack-card={card.cardType === 'attack'} class:action-card={card.cardType === 'action'} class:foundation-card={card.cardType === 'foundation'} class:asset-card={card.cardType === 'asset'}>
    <!-- A: Difficulty circle (top-left corner) -->
    <div class="difficulty-circle">{card.difficulty}</div>

    <!-- C: Block modifier (top-right corner) -->
    {#if card.hasBlock === true}
      <div class="block-modifier-corner">
        <ZoneSymbol zone={card.blockZone} size={12} color="#333" />
        <span class="block-number">+{card.blockModifier}</span>
      </div>
    {/if}

    <!-- B: Card name (vertical text on left side for non-character, horizontal on top for character) -->
    <div class="card-name-vertical" class:character-name={card.cardType === 'character'}>
      <span class="vertical-name" class:horizontal-name={card.cardType === 'character'}>{card.name || 'CARD NAME'}</span>
    </div>







    <!-- I: Universe/set info (bottom-left corner) -->
    <div class="universe-set-corner">
      {card.universe || 'UFS'}
    </div>

    <!-- J: Control Value (bottom-right corner) -->
    <div class="control-value-corner">
      <ControlSymbol value={card.controlValue} size={16} color="black" backgroundColor="white" />
    </div>

    <!-- Card Type Label -->
    <div class="card-type-label">
      <span class="card-type-text">{card.cardType.toUpperCase()}</span>
    </div>

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
                <ZoneSymbol zone={card.attackZone} size={10} color="#333" />
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
              <UFSStatSymbols type="handsize" value={card.handSize} size={20} />
            </div>
            <div class="character-vitality">
              <UFSStatSymbols type="vitality" value={card.maxVitality} size={20} />
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
              <SymbolIcon {symbol} size={16} />
            {/each}
          </div>
        {/if}
        
        <!-- Card Text/Abilities -->
        <div class="info-text-area">
          <!-- Keywords -->
          {#if card.keywords.length > 0}
            <div class="keywords-line">
              <strong>{card.keywords.join(', ')}</strong>
            </div>
          {/if}
          
          <!-- Main Text -->
          <div class="card-text">
            {#if card.textBox}
              {@html card.textBox
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
    border: 0.1875em solid var(--frame-color); /* 3px */
    border-radius: 0.75em; /* 12px */
    position: relative;
    box-shadow: 0 0.375em 1.25em rgba(0, 0, 0, 0.4); /* 0 6px 20px */
    font-family: 'Arial Black', Arial, sans-serif;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    /* Ensure consistent anti-aliasing */
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    backface-visibility: hidden;
    box-sizing: border-box;
  }

  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-art-section {
    flex-basis: 60%;
    position: relative;
    background: var(--frame-color);
    margin: 0.125em;
    overflow: hidden;
    clip-path: polygon(1em 0, 100% 0, 100% 100%, 0 100%, 0 1em);
  }

  /* Removed old header styles - now using absolute positioning */

  /* Art Area */
  .card-art-area {
    flex: 1;
    position: relative;
    background: var(--frame-color);
    margin: 0.125em; /* 2px */
    overflow: hidden;
    /* UFS style angled cut - only top-left corner */
    clip-path: polygon(1em 0, 100% 0, 100% 100%, 0 100%, 0 1em);
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

  /* Non-character cards have smaller contained image areas - fixed at 40% for info section */
  .card-art-area:not(.character-art) {
    flex: 1;
    max-height: 60%; /* Ensure info section gets 40% */
    margin: 0.5em; /* 8px */
    margin-bottom: 0.25em; /* 4px */
  }

  .card-art-area.attack-art,
  .card-art-area.action-art,
  .card-art-area.foundation-art,
  .card-art-area.asset-art {
    flex: 1;
    max-height: 60%; /* Art stops at 60%, leaving 40% for text and info */
    margin: 0.5em; /* 8px */
    margin-bottom: 0.25em; /* 4px */
    min-height: 0; /* Allow flex shrinking */
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
    font-size: 14px;
    font-weight: bold;
  }

  /* Removed old overlay styles - now using new positioning system */


  /* Text Box */
  .text-box-area {
    background: rgba(255, 255, 255, 0.95);
    border: 0.0625em solid #ccc; /* 1px */
    margin: 0.125em 0.5em; /* 2px 8px */
    padding: 0.375em; /* 6px */
    border-radius: 0.25em; /* 4px */
    font-size: 0.5em; /* 8px */
    line-height: 1.2;
    max-height: 3.75em; /* 60px */
    overflow: hidden;
  }

  /* Character cards have a swooping text box positioned over full image */
  .text-box-area.character-textbox {
    background: rgba(255, 255, 255, 0.98);
    border: 2px solid rgba(139, 69, 19, 0.8);
    margin: 0;
    padding: 8px;
    border-radius: 12px 12px 12px 4px;
    position: absolute;
    bottom: 45px;
    left: 30px;
    right: 8px;
    max-height: 60px;
    backdrop-filter: blur(4px);
    z-index: 15;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }

  .text-box-area.character-textbox::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, var(--frame-color), transparent);
    border-radius: 12px 12px 12px 4px;
    z-index: -1;
    opacity: 0.3;
  }

  .keywords-line {
    margin-bottom: 4px;
    color: var(--frame-color);
  }

  .card-text {
    color: #333;
  }




  /* Card Type Indicator */
  .card-type-indicator {
    position: absolute;
    bottom: 25px;
    left: 8px;
    font-size: 6px;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.5px;
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
    top: 0.5em; /* 8px */
    left: 0.5em; /* 8px */
    width: 1.5em; /* 24px */
    height: 1.5em; /* 24px */
    background: white;
    color: black;
    border: 0.125em solid var(--frame-color); /* 2px */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em; /* 12px */
    font-weight: bold;
    z-index: 20;
    box-shadow: 0 0.125em 0.25em rgba(0,0,0,0.2); /* 0 2px 4px */
  }

  .card-name-vertical {
    position: absolute;
    top: 2.5em; /* 40px */
    left: 0.25em; /* 4px */
    bottom: 6.25em; /* 100px */
    width: 1.25em; /* 20px */
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, var(--frame-color), var(--frame-secondary));
    z-index: 20;
  }

  .vertical-name {
    writing-mode: vertical-lr;
    text-orientation: mixed;
    color: white;
    font-size: 0.625em; /* 10px */
    font-weight: bold;
    text-shadow: 0.0625em 0.0625em 0.125em rgba(0,0,0,0.8); /* 1px 1px 2px */
    letter-spacing: 0.0625em; /* 1px */
    text-align: center;
  }

  /* Character card name - horizontal across top */
  .card-name-vertical.character-name {
    position: absolute;
    top: 0.5em; /* 8px */
    left: 2.5em; /* 40px */
    right: 2.5em; /* 40px */
    height: 1.5em; /* 24px */
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, var(--frame-color), var(--frame-secondary));
    border-radius: 0.75em; /* 12px */
    z-index: 20;
  }

  .horizontal-name {
    writing-mode: initial;
    text-orientation: initial;
    color: white;
    font-size: 0.75em; /* 12px */
    font-weight: bold;
    text-shadow: 0.0625em 0.0625em 0.125em rgba(0,0,0,0.8); /* 1px 1px 2px */
    letter-spacing: 0.0625em; /* 1px */
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .block-modifier-corner {
    position: absolute;
    top: 0.5em; /* 8px */
    right: 0.5em; /* 8px */
    width: 1.5em; /* 24px */
    height: 2em; /* 32px */
    background: white;
    border: 0.125em solid var(--frame-color); /* 2px */
    border-radius: 0.25em; /* 4px */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.5em; /* 8px */
    font-weight: bold;
    gap: 0.0625em; /* 1px */
    z-index: 20;
    box-shadow: 0 0.125em 0.25em rgba(0,0,0,0.2); /* 0 2px 4px */
  }

  .block-number {
    font-size: 8px;
    line-height: 1;
    color: var(--frame-color);
  }

  .attack-stats-group {
    position: absolute;
    top: 50%;
    right: 0.5em; /* 8px */
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 0.5em; /* 8px */
    z-index: 20;
  }

  .attack-zone-stat {
    position: relative;
  }

  .damage-stat {
    position: relative;
  }

  .zone-speed-circle, .damage-value-circle {
    width: 1.75em; /* 28px */
    height: 1.75em; /* 28px */
    background: rgba(255, 255, 255, 0.95);
    border: 0.125em solid var(--frame-color); /* 2px */
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.625em; /* 10px */
    box-shadow: 0 0.125em 0.25em rgba(0,0,0,0.3); /* 0 2px 4px */
  }

  .speed-value, .damage-value {
    font-size: 12px;
    line-height: 1;
    color: var(--frame-color);
  }

  .character-stats-group {
    position: absolute;
    top: 3.5em; /* 56px - slightly lower than before */
    right: 0.5em; /* 8px */
    display: flex;
    flex-direction: column;
    gap: 0.375em; /* 6px */
    z-index: 20;
  }

  .character-hand-size,
  .character-vitality {
    background: rgba(255, 255, 255, 0.95);
    border: 0.125em solid var(--frame-color); /* 2px */
    border-radius: 50%;
    width: 1.75em; /* 28px */
    height: 1.75em; /* 28px */
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.625em; /* 10px */
    box-shadow: 0 0.125em 0.25em rgba(0,0,0,0.2); /* 0 2px 4px */
  }

  .character-vital-stats {
    background: rgba(255, 255, 255, 0.95);
    border: 2px solid var(--frame-color);
    border-radius: 6px;
    padding: 6px 8px;
    backdrop-filter: blur(2px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .vital-stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7px;
    line-height: 1.2;
    margin-bottom: 2px;
  }

  .vital-stat-item:last-child {
    margin-bottom: 0;
  }

  .vital-label {
    font-weight: bold;
    color: var(--frame-color);
    min-width: 12px;
  }

  .vital-value {
    color: #333;
    font-weight: 500;
  }

  .universe-set-corner {
    position: absolute;
    bottom: 8px;
    left: 8px;
    font-size: 8px;
    color: white;
    background: var(--frame-color);
    padding: 2px 4px;
    border-radius: 3px;
    z-index: 20;
  }

  .control-value-corner {
    position: absolute;
    bottom: 0.5em; /* 8px */
    right: 0.5em; /* 8px */
    width: 1.5em; /* 24px */
    height: 1.5em; /* 24px */
    background: white;
    color: black;
    border: 0.125em solid var(--frame-color); /* 2px */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.625em; /* 10px */
    font-weight: bold;
    z-index: 20;
    box-shadow: 0 0.125em 0.25em rgba(0,0,0,0.2); /* 0 2px 4px */
  }

  .card-type-label {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.95);
    padding: 0.25em 0.5em;
    border-radius: 0 0.375em 0.375em 0;
    z-index: 16;
    font-weight: bold;
    font-size: 0.6em;
    color: var(--frame-color);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-right: 0.125em solid var(--frame-color);
    border-top: 0.125em solid var(--frame-color);
    border-bottom: 0.125em solid var(--frame-color);
  }

  .card-info-section {
    flex: 1;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(0.125em);
    border-radius: 0.375em 0.375em 0 0;
    margin: 0 0.125em 0 1.5em;
    padding: 0.375em 0.5em 0.25em;
    z-index: 15;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0.25em;
    overflow: hidden;
    position: relative;
  }

  .resource-symbols {
    display: flex;
    align-items: center;
    gap: 0.25em;
    justify-content: flex-start;
    background: rgba(255, 255, 255, 0.8);
    border: 0.0625em solid var(--frame-color);
    border-radius: 0.25em;
    padding: 0.25em 0.375em;
    width: fit-content;
    margin-bottom: 0.25em;
  }

  .resource-symbols.character-symbols {
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 0;
    padding: 0.125em 0;
    width: 100%;
    margin-bottom: 0.125em;
    border-bottom: 0.0625em solid rgba(var(--frame-color), 0.3);
  }

  .info-text-area {
    flex: 1;
    overflow-y: auto;
    font-size: 0.5em;
    line-height: 1.2;
  }

  .keywords-line {
    margin-bottom: 0.25em;
    color: var(--frame-color);
    font-weight: 500;
  }

  .card-text {
    color: #333;
    font-weight: normal;
  }

  .inline-symbol {
    height: 0.75em;
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
    font-size: 0.25em; /* 4px */
    font-weight: 500;
    text-shadow: 
      0 0 0.125em white,
      0 0 0.25em white,
      0 0 0.375em white;
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