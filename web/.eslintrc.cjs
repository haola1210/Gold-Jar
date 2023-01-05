module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'xo', 'plugin:prettier/recommended'],
  overrides: [
    {
      extends: ['xo-typescript', 'plugin:prettier/recommended'],
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/no-for-in-array': 'off',
      },
    },
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-bitwise': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'react/no-unescaped-entities': 'off',
    'react/no-unknown-property': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/consistent-type-assertions': [
      0,
      {
        assertionStyle: 'as' | 'angle-bracket',
        objectLiteralTypeAssertions: 'allow' | 'allow-as-parameter',
      },
    ],
    '@typescript-eslint/no-redundant-type-constituents': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/unified-signatures': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
  },
};
