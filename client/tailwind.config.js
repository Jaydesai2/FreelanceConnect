/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",                   // HTML file in root
    "./index.jsx",                    // React entry point
    "./main.jsx",                     // Main renderer
    "./App.jsx",                      // Main app component
    "./components/**/*.{js,jsx}",     // All component files
    "./pages/**/*.{js,jsx}",          // All page files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
