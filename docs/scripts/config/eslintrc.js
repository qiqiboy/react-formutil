const paths = require('./paths');

/**
 * 0: off
 * 1: warn
 * 2: error
 */
module.exports = {
    overrides: [
        {
            files: ['**/*.ts?(x)'],
            /* parserOptions: {
             *     project: paths.appTsConfig,
             * }, */
            rules: {
                // typescript
                '@typescript-eslint/no-use-before-define': [2, { functions: false, classes: false }],
                '@typescript-eslint/unified-signatures': 1,
                // '@typescript-eslint/await-thenable': 2,
                '@typescript-eslint/camelcase': 0,
                'no-unused-vars': 0,
                '@typescript-eslint/no-unused-vars': [
                    1,
                    {
                        vars: 'all',
                        args: 'after-used',
                        ignoreRestSiblings: true,
                        varsIgnorePattern: '^_',
                        argsIgnorePattern: '^_|^err|^ev' // _xxx, err, error, ev, event
                    }
                ],
                '@typescript-eslint/adjacent-overload-signatures': 2,
                '@typescript-eslint/array-type': [
                    1,
                    {
                        default: 'array-simple'
                    }
                ],
                '@typescript-eslint/ban-types': 2,
                '@typescript-eslint/class-name-casing': 2,
                '@typescript-eslint/explicit-function-return-type': 0,
                '@typescript-eslint/explicit-member-accessibility': 0,
                '@typescript-eslint/interface-name-prefix': 0,
                '@typescript-eslint/member-delimiter-style': 2,
                '@typescript-eslint/no-empty-interface': 1,
                '@typescript-eslint/no-extra-non-null-assertion': 2,
                '@typescript-eslint/no-explicit-any': 0,
                '@typescript-eslint/no-inferrable-types': 0,
                '@typescript-eslint/no-misused-new': 2,
                '@typescript-eslint/no-non-null-assertion': 0,
                '@typescript-eslint/consistent-type-assertions': 2,
                '@typescript-eslint/no-parameter-properties': 2,
                '@typescript-eslint/triple-slash-reference': 2,
                '@typescript-eslint/no-var-requires': 2,
                '@typescript-eslint/consistent-type-definitions': [2, 'interface'],
                '@typescript-eslint/no-namespace': 2,
                '@typescript-eslint/prefer-namespace-keyword': 2,
                '@typescript-eslint/type-annotation-spacing': 1
            }
        }
    ],
    globals: {
        __: true
    },
    parserOptions: {
        ecmaFeatures: {
            legacyDecorators: true
        }
    },
    rules: {
        'react/jsx-no-target-blank': 0,
        'react/no-unsafe': [2, { checkAliases: true }],
        'react/no-deprecated': 2,
        'react/no-string-refs': [1, { noTemplateLiterals: true }],
        'jsx-a11y/anchor-is-valid': 0,
        'import/no-anonymous-default-export': [
            2,
            {
                allowArray: true,
                allowArrowFunction: false,
                allowAnonymousClass: false,
                allowAnonymousFunction: false,
                allowCallExpression: true, // The true value here is for backward compatibility
                allowLiteral: true,
                allowObject: true
            }
        ],
        eqeqeq: [1, 'smart'],
        radix: 0,
        'no-script-url': 0,
        'linebreak-style': [1, 'unix'],
        indent: 0, // process by prettier
        semi: 0, // process by prettier
        'semi-spacing': [1, { before: false }],
        'no-extra-semi': 1,
        'padded-blocks': [1, 'never'],
        'one-var-declaration-per-line': [1, 'initializations'],
        'spaced-comment': [1, 'always'],
        'space-in-parens': [1, 'never'],
        'space-before-function-paren': [
            1,
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'space-unary-ops': 1,
        'space-infix-ops': 1,
        'space-before-blocks': 1,
        'no-trailing-spaces': [1, { ignoreComments: true }],
        'key-spacing': [1, { mode: 'strict' }],
        'switch-colon-spacing': 1,
        'func-call-spacing': [1, 'never'],
        'keyword-spacing': 1,
        'no-multiple-empty-lines': [
            1,
            {
                max: 2,
                maxEOF: 1,
                maxBOF: 1
            }
        ],
        'default-case': [1, { commentPattern: '^no[-\\s]+default$' }],
        curly: 2,
        'dot-notation': 1,
        'no-else-return': 2,
        'guard-for-in': 2,
        'no-empty-pattern': 2,
        'no-implied-eval': 2,
        'no-global-assign': 2,
        'no-multi-spaces': [
            1,
            {
                ignoreEOLComments: true,
                exceptions: {
                    VariableDeclarator: true,
                    ImportDeclaration: true
                }
            }
        ],
        'no-lone-blocks': 2,
        'no-self-compare': 2,
        'no-sequences': 2,
        yoda: 1,
        'no-unexpected-multiline': 1,
        'no-with': 2,
        'no-useless-escape': 2,
        'no-useless-concat': 2,
        'no-unused-vars': [
            1,
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_|^err|^ev' // _xxx, err, error, ev, event
            }
        ],
        'no-unmodified-loop-condition': 2,
        'wrap-iife': [2, 'inside'],
        'lines-between-class-members': [1, 'always', { exceptAfterSingleLine: true }],
        'padding-line-between-statements': [
            1,
            {
                blankLine: 'always',
                prev: [
                    'multiline-block-like',
                    'multiline-expression',
                    'const',
                    'let',
                    'var',
                    'cjs-import',
                    'import',
                    'export',
                    'cjs-export',
                    'class',
                    'throw',
                    'directive'
                ],
                next: '*'
            },
            {
                blankLine: 'always',
                prev: '*',
                next: [
                    'multiline-block-like',
                    'multiline-expression',
                    'const',
                    'let',
                    'var',
                    'cjs-import',
                    'import',
                    'export',
                    'cjs-export',
                    'class',
                    'throw',
                    'return'
                ]
            },
            { blankLine: 'any', prev: ['cjs-import', 'import'], next: ['cjs-import', 'import'] },
            { blankLine: 'any', prev: ['export', 'cjs-export'], next: ['export', 'cjs-export'] },
            { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
        ]
    }
};
