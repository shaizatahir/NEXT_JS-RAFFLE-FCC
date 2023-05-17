/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-light": "#f7f6f2",
        "bt-brown": "#5f95d5",
        "tx-black": "#18191c",
        "bt-gold": "#deb937",
      },
    },
  },
  plugins: [],
};
