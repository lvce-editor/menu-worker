import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'

export default [
  ...config.default,
  ...config.recommendedVirtualDom,
  ...actions.default,
  {
    rules: {
      'jest/expect-expect': 'off',
      'jest/no-disabled-tests': 'off',
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
  {
    files: [
      'packages/menu-worker/src/parts/InternalMenuState/InternalMenuState.ts',
      'packages/menu-worker/src/parts/KeyBindingsState/KeyBindingsState.ts',
      'packages/menu-worker/src/parts/NativeHostState/NativeHostState.ts',
    ],
    rules: {
      'virtual-dom/prefer-state-destructuring': 'off',
    },
  },
  {
    files: ['packages/menu-worker/test/**/*.ts'],
    rules: {
      'virtual-dom/prefer-merge-class-names': 'off',
    },
  },
]
