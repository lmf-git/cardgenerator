<script>
  import { cardData } from '../stores.js';
  import SymbolIcon from './icons/SymbolIcon.svelte';
  import { getFontFamilyCSS } from '../utils/googleFonts.js';
  // New SVG icons
  import ControlIcon from './icons/ControlIcon.svelte';
  import DamageIcon from './icons/DamageIcon.svelte';
  import DifficultyIcon from './icons/DifficultyIcon.svelte';
  import HandSizeSVGIcon from './icons/HandSizeSVGIcon.svelte';
  import SpeedSVGIcon from './icons/SpeedSVGIcon.svelte';
  import StatsSVGIcon from './icons/StatsSVGIcon.svelte';
  import VitalitySVGIcon from './icons/VitalitySVGIcon.svelte';
  import BlockModifierIcon from './icons/BlockModifierIcon.svelte';
  import TypeBracketIcon from './icons/TypeBracketIcon.svelte';
  import SymbolBracketIcon from './icons/SymbolBracketIcon.svelte';
  import SymbolBracketSeparatorIcon from './icons/SymbolBracketSeparatorIcon.svelte';

  let card = $state($cardData);
  let nameFontFamily = $state('');
  let typeFontFamily = $state('');

  // Sync with store changes
  $effect(() => {
    card = $cardData;
    nameFontFamily = getFontFamilyCSS(card.nameFont || 'ITCBenguiatStd', card.nameFontType || 'local');
    typeFontFamily = getFontFamilyCSS(card.typeFont || 'ITCBenguiatStd', card.typeFontType || 'local');
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
    <!-- A: Difficulty icon (top-left corner) -->
    <div class="difficulty-icon">
      <DifficultyIcon size="0.5in" extraClass="difficulty-svg" cardType={card.cardType} />
      <span class="difficulty-value">{card.difficulty}</span>
    </div>

    <!-- C: Block modifier (top-right corner) -->
    {#if card.hasBlock === true}
      <div class="block-modifier-corner">
        <BlockModifierIcon blockZone={card.blockZone} extraClass="block-modifier-svg" />
        <span class="block-number">+{card.blockModifier}</span>
      </div>
    {/if}

    <!-- B: Card name (vertical text on left side for non-character, horizontal on top for character) -->
    <div class="card-name-container">
      <span class="card-name" style="font-family: {nameFontFamily};">{formatVersionedCardName(card.name, card.version) || 'CARD NAME'}</span>
    </div>
    
    <!-- Type bracket container (under vertical name for non-character cards) -->
    {#if card.cardType !== 'character'}
      <div class="type-bracket-container">
        <TypeBracketIcon extraClass="type-bracket-bg" cardType={card.cardType} />
        <span class="card-type-text" style="font-family: {typeFontFamily};">{card.cardType || 'Type'}</span>
      </div>
    {/if}







    <!-- I: Universe/set info (bottom-left corner) -->
    <div class="universe-set-corner">
      {#if card.universe}
        <img src="/universes/{card.universe}.png" alt="{card.universe}" class="universe-logo" />
      {:else}
        <span class="universe-text">UFS</span>
      {/if}
    </div>

    <!-- J: Control Value (bottom-right corner) -->
    <div class="control-value-corner">
      <ControlIcon size="0.3in" extraClass="control-svg" cardType={card.cardType} />
      <span class="control-value">{card.controlValue}</span>
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
            <div class="damage-stat">
              <div class="damage-icon">
                <DamageIcon attackZone={card.attackZone} size="0.3in" extraClass="damage-svg" />
                <span class="damage-value">{card.damage}</span>
              </div>
            </div>
            <div class="attack-zone-stat">
              <div class="zone-speed-icon">
                <SpeedSVGIcon size="0.3in" extraClass="speed-svg" />
                <span class="speed-value">{card.speed}</span>
              </div>
            </div>
          </div>
        {/if}

        <!-- Character stats for character cards -->
        {#if card.cardType === 'character'}
          <div class="character-stats-group">
            <div class="character-hand-size">
              <HandSizeSVGIcon size="0.4in" extraClass="handsize-svg" />
              <span class="stat-value">{card.handSize}</span>
            </div>
            <div class="character-vitality">
              <VitalitySVGIcon size="0.4in" extraClass="vitality-svg" />
              <span class="stat-value">{card.maxVitality}</span>
            </div>
          </div>
        {/if}
      </div>

      <!-- Character Vital Stats (bottom right corner above control) -->
      {#if card.cardType === 'character'}
        <div class="character-vital-stats">
          <StatsSVGIcon size="0.8in" extraClass="stats-container-svg" cardType={card.cardType} />
          <div class="vital-stats-content">
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

      <!-- Info Section -->
      <div class="card-info-section">
        
        <!-- Resource Symbols at top -->
        {#if card.resourceSymbols.length > 0}
          <div class="resource-symbols" class:character-symbols={card.cardType === 'character'}>
            {#if card.cardType === 'character'}
              <!-- Character cards: just show symbols centered -->
              {#each card.resourceSymbols as symbol}
                <SymbolIcon {symbol} size="3em" extraClass="resource-symbol-icon character-resource-symbol" />
              {/each}
            {:else}
              <!-- Non-character cards: use symbol brackets and separators -->
              <div class="symbol-bracket-container">
                <SymbolBracketIcon extraClass="symbol-bracket-bg" />
                <div class="symbols-with-separators">
                  {#each card.resourceSymbols as symbol, index}
                    <SymbolIcon {symbol} size="6.5em" extraClass="bracketed-symbol-icon" />
                    {#if index < card.resourceSymbols.length - 1}
                      <SymbolBracketSeparatorIcon size="6.5em" extraClass="symbol-separator" />
                    {/if}
                  {/each}
                </div>
              </div>
            {/if}
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
  @font-face {
    font-family: 'OPTICopperplate-Light';
    src: url('/fonts/OPTICopperplate-Light.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'ITCBenguiatStd';
    src: url('/fonts/itc-benguiat-std-cufonfonts/ITCBenguiatStdBookCn.OTF') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'ITCBenguiatStd';
    src: url('/fonts/itc-benguiat-std-cufonfonts/ITCBenguiatStdBookCnIt.OTF') format('opentype');
    font-weight: normal;
    font-style: italic;
  }

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

  .card-art {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    border-radius: 0.06in 0.06in 0 0;
    overflow: hidden;
  }

  /* Ensure character stats are visible over full image */


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



  .keywords-line {
    margin-bottom: 0.4%;
    color: var(--frame-color);
  }

  .card-text {
    color: #333;
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
  .difficulty-icon {
    position: absolute;
    top: 0.05in;
    left: 0.075in;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 25;
  }

  .difficulty-value {
    position: absolute;
    z-index: 30;
    font-size: 0.08in;
    font-weight: bold;
    color: white;
    font-family: 'OPTICopperplate-Light', Arial, sans-serif;
    text-shadow: 0 0 0.01in rgba(0,0,0,0.8);
  }

  .card-name-container {
    position: absolute;
    top: 0.525in; /* 15% of 3.5in */
    left: 0.05in;
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
    font-weight: 300; /* Lighter font weight */
    font-style: italic;
    text-shadow: 0.008in 0.008in 0.015in rgba(0,0,0,0.8);
    letter-spacing: 0.008in;
    text-align: center;
    transform: rotate(180deg) translateX(-0.02in);
  }

  /* Character cards have horizontal name */
  .character-card .card-name {
    writing-mode: initial;
    text-orientation: initial;
    font-size: 0.15in; /* Increased font size for better visibility */
    font-weight: 300; /* Lighter font weight */
    font-style: italic;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transform: translateY(0.01in);
    text-align: center;
  }


  .block-modifier-corner {
    position: absolute;
    top: 0.05in;
    right: 0.05in;
    width: 0.5in; /* Made even smaller */
    height: 0.5in; /* Made even smaller */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 25; /* Above card name container */
  }
  
  .block-modifier-corner :global(.block-modifier-icon) {
    position: absolute;
    width: 0.5in;
    height: 0.5in;
    z-index: 1;
  }


  .block-number {
    position: absolute;
    z-index: 10;
    font-size: 0.12in;
    font-weight: bold;
    color: white;
    font-family: 'OPTICopperplate-Light', Arial, sans-serif;
    text-shadow: 0 0 0.01in rgba(0,0,0,0.8);
  }

  .type-bracket-container {
    position: absolute;
    top: 1.7in; /* Moved up more */
    left: -0.02in;
    width: 0.6in;
    height: 0.6in;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 25;
  }
  
  .type-bracket-container :global(.type-bracket-icon) {
    position: absolute;
    width: 0.6in;
    height: 0.6in;
    z-index: 1;
  }


  .card-type-text {
    position: absolute;
    z-index: 10;
    font-size: 0.065in;
    font-weight: bold;
    color: black;
    text-transform: capitalize;
    text-align: center;
    width: 100%;
    top: 73%;
    left: -5%;
    transform: translateY(-50%);
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

  .zone-speed-icon, .damage-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .speed-value, .damage-value {
    font-size: 0.08in; /* Increased even more */
    line-height: 1;
    color: white;
    position: absolute;
    z-index: 25;
    font-weight: bold;
    font-family: 'OPTICopperplate-Light', Arial, sans-serif;
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
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }


  .stat-value {
    position: absolute;
    z-index: 25;
    font-size: 0.08in;
    font-weight: bold;
    color: white;
    font-family: 'OPTICopperplate-Light', Arial, sans-serif;
    text-shadow: 0 0 0.01in rgba(0,0,0,0.8);
  }

  .character-vital-stats {
    position: absolute;
    bottom: 0.7in; /* Above the control icon */
    right: 0.05in; /* Bottom right corner */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20; /* Above the info section */
  }

  .vital-stats-content {
    position: absolute;
    z-index: 10;
    padding: 0.05in;
    left: 0.1in;
  }

  .vital-stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.04in; /* Increased for better visibility */
    font-family: 'OPTICopperplate-Light', Arial, sans-serif;
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
    bottom: 0.07in;
    left: 0.07in;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .universe-logo {
    max-height: 0.4in;
    max-width: 0.6in;
    width: auto;
    height: auto;
    object-fit: contain;
  }

  .universe-text {
    font-size: 0.06in;
    color: white;
    background: var(--frame-color);
    padding: 0.02in 0.04in;
    border-radius: 0.02in;
  }

  .control-value-corner {
    position: absolute;
    bottom: 0.07in;
    right: 0.05in;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
  }

  .control-value {
    position: absolute;
    z-index: 25;
    font-size: 0.06in;
    font-weight: bold;
    color: white;
    font-family: 'OPTICopperplate-Light', Arial, sans-serif;
    text-shadow: 0 0 0.01in rgba(0,0,0,0.8);
  }

  /* Remove duplicate card-info-section - using the absolute positioned one above */

  .resource-symbols {
    position: absolute;
    top: 2%;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: 1%; /* Percentage-based gap */
    justify-content: flex-start;
    padding: 0;
    min-height: 8%; /* Percentage-based height */
  }

  .resource-symbols.character-symbols {
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 0;
    padding: 0.5% 0;
    border-bottom: 0.2% solid rgba(var(--frame-color), 0.3);
  }
  
  .symbol-bracket-container {
    position: relative;
    display: block;
    width: 100%;
  }

  .symbol-bracket-container :global(.symbol-bracket-icon) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .symbols-with-separators {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0;
    z-index: 10;
    padding: 1.5em 0 0.3em 3.5em;
  }

  .symbols-with-separators :global(.symbol-separator) {
    height: 6.5em;
    width: auto;
    align-self: flex-start;
    margin-left: -1em;
    margin-right: -1em;
  }

  .symbols-with-separators :global(.symbol-icon) {
    align-self: flex-start;
  }
  

  .info-text-area {
    position: absolute;
    top: 12%; /* Percentage-based positioning below resource symbols */
    left: 2%;
    right: 2%;
    bottom: 2%;
    overflow-y: auto;
    font-size: 0.065in; /* Physical unit for consistent print scaling */
    line-height: 1.3;
  }

  /* More space for non-character cards due to larger resource bracket */
  .attack-card .info-text-area,
  .action-card .info-text-area,
  .foundation-card .info-text-area,
  .asset-card .info-text-area {
    top: 32%;
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

  /* Inline symbols in card text */
  :global(.inline-symbol) {
    vertical-align: middle;
    display: inline;
  }

</style>