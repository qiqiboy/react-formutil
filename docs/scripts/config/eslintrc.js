/**
 * 0: off
 * 1: warn
 * 2: error
 */
module.exports = {
    env: {
        amd: true
    },
    rules: {
        'react/jsx-no-target-blank': 0,
        eqeqeq: 0,
        radix: 0,
        'no-script-url': 0,
        'no-mixed-operators': 0,
        'linebreak-style': [2, 'unix'],
        indent: 0,
        'no-whitespace-before-property': 2,
        'padded-blocks': [1, 'never'],
        'one-var-declaration-per-line': [1, 'initializations'],
        'space-in-parens': [1, 'never'],
        'space-before-function-paren': [
            1,
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'space-unary-ops': 2,
        'space-infix-ops': 1,
        'no-multiple-empty-lines': [
            1,
            {
                max: 2,
                maxEOF: 1,
                maxBOF: 1
            }
        ],
        semi: 0,
        quotes: 0,
        'array-callback-return': 2,
        //"complexity": [2, 20],
        'default-case': 2,
        curly: 2,
        'dot-location': ['error', 'property'],
        'dot-notation': 2,
        'no-else-return': 2,
        'guard-for-in': 2,
        'no-empty-pattern': 2,
        'no-implied-eval': 2,
        //"no-invalid-this": 1,
        'no-global-assign': 2,
        'no-multi-spaces': [
            2,
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
        'no-with': 2,
        'no-useless-escape': 2,
        'no-useless-concat': 2,
        'no-unused-expressions': [
            2,
            {
                allowTernary: true,
                allowShortCircuit: true
            }
        ],
        'no-unmodified-loop-condition': 2,
        'wrap-iife': [2, 'inside']
    }
};
