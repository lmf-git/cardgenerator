<script>
  let { size = 16, color = '#333' } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" class="symbol-icon">
  <path d="M12 2l-5.5 9h11L12 2zm0 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill={color}/>
</svg>

<style>
  .symbol-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>