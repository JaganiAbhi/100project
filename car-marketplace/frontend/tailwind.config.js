/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'luxury': ['Playfair Display', 'serif'],
        'modern': ['Inter', 'sans-serif'],
        'classic': ['Crimson Text', 'serif'],
      },
      colors: {
        'luxury-gold': '#D4A574',
        'luxury-navy': '#1A2332',
        'luxury-cream': '#F5F2E8',
        'luxury-silver': '#B8B8B8',
        'luxury-charcoal': '#36454F',
      },
    },
  },
  plugins: [],
}