<script>
  let { size = 16, color = '#333' } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" class="symbol-icon">
  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill={color}/>
</svg>

<style>
  .symbol-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>