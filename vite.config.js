import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: {
        quality: 80, // איכות מופחתת לתמונות JPG
      },
      png: {
        quality: 80,
      },
      webp: {
        quality: 80,
        lossless: false,
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000, // העלאת גבול האזהרה ל-1MB
    rollupOptions: {
      output: {
        manualChunks: {
          lottie: ['@lottiefiles/react-lottie-player'],
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});