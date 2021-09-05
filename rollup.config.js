import path from 'path';
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
const external = ['react', 'react-dom'];

function createConfig(umd) {
  return {
    input: `./src/index${umd ? '.umd' : ''}.ts`,
    external: umd ? external : [],
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({
        babelHelpers: 'runtime',
        extensions,
        configFile: path.resolve(__dirname, '.babelrc'),
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
