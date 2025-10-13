<script>
  let { value = 4, size = 24, color = '#333' } = $props();
</script>

<svg height={size} viewBox="0 0 24 24" class="stat-icon">
  <!-- Speed: within zone symbol -->
  <text x="12" y="16" text-anchor="middle" font-family="'OPTICopperplate-Light', Arial, sans-serif" font-size="16" font-weight="bold" fill={color}>
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