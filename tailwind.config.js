/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: '#F5F5F5',
        fg: '#0A0A0A',
        surface: '#FFFFFF',
        accent: '#F5B82A',
      },
      boxShadow: {
        hard: '4px 4px 0px 0px #0A0A0A',
      },
      fontFamily: {
        mono: ['SpaceMono'],
        display: ['System'], // Fallback for display headers
      },
    },
  },
  plugins: [],
}
