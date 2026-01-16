<script>
  let { size = "1em", extraClass = "", cardType = "character" } = $props();

  // Define colors based on card type for the inner circle
  const cardColors = {
    character: "#C4E1FF",
    attack: "#FF6B6B",
    action: "#6495ED",
    foundation: "#32CD32",
    asset: "#BA55D3"
  };

  // Darker shade for inner shadow based on card type
  const shadowColors = {
    character: { r: 0.4, g: 0.6, b: 0.8 },
    attack: { r: 0.6, g: 0.2, b: 0.2 },
    action: { r: 0.2, g: 0.3, b: 0.6 },
    foundation: { r: 0.1, g: 0.4, b: 0.1 },
    asset: { r: 0.4, g: 0.2, b: 0.5 }
  };

  let currentColor = $derived(cardColors[cardType] || cardColors.character);
  let currentShadow = $derived(shadowColors[cardType] || shadowColors.character);
</script>

<svg
  height={size}
  viewBox="0 0 194 318"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="control-icon {extraClass}"
>
  <path d="M74.5469 0C54.8802 27.1668 19.1814 85.1 36.7813 99.5C68.2759 78.0001 86.2812 74 106.283 68C111.781 66 107.781 69.5 106.283 77.5C122.283 83.5 173.283 94.5001 193.783 159H191.65C198.353 198.896 193.05 285.735 118.566 318C138.232 290.833 174.67 232.4 157.07 218C125.576 239.5 107.571 243.5 87.5684 249.5C82.0707 251.5 86.0707 248 87.5684 240C71.5685 234 20.5685 223 0.0684459 158.5H2.20126C-4.50171 118.604 0.0622025 32.2648 74.5469 0Z" fill="url(#paint0_linear_59_99)"/>
  <path d="M74.5469 0C54.4819 28.4587 20.1935 85.7621 36.8708 99.585C34.3222 101.384 32.6605 102.764 25.7155 108.132C16.1056 76.213 50.0789 27.2231 74.5469 0Z" fill="url(#paint1_linear_59_99)"/>
  <path d="M171.969 206.5C182.378 241.073 143.854 291.567 119.095 317.524C118.746 317.679 118.398 317.836 118.047 317.988C137.714 290.822 174.152 232.388 156.552 217.988C155.766 218.524 154.989 219.049 154.22 219.563C154.22 219.542 154.222 219.521 154.222 219.5C163.222 213.5 160.972 215 171.969 206.5Z" fill="url(#paint2_linear_59_99)"/>
  <g filter="url(#filter0_i_59_99)">
    <circle cx="97" cy="155" r="61" fill={currentColor}/>
  </g>
  <path d="M97 94C126.479 94 150.813 114.202 156.5 142C145.446 126.442 127.539 117 107 117C73.3106 117 46 144.311 46 178C46 182.21 46.4262 186.32 47.2383 190.29C40.161 180.329 36 168.15 36 155C36 121.311 63.3106 94 97 94Z" fill="black" fill-opacity="0.2"/>
  <path d="M152.11 129C156.856 137.679 159.556 147.637 159.556 158.226C159.556 191.915 132.245 219.226 98.5557 219.226C73.8623 219.226 52.5967 204.553 43 183.45C53.3538 202.384 73.4548 215.226 96.5557 215.226C130.245 215.226 157.556 187.915 157.556 154.226C157.556 145.229 155.607 136.688 152.11 129Z" fill="url(#paint3_linear_59_99)"/>
  <defs>
    <filter id="filter0_i_59_99" x="36" y="94" width="122" height="122" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feMorphology radius="20" operator="erode" in="SourceAlpha" result="effect1_innerShadow_59_99"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="15"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 {currentShadow.r} 0 0 0 0 {currentShadow.g} 0 0 0 0 {currentShadow.b} 0 0 0 0.6 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_59_99"/>
    </filter>
    <linearGradient id="paint0_linear_59_99" x1="96.9277" y1="-0.5" x2="97.0703" y2="264.5" gradientUnits="userSpaceOnUse">
      <stop offset="0.341346" stop-color="#DEDEDE"/>
      <stop offset="0.822115" stop-color="#1C1221"/>
    </linearGradient>
    <linearGradient id="paint1_linear_59_99" x1="49.2969" y1="0" x2="49.2969" y2="108.132" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1D1322"/>
      <stop offset="1" stop-color="#DEDEDE"/>
    </linearGradient>
    <linearGradient id="paint2_linear_59_99" x1="145.88" y1="206.5" x2="145.88" y2="317.988" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1D1322"/>
      <stop offset="0.283654" stop-color="#DEDEDE"/>
    </linearGradient>
    <linearGradient id="paint3_linear_59_99" x1="171.5" y1="141.5" x2="43" y2="225.5" gradientUnits="userSpaceOnUse">
      <stop stop-color="#DEDEDE"/>
      <stop offset="1" stop-color="#1D1322"/>
    </linearGradient>
  </defs>
</svg>

<style>
  .control-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>
