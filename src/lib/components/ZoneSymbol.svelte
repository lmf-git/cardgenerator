<script>
  let { zone = 'mid', size = '1.25em', color = '#333', extraClass = '' } = $props();
  
  const strokeWidth = 1.5;
  // Main circle for the zone symbol - matches UFS design
  const mainCircleRadius = 8;
  // Small indicator circles on the left side
  const smallCircleRadius = 2.5;
</script>

<svg viewBox="0 0 24 24" class="svg-icon {extraClass}" style="--size: {size}">
  <!-- Main large circle (gray background like official UFS) -->
  <circle cx="15" cy="12" r={mainCircleRadius} fill="#999" stroke={color} stroke-width={strokeWidth} />
  
  {#if zone === 'high'}
    <!-- High Zone: X in top small circle -->
    <circle cx="7" cy="6" r={smallCircleRadius} fill="white" stroke={color} stroke-width={strokeWidth} />
    <circle cx="7" cy="12" r={smallCircleRadius} fill="#999" stroke={color} stroke-width={strokeWidth} />
    <circle cx="7" cy="18" r={smallCircleRadius} fill="#999" stroke={color} stroke-width={strokeWidth} />
    <!-- X in top circle -->
    <path d="M5 4 L9 8 M9 4 L5 8" stroke={color} stroke-width={strokeWidth} stroke-linecap="round"/>
  {:else if zone === 'mid'}
    <!-- Mid Zone: X in middle small circle -->
    <circle cx="7" cy="6" r={smallCircleRadius} fill="#999" stroke={color} stroke-width={strokeWidth} />
    <circle cx="7" cy="12" r={smallCircleRadius} fill="white" stroke={color} stroke-width={strokeWidth} />
    <circle cx="7" cy="18" r={smallCircleRadius} fill="#999" stroke={color} stroke-width={strokeWidth} />
    <!-- X in middle circle -->
    <path d="M5 10 L9 14 M9 10 L5 14" stroke={color} stroke-width={strokeWidth} stroke-linecap="round"/>
  {:else if zone === 'low'}
    <!-- Low Zone: X in bottom small circle -->
    <circle cx="7" cy="6" r={smallCircleRadius} fill="#999" stroke={color} stroke-width={strokeWidth} />
    <circle cx="7" cy="12" r={smallCircleRadius} fill="#999" stroke={color} stroke-width={strokeWidth} />
    <circle cx="7" cy="18" r={smallCircleRadius} fill="white" stroke={color} stroke-width={strokeWidth} />
    <!-- X in bottom circle -->
    <path d="M5 16 L9 20 M9 16 L5 20" stroke={color} stroke-width={strokeWidth} stroke-linecap="round"/>
  {/if}
</svg>

<style>
  .svg-icon {
    width: var(--size);
    height: var(--size);
    display: inline-block;
    vertical-align: middle;
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
  }
</style>