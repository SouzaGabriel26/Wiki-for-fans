const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'show-content-up': {
          '0%': {
            transform: 'translateY(50%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(-50%)',
            opacity: 1,
          },
        },
        'show-content-left': {
          '0%': {
            transform: 'translateX(50%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
      },
      animation: {
        'show-content-up': 'show-content-up  0.2s ease-in-out',
        'show-content-left': 'show-content-left 0.2s ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;
