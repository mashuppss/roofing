import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Include app directory
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Include components directory if you create one outside app
  ],
  darkMode: 'class', // Enable dark mode using class strategy
  theme: {
    extend: {
      // Add custom theme extensions here (colors, fonts, etc.)
      // Inspired by Apple/Tesla aesthetics
      colors: {
        'primary': {
          light: '#007AFF', // Apple blue
          dark: '#0A84FF',
        },
        'background': {
          light: '#ffffff', // White
          dark: '#121212', // Dark grey
        },
        'text': {
          light: '#1d1d1f', // Apple dark grey
          dark: '#f5f5f7', // Apple light grey
        },
        'card': {
            light: '#f2f2f7',
            dark: '#1c1c1e',
        },
        'border': {
            light: '#d1d1d6',
            dark: '#3a3a3c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Using Inter as a clean, modern font
      },
      // Add animation/transition presets if needed
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
        // Add more keyframes as needed
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideInUp: 'slideInUp 0.5s ease-out',
        // Add more animations
      }
    },
  },
  plugins: [],
};
export default config;