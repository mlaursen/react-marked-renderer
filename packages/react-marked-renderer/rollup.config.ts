import { nodeResolve } from "@rollup/plugin-node-resolve";
import { type RollupOptions } from "rollup";
import { dts } from "rollup-plugin-dts";
import { defineRollupSwcOption, swc } from "rollup-plugin-swc3";
import preserveDirectives from "rollup-preserve-directives";

function createConfig(): RollupOptions {
  return {
    input: {
      client: "./src/react-client/index.ts",
      server: "./src/react-server/index.ts",
    },
    external: ["react", "react/jsx-runtime"],
    output: {
      dir: "./dist",
      entryFileNames: "[name].mjs",
    },
    plugins: [
      nodeResolve(),
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
      preserveDirectives(),
    ],
  };
}

function createTypesConfig(): RollupOptions {
  return {
    input: {
      client: "./types/react-client/index.d.ts",
      server: "./types/react-server/index.d.ts",
    },
    output: {
      dir: "./dist",
      entryFileNames: "[name].d.ts",
    },
    plugins: [dts()],
  };
}

export default [createConfig(), createTypesConfig()] satisfies RollupOptions[];
