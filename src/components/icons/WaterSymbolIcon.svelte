<script>
  let { size = 16, color = '#333' } = $props();
</script>

<svg height={size} viewBox="0 0 24 24" class="symbol-icon">
  <!-- Water symbol: Water droplet -->
  <path d="M12 2c-4 6-7 9-7 13 0 4 3 7 7 7s7-3 7-7c0-4-3-7-7-13z" fill={color}/>
  <ellipse cx="10" cy="16" rx="2" ry="3" fill="white" opacity="0.3"/>
</svg>

<style>
  .symbol-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>