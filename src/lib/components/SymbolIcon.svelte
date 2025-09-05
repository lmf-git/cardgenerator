<script>
  let { symbol = 'all', size = 16 } = $props();
</script>

<img 
  src="/symbols/{symbol}.png" 
  alt="{symbol} symbol" 
  width={size} 
  height={size}
  style="display: inline-block; vertical-align: middle; filter: drop-shadow(0 1px 1px rgba(0,0,0,0.2));"
/>