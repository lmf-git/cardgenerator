<script>
  export let size = "1em";
  export let extraClass = "";
  export let attackZone = ""; // "high", "mid", "low"
</script>

<svg
  height={size}
  viewBox="0 0 202 183"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="damage-icon {extraClass}"
>
  <circle cx="81" cy="81" r="81" transform="matrix(-1 0 0 1 167 9.37183)" fill="url(#paint0_linear_5_9)" stroke="black" stroke-width="10"/>
  <path d="M42.0278 50.2162C109.619 -2.24695 139.754 90.2558 145 137.872C145 137.872 153.5 130.372 158 115.872C161.151 105.717 163 90.3718 163 90.3718C125.619 -20.2471 36.6189 26.253 42.0278 50.2162Z" fill="#D9D9D9" fill-opacity="0.36"/>

  <!-- High zone circle -->
  <circle cx="160.524" cy="40.848" r="24.095" transform="rotate(90 160.524 40.848)" fill="url(#paint1_linear_5_9)" stroke="black" stroke-width="10"/>
  <path d="M167.545 53.8672C180.045 39.3672 164.209 26.4277 150.045 24.8672C150.045 24.8672 150.732 23.7059 155.045 22.3672C158.066 21.4298 163.045 21.8672 163.045 21.8672C187.045 34.8672 174.545 51.3672 167.545 53.8672Z" fill="#D9D9D9" fill-opacity="0.36"/>
  {#if attackZone === 'high'}
    <path d="M 150 30 L 170 50 M 170 30 L 150 50" stroke="black" stroke-width="4" stroke-linecap="round"/>
  {/if}

  <!-- Mid zone circle -->
  <circle cx="172.524" cy="97.8479" r="24.095" transform="rotate(90 172.524 97.8479)" fill="url(#paint2_linear_5_9)" stroke="black" stroke-width="10"/>
  <path d="M179.545 110.867C192.045 96.3672 176.209 83.4277 162.045 81.8672C162.045 81.8672 162.732 80.7059 167.045 79.3672C170.066 78.4298 175.045 78.8672 175.045 78.8672C199.045 91.8672 186.545 108.367 179.545 110.867Z" fill="#D9D9D9" fill-opacity="0.36"/>
  {#if attackZone === 'mid'}
    <path d="M 162 87 L 182 107 M 182 87 L 162 107" stroke="black" stroke-width="4" stroke-linecap="round"/>
  {/if}

  <!-- Low zone circle -->
  <circle cx="158.524" cy="153.848" r="24.095" transform="rotate(90 158.524 153.848)" fill="url(#paint3_linear_5_9)" stroke="black" stroke-width="10"/>
  <path d="M165.587 166.903C178.087 152.403 162.251 139.464 148.087 137.903C148.087 137.903 148.774 136.742 153.087 135.403C156.108 134.466 161.087 134.903 161.087 134.903C185.087 147.903 172.587 164.403 165.587 166.903Z" fill="#D9D9D9" fill-opacity="0.36"/>
  {#if attackZone === 'low'}
    <path d="M 148 143 L 168 163 M 168 143 L 148 163" stroke="black" stroke-width="4" stroke-linecap="round"/>
  {/if}
  <defs>
    <linearGradient id="paint0_linear_5_9" x1="81" y1="0" x2="81" y2="162" gradientUnits="userSpaceOnUse">
      <stop stop-color="#E29D2D"/>
      <stop offset="1" stop-color="#DC9C49"/>
    </linearGradient>
    <linearGradient id="paint1_linear_5_9" x1="160.524" y1="16.7531" x2="160.524" y2="64.943" gradientUnits="userSpaceOnUse">
      <stop stop-color="#E29D2D"/>
      <stop offset="1" stop-color="#DC9C49"/>
    </linearGradient>
    <linearGradient id="paint2_linear_5_9" x1="172.524" y1="73.7529" x2="172.524" y2="121.943" gradientUnits="userSpaceOnUse">
      <stop stop-color="#E29D2D"/>
      <stop offset="1" stop-color="#DC9C49"/>
    </linearGradient>
    <linearGradient id="paint3_linear_5_9" x1="158.524" y1="129.753" x2="158.524" y2="177.943" gradientUnits="userSpaceOnUse">
      <stop stop-color="#E29D2D"/>
      <stop offset="1" stop-color="#DC9C49"/>
    </linearGradient>
  </defs>
</svg>

<style>
  .damage-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>