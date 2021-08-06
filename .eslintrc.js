module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:@intlify/vue-i18n/recommended',
  ],
  globals: {
    Vue: false,
  },
  rules: {
    'no-undef': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-empty-component-block': 'off',
    '@intlify/vue-i18n/no-dynamic-keys': 'error',
    '@intlify/vue-i18n/no-unused-keys': [
      'error',
      {
        extensions: ['.ts', '.vue'],
      },
    ],
  },
  settings: {
    'vue-i18n': {
      localeDir: 'src/locales/*.{json,json5,yaml,yml}',
      messageSyntaxVersion: '^9.0.0',
    },
  },
}
