module.exports = {
  extends: ["@mlaursen/eslint-config", "plugin:@next/next/recommended"],
  rules: {
    "react/react-in-jsx-scope": 0,
    // disabled due to weirdness of marked library
    "import/no-named-as-default-member": 0,
  },
  overrides: [
    {
      files: ["scripts/*.ts"],
      rules: {
        "no-console": 0,
      },
    },
  ],
};
