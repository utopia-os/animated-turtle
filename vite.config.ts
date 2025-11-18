import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode, command }) => {
  if (mode === 'lib') {
    // Library build configuration
    return {
      plugins: [
        react(),
        dts({
          include: ['src/**/*.ts', 'src/**/*.tsx'],
          outDir: 'dist',
        }),
      ],
      build: {
        lib: {
          entry: './src/index.ts',
          name: 'TurtleAnimation',
          fileName: 'index',
          formats: ['es'],
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react/jsx-runtime': 'react/jsx-runtime',
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
    base: command === 'build' ? '/animated-turtle/' : '/',
  };
});
