/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          main: '#FFFFFF',
          secondary: '#FAFAFA',
          tertiary: '#F4F4F6',
          card: '#FFFFFF',
          darkBg: '#090D16',
          darkCard: '#111726',
          darkSubtle: '#172033'
        },
        brand: {
          DEFAULT: '#0F172A',
          dark: '#020617',
          light: '#F8FAFC'
        },
        accent: {
          blue: '#2563EB',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
          indigo: '#6366F1'
        },
        borderSubtle: {
          DEFAULT: '#E5E7EB',
          dark: '#1E293B'
        }
      },
      fontFamily: {
        heading: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        poppins: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        // Zero shadow enforcement
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px'
      }
    },
  },
  plugins: [],
}
