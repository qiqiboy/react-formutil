const path = require('path');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const sourceMaps = require('rollup-plugin-sourcemaps');
const { terser } = require('rollup-plugin-terser');

function createConfig(env, module) {
    const isProd = env === 'production';

    return {
        input: 'src/index.js',
        external: module === 'umd' ? ['react', 'prop-types'] : id => !id.startsWith('.') && !path.isAbsolute(id),
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
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify(env)
            }),
            nodeResolve(),
            commonjs({
                include: /node_modules/
            }),
            babel({
                exclude: /node_modules/,
                externalHelpers: false,
                runtimeHelpers: true,
                presets: ['react-app']
            }),
            sourceMaps(),
            isProd &&
                terser({
                    sourcemap: true,
                    output: { comments: false },
                    compress: {
                        keep_infinity: true,
                        pure_getters: true
                    },
                    warnings: false,
                    ecma: 5,
                    ie8: false,
                    toplevel: false
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
