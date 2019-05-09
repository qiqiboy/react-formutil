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
                : id => !id.startsWith('.') && !id.startsWith('@babel/runtime') && !path.isAbsolute(id),
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
            pureExternalModules: true
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
                include: /node_modules/
            }),
            babel({
                exclude: /node_modules/,
                runtimeHelpers: true,
                babelrc: false,
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            modules: false,
                            useBuiltIns: 'entry',
                            exclude: ['transform-typeof-symbol']
                        }
                    ],
                    [
                        '@babel/preset-react',
                        {
                            development: false,
                            useBuiltIns: true
                        }
                    ]
                ],
                plugins: [
                    'babel-plugin-macros',
                    ['@babel/plugin-proposal-class-properties', { loose: true }],
                    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
                    isProd && [
                        // Remove PropTypes from production build
                        require('babel-plugin-transform-react-remove-prop-types').default,
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
                    mangle: {
                        keep_classnames: true,
                        keep_fnames: true
                    },
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
    createConfig('development', 'umd'),
    createConfig('production', 'umd'),
    createConfig('development', 'esm'),
    createConfig('production', 'esm')
];
