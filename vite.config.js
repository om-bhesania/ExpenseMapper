import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    watch: {
      usePolling: true,
    },
    alias: {
      '@': '/src',
    },
    proxy:{
        '/api': 'https://rhda.rhcloud.com',
    }
  },
  plugins: [react()],
});
