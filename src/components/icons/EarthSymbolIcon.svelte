<script>
  let { size = 16, color = '#333' } = $props();
</script>

<svg height={size} viewBox="0 0 24 24" class="symbol-icon">
  <!-- Earth symbol: Mountain peaks -->
  <path d="M3 20h18l-4-8-3 6-4-10-3 6-4 6z" fill={color}/>
  <path d="M5 18l2-4 2 4h-4zm6-2l2-6 2 6h-4zm6 0l2-4 2 4h-4z" fill="white" opacity="0.3"/>
</svg>

<style>
  .symbol-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>