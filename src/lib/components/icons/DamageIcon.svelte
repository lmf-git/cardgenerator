<script>
  let { value = 3, size = 24, color = '#333' } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" class="stat-icon">
  <!-- Damage: explosion/burst symbol -->
  <circle cx="12" cy="12" r="10" fill="white" stroke={color} stroke-width="1.5"/>
  <path d="M12 4 L14 8 L18 8 L15 11 L16 15 L12 13 L8 15 L9 11 L6 8 L10 8 Z" fill={color}/>
  <text x="12" y="20" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill={color}>
    {value}
  </text>
</svg>

<style>
  .stat-icon {
    display: inline-block;
    vertical-align: middle;
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
  }
</style>