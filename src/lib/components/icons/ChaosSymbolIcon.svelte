<script>
  let { size = 16, color = '#333' } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" class="symbol-icon">
  <path d="M13 3L4 14h6l-2 7 9-11h-6l2-7z" fill={color}/>
</svg>

<style>
  .symbol-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>