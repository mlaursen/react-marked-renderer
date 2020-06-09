import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/react-marked-renderer.development.js',
      name: 'ReactMarkedRenderer',
      format: 'umd',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      sourcemap: true,
    },
    {
      file: 'dist/react-marked-renderer.production.min.js',
      name: 'ReactMarkedRenderer',
      format: 'umd',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      plugins: [terser()],
    },
  ],
  onwarn: (warning, warn) => {
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }

    warn(warning);
  },
  external: ['react', 'react-dom'],
  plugins: [
    resolve({
      extensions: ['.ts', '.tsx'],
    }),
    babel({
      extensions: ['.ts', '.tsx'],
      babelHelpers: 'bundled',
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
