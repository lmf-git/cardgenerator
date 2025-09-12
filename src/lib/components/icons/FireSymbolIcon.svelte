<script>
  let { size = 16, color = '#333' } = $props();
</script>

<svg height={size} viewBox="0 0 24 24" class="symbol-icon">
  <!-- Fire symbol: Flame shape -->
  <path d="M12 2c-1 0-2 1-3 3-2 3-1 6 1 8 1 1 2 1 2 3 0 1-1 2-1 3 0 2 2 3 4 3s4-1 4-3c0-1-1-2-1-3 0-2 1-2 2-3 2-2 3-5 1-8-1-2-2-3-3-3-1 0-2 0-3 0z" fill={color}/>
  <path d="M12 6c0 1 1 2 1 3 0 2-1 3-1 4 0 1 1 1 1 2 0 1-1 1-1 2 0 1 1 1 2 1s2 0 2-1c0-1-1-1-1-2 0-1 1-1 1-2 0-1-1-2-1-4 0-1 1-2 1-3-1-1-2-1-3-1s-1 0-1 1z" fill="white"/>
</svg>

<style>
  .symbol-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>