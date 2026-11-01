import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      'vue/no-multiple-template-root': 'off',
      'vue/html-self-closing': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/attributes-order': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/html-indent': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/html-closing-bracket-spacing': 'off',
    },
  },
  {
    ignores: [
      '.superpowers/**',
      '.taste-skill/**',
      'components/button.vue',
      'components/carousel.vue',
      'components/toast.vue',
      'components/top-navbar.vue',
      'pages/en/booking.vue',
      'pages/it/prenota.vue',
      'plugins/reload-script.client.ts',
      'pages/index.vue',
      'pages/[[]...slug].vue',
    ],
  },
)
