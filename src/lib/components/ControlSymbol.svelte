<script>
  let { value = 6, size = 24, color = '#333', backgroundColor = 'white' } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" style="display: inline-block; vertical-align: middle;">
  <!-- Diamond/rhomboid shape for control symbol -->
  <path 
    d="M12 2 L20 8 L20 16 L12 22 L4 16 L4 8 Z" 
    fill={backgroundColor} 
    stroke={color} 
    stroke-width="1.5"
  />
  
  <!-- Control value number -->
  <text 
    x="12" 
    y="12" 
    text-anchor="middle" 
    dominant-baseline="central" 
    font-family="Arial Black, Arial, sans-serif"
    font-size="10" 
    font-weight="bold" 
    fill={color}
  >
    {value}
  </text>
</svg>

<style>
  svg {
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
  }
</style>