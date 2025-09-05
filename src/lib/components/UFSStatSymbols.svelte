<script>
  let { type = 'handsize', value = 6, size = 24, color = '#333' } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" style="display: inline-block; vertical-align: middle;">
  {#if type === 'handsize'}
    <!-- Hand size: playing card symbol -->
    <rect x="6" y="4" width="8" height="12" rx="1" fill="white" stroke={color} stroke-width="1.5"/>
    <rect x="8" y="6" width="6" height="8" rx="1" fill="white" stroke={color} stroke-width="1"/>
    <rect x="10" y="8" width="4" height="6" rx="1" fill="white" stroke={color} stroke-width="1"/>
    <!-- Value -->
    <text x="12" y="15" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill={color}>
      {value}
    </text>
  {:else if type === 'vitality'}
    <!-- Vitality: heart/medical cross symbol -->
    <circle cx="12" cy="12" r="10" fill="white" stroke={color} stroke-width="1.5"/>
    <path d="M8 12 L12 8 L16 12 L12 16 Z" fill={color}/>
    <text x="12" y="20" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill={color}>
      {value}
    </text>
  {:else if type === 'damage'}
    <!-- Damage: explosion/burst symbol -->
    <circle cx="12" cy="12" r="10" fill="white" stroke={color} stroke-width="1.5"/>
    <path d="M12 4 L14 8 L18 8 L15 11 L16 15 L12 13 L8 15 L9 11 L6 8 L10 8 Z" fill={color}/>
    <text x="12" y="20" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill={color}>
      {value}
    </text>
  {:else if type === 'speed'}
    <!-- Speed: within zone symbol -->
    <text x="12" y="16" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill={color}>
      {value}
    </text>
  {/if}
</svg>

<style>
  svg {
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
  }
</style>