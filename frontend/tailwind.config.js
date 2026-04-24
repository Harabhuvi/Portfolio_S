/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /(from|to)-(orange|red|blue|indigo|cyan|green|emerald|purple|pink|yellow|gray|slate|teal|black)-(400|500|600|700|800|900)/,
    },
  ],
  plugins: [],
};

