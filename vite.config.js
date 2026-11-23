import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    css: {
      postcss: {
        plugins: [],
      },
    },
    build: {
      // Entry pages: the main site, registration (register.html), core team (team.html)
      // and Junior Scientist (junior-scientist.html).
      rollupOptions: {
        input: {
          main: path.resolve(import.meta.dirname, 'index.html'),
          register: path.resolve(import.meta.dirname, 'register.html'),
          team: path.resolve(import.meta.dirname, 'team.html'),
          juniorScientist: path.resolve(import.meta.dirname, 'junior-scientist.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});