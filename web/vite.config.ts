import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  resolve: {
    alias : {
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@consts': path.resolve(__dirname, './src/consts'),
      '@routes' : path.resolve(__dirname, './src/routes'),
      '@assets' : path.resolve(__dirname, './src/assets'),
      '@types' : path.resolve(__dirname, './src/types'),
      '@': path.resolve(__dirname, './src')
    }
  },
});
