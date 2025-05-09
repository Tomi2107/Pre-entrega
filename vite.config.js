import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Pre-entrega/', // 👈 IMPORTANTE
  plugins: [react()],
});
