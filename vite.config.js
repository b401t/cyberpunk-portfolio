import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Đổi base thành "/<repo-name>/" khi deploy lên GitHub Pages
  // Ví dụ: repo tên "cyberpunk-portfolio" → base: "/cyberpunk-portfolio/"
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
