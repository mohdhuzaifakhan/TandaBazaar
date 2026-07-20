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
        sans: ['Poppins', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.03), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'float': '0 10px 30px -10px rgba(0, 0, 0, 0.06)',
        'glow-subtle': '0 0 20px -5px rgba(37, 99, 235, 0.15)',
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
