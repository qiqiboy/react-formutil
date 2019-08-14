const path = require('path');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const sourceMaps = require('rollup-plugin-sourcemaps');
const filesize = require('rollup-plugin-filesize');
const clear = require('rollup-plugin-clear');
const copy = require('rollup-plugin-copy');
const { terser } = require('rollup-plugin-terser');

process.env.NODE_ENV = 'production';

function createConfig(env, module) {
    const isProd = env === 'production';

    return {
        input: 'src/index.js',
        external:
            module === 'umd'
                ? ['react', 'prop-types']
                : id => !id.startsWith('.') && !path.isAbsolute(id),
        output: {
            file: `dist/react-formutil.${module}.${env}.js`,
            format: module,
            name: 'ReactFormutil',
            exports: 'named',
            sourcemap: !isProd,
            globals: {
                react: 'React',
                'prop-types': 'PropTypes'
            }
        },
        treeshake: {
            moduleSideEffects: false
        },
        plugins: [
            clear({
                targets: ['dist']
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify(env)
            }),
            nodeResolve(),
            commonjs({
                include: /node_modules/,
                namedExports: {
                    'node_modules/_react-is@16.8.6@react-is/index.js': ['isValidElementType'],
                    'node_modules/react-is/index.js': ['isValidElementType']
                }
            }),
            babel({
                exclude: 'node_modules/**',
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                runtimeHelpers: true,
                babelrc: false,
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            useBuiltIns: 'entry',
                            corejs: 3,
                            modules: false,
                            exclude: ['transform-typeof-symbol']
                        }
                    ],
                    [
                        '@babel/preset-react',
                        {
                            development: false,
                            useBuiltIns: true
                        }
                    ],
                    ['@babel/preset-typescript']
                ],
                plugins: [
                    'babel-plugin-macros',
                    [
                        '@babel/plugin-transform-destructuring',
                        {
                            // https://github.com/facebook/create-react-app/issues/5602
                            loose: false,
                            useBuiltIns: true,
                            selectiveLoose: [
                                'useState',
                                'useEffect',
                                'useContext',
                                'useReducer',
                                'useCallback',
                                'useMemo',
                                'useRef',
                                'useImperativeHandle',
                                'useLayoutEffect',
                                'useDebugValue'
                            ]
                        }
                    ],
                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                    [
                        '@babel/plugin-proposal-class-properties',
                        {
                            loose: true
                        }
                    ],
                    [
                        '@babel/plugin-proposal-object-rest-spread',
                        {
                            useBuiltIns: true
                        }
                    ],
                    isProd && [
                        // Remove PropTypes from production build
                        'babel-plugin-transform-react-remove-prop-types',
                        {
                            removeImport: true
                        }
                    ]
                ].filter(Boolean)
            }),
            sourceMaps(),
            isProd &&
                terser({
                    sourcemap: true,
                    output: { comments: false },
                    compress:
                        module === 'umd'
                            ? {
                                  warnings: false,
                                  comparisons: false,
                                  keep_infinity: true
                              }
                            : false,
                    warnings: false,
                    ecma: 5,
                    ie8: false,
                    toplevel: module !== 'umd'
                }),
            filesize(),
            copy({
                targets: [`npm/index.${module}.js`],
                verbose: true
            })
        ].filter(Boolean)
    };
}

module.exports = [
    createConfig('development', 'cjs'),
    createConfig('production', 'cjs'),
    createConfig('development', 'esm'),
    createConfig('production', 'esm'),
    createConfig('development', 'umd'),
    createConfig('production', 'umd')
];
