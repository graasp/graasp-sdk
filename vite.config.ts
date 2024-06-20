import { fileURLToPath } from 'url';

import { defaultExclude, defineConfig } from 'vitest/config';

export default () => {
  return defineConfig({
    test: { exclude: [...defaultExclude, 'cjs/**', 'esm/**'] },
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
