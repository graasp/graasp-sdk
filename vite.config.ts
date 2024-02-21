import { fileURLToPath } from 'url';

import { defineConfig } from 'vitest/config';

export default () => {
  return defineConfig({
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
};
