/// <reference types="vitest" />
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { UserConfigExport, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default (): UserConfigExport => {
  return defineConfig({
    test: {},
    plugins: [
      dts({
        tsconfigPath: './tsconfig.build.json',
        insertTypesEntry: true,
      }),
    ],
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'graasp-sdk',
        formats: ['cjs', 'es'],
        // the proper extensions will be added
        fileName: 'index',
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['date-fns', 'uuid'],
      },
    },
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
