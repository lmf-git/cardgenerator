<script>
  let { symbol = 'all', size = '1em', extraClass = '' } = $props();
</script>

<img
  src="/symbols/{symbol}.png"
  alt="{symbol} symbol"
  class="symbol-icon {extraClass}"
  style="height: {size};"
/>

<style>
  .symbol-icon {
    width: auto;
    display: inline-block;
    vertical-align: middle;
    filter: drop-shadow(0 1px 1px rgba(0,0,0,0.2));
  }
</style>