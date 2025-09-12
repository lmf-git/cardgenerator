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
  viewBox="0 0 85 123" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
  class="control-icon {extraClass}"
>
  <g clip-path="url(#paint0_diamond_5_6_clip_path)" data-figma-skip-parse="true">
    <g transform="matrix(-0.008 0.032 -0.032 -0.008 42 62)">
      <rect x="0" y="0" width="1066.18" height="1066.18" fill="url(#paint0_diamond_5_6)" opacity="1" shape-rendering="crispEdges"/>
      <rect x="0" y="0" width="1066.18" height="1066.18" transform="scale(1 -1)" fill="url(#paint0_diamond_5_6)" opacity="1" shape-rendering="crispEdges"/>
      <rect x="0" y="0" width="1066.18" height="1066.18" transform="scale(-1 1)" fill="url(#paint0_diamond_5_6)" opacity="1" shape-rendering="crispEdges"/>
      <rect x="0" y="0" width="1066.18" height="1066.18" transform="scale(-1)" fill="url(#paint0_diamond_5_6)" opacity="1" shape-rendering="crispEdges"/>
    </g>
  </g>
  <circle cx="42" cy="62" r="28" fill="url(#paint0_diamond_5_6)"/>
  <g filter="url(#filter0_i_5_6)">
    <path d="M28.0531 0C17.5532 13.5 13.5531 31.5 13.5531 35C13.5531 38.4999 15.0533 41.4997 20.0531 39C26.8529 31.8002 39.8862 28.0001 45.5531 27C45.5531 27.1667 45.4531 28 45.0531 30C76.5531 29.5 84.5531 58.5 84.0531 78.5C83.5531 98.5 59.0531 119.5 53.5531 123C66.353 111.4 70.5531 94.8334 71.0531 88C71.3864 84.6667 69.4531 80 59.0531 88C48.6532 95.9998 39.7197 97.3333 36.5531 97C33.5529 90.0001 14.053 87.9999 6.05306 72.5C-11.5466 40.9002 13.3864 11.0001 28.0531 0ZM42.0003 37C28.1932 37 17.0003 48.1929 17.0003 62C17.0003 75.8071 28.1932 87 42.0003 87C55.8073 86.9998 67.0003 75.807 67.0003 62C67.0003 48.193 55.8073 37.0002 42.0003 37Z" fill="url(#paint1_linear_5_6)"/>
  </g>
  <defs>
    <clipPath id="paint0_diamond_5_6_clip_path">
      <circle cx="42" cy="62" r="28"/>
    </clipPath>
    <filter id="filter0_i_5_6" x="-0.000244141" y="0" width="84.075" height="124" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_innerShadow_5_6"/>
      <feOffset dy="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_5_6"/>
    </filter>
    <linearGradient id="paint0_diamond_5_6" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
      <stop stop-color="white"/>
      <stop offset="0.640664" stop-color={currentGradient.mid}/>
      <stop offset="1" stop-color={currentGradient.end}/>
    </linearGradient>
    <linearGradient id="paint1_linear_5_6" x1="42.0373" y1="0" x2="75.4995" y2="123" gradientUnits="userSpaceOnUse">
      <stop offset="0.432699" stop-color="#CECECE"/>
      <stop offset="0.615384" stop-color="#686868"/>
    </linearGradient>
  </defs>
</svg>

<style>
  .control-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>