module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'import',
    'import-fsd',
    'unused-imports',
    'react-native',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  rules: {
    // React 19 rules
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-unknown-property': 'warn',

    // TypeScript overrides
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // Unused imports rules
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // Prettier formatting integration
    'prettier/prettier': 'warn',

    // Import formatting and ordering rules
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    // Feature-Sliced Design boundary checks (eslint-plugin-import-fsd)
    'import-fsd/no-denied-layers': 'error',
    'import-fsd/no-unknown-layers': 'error',
    'import-fsd/no-deprecated-layers': 'warn',

    // React Native - dormant as this is a web project
    'react-native/no-unused-styles': 'off',
    'react-native/no-inline-styles': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/no-raw-text': 'off',
    'react-native/split-platform-components': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json', './tsconfig.app.json'],
      },
    },
    fsd: {
      rootDir: 'src',
      aliases: {
        '@': './src',
      },
    },
  },
  overrides: [
    {
      files: ['src/main.tsx'],
      rules: {
        'import-fsd/no-unknown-layers': 'off',
      },
    },
  ],
  ignorePatterns: [
    'dist',
    'node_modules',
    'public',
    '.eslintrc.cjs',
    'vite.config.ts',
    'commitlint.config.js',
    'eslint.config.js',
  ],
};
