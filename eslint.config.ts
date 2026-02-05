import js from '@eslint/js'
import stylisticTs from '@stylistic/eslint-plugin'
import boundaries from 'eslint-plugin-boundaries'
import i18nPlugin from 'eslint-plugin-i18next'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import regexpPlugin from 'eslint-plugin-regexp'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'src/shared/api/**'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked
    ],

    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,

      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname
      }
    },

    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      unicorn: eslintPluginUnicorn,
      regexp: regexpPlugin,
      '@stylistic/ts': stylisticTs,
      'unused-imports': unusedImports,
      'jsx-a11y': jsxA11y,
      i18next: i18nPlugin,
      'simple-import-sort': simpleImportSort,
      boundaries
    },

    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      'react-refresh/only-export-components': 'warn',
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
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: false }],
      'react/jsx-no-bind': [
        'warn',
        {
          allowArrowFunctions: true,
          allowFunctions: false
        }
      ],
      'react/destructuring-assignment': ['warn', 'always'],

      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          assert: 'either'
        }
      ],
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',

      'i18next/no-literal-string': [
        'error',
        {
          markupOnly: true,
          ignoreAttribute: [
            'data-testid',
            'to',
            'href',
            'id',
            'key',
            'className'
          ]
        }
      ],

      'no-else-return': 'warn',
      'no-extra-boolean-cast': 'error',
      eqeqeq: 'error',
      'no-debugger': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-empty-function': 'off',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'no-lonely-if': 'error',
      curly: ['error', 'all'],
      'func-style': ['warn', 'expression'],
      'prefer-arrow-callback': ['error'],
      'require-await': 'error',
      'default-param-last': 'error',

      'regexp/no-dupe-characters-character-class': 'error',
      'regexp/no-empty-character-class': 'error',
      'regexp/no-obscure-range': 'error',
      'regexp/no-useless-assertions': 'error',
      'regexp/no-useless-character-class': 'error',
      'regexp/prefer-quantifier': 'error',
      'regexp/no-super-linear-backtracking': 'error',

      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-function': ['error', { allow: [] }],
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unsafe-enum-comparison': 'error',
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      '@typescript-eslint/no-redundant-type-constituents': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-unnecessary-template-expression': 'error',

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: false
        }
      ],

      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false
          }
        }
      ],

      '@typescript-eslint/no-floating-promises': [
        'error',
        {
          ignoreVoid: true,
          ignoreIIFE: true
        }
      ],

      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/unbound-method': 'off',

      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: true,
          allowNullish: true
        }
      ],

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
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: 'if', next: '*' }
      ],

      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            camelCase: true,
            pascalCase: true
          }
        }
      ],

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

      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: 'app',
              allow: ['pages', 'widgets', 'features', 'entities', 'shared']
            },
            {
              from: 'pages',
              allow: ['widgets', 'features', 'entities', 'shared']
            },
            { from: 'widgets', allow: ['features', 'entities', 'shared'] },
            { from: 'features', allow: ['entities', 'shared'] },
            { from: 'entities', allow: ['shared'] },
            { from: 'shared', allow: ['shared'] }
          ]
        }
      ],

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: String.raw`^(\./)*(\.\./){2,}`,
              message:
                'Do not use 2+ parent relative imports. Use @/alias instead.'
            }
          ]
        }
      ],

      'simple-import-sort/imports': 'off',
      'simple-import-sort/exports': 'off',

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'sibling',
            'parent',
            'index',
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
      'import/no-cycle': ['error', { maxDepth: 2 }]
    },
    settings: {
      react: {
        version: 'detect'
      },

      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'pages', pattern: 'src/pages/**' },
        { type: 'widgets', pattern: 'src/widgets/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'shared', pattern: 'src/shared/**' }
      ],
      'boundaries/include': ['src/**/*.{ts,tsx,js,jsx}'],

      'import/resolver': {
        typescript: {}
      }
    }
  },

  // OVERRIDE for tests
  {
    files: ['**/*.{spec,test}.{ts,tsx,js,jsx}'],
    rules: {
      'i18next/no-literal-string': 'off',

      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',

      '@typescript-eslint/unbound-method': 'off',

      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off'
    }
  },

  // OVERRIDE for barrel-files index.{ts,tsx}
  {
    files: ['**/index.{ts,tsx}'],
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    }
  }
)
