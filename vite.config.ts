import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    // Library build configuration
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: './src/index.ts',
          name: 'TurtleAnimation',
          fileName: 'index',
          formats: ['es'],
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'framer-motion'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'framer-motion': 'FramerMotion',
            },
            assetFileNames: (assetInfo) => {
              const name = assetInfo.names?.[0] || '';
              if (name.includes('.png')) {
                return 'assets/[name][extname]';
              }
              return 'assets/[name]-[hash][extname]';
            },
          },
        },
        copyPublicDir: false,
      },
    };
  }

  // Development build configuration
  return {
    plugins: [react(), tailwindcss()],
  };
});
