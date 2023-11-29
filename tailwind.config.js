/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  plugins: [
    // eslint-disable-next-line no-undef
    require('flowbite/plugin')
  ],
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue'],
      serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        prim: {
          50: '#f3f9fc',
          100: '#e5f1f9',
          200: '#c5e3f2',
          300: '#92cae7',
          400: '#58b0d8',
          500: '#3296c5',
          600: '#2378a6',
          700: '#1d6087',
          800: '#1c5270',
          900: '#1c455e',
          950: '#132d3e',
        },
        sec: {
          50: '#f0f9ff',
          100: '#dff2ff',
          200: '#b9e6fe',
          300: '#7bd5fe',
          400: '#34bffc',
          500: '#0aa8ed',
          600: '#0086cb',
          700: '#0072af',
          800: '#055b87',
          900: '#0a4b70',
          950: '#072f4a',
        },
        emphasys: {
          50: '#f8f8f8',
          100: '#f1f0ef',
          200: '#e5e4e3',
          300: '#d2d1cf',
          400: '#bcbab7',
          500: '#9d9a96',
          600: '#85827d',
          700: '#6e6b67',
          800: '#5d5b57',
          900: '#504e4c',
          950: '#292826',
        },
      },
    }
  }
}