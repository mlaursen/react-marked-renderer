module.exports = {
  extends: ['@mlaursen/eslint-config', 'plugin:@next/next/recommended'],
  rules: {
    'react/react-in-jsx-scope': 0,
  },
  overrides: [
    {
      files: ['scripts/*.ts'],
      rules: {
        'no-console': 0,
      },
    },
  ],
};
