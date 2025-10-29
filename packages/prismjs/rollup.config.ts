import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { type RollupOptions } from "rollup";
import { dts } from "rollup-plugin-dts";
import { defineRollupSwcOption, swc } from "rollup-plugin-swc3";

const external = (id: string): boolean => !/^[./]/.test(id);

export default [
  {
    input: "./src/index.ts",
    output: {
      file: "./dist/index.mjs",
      format: "esm",
      sourcemap: true,
    },
    external,
    plugins: [
      nodeResolve(),
      (commonjs.default ?? commonjs)(),
      swc(
        defineRollupSwcOption({
          sourceMaps: true,
          jsc: {
            transform: {
              react: {
                runtime: "automatic",
              },
            },
          },
        })
      ),
    ],
  },
  {
    input: "./types/index.d.ts",
    output: {
      file: "./dist/index.d.ts",
      sourcemap: true,
    },
    external,
    plugins: [dts()],
  },
] satisfies RollupOptions[];
