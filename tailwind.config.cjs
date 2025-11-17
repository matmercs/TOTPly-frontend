module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5a4',
          dark: '#07847f'
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f7f7fb'
        },
        neutral: {
          100: '#f3f4f6',
          300: '#d1d5db',
          600: '#4b5563'
        },
        accent: '#7c3aed',
        muted: '#6b7280'
      },
      fontFamily: {
        sans: ['Zen Maru Gothic', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem'
      },
      boxShadow: {
        card: '0 10px 40px rgba(2,6,23,0.08)',
        soft: '0 6px 20px rgba(99,102,241,0.06)'
      },
      borderRadius: {
        xl: '14px'
      }
    }
  },
  plugins: [],
}
