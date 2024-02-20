/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'gold_card': "./src/images/card_gold_2.jpg",
      }
    },
  },
  plugins: [],
}

