<script>
  let { size = 16, color = '#333' } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" class="symbol-icon">
  <path d="M6 2l3 6h6l3-6-6 4-6-4zm0 20l3-6h6l3 6-6-4-6 4z" fill={color}/>
</svg>

<style>
  .symbol-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>