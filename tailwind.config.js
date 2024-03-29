import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      flex: {
        full: ['1 1 110%'],
      },
      fontFamily: {
        header: ['"Yanone Kaffeesatz", "sans-serif"'],
        sub: ['"Economica", "sans-serif"'],
        text: ['"Nunito Sans", "sans-serif"'],
        alt: ['"Khand", "sans-serif"'],
      },
      screens: {
        xs: '300px',
        // => @media (min-width: 300px) { ... }

        sm: '600px',
        // => @media (min-width: 640px) { ... }

        md: '880px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1600px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [formsPlugin, typographyPlugin, require('tailwind-scrollbar')],
};
