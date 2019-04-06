export default imageUrl =>
  `
    <svg width="120" height="167" viewBox="0 0 120 167" fill="none" xmlns="http://www.w3.org/2000/svg">
     <g filter="url(#filter0_d)">
     <path fill-rule="evenodd" clip-rule="evenodd" d="M60.3969 0.855835C60.2359 0.855835 60.0751 0.856587 59.9145 0.858087V0.858097C59.7543 0.856604 59.5939 0.855857 59.4333 0.855857C31.4859 0.855857 8.83008 23.5117 8.83008 51.4591C8.83008 61.6609 11.849 71.1576 17.0422 79.1046L59.915 149.774L59.915 102.062L59.911 102.06L59.9151 102.06L59.9191 102.06L59.915 102.062L59.915 149.774L102.786 79.108C107.98 71.1604 111 61.6624 111 51.4591C111 23.5117 88.3443 0.855835 60.3969 0.855835ZM59.9149 74.5144C72.2959 74.5144 82.3327 64.4776 82.3327 52.0966C82.3327 39.7156 72.2959 29.6788 59.9149 29.6788C47.5339 29.6788 37.4972 39.7156 37.4972 52.0966C37.4972 64.4776 47.5339 74.5144 59.9149 74.5144Z" fill="#00B9CB"/>
     </g>
     <defs>
     <filter id="filter0_d" x="0.628593" y="0.855835" width="118.573" height="165.321" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
     <feFlood flood-opacity="0" result="BackgroundImageFix"/>
     <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
     <feOffset dy="8.20148"/>
     <feGaussianBlur stdDeviation="4.10074"/>
     <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
     <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
     <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
     </filter>
         <clipPath id="cut-off-bottom">
       <circle cx="45" cy=45 r="43.5"  />
     </clipPath>
     </defs>
   
      <image x="1%" y="0%" width="87" clip-path="url(#cut-off-bottom)" transform="translate(15, 6)" xlink:href="${imageUrl}"></image>
     </svg>
     
    `;
