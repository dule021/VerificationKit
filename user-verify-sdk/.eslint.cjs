module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:preact/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['preact', '@typescript-eslint'],
  rules: {
    'preact/jsx-key': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'preact/no-deprecated-components': 'warn'
  }
};
