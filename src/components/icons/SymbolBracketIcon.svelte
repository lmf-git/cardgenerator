<script>
  export let extraClass = "";
</script>

<svg
  viewBox="0 0 757 128"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="symbol-bracket-icon {extraClass}"
  preserveAspectRatio="none"
>
  <defs>
    <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="15%" stop-color="#F5F5F5"/>
      <stop offset="50%" stop-color="#D0D0D0"/>
      <stop offset="85%" stop-color="#B0B0B0"/>
      <stop offset="100%" stop-color="#909090"/>
    </linearGradient>
    <filter id="bevelEffect" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
      <feSpecularLighting in="blur" result="specOut" lighting-color="white" specularConstant="2" specularExponent="20">
        <fePointLight x="-200" y="-100" z="300"/>
      </feSpecularLighting>
      <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2"/>
      <feComposite in="SourceGraphic" in2="specOut2" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
    </filter>
    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="3" stdDeviation="2" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>
  <path d="M756.5 7L6.5 0C25.3 46.4 10 93 0 110.5L26.5 127.5C29.3333 127.5 39.6 124.1 58 110.5C52 93.7 55.5 50.8333 58 31.5H707.706L715.5 18H756.5V7Z"
        fill="url(#metalGradient)"
        filter="url(#bevelEffect)"
        style="filter: url(#bevelEffect) url(#dropShadow);"/>
</svg>

<style>
  .symbol-bracket-icon {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>