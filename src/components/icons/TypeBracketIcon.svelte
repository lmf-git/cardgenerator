<script>
  let { extraClass = "", cardType = "character" } = $props();

  // Define colors based on card type
  const cardColors = {
    character: "#ACACAC",
    attack: "#FF6B6B",
    action: "#6495ED",
    foundation: "#32CD32",
    asset: "#BA55D3"
  };

  let currentColor = $derived(cardColors[cardType] || cardColors.character);
</script>

<svg
  viewBox="0 0 255 251"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="type-bracket-icon {extraClass}"
>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M0 249.983L0.0234375 109C91.5234 128.514 178.992 137 155.492 0C163.492 8 165.498 14.4941 168.992 27C177.992 100.5 194.541 119.186 254.492 130.506C241.523 149.5 213.023 176 248.023 204C197.223 241.2 101.523 249.983 0 249.983Z" fill="#E4E4E4"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M254.5 130.5C241.531 149.494 214 176.5 248 204C199.5 240.5 102 251.5 0 249.998L23.4834 226.994C69.4834 231.794 174.483 226.994 223.983 196.494C223.983 196.494 217.483 185.994 215.483 173.994C214.284 145.207 239.83 133.173 254.5 130.5Z" fill="url(#paint0_linear_78_19)"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M155.5 0C163.5 8 165.506 14.4941 169 27C178 100.5 194.049 119.186 254 130.506C249 132 243 133 237 137C161.5 122.5 164.508 76.5 164.508 26.5C161.852 16.9952 160.721 11.86 156.5 6C156.239 4.32147 155.796 1.72436 155.5 0Z" fill="url(#paint1_linear_78_19)"/>
  <path d="M167.5 97C138.3 144.6 64.5 147 25 138C27.5 146.5 25 180.9 25 226.5C103 226.5 182.5 218 218 195.5C207.6 171.1 218.667 149.667 223 142C192 129 176 125.5 167.5 97Z" fill={currentColor}/>
  <path d="M167.5 97C168.498 100.347 169.603 103.349 170.82 106.062C140.006 149.729 69.3438 151.737 31 143C33.4074 151.185 31.1781 183.388 31.0098 226.481C29.006 226.493 27.0025 226.5 25 226.5C25 180.9 27.5 146.5 25 138C64.5 147 138.3 144.6 167.5 97ZM186.096 124.816C195.119 131.153 207.082 135.325 223 142C222.66 142.602 222.279 143.289 221.869 144.056C205.908 137.536 194.417 133.109 186.096 124.816Z" fill="#454545"/>
  <path d="M215.5 139C217.917 139.986 220.372 141.019 223 142.121C218.667 149.788 207.6 171.221 218 195.621C182.5 218.121 103 226.621 25 226.621C25 224.592 25.0054 222.586 25.0146 220.603C101.056 220.173 177.412 211.543 212 189.621C202.699 167.799 210.634 148.35 215.5 139Z" fill="#F8F8F8"/>
  <defs>
    <linearGradient id="paint0_linear_78_19" x1="127.25" y1="0" x2="127.25" y2="250.131" gradientUnits="userSpaceOnUse">
      <stop offset="0.403846" stop-color="#454545"/>
      <stop offset="1" stop-color="#ADADAD"/>
    </linearGradient>
    <linearGradient id="paint1_linear_78_19" x1="240.5" y1="137" x2="171" y2="11.5" gradientUnits="userSpaceOnUse">
      <stop offset="0.293269" stop-color="#D9D9D9"/>
      <stop offset="0.629808" stop-color="#444444"/>
    </linearGradient>
  </defs>
</svg>

<style>
  .type-bracket-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>
