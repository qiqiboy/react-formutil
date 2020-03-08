process.env.NODE_ENV = 'production';

const path = require('path');
const fs = require('fs');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('@rollup/plugin-replace');
const nodeResolve = require('@rollup/plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const sourceMaps = require('rollup-plugin-sourcemaps');
const filesize = require('rollup-plugin-filesize');
const copy = require('rollup-plugin-copy');
const sass = require('rollup-plugin-sass');
const { terser } = require('rollup-plugin-terser');
const pkg = require('./package.json');

/**
 * 如果希望将某些模块代码直接构建进输出文件，可以再这里指定这些模块名称
 */
const externalExclude = [
    /*'@babel/runtime', 'regenerator-runtime'*/
];

const exportName = 'react-formutil';
/**
 * 如果你希望编译后的代码里依然自动包含进去编译后的css，那么这里可以设置为 true
 */
const shouldPreserveCss = false;

function createConfig(env, module) {
    const isProd = env === 'production';
    // for umd globals
    const globals = {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes'
    };

    return {
        /**
         * 入口文件位置，如果你更改了entryFile，别忘了同时修改 npm/index.cjs.js 和 npm/index.esm.js 里的文件引用名称
         */
        input: 'src/index.js',
        external:
            module === 'umd'
                ? Object.keys(globals)
                : id =>
                      !externalExclude.some(name => id.startsWith(name)) && !id.startsWith('.') && !path.isAbsolute(id),
        output: {
            name: 'ReactFormutil',
            file: `dist/${exportName}.${module}.${env}.js`,
            format: module,
            exports: 'named',
            sourcemap: false,
            intro:
                module !== 'umd' && shouldPreserveCss
                    ? module === 'cjs'
                        ? `require('./${exportName}.css');`
                        : `import('./${exportName}.css');`
                    : undefined,
            globals
        },
        treeshake: {
            /**
             * 如果你有引入一些有副作用的代码模块，或者构建后的代码运行异常，可以尝试将该项设置为 true
             */
            moduleSideEffects: false
        },
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify(env)
            }),
            nodeResolve({
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }),
            commonjs({
                namedExports: {
                    'node_modules/_react-is@16.13.0@react-is/index.js': ['isValidElementType'],
                    'node_modules/react-is/index.js': ['isValidElementType']
                },
                include: /node_modules/
            }),
            babel({
                exclude: 'node_modules/**',
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                runtimeHelpers: true,
                babelrc: false,
                configFile: false,
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
                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                    [
                        '@babel/plugin-proposal-class-properties',
                        {
                            loose: true
                        }
                    ],
                    [
                        '@babel/plugin-transform-runtime',
                        {
                            version: require('@babel/helpers/package.json').version,
                            corejs: false,
                            helpers: true,
                            regenerator: true,
                            useESModules: true,
                            absoluteRuntime: false
                        }
                    ],
                    isProd && [
                        // Remove PropTypes from production build
                        'babel-plugin-transform-react-remove-prop-types',
                        {
                            removeImport: true
                        }
                    ],
                    // Adds Numeric Separators
                    require('@babel/plugin-proposal-numeric-separator').default
                ].filter(Boolean)
            }),
            module !== 'umd' &&
                sass({
                    output: `dist/${exportName}.css`
                }),
            sourceMaps(),
            isProd &&
                terser({
                    sourcemap: true,
                    output: { comments: false },
                    compress: false,
                    warnings: false,
                    ecma: 5,
                    ie8: false,
                    toplevel: true
                }),
            filesize(),
            copy({
                targets: [`npm/index.${module}.js`],
                verbose: true
            })
        ].filter(Boolean)
    };
}

module.exports = ['cjs', 'esm', 'umd'].reduce((configQueue, module) => {
    return fs.existsSync(`./npm/index.${module}.js`)
        ? configQueue.concat(createConfig('development', module), createConfig('production', module))
        : configQueue;
}, []);
