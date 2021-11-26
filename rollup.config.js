import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

import packageJson from './package.json';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'];
const external = Object.keys(globals);

function createConfig(umd) {
  return {
    input: './src/index.ts',
    external,
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({
        babelHelpers: 'runtime',
        extensions,
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        plugins: ['@babel/plugin-transform-runtime'],
        include: ['src/**/*'],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: false,
      }),
    ],
    output: [
      umd && {
        file: packageJson.browser.replace('.min', ''),
        name: 'ReactMarkedRenderer',
        format: 'umd',
        globals,
        sourcemap: true,
      },
      umd && {
        file: packageJson.browser,
        name: 'ReactMarkedRenderer',
        format: 'umd',
        globals,
        plugins: [terser()],
      },
      !umd && {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      !umd && {
        file: packageJson.module,
        format: 'es',
        sourcemap: true,
      },
    ].filter(Boolean),
  };
}

export default [createConfig(true), createConfig(false)];
