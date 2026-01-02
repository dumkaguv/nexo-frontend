import js from '@eslint/js'
import stylisticTs from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'src/api/**'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      import: importPlugin,
      unicorn: eslintPluginUnicorn,
      '@stylistic/ts': stylisticTs,
      'unused-imports': unusedImports
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      'react/display-name': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.jsx', '.tsx'] }
      ],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-key': 'error',
      'react/jsx-no-constructed-context-values': 'error',
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],

      'no-else-return': 'warn',
      'no-extra-boolean-cast': 'error',
      eqeqeq: 'error',
      'no-debugger': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: false
        }
      ],

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*', '../**'],
              message:
                'Do not use ../ in imports — use @/alias (or ./ for same-folder).'
            }
          ]
        }
      ],

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type'
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          },
          'newlines-between': 'always-and-inside-groups',
          warnOnUnassignedImports: true
        }
      ],
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/no-named-as-default': 'warn',
      'import/no-named-as-default-member': 'warn',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-cycle': ['error', { maxDepth: 3 }],

      '@stylistic/ts/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var']
        },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' },
        { blankLine: 'always', prev: ['case', 'default'], next: '*' },
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' }
      ],

      curly: ['error', 'all'],
      'arrow-body-style': ['error', 'as-needed'],
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': ['error', { allow: [] }],

      'react/jsx-no-useless-fragment': ['error', { allowExpressions: false }],

      'no-undef': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: {}
      }
    }
  }
)
