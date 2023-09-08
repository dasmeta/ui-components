import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from "rollup-plugin-postcss";
import packageJson from './package.json' assert { type: "json" };

export default {
  input: './src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      globals: {
        react: 'React', 
      }
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
      globals: {
        react: 'React', 
      }
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    json(),
    typescript({
      clean: true
    }),
    babel({
      babelHelpers: 'runtime',
      babelrc: false,
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            useESModules: true,
          },
        ],
        ['import', { libraryName: 'antd', style: true }],
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: /\**node_modules\**/,
    }),
    postcss({
      extensions: ['.css', '.scss', '.less'],
      use: [
        'sass',
        'less',
      ],
    }),
  ],
  external: ['axios', 'react', 'react-dom']
};
