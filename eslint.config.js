import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'

export default [
  ...config.default,
  ...actions.default,
  {
    rules: {
      'jest/no-restricted-jest-methods': 'off',
      '@cspell/spellchecker': 'off',
      'sonarjs/assertions-in-tests': 'off',
      'sonarjs/prefer-specific-assertions': 'off',
      'unicorn/no-break-in-nested-loop': 'off',
      'unicorn/no-declarations-before-early-exit': 'off',
      'unicorn/no-top-level-assignment-in-function': 'off',
      'unicorn/prefer-early-return': 'off',
      'unicorn/prefer-https': 'off',
      'unicorn/prefer-minimal-ternary': 'off',
      'unicorn/prefer-promise-with-resolvers': 'off',
    },
  },
]
