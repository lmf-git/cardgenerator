<script>
  let { value = 20, size = 24, color = '#333' } = $props();
</script>

<svg height={size} viewBox="0 0 24 24" class="stat-icon">
  <!-- Vitality: heart/medical cross symbol -->
  <circle cx="12" cy="12" r="10" fill="white" stroke={color} stroke-width="1.5"/>
  <path d="M8 12 L12 8 L16 12 L12 16 Z" fill={color}/>
  <text x="12" y="20" text-anchor="middle" font-family="'OPTICopperplate-Light', Arial, sans-serif" font-size="18" font-weight="bold" fill={color}>
    {value}
  </text>
</svg>

<style>
  @font-face {
    font-family: 'OPTICopperplate-Light';
    src: url('/fonts/OPTICopperplate-Light.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  .stat-icon {
    display: inline-block;
    vertical-align: middle;
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
  }
</style>