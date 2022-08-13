/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  moduleNameMapper: {
    // https://github.com/microsoft/accessibility-insights-web/pull/5421#issuecomment-1109168149
    "^nanoid": require.resolve("nanoid"),
    "\\.scss$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/testSetup/init.ts"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/index.ts",
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/cypress/"],
};
