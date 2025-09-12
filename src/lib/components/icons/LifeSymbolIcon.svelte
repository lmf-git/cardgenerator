<script>
  let { size = 16, color = '#333' } = $props();
</script>

<svg height={size} viewBox="0 0 24 24" class="symbol-icon">
  <!-- Life symbol: Heart with cross -->
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={color}/>
  <path d="M12 6v8m-4-4h8" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
</svg>

<style>
  .symbol-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>