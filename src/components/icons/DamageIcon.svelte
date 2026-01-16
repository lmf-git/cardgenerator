<script>
  let { size = "1em", extraClass = "", attackZone = "" } = $props();
</script>

<svg
  height={size}
  viewBox="0 0 244 211"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="damage-icon {extraClass}"
>
  <circle cx="105.5" cy="105.5" r="105.5" transform="matrix(-1 0 0 1 211 0)" fill="#1C1221"/>
  <circle cx="97.5" cy="97.5" r="97.5" transform="matrix(-1 0 0 1 203 8)" fill="url(#paint0_linear_80_37)"/>
  <path d="M105.938 8C76.0816 8 49.3423 21.268 31.3564 42.1963C44.0132 35.0468 58.4337 31 73.7363 31C123.994 31 164.736 74.6522 164.736 128.5C164.736 155.572 154.437 180.066 137.81 197.732C176.322 184.579 204 148.254 204 105.5C204 51.6522 160.096 8 105.938 8Z" fill="#FFF34C" fill-opacity="0.3"/>

  <!-- High zone -->
  <circle cx="32.5" cy="32.5" r="32.5" transform="matrix(-1 0 0 1 220 0)" fill="url(#paint1_linear_80_37)"/>
  <circle cx="32.5" cy="32.5" r="32.5" transform="matrix(-1 0 0 1 210 7)" fill="#1C1221"/>
  <circle cx="27.5" cy="27.5" r="27.5" transform="matrix(-1 0 0 1 205 12)" fill="#DB7C28"/>
  <path d="M177.5 12C170.07 12 163.329 14.9484 158.38 19.7373C160.678 19.2552 163.059 19 165.5 19C184.554 19 200 34.4462 200 53.5C200 54.1334 199.982 54.7627 199.948 55.3877C203.13 50.9008 205 45.4189 205 39.5C205 24.3122 192.688 12 177.5 12Z" fill="#FFAC00" fill-opacity="0.4"/>
  {#if attackZone === 'high'}
    <g filter="url(#filter2_i_80_37)">
      <circle cx="27.5" cy="27.5" r="27.5" transform="matrix(-1 0 0 1 205 12)" fill="url(#paint8_linear_80_37)"/>
      <path d="M184.439 20L176.618 35.8309L168.798 20L162 20L172.54 39.36L162 58.7201H168.798L176.618 43.6959L184.439 58.7201L191 59L180.63 39.64L191 20.2799L184.439 20Z" fill="url(#paint9_linear_80_37)"/>
    </g>
  {/if}

  <!-- Mid zone -->
  <circle cx="32.5" cy="32.5" r="32.5" transform="matrix(-1 0 0 1 244 66)" fill="url(#paint2_linear_80_37)"/>
  <circle cx="32.5" cy="32.5" r="32.5" transform="matrix(-1 0 0 1 234 73)" fill="#1C1221"/>
  <circle cx="27.5" cy="27.5" r="27.5" transform="matrix(-1 0 0 1 229 78)" fill="#DB7C28"/>
  <path d="M201.5 78C194.07 78 187.329 80.9484 182.38 85.7373C184.678 85.2552 187.059 85 189.5 85C208.554 85 224 100.446 224 119.5C224 120.133 223.982 120.763 223.948 121.388C227.13 116.901 229 111.419 229 105.5C229 90.3122 216.688 78 201.5 78Z" fill="#FFAC00" fill-opacity="0.4"/>
  {#if attackZone === 'mid'}
    <g filter="url(#filter1_i_80_37)">
      <circle cx="27.5" cy="27.5" r="27.5" transform="matrix(-1 0 0 1 229 78)" fill="url(#paint6_linear_80_37)"/>
      <path d="M208.439 86L200.618 101.831L192.798 86L186 86L196.54 105.36L186 124.72H192.798L200.618 109.696L208.439 124.72L215 125L204.63 105.64L215 86.2799L208.439 86Z" fill="url(#paint7_linear_80_37)"/>
    </g>
  {/if}

  <!-- Low zone -->
  <circle cx="32.5" cy="32.5" r="32.5" transform="matrix(-1 0 0 1 220 133)" fill="url(#paint3_linear_80_37)"/>
  <circle cx="32.5" cy="32.5" r="32.5" transform="matrix(-1 0 0 1 210 140)" fill="#1C1221"/>
  <circle cx="26.5" cy="26.5" r="26.5" transform="matrix(-1 0 0 1 204 146)" fill="#DB7C28"/>
  <path d="M176.866 145.578C169.534 145.578 162.882 148.487 157.999 153.213C160.266 152.737 162.617 152.485 165.025 152.485C183.826 152.485 199.066 167.726 199.066 186.526C199.066 187.151 199.049 187.772 199.016 188.389C202.155 183.961 204 178.552 204 172.712C204 157.726 191.852 145.578 176.866 145.578Z" fill="#FFAC00" fill-opacity="0.4"/>
  {#if attackZone === 'low'}
    <g filter="url(#filter0_i_80_37)">
      <circle cx="27.5" cy="27.5" r="27.5" transform="matrix(-1 0 0 1 204 145)" fill="url(#paint4_linear_80_37)"/>
      <path d="M183.439 153L175.618 168.831L167.798 153L161 153L171.54 172.36L161 191.72H167.798L175.618 176.696L183.439 191.72L190 192L179.63 172.64L190 153.28L183.439 153Z" fill="url(#paint5_linear_80_37)"/>
    </g>
  {/if}

  <defs>
    <filter id="filter0_i_80_37" x="149" y="145" width="55" height="55" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feMorphology radius="2" operator="erode" in="SourceAlpha" result="effect1_innerShadow_80_37"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="3.75"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_80_37"/>
    </filter>
    <filter id="filter1_i_80_37" x="174" y="78" width="55" height="55" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feMorphology radius="2" operator="erode" in="SourceAlpha" result="effect1_innerShadow_80_37"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="3.75"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_80_37"/>
    </filter>
    <filter id="filter2_i_80_37" x="150" y="12" width="55" height="55" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feMorphology radius="2" operator="erode" in="SourceAlpha" result="effect1_innerShadow_80_37"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="3.75"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_80_37"/>
    </filter>
    <linearGradient id="paint0_linear_80_37" x1="25" y1="-3.19702e-06" x2="145" y2="211.5" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F47C20"/>
      <stop offset="0.658654" stop-color="#E98F18"/>
      <stop offset="1" stop-color="#E9BC18"/>
    </linearGradient>
    <linearGradient id="paint1_linear_80_37" x1="32.5" y1="0" x2="7" y2="20.5" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1C1221"/>
      <stop offset="0.552885" stop-color="#565656"/>
      <stop offset="1" stop-color="#1C1221"/>
    </linearGradient>
    <linearGradient id="paint2_linear_80_37" x1="32.5" y1="0" x2="7" y2="20.5" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1C1221"/>
      <stop offset="0.552885" stop-color="#565656"/>
      <stop offset="1" stop-color="#1C1221"/>
    </linearGradient>
    <linearGradient id="paint3_linear_80_37" x1="32.5" y1="0" x2="7" y2="20.5" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1C1221"/>
      <stop offset="0.552885" stop-color="#565656"/>
      <stop offset="1" stop-color="#1C1221"/>
    </linearGradient>
    <linearGradient id="paint4_linear_80_37" x1="7.5" y1="-1.13266e-06" x2="44" y2="64.5" gradientUnits="userSpaceOnUse">
      <stop offset="0.538462" stop-color="#201725"/>
      <stop offset="1" stop-color="#868686"/>
    </linearGradient>
    <linearGradient id="paint5_linear_80_37" x1="175.5" y1="153" x2="175.5" y2="192" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF7700"/>
      <stop offset="0.509615" stop-color="#FFAE00"/>
      <stop offset="1" stop-color="#FF7700"/>
    </linearGradient>
    <linearGradient id="paint6_linear_80_37" x1="7.5" y1="-1.13266e-06" x2="44" y2="64.5" gradientUnits="userSpaceOnUse">
      <stop offset="0.538462" stop-color="#201725"/>
      <stop offset="1" stop-color="#868686"/>
    </linearGradient>
    <linearGradient id="paint7_linear_80_37" x1="200.5" y1="86" x2="200.5" y2="125" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF7700"/>
      <stop offset="0.509615" stop-color="#FFAE00"/>
      <stop offset="1" stop-color="#FF7700"/>
    </linearGradient>
    <linearGradient id="paint8_linear_80_37" x1="7.5" y1="-1.13266e-06" x2="44" y2="64.5" gradientUnits="userSpaceOnUse">
      <stop offset="0.538462" stop-color="#201725"/>
      <stop offset="1" stop-color="#868686"/>
    </linearGradient>
    <linearGradient id="paint9_linear_80_37" x1="176.5" y1="20" x2="176.5" y2="59" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF7700"/>
      <stop offset="0.509615" stop-color="#FFAE00"/>
      <stop offset="1" stop-color="#FF7700"/>
    </linearGradient>
  </defs>
</svg>

<style>
  .damage-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>
