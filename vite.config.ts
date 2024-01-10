/// <reference types="vitest" />
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

export default defineConfig({
  test: {},
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
});
