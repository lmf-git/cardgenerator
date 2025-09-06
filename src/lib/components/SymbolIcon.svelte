<script>
  let { symbol = 'all', size = '1em' } = $props();
</script>

<img 
  src="/symbols/{symbol}.png" 
  alt="{symbol} symbol"
  style="width: {size}; height: {size}; display: inline-block; vertical-align: middle; filter: drop-shadow(0 1px 1px rgba(0,0,0,0.2));"
/>