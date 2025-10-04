<script>
  export let extraClass = "";
  export let blockZone = ""; // "high", "mid", "low"
</script>

<svg
  viewBox="0 0 202 184"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="block-modifier-icon {extraClass}"
>
  <circle cx="115.619" cy="90.6188" r="81" fill="url(#paint0_linear_6_2)" stroke="black" stroke-width="10"/>
  <path d="M159.591 50.4631C92 -2 61.8646 90.5027 56.6189 138.119C56.6189 138.119 48.1189 130.619 43.6189 116.119C40.4675 105.964 38.6189 90.6188 38.6189 90.6188C76 -20.0002 165 26.5 159.591 50.4631Z" fill="#D9D9D9" fill-opacity="0.36"/>

  <!-- High zone circle -->
  <circle cx="24.095" cy="24.095" r="24.095" transform="matrix(4.37114e-08 1 1 -4.37114e-08 17 17)" fill="url(#paint1_linear_6_2)" stroke="black" stroke-width="10"/>
  <path d="M34.0737 54.1142C21.5738 39.6142 37.4094 26.6746 51.5737 25.1142C51.5737 25.1142 50.887 23.9528 46.5737 22.6142C43.553 21.6767 38.5737 22.1142 38.5737 22.1142C14.5738 35.1142 27.0738 51.6142 34.0737 54.1142Z" fill="#D9D9D9" fill-opacity="0.36"/>
  {#if blockZone === 'high'}
    <path d="M 30 30 L 50 50 M 50 30 L 30 50" stroke="black" stroke-width="4" stroke-linecap="round"/>
  {/if}

  <!-- Mid zone circle -->
  <circle cx="24.095" cy="24.095" r="24.095" transform="matrix(4.37114e-08 1 1 -4.37114e-08 5.00003 73.9999)" fill="url(#paint2_linear_6_2)" stroke="black" stroke-width="10"/>
  <path d="M22.0737 111.114C9.57385 96.6142 25.4095 83.6746 39.5737 82.1142C39.5737 82.1142 38.887 80.9528 34.5737 79.6142C31.553 78.6767 26.5738 79.1142 26.5738 79.1142C2.57385 92.1142 15.0739 108.614 22.0737 111.114Z" fill="#D9D9D9" fill-opacity="0.36"/>
  {#if blockZone === 'mid'}
    <path d="M 18 87 L 38 107 M 38 87 L 18 107" stroke="black" stroke-width="4" stroke-linecap="round"/>
  {/if}

  <!-- Low zone circle -->
  <circle cx="24.095" cy="24.095" r="24.095" transform="matrix(4.37114e-08 1 1 -4.37114e-08 18.9997 130)" fill="url(#paint3_linear_6_2)" stroke="black" stroke-width="10"/>
  <path d="M36.0319 167.15C23.532 152.65 39.3676 139.711 53.5319 138.15C53.5319 138.15 52.8452 136.989 48.5319 135.65 C45.5112 134.713 40.5319 135.15 40.5319 135.15C16.532 148.15 29.032 164.65 36.0319 167.15Z" fill="#D9D9D9" fill-opacity="0.36"/>
  {#if blockZone === 'low'}
    <path d="M 32 143 L 52 163 M 52 143 L 32 163" stroke="black" stroke-width="4" stroke-linecap="round"/>
  {/if}
  
  <defs>
    <linearGradient id="paint0_linear_6_2" x1="115.619" y1="9.61877" x2="115.619" y2="171.619" gradientUnits="userSpaceOnUse">
      <stop stop-color="#C95035"/>
      <stop offset="1" stop-color="#CD733E"/>
    </linearGradient>
    <linearGradient id="paint1_linear_6_2" x1="24.095" y1="0" x2="24.095" y2="48.1899" gradientUnits="userSpaceOnUse">
      <stop stop-color="#C95035"/>
      <stop offset="1" stop-color="#CD733E"/>
    </linearGradient>
    <linearGradient id="paint2_linear_6_2" x1="24.095" y1="0" x2="24.095" y2="48.1899" gradientUnits="userSpaceOnUse">
      <stop stop-color="#C95035"/>
      <stop offset="1" stop-color="#CD733E"/>
    </linearGradient>
    <linearGradient id="paint3_linear_6_2" x1="24.095" y1="0" x2="24.095" y2="48.1899" gradientUnits="userSpaceOnUse">
      <stop stop-color="#C95035"/>
      <stop offset="1" stop-color="#CD733E"/>
    </linearGradient>
  </defs>
</svg>

<style>
  .block-modifier-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>