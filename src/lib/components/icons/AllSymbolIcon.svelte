<script>
  let { size = 16, color = '#333' } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" class="symbol-icon">
  <!-- All symbol: Star with inner circle -->
  <circle cx="12" cy="12" r="10" fill="none" stroke={color} stroke-width="2"/>
  <path d="M12 4l2.4 4.8 5.6.8-4 3.6.8 5.6L12 16.8l-4.8 2-0.8-5.6-4-3.6 5.6-.8L12 4z" fill={color}/>
</svg>

<style>
  .symbol-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>