import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "../shared"),
    },
  },
  // Use '/admin/' base in production so built asset URLs resolve under /admin
  base: mode === 'production' ? '/admin/' : '/',
  build: {
    // Increase chunk size warning limit to reduce noisy warnings on Vercel
    chunkSizeWarningLimit: 2000,
    outDir: 'dist',
    rollupOptions: {
      input: {
        admin: path.resolve(__dirname, 'admin.html'),
        index: path.resolve(__dirname, 'index.html')
      }
    }
  },
  server: {
    port: 5174,
    strictPort: true,
    open: '/admin.html',
    historyApiFallback: true,
    fs: {
      // Allow importing files from the project root and shared directory
      allow: [
        path.resolve(__dirname, '..'),
        path.resolve(__dirname, '../shared')
      ]
    }
  },
  clearScreen: false,
  root: '.'
}))
