
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#1E3A8A',        // Indigo-800 (dark blue)
        'primary-dark': '#1E40AF', // Indigo-900
        secondary: '#3B82F6',      // Blue-500 (accent)
        'secondary-dark': '#2563EB',
        background: '#fcfcfcff',     // Light blue background
        card: '#FFFFFF',
        border: '#CBD5E1',         // Light blue-gray
        text: '#1E293B',           // Slate-800
        'text-light': '#64748B',   // Slate-500
        error: '#EF4444',
        success: '#22C55E',
      },
      boxShadow: {
        'custom-light': '0 1px 3px 0 rgba(30, 64, 175, 0.1), 0 1px 2px 0 rgba(30, 64, 175, 0.06)',
        'custom-md': '0 4px 6px -1px rgba(30, 64, 175, 0.1), 0 2px 4px -1px rgba(30, 64, 175, 0.06)',
      }
    },
  },
  plugins: [],
}
