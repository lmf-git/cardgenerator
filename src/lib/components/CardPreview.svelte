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

<div class="card-preview">
  <div class="ufs-card" class:character-card={card.cardType === 'character'} class:attack-card={card.cardType === 'attack'} class:action-card={card.cardType === 'action'} class:foundation-card={card.cardType === 'foundation'} class:asset-card={card.cardType === 'asset'}>
    <!-- A: Difficulty circle (top-left corner) -->
    <div class="difficulty-circle">{card.difficulty}</div>

    <!-- C: Block modifier (top-right corner) -->
    {#if card.hasBlock}
      <div class="block-modifier-corner">
        <ZoneSymbol zone={card.blockZone} size={12} color="#333" />
        <span class="block-number">+{card.blockModifier}</span>
      </div>
    {/if}

    <!-- B: Card name (vertical text on left side for non-character, horizontal on top for character) -->
    <div class="card-name-vertical" class:character-name={card.cardType === 'character'}>
      <span class="vertical-name" class:horizontal-name={card.cardType === 'character'}>{card.name || 'CARD NAME'}</span>
    </div>

    <!-- Main Art Area - different layouts per card type -->
    <div class="card-art-area" 
         class:character-art={card.cardType === 'character'}
         class:attack-art={card.cardType === 'attack'}
         class:action-art={card.cardType === 'action'}
         class:foundation-art={card.cardType === 'foundation'}
         class:asset-art={card.cardType === 'asset'}>
      {#if card.cardArt}
        <img src={card.cardArt} alt="Card Art" class="card-art" 
             class:character-art-img={card.cardType === 'character'} />
      {:else}
        <div class="art-placeholder">
          <div class="placeholder-text">Card Artwork</div>
        </div>
      {/if}

      <!-- D: Attack zone/speed (middle-right on art) -->
      {#if card.cardType === 'attack'}
        <div class="attack-zone-stat">
          <div class="zone-speed-circle">
            <ZoneSymbol zone={card.attackZone} size={10} color="#333" />
            <span class="speed-value">{card.speed}</span>
          </div>
        </div>
      {/if}

      <!-- E: Damage value (lower-right on art) -->
      {#if card.cardType === 'attack'}
        <div class="damage-stat">
          <div class="damage-value-circle">
            <span class="damage-value">{card.damage}</span>
          </div>
        </div>
      {/if}

      <!-- Character stats for character cards -->
      {#if card.cardType === 'character'}
        <div class="character-hand-size">
          <UFSStatSymbols type="handsize" value={card.handSize} size={20} />
        </div>
        <div class="character-vitality">
          <UFSStatSymbols type="vitality" value={card.maxVitality} size={20} />
        </div>
      {/if}
    </div>

    <!-- F: Resource Symbols Bar -->
    {#if card.resourceSymbols.length > 0}
      <div class="resource-symbols-bar">
        {#each card.resourceSymbols as symbol}
          <SymbolIcon {symbol} size={14} color="var(--frame-color)" />
        {/each}
      </div>
    {/if}

    <!-- G: Text Box Area -->
    <div class="text-box-area" class:character-textbox={card.cardType === 'character'}>
      <!-- Keywords -->
      {#if card.keywords.length > 0}
        <div class="keywords-line">
          <strong>{card.keywords.join(', ')}</strong>
        </div>
      {/if}
      
      <!-- Main Text -->
      <div class="card-text">
        {#if card.textBox}
          {@html card.textBox.replace(/\n/g, '<br>')}
        {:else}
          <em>Card abilities and text</em>
        {/if}
      </div>
    </div>

    <!-- H: Vital Statistics (Character only - bottom right) -->
    {#if card.cardType === 'character'}
      <div class="vital-stats-box">
        <div class="vital-line">G: {card.vitalStats.gender || '?'}</div>
        <div class="vital-line">Ht: {card.vitalStats.height || '?'}</div>
        <div class="vital-line">Wt: {card.vitalStats.weight || '?'}</div>
        <div class="vital-line">Bt: {card.vitalStats.bloodType || '?'}</div>
      </div>
    {/if}

    <!-- Bottom Footer -->
    <div class="card-footer">
      <!-- Universe Logo (left) -->
      <div class="universe-logo">
        {card.universe || 'UFS'}
      </div>
      
      <!-- Set Info (middle) -->
      <div class="set-info">
        {card.rarity?.toUpperCase()} • {card.setNumber || 'XXX/XXX'}
      </div>
      
      <!-- J: Control Value (right) -->
      <div class="control-circle">
        <ControlSymbol value={card.controlValue} size={16} color="black" backgroundColor="white" />
      </div>
    </div>

    <!-- G: Card type indicator (bottom-left) -->
    <div class="card-type-indicator">
      {card.cardType.toUpperCase()}
    </div>

    <!-- I: Universe/set info (bottom-left corner) -->
    <div class="universe-set-corner">
      {card.universe || 'UFS'}
    </div>
  </div>
</div>

<style>
  .card-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .ufs-card {
    --frame-color: #666666;
    --frame-secondary: #888888;
    
    width: 250px;
    height: 350px;
    background: white;
    border: 3px solid var(--frame-color);
    border-radius: 12px;
    position: relative;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    font-family: 'Arial Black', Arial, sans-serif;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* Removed old header styles - now using absolute positioning */

  /* Art Area */
  .card-art-area {
    flex: 1;
    position: relative;
    background: #f0f0f0;
    margin: 2px;
    border-radius: 4px;
    overflow: hidden;
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

  /* Ensure character stats are visible over full image */

  .ufs-card:has(.character-art) .text-box-area {
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(4px);
    border: 2px solid rgba(255, 255, 255, 0.8);
  }

  .ufs-card:has(.character-art) .card-footer {
    background: rgba(139, 69, 19, 0.9);
    backdrop-filter: blur(2px);
  }

  .ufs-card:has(.character-art) .resource-symbols-bar {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(2px);
  }

  .art-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #e8e8e8, #d0d0d0);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 14px;
    font-weight: bold;
  }

  /* Removed old overlay styles - now using new positioning system */

  /* Resource Symbols Bar */
  .resource-symbols-bar {
    height: 20px;
    background: rgba(255, 255, 255, 0.9);
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    color: var(--frame-color);
    margin: 0 2px;
    padding: 2px 4px;
  }

  /* Text Box */
  .text-box-area {
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid #ccc;
    margin: 2px 8px;
    padding: 6px;
    border-radius: 4px;
    font-size: 8px;
    line-height: 1.2;
    max-height: 60px;
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

  /* Vital Stats Box */
  .vital-stats-box {
    position: absolute;
    bottom: 110px;
    right: 8px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(139, 69, 19, 0.5);
    border-radius: 4px;
    padding: 4px 6px;
    font-size: 6px;
    line-height: 1.2;
    color: #333;
    z-index: 15;
    backdrop-filter: blur(2px);
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  }

  .vital-line {
    white-space: nowrap;
  }

  /* Footer */
  .card-footer {
    height: 20px;
    background: var(--frame-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    font-size: 8px;
    color: white;
    margin-top: auto;
  }

  .universe-logo {
    font-weight: bold;
  }

  .set-info {
    font-size: 6px;
    opacity: 0.8;
  }

  .control-circle {
    width: 16px;
    height: 16px;
    background: white;
    color: black;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: bold;
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
      color-adjust: exact !important;
    }
  }

  /* Updated positioning for official UFS layout */
  .difficulty-circle {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 24px;
    height: 24px;
    background: white;
    color: black;
    border: 2px solid var(--frame-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .card-name-vertical {
    position: absolute;
    top: 40px;
    left: 4px;
    bottom: 100px;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, var(--frame-color), var(--frame-secondary));
    z-index: 10;
  }

  .vertical-name {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    color: white;
    font-size: 10px;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
    letter-spacing: 1px;
    text-align: center;
  }

  /* Character card name - horizontal across top */
  .card-name-vertical.character-name {
    position: absolute;
    top: 8px;
    left: 40px;
    right: 40px;
    height: 24px;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, var(--frame-color), var(--frame-secondary));
    border-radius: 12px;
    z-index: 15;
  }

  .horizontal-name {
    writing-mode: initial;
    text-orientation: initial;
    color: white;
    font-size: 12px;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
    letter-spacing: 1px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .block-modifier-corner {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 32px;
    background: white;
    border: 2px solid var(--frame-color);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    font-weight: bold;
    gap: 1px;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .block-number {
    font-size: 8px;
    line-height: 1;
    color: var(--frame-color);
  }

  .attack-zone-stat {
    position: absolute;
    top: 40%;
    right: 8px;
    z-index: 10;
  }

  .damage-stat {
    position: absolute;
    bottom: 30%;
    right: 8px;
    z-index: 10;
  }

  .zone-speed-circle, .damage-value-circle {
    width: 28px;
    height: 28px;
    background: rgba(255, 255, 255, 0.95);
    border: 2px solid var(--frame-color);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .speed-value, .damage-value {
    font-size: 12px;
    line-height: 1;
    color: var(--frame-color);
  }

  .character-hand-size {
    position: absolute;
    top: 40px;
    right: 8px;
    z-index: 10;
    background: rgba(255, 255, 255, 0.95);
    border: 2px solid var(--frame-color);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 10px;
  }

  .character-vitality {
    position: absolute;
    top: 70px;
    right: 8px;
    z-index: 10;
    background: rgba(255, 255, 255, 0.95);
    border: 2px solid var(--frame-color);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 10px;
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
    z-index: 10;
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

  @media (max-width: 768px) {
    .card-preview {
      padding: 10px;
    }
    
    .ufs-card {
      width: 200px;
      height: 280px;
    }
  }
</style>