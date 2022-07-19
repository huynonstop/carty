module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./packages/*/tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {},
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
