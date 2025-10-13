<script>
  let { value = 6, size = 24, color = '#333' } = $props();
</script>

<svg height={size} viewBox="0 0 24 24" class="stat-icon">
  <!-- Hand size: playing card symbol -->
  <rect x="6" y="4" width="8" height="12" rx="1" fill="white" stroke={color} stroke-width="1.5"/>
  <rect x="8" y="6" width="6" height="8" rx="1" fill="white" stroke={color} stroke-width="1"/>
  <rect x="10" y="8" width="4" height="6" rx="1" fill="white" stroke={color} stroke-width="1"/>
  <!-- Value -->
  <text x="12" y="15" text-anchor="middle" font-family="'OPTICopperplate-Light', Arial, sans-serif" font-size="18" font-weight="bold" fill={color}>
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