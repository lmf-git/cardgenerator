<script>
  import { cardData } from '../stores.js';
  import SymbolIcon from './icons/SymbolIcon.svelte';
  import ZoneSymbol from './icons/ZoneSymbol.svelte';
  import ControlSymbol from './icons/ControlSymbol.svelte';
  import UFSStatSymbols from './icons/UFSStatSymbols.svelte';
  // New SVG icons
  import ControlIcon from './icons/ControlIcon.svelte';
  import DamageIcon from './icons/DamageIcon.svelte';
  import DifficultyIcon from './icons/DifficultyIcon.svelte';
  import HandSizeSVGIcon from './icons/HandSizeSVGIcon.svelte';
  import SpeedSVGIcon from './icons/SpeedSVGIcon.svelte';
  import StatsSVGIcon from './icons/StatsSVGIcon.svelte';
  import VitalitySVGIcon from './icons/VitalitySVGIcon.svelte';

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
    <div class="difficulty-circle">
      <DifficultyIcon size="2em" extraClass="difficulty-svg" />
      <span class="difficulty-value">{card.difficulty}</span>
    </div>

    <!-- C: Block modifier (top-right corner) -->
    {#if card.hasBlock === true}
      <div class="block-modifier-corner">
        <ZoneSymbol zone={card.blockZone} size="1em" color="#333" extraClass="block-zone-icon" />
        <span class="block-number">+{card.blockModifier}</span>
      </div>
    {/if}

    <!-- B: Card name (vertical text on left side for non-character, horizontal on top for character) -->
    <div class="card-name-container">
      <span class="card-name">{formatVersionedCardName(card.name, card.version) || 'CARD NAME'}</span>
    </div>







    <!-- I: Universe/set info (bottom-left corner) -->
    <div class="universe-set-corner">
      {card.universe || 'UFS'}
    </div>

    <!-- J: Control Value (bottom-right corner) -->
    <div class="control-value-corner">
      <ControlIcon size="1.5em" extraClass="control-svg" />
      <span class="control-value">{card.controlValue}</span>
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
                <SpeedSVGIcon size="1.2em" extraClass="speed-svg" />
                <span class="speed-value">{card.speed}</span>
              </div>
            </div>
            <div class="damage-stat">
              <div class="damage-value-circle">
                <DamageIcon size="1.2em" extraClass="damage-svg" />
                <span class="damage-value">{card.damage}</span>
              </div>
            </div>
          </div>
        {/if}

        <!-- Character stats for character cards -->
        {#if card.cardType === 'character'}
          <div class="character-stats-group">
            <div class="character-hand-size">
              <HandSizeSVGIcon size="2em" extraClass="handsize-svg" />
              <span class="stat-value">{card.handSize}</span>
            </div>
            <div class="character-vitality">
              <VitalitySVGIcon size="2em" extraClass="vitality-svg" />
              <span class="stat-value">{card.maxVitality}</span>
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
    
    width: 2.5in; /* Standard card width */
    height: 3.5in; /* Standard card height */
    background: var(--frame-color);
    border: 0.008in solid var(--frame-color);
    border-radius: 0.03in;
    position: relative;
    box-shadow: 0 0.015in 0.05in rgba(0, 0, 0, 0.4);
    font-family: 'Arial Black', Arial, sans-serif;
    overflow: hidden;
    /* Ensure consistent anti-aliasing */
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    backface-visibility: hidden;
    box-sizing: border-box;
    /* Base font size using physical units for consistent print output */
    font-size: 0.04in; /* Base font size in inches */
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
    top: 0.028in;
    left: 0.02in;
    right: 0.02in;
    height: 2.1in; /* 60% of 3.5in */
    background: var(--frame-color);
    overflow: hidden;
    clip-path: polygon(0.15in 0, 100% 0, 100% 100%, 0 100%, 0 0.21in);
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
    bottom: 0.105in; /* 3% of 3.5in */
    left: 0.3in; /* Significant left margin - clear of vertical name */
    right: 0.1in; /* 4% of 2.5in */
    height: 1.225in; /* 35% of 3.5in */
    background: rgba(255, 255, 255, 0.95);
    border: 0.02in solid #ccc;
    border-radius: 0.06in 0.06in 0 0;
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
    font-size: 1.4%; /* Percentage-based font size for consistent scaling */
    font-weight: bold;
  }

  /* Removed old overlay styles - now using new positioning system */


  /* Text Box */
  .text-box-area {
    background: rgba(255, 255, 255, 0.95);
    border: 0.4% solid #ccc;
    margin: 0.8% 3%;
    padding: 2.4%;
    border-radius: 1.6%;
    font-size: 0.3%; /* Percentage-based font size for consistent scaling */
    line-height: 1.2;
    height: 24%; /* Percentage-based height for consistent scaling */
    overflow: hidden;
  }

  /* Character cards have a swooping text box positioned over full image */
  .text-box-area.character-textbox {
    background: rgba(255, 255, 255, 0.98);
    border: 0.8% solid rgba(139, 69, 19, 0.8);
    margin: 0;
    padding: 3%;
    border-radius: 4.8% 4.8% 4.8% 1.6%;
    position: absolute;
    bottom: 18%; /* Percentage-based positioning */
    left: 12%; /* Percentage-based positioning */
    right: 3%; /* Percentage-based positioning */
    height: 24%; /* Percentage-based height */
    backdrop-filter: blur(1.6%);
    z-index: 15;
    box-shadow: 0 0.8% 3.2% rgba(0,0,0,0.3);
  }

  .text-box-area.character-textbox::before {
    content: '';
    position: absolute;
    top: -0.8%;
    left: -0.8%;
    right: -0.8%;
    bottom: -0.8%;
    background: linear-gradient(135deg, var(--frame-color), transparent);
    border-radius: 4.8% 4.8% 4.8% 1.6%;
    z-index: -1;
    opacity: 0.3;
  }

  .keywords-line {
    margin-bottom: 0.4%;
    color: var(--frame-color);
  }

  .card-text {
    color: #333;
  }




  /* Card Type Indicator */
  .card-type-indicator {
    position: absolute;
    bottom: 2.5%; /* Percentage-based positioning */
    left: 0.8%; /* Percentage-based positioning */
    font-size: 0.6%; /* Percentage-based font size for consistent scaling */
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.05%; /* Percentage-based letter spacing */
  }

  /* Print Styles */
  @media print {
    .ufs-card {
      width: 2.5in; /* Standard trading card width */
      height: 3.5in; /* Standard trading card height */
      box-shadow: none;
      /* Ensure container queries work in print */
      container-type: inline-size;
    }

    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }

  /* Updated positioning for official UFS layout */
  .difficulty-circle {
    position: absolute;
    top: 0.1in;
    left: 0.075in;
    width: 0.4in;
    height: 0.4in;
    background: rgba(255, 255, 255, 0.9);
    color: black;
    border: 0.005in solid var(--frame-color);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.04in;
    font-weight: bold;
    z-index: 20;
    box-shadow: 0 0.005in 0.0125in rgba(0,0,0,0.2);
  }

  .difficulty-value {
    position: absolute;
    z-index: 25;
    font-size: 0.035in;
    font-weight: bold;
    color: white;
    text-shadow: 0 0 0.01in rgba(0,0,0,0.8);
  }

  .card-name-container {
    position: absolute;
    top: 0.525in; /* 15% of 3.5in */
    left: 0;
    bottom: 1.4in; /* 40% of 3.5in */
    width: 0.225in; /* 9% of 2.5in */
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, var(--frame-color), var(--frame-secondary));
    z-index: 20;
    padding: 0.0375in; /* 1.5% of 2.5in */
  }

  /* Character cards have horizontal name at top */
  .character-card .card-name-container {
    top: 0.105in; /* 3% of 3.5in */
    left: 50%;
    transform: translateX(-50%);
    height: 0.28in; /* 8% of 3.5in */
    width: 2in; /* 80% of 2.5in */
    bottom: auto;
    background: linear-gradient(to right, var(--frame-color), var(--frame-secondary));
    border-radius: 0.1in; /* 4% converted to physical */
  }

  .card-name {
    writing-mode: vertical-lr;
    text-orientation: mixed;
    color: white;
    font-size: 0.12in; /* Physical unit for consistent print scaling */
    font-weight: bold;
    text-shadow: 0.008in 0.008in 0.015in rgba(0,0,0,0.8);
    letter-spacing: 0.008in;
    text-align: center;
    transform: rotate(180deg);
  }

  /* Character cards have horizontal name */
  .character-card .card-name {
    writing-mode: initial;
    text-orientation: initial;
    font-size: 0.09in; /* Physical unit for consistent print scaling */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transform: none;
  }


  .block-modifier-corner {
    position: absolute;
    top: 0.105in; /* 3% of 3.5in */
    right: 0.075in; /* 3% of 2.5in */
    width: 0.3in; /* 12% of 2.5in */
    height: 0.56in; /* 16% of 3.5in */
    background: white;
    border: 0.005in solid var(--frame-color);
    border-radius: 0.0375in; /* 1.5% converted to physical */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.0275in; /* 1.1% converted to physical */
    font-weight: bold;
    gap: 0.0075in; /* 0.3% converted to physical */
    z-index: 20;
    box-shadow: 0 0.005in 0.0125in rgba(0,0,0,0.2);
  }

  .block-number {
    font-size: 0.02in; /* 0.8% converted to physical */
    line-height: 1;
    color: var(--frame-color);
  }

  .attack-stats-group {
    position: absolute;
    top: 50%;
    right: 0.05in; /* 2% of 2.5in */
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 0.07in; /* 2% of 3.5in for vertical gap */
    z-index: 20;
  }

  .attack-zone-stat {
    position: relative;
  }

  .damage-stat {
    position: relative;
  }

  .zone-speed-circle, .damage-value-circle {
    width: 0.3in; /* Increased size for SVG icons */
    height: 0.3in; /* Make circular instead of oval */
    background: rgba(255, 255, 255, 0.95);
    border: 0.0075in solid var(--frame-color);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.0325in; /* 1.3% converted to physical */
    box-shadow: 0 0.0075in 0.015in rgba(0,0,0,0.3);
    position: relative;
  }

  .speed-value, .damage-value {
    font-size: 0.025in; /* 1% converted to physical */
    line-height: 1;
    color: white;
    position: absolute;
    z-index: 25;
    font-weight: bold;
    text-shadow: 0 0 0.01in rgba(0,0,0,0.8);
  }

  .character-stats-group {
    position: absolute;
    top: 0.77in; /* 22% of 3.5in */
    right: 0.075in; /* 3% of 2.5in */
    display: flex;
    flex-direction: column;
    gap: 0.07in; /* 2% of 3.5in for vertical gap */
    z-index: 20;
  }

  .character-hand-size,
  .character-vitality {
    background: rgba(255, 255, 255, 0.95);
    border: 0.02in solid var(--frame-color);
    border-radius: 50%;
    width: 0.45in;
    height: 0.45in;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.03in; /* Physical unit for consistent print scaling */
    box-shadow: 0 0.0125in 0.025in rgba(0,0,0,0.2);
    position: relative;
  }

  .stat-value {
    position: absolute;
    z-index: 25;
    font-size: 0.03in;
    font-weight: bold;
    color: white;
    text-shadow: 0 0 0.01in rgba(0,0,0,0.8);
  }

  .character-vital-stats {
    background: rgba(255, 255, 255, 0.95);
    border: 0.02in solid var(--frame-color);
    border-radius: 0.05in; /* 2% converted to physical */
    padding: 0.07in 0.075in; /* 2% and 3% converted to physical */
    backdrop-filter: blur(0.0125in);
    box-shadow: 0 0.0125in 0.025in rgba(0,0,0,0.2);
  }

  .vital-stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.03in; /* Physical unit for consistent print scaling */
    line-height: 1.2;
    margin-bottom: 0.02in;
  }

  .vital-stat-item:last-child {
    margin-bottom: 0;
  }

  .vital-label {
    font-weight: bold;
    color: var(--frame-color);
    min-width: 0.06in; /* Physical unit for consistent print scaling */
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
    bottom: 0.07in;
    right: 0.05in;
    width: 0.3in;
    height: 0.3in;
    background: rgba(255, 255, 255, 0.95);
    color: black;
    border: 0.008in solid var(--frame-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.032in; /* Physical unit for consistent print scaling */
    font-weight: bold;
    z-index: 20;
    box-shadow: 0 0.008in 0.015in rgba(0,0,0,0.2);
    position: relative;
  }

  .control-value {
    position: absolute;
    z-index: 25;
    font-size: 0.025in;
    font-weight: bold;
    color: white;
    text-shadow: 0 0 0.01in rgba(0,0,0,0.8);
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
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 0.08in; /* Reduced height for less padding */
    z-index: 5;
    box-sizing: border-box;
    padding: 0 0.02in; /* Reduced padding */
  }

  .info-text {
    color: black;
    font-size: 0.04in; /* Increased font size for better readability */
    font-weight: 600;
    text-shadow: 
      0 0 0.003in white,
      0 0 0.006in white;
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