const path = require('path');
const env = process.env.NODE_ENV;

const isProd = env === 'production';

module.exports = {
    devtool: isProd ? false : 'source-map',
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: `react-formutil.${env}.js`,
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs'
    },
    optimization: {
        // minimize: isProd
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            'react-app',
                            {
                                helpers: true
                            }
                        ]
                    ]
                }
            }
        ]
    },
    externals: {
        react: {
            root: 'React',
            amd: 'react',
            commonjs: 'react',
            cammonjs2: 'react'
        },
        'prop-types': {
            root: 'PropTypes',
            amd: 'prop-types',
            commonjs: 'prop-types',
            commonjs2: 'prop-types'
        }
    }
};
