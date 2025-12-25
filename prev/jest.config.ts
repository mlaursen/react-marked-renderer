import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  setupFilesAfterEnv: ["<rootDir>/testSetup/init.ts"],
  moduleNameMapper: {
    // https://github.com/microsoft/accessibility-insights-web/pull/5421#issuecomment-1109168149
    "^nanoid": require.resolve("nanoid"),
    "\\.scss$": "identity-obj-proxy",
  },

  testPathIgnorePatterns: ["/node_modules/", "/cypress/"],

  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],

  // this is required to get the correct line coverage when using swc for some
  // reason.
  coverageProvider: "v8",

  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/index.ts",
  ],
};

export default config;
