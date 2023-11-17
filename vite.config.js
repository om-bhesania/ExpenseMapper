import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': 'https://rhda.rhcloud.com',
    },
  },
  plugins: [react()],
 
});
