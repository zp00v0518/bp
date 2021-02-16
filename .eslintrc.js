module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prefer-destructuring': 'off',
    'vue/no-unused-components': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'no-use-before-define': ['error', { functions: false }],
    // 'space-before-function-paren': ['error', 'never'],
    // 'space-before-function-paren': 'off',
    'space-before-function-paren': [
      'warn',
      { anonymous: 'never', named: 'never', asyncArrow: 'always' }
    ],
    'comma-dangle': [
      'warn',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ],
    'func-names': 'off',
    'no-unused-vars': 1,
    'object-curly-newline': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'no-extra-boolean-cast': 'off',
    // 'object-curly-newline': ['warn', { multiline: true }],
    // semi: ['warn', 'always'],
  }
};
