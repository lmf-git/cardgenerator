<script>
  export let size = "1em";
  export let extraClass = "";
  export let cardType = "character";

  // Define gradients based on card type
  const gradients = {
    character: { start: "#8B4513", mid: "#A0522D", end: "#654321" },
    attack: { start: "#DC143C", mid: "#FF6B6B", end: "#B22222" },
    action: { start: "#4169E1", mid: "#6495ED", end: "#1E3A8A" },
    foundation: { start: "#228B22", mid: "#32CD32", end: "#006400" },
    asset: { start: "#9932CC", mid: "#BA55D3", end: "#4B0082" }
  };

  $: currentGradient = gradients[cardType] || gradients.character;
</script>

<svg 
  height={size} 
  viewBox="0 0 143 287" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
  class="difficulty-icon {extraClass}"
>
  <g filter="url(#filter0_i_1_34)">
    <g clip-path="url(#paint0_diamond_1_34_clip_path)" data-figma-skip-parse="true">
      <g transform="matrix(0.0116723 0.141394 -0.13691 0.0113021 71.3277 143.106)">
        <rect x="0" y="0" width="867.494" height="545.224" fill="url(#paint0_diamond_1_34)" opacity="1" shape-rendering="crispEdges"/>
        <rect x="0" y="0" width="867.494" height="545.224" transform="scale(1 -1)" fill="url(#paint0_diamond_1_34)" opacity="1" shape-rendering="crispEdges"/>
        <rect x="0" y="0" width="867.494" height="545.224" transform="scale(-1 1)" fill="url(#paint0_diamond_1_34)" opacity="1" shape-rendering="crispEdges"/>
        <rect x="0" y="0" width="867.494" height="545.224" transform="scale(-1)" fill="url(#paint0_diamond_1_34)" opacity="1" shape-rendering="crispEdges"/>
      </g>
    </g>
    <path d="M14.0308 124.371C9.43334 213.386 35.1239 241.571 56.5308 257.371C63.7076 207.571 128.031 171.371 128.031 171.371C128.031 171.371 132.031 131.491 116.531 86.8716C101.031 42.2517 86.6317 38.0192 78.0308 28.3716C76.9025 35.8792 72.0375 62.2336 65.0308 77.3716C58.0241 92.5095 44.3428 97.9293 37.4471 102.67C24.0816 111.86 16.8415 117.759 14.0308 124.371Z" fill="url(#paint0_diamond_1_34)"/>
  </g>
  <path d="M68 0C81.2035 11.4781 101 20 125 70.5C149 121 142 180 142 180C142 180 70.0001 210.496 67 286.498C45 276.831 0.799999 229.498 0 117.498C3.49992 108.999 5.00019 110.496 23.5 97.998C33.0447 91.5497 47.6628 78.9988 56.5 59.5C65.3372 40.0011 67 9.49999 68 0ZM79 29.5C77.8717 37.0076 73.0067 63.362 66 78.5C58.9933 93.638 45.3117 99.0577 38.416 103.799C25.0506 112.988 17.8107 118.887 15 125.5C10.4026 214.514 36.0931 242.699 57.5 258.5C64.671 208.739 128.897 172.558 129 172.5C129 172.5 133 132.62 117.5 88C102 43.3802 87.601 39.1476 79 29.5Z" fill="#D9D9D9"/>
  <path d="M68 0C81.2035 11.4781 101 20 125 70.5C149 121 142 180 142 180C142 180 70.0001 210.496 67 286.498C45 276.831 0.799999 229.498 0 117.498C3.49992 108.999 5.00019 110.496 23.5 97.998C33.0447 91.5497 47.6628 78.9988 56.5 59.5C65.3372 40.0011 67 9.49999 68 0ZM79 29.5C77.8717 37.0076 73.0067 63.362 66 78.5C58.9933 93.638 45.3117 99.0577 38.416 103.799C25.0506 112.988 17.8107 118.887 15 125.5C10.4026 214.514 36.0931 242.699 57.5 258.5C64.671 208.739 128.897 172.558 129 172.5C129 172.5 133 132.62 117.5 88C102 43.3802 87.601 39.1476 79 29.5Z" fill="#D9D9D9"/>
  <defs>
    <filter id="filter0_i_1_34" x="13.4912" y="28.3716" width="115.003" height="229" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="21.85"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1_34"/>
    </filter>
    <clipPath id="paint0_diamond_1_34_clip_path">
      <path d="M14.0308 124.371C9.43334 213.386 35.1239 241.571 56.5308 257.371C63.7076 207.571 128.031 171.371 128.031 171.371C128.031 171.371 132.031 131.491 116.531 86.8716C101.031 42.2517 86.6317 38.0192 78.0308 28.3716C76.9025 35.8792 72.0375 62.2336 65.0308 77.3716C58.0241 92.5095 44.3428 97.9293 37.4471 102.67C24.0816 111.86 16.8415 117.759 14.0308 124.371Z"/>
    </clipPath>
    <linearGradient id="paint0_diamond_1_34" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
      <stop stop-color="white"/>
      <stop offset="0.640664" stop-color={currentGradient.mid}/>
      <stop offset="0.862718" stop-color={currentGradient.end}/>
    </linearGradient>
  </defs>
</svg>

<style>
  .difficulty-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>