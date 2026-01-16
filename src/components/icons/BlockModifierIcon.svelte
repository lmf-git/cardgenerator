<script>
  let { size = "1em", extraClass = "", blockZone = "" } = $props();
</script>

<svg
  height={size}
  viewBox="0 0 244 211"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="block-modifier-icon {extraClass}"
>
  <circle cx="138.5" cy="105.5" r="105.5" fill="#1C1221"/>
  <circle cx="138.5" cy="105.5" r="97.5" fill="url(#paint0_linear_59_73)"/>
  <path d="M138.062 8C167.918 8 194.658 21.268 212.644 42.1963C199.987 35.0468 185.566 31 170.264 31C120.006 31 79.2637 74.6522 79.2637 128.5C79.2637 155.572 89.5627 180.066 106.19 197.732C67.6783 184.579 40 148.254 40 105.5C40 51.6522 83.9036 8 138.062 8Z" fill="#FFF34C" fill-opacity="0.3"/>

  <!-- High zone -->
  <circle cx="56.5" cy="32.5" r="32.5" fill="url(#paint1_linear_59_73)"/>
  <circle cx="66.5" cy="39.5" r="32.5" fill="#1C1221"/>
  <circle cx="66.5" cy="39.5" r="27.5" fill="#DB7C28"/>
  <path d="M66.5 12C73.9305 12 80.6713 14.9484 85.6201 19.7373C83.3224 19.2552 80.941 19 78.5 19C59.4462 19 44 34.4462 44 53.5C44 54.1334 44.0181 54.7627 44.0518 55.3877C40.8704 50.9008 39 45.4189 39 39.5C39 24.3122 51.3122 12 66.5 12Z" fill="#FFAC00" fill-opacity="0.4"/>
  {#if blockZone === 'high'}
    <g filter="url(#filter2_i_59_73)">
      <circle cx="66.5" cy="39.5" r="27.5" fill="url(#paint8_linear_59_73)"/>
      <path d="M59.5614 20L67.3817 35.8309L75.202 20L82 20L71.4596 39.36L82 58.7201H75.202L67.3817 43.6959L59.5614 58.7201L53 59L63.3704 39.64L53 20.2799L59.5614 20Z" fill="url(#paint9_linear_59_73)"/>
    </g>
  {/if}

  <!-- Mid zone -->
  <circle cx="32.5" cy="98.5" r="32.5" fill="url(#paint2_linear_59_73)"/>
  <circle cx="42.5" cy="105.5" r="32.5" fill="#1C1221"/>
  <circle cx="42.5" cy="105.5" r="27.5" fill="#DB7C28"/>
  <path d="M42.5 78C49.9305 78 56.6713 80.9484 61.6201 85.7373C59.3224 85.2552 56.941 85 54.5 85C35.4462 85 20 100.446 20 119.5C20 120.133 20.0181 120.763 20.0518 121.388C16.8704 116.901 15 111.419 15 105.5C15 90.3122 27.3122 78 42.5 78Z" fill="#FFAC00" fill-opacity="0.4"/>
  {#if blockZone === 'mid'}
    <g filter="url(#filter1_i_59_73)">
      <circle cx="42.5" cy="105.5" r="27.5" fill="url(#paint6_linear_59_73)"/>
      <path d="M35.5614 86L43.3817 101.831L51.202 86L58 86L47.4596 105.36L58 124.72H51.202L43.3817 109.696L35.5614 124.72L29 125L39.3704 105.64L29 86.2799L35.5614 86Z" fill="url(#paint7_linear_59_73)"/>
    </g>
  {/if}

  <!-- Low zone -->
  <circle cx="56.5" cy="165.5" r="32.5" fill="url(#paint3_linear_59_73)"/>
  <circle cx="66.5" cy="172.5" r="32.5" fill="#1C1221"/>
  <circle cx="66.5" cy="172.5" r="26.5" fill="#DB7C28"/>
  <path d="M67.1338 145.578C74.4658 145.578 81.1179 148.487 86.001 153.213C83.7335 152.737 81.3835 152.485 78.9746 152.485C60.1742 152.485 44.9336 167.726 44.9336 186.526C44.9336 187.151 44.9511 187.772 44.9844 188.389C41.8454 183.961 40 178.552 40 172.712C40.0002 157.726 52.1483 145.578 67.1338 145.578Z" fill="#FFAC00" fill-opacity="0.4"/>
  {#if blockZone === 'low'}
    <g filter="url(#filter0_i_59_73)">
      <circle cx="66.5" cy="172.5" r="27.5" fill="url(#paint4_linear_59_73)"/>
      <path d="M59.5614 153L67.3817 168.831L75.202 153L82 153L71.4596 172.36L82 191.72H75.202L67.3817 176.696L59.5614 191.72L53 192L63.3704 172.64L53 153.28L59.5614 153Z" fill="url(#paint5_linear_59_73)"/>
    </g>
  {/if}

  <defs>
    <filter id="filter0_i_59_73" x="39" y="145" width="55" height="55" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feMorphology radius="2" operator="erode" in="SourceAlpha" result="effect1_innerShadow_59_73"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="3.75"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_59_73"/>
    </filter>
    <filter id="filter1_i_59_73" x="15" y="78" width="55" height="55" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feMorphology radius="2" operator="erode" in="SourceAlpha" result="effect1_innerShadow_59_73"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="3.75"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_59_73"/>
    </filter>
    <filter id="filter2_i_59_73" x="39" y="12" width="55" height="55" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feMorphology radius="2" operator="erode" in="SourceAlpha" result="effect1_innerShadow_59_73"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="3.75"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_59_73"/>
    </filter>
    <linearGradient id="paint0_linear_59_73" x1="66" y1="8" x2="186" y2="219.5" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F47C20"/>
      <stop offset="0.658654" stop-color="#E98F18"/>
      <stop offset="1" stop-color="#E9BC18"/>
    </linearGradient>
    <linearGradient id="paint1_linear_59_73" x1="56.5" y1="0" x2="31" y2="20.5" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1C1221"/>
      <stop offset="0.552885" stop-color="#565656"/>
      <stop offset="1" stop-color="#1C1221"/>
    </linearGradient>
    <linearGradient id="paint2_linear_59_73" x1="32.5" y1="66" x2="7" y2="86.5" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1C1221"/>
      <stop offset="0.552885" stop-color="#565656"/>
      <stop offset="1" stop-color="#1C1221"/>
    </linearGradient>
    <linearGradient id="paint3_linear_59_73" x1="56.5" y1="133" x2="31" y2="153.5" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1C1221"/>
      <stop offset="0.552885" stop-color="#565656"/>
      <stop offset="1" stop-color="#1C1221"/>
    </linearGradient>
    <linearGradient id="paint4_linear_59_73" x1="46.5" y1="145" x2="83" y2="209.5" gradientUnits="userSpaceOnUse">
      <stop offset="0.538462" stop-color="#201725"/>
      <stop offset="1" stop-color="#868686"/>
    </linearGradient>
    <linearGradient id="paint5_linear_59_73" x1="67.5" y1="153" x2="67.5" y2="192" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF7700"/>
      <stop offset="0.509615" stop-color="#FFAE00"/>
      <stop offset="1" stop-color="#FF7700"/>
    </linearGradient>
    <linearGradient id="paint6_linear_59_73" x1="22.5" y1="78" x2="59" y2="142.5" gradientUnits="userSpaceOnUse">
      <stop offset="0.538462" stop-color="#201725"/>
      <stop offset="1" stop-color="#868686"/>
    </linearGradient>
    <linearGradient id="paint7_linear_59_73" x1="43.5" y1="86" x2="43.5" y2="125" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF7700"/>
      <stop offset="0.509615" stop-color="#FFAE00"/>
      <stop offset="1" stop-color="#FF7700"/>
    </linearGradient>
    <linearGradient id="paint8_linear_59_73" x1="46.5" y1="12" x2="83" y2="76.5" gradientUnits="userSpaceOnUse">
      <stop offset="0.538462" stop-color="#201725"/>
      <stop offset="1" stop-color="#868686"/>
    </linearGradient>
    <linearGradient id="paint9_linear_59_73" x1="67.5" y1="20" x2="67.5" y2="59" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF7700"/>
      <stop offset="0.509615" stop-color="#FFAE00"/>
      <stop offset="1" stop-color="#FF7700"/>
    </linearGradient>
  </defs>
</svg>

<style>
  .block-modifier-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>
