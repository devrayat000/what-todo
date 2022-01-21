import graphql from '@rollup/plugin-graphql'
import replace from '@rollup/plugin-replace'
import del from 'rollup-plugin-delete'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import typescriptPaths from 'rollup-plugin-tsconfig-paths'
import path from 'path'

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: ['src/app.ts'],
  treeshake: {
    annotations: true,
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false,
    unknownGlobalSideEffects: false,
  },
  output: [
    {
      dir: 'build/cjs',
      format: 'cjs',
      entryFileNames: '[name].cjs',
      chunkFileNames: 'chunk/[name]-[hash].cjs',
    },
    {
      dir: 'build/es',
      format: 'es',
      entryFileNames: '[name].mjs',
      chunkFileNames: 'chunk/[name]-[hash].mjs',
    },
  ],
  plugins: [
    del({
      targets: [
        path.resolve(__dirname, 'build', 'cjs', '*'),
        path.resolve(__dirname, 'build', 'es', '*'),
      ],
    }),
    json(),
    typescript({
      rollupCommonJSResolveHack: true,
      useTsconfigDeclarationDir: true,
      tsconfig: 'tsconfig.prod.json',
    }),
    typescriptPaths({ tsConfigPath: './tsconfig.prod.json' }),
    graphql({ include: 'src/graphql/**/*.{graphql,gql}' }),
    terser({
      ecma: 2020,
      mangle: { toplevel: true },
      format: { comments: false, quote_style: 1 },
      compress: {
        module: true,
        toplevel: true,
        unsafe_arrows: true,
        drop_console: true,
        drop_debugger: true,
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    }),
  ],
}

export default config
