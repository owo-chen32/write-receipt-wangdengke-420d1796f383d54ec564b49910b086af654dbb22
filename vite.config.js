import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 解决通过ip访问不了的问题
  server: {				
    host: '0.0.0.0'	
  },		
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
})
