<script>
  let { value = 6, size = '1.5em', color = '#333', backgroundColor = 'white', extraClass = '' } = $props();
</script>

<svg viewBox="0 0 24 24" class="svg-icon {extraClass}" style="--size: {size}">
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
  .svg-icon {
    width: var(--size);
    height: var(--size);
    display: inline-block;
    vertical-align: middle;
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
  }
</style>