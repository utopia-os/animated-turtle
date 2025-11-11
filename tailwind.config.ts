import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
  content: ['./**/*.{html,tsx,ts}'],
  plugins: [daisyui],
  daisyui: {
    themes: ['light', 'dark', 'cupcake'],
  },
} satisfies Config;
