import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { type RollupOptions } from "rollup";
import { dts } from "rollup-plugin-dts";
import { defineRollupSwcOption, swc } from "rollup-plugin-swc3";

const external = (id: string): boolean => !/^[./]/.test(id);

export default [
  {
    input: {
      "react-server": "./src/react-server/index.ts",
      "react-client": "./src/react-client/index.ts",
    },
    external,
    output: {
      dir: "./dist",
      entryFileNames: "[name].mjs",
      sourcemap: true,
    },
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
    input: {
      "react-server": "./types/react-server/index.d.ts",
      "react-client": "./types/react-client/index.d.ts",
    },
    output: {
      dir: "./dist",
      entryFileNames: "[name].d.ts",
      sourcemap: true,
    },
    external,
    plugins: [dts()],
  },
] satisfies RollupOptions[];
