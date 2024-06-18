const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors:{"main":"rgba(19, 21, 80, 1)",
      "auth-button-color":"rgb(233 231 227)"
    
    }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
 
}