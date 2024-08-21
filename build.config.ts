/**
 * Build file for the Common JS bundle of sdk.
 * Uses the "unbuild" tool to produce a correct common js bundle
 */
import { defineBuildConfig } from 'unbuild';
import { fileURLToPath } from 'url';

export default defineBuildConfig({
  // If entries is not provided, will be automatically inferred from package.json
  entries: [
    // mkdist builder transpiles file-to-file keeping original sources structure
    {
      builder: 'mkdist',
      format: 'cjs',
      input: './src',
      outDir: './cjs',
    },
  ],
  alias: {
    find: '@',
    replacement: fileURLToPath(new URL('./src', import.meta.url)),
  },

  // Change outDir, default is 'dist'
  outDir: 'cjs',

  // Generates .d.ts declaration file
  declaration: true,

  failOnWarn: false,
});
