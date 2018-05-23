var path = require('path');
var fs = require('fs-extra');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
var eslintFormatter = require('react-dev-utils/eslintFormatter');
var DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
var getClientEnvironment = require('./env');
var paths = require('./paths');
var pkg = require(paths.appPackageJson);

var publicPath = '/';
var publicUrl = '';
var env = getClientEnvironment(publicUrl);
var injects = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
    })
];

var matchScriptStylePattern = /<\!--\s*script:\s*([\w]+)(?:\.jsx?)?\s*-->/g;
//console.log(paths);process.exit();
paths.pageEntries.forEach(function(name) {
    var chunks = ['vendor'];
    var file = path.resolve(paths.appPublic, name + '.html');

    if (paths.entries[name]) {
        chunks.push(name);
    }

    var contents = fs.readFileSync(file);
    var matches;

    while ((matches = matchScriptStylePattern.exec(contents))) {
        chunks.push(matches[1]);
    }

    injects.push(
        new HtmlWebpackPlugin({
            chunks: chunks,
            filename: name + '.html',
            template: file,
            inject: true
        })
    );
});

var webpackConfig = {
    devtool: 'cheap-module-source-map',
    entry: Object.assign(paths.entries, {
        vendor: [
            require.resolve('./polyfills'),
            require.resolve('react-dev-utils/webpackHotDevClient'),
            require.resolve('react-error-overlay')
        ].concat(pkg.vendor || [])
    }),
    output: {
        crossOriginLoading: 'anonymous',
        path: paths.appBuild,
        pathinfo: true,
        filename: 'static/js/[name].[hash:8].js',
        chunkFilename: 'static/js/[name].bundle.[hash:8].js',
        publicPath: publicPath,
        devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    },
    resolve: {
        modules: ['node_modules', paths.appNodeModules, paths.root].concat(paths.nodePaths),
        extensions: ['.js', '.json', '.jsx', '.mjs'],
        alias: Object.assign(
            {
                'react-native': 'react-native-web'
            },
            paths.alias
        ),
        plugins: [
            new DirectoryNamedWebpackPlugin({
                honorIndex: true,
                exclude: /node_modules|libs/
            })
        ]
    },

    module: {
        strictExportPresence: true,
        rules: [
            // nothing
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: eslintFormatter
                        },
                        loader: 'eslint-loader'
                    }
                ],
                include: paths.appSrc
            },
            {
                oneOf: [
                    {
                        test: /\.html$/,
                        loader: 'html-loader',
                        options: {
                            interpolate: 'require',
                            root: paths.staticSrc,
                            attrs: [
                                'img:src',
                                'img:data-src',
                                'video:src',
                                'source:src',
                                'audio:src',
                                'script:src',
                                'link:href'
                            ]
                        }
                    },
                    {
                        test: /\.(js|jsx|mjs)$/,
                        include: paths.appSrc,
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    },
                    {
                        test: /\.css$/,
                        use: getCssRule()
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: getCssRule('sass-loader')
                    },
                    {
                        test: /\.less$/,
                        use: getCssRule('less-loader')
                    },
                    {
                        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)$/,
                        loader: 'file-loader',
                        query: {
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    },
                    {
                        test: /\.(txt|htm)$/,
                        loader: 'raw-loader'
                    },
                    {
                        exclude: [/\.(js|jsx|mjs)$/, /\.(txt|htm)$/, /\.json$/],
                        loader: 'file-loader',
                        options: {
                            name: 'static/images/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    plugins: injects.concat([
        new InterpolateHtmlPlugin(env),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.EnvironmentPlugin(env),
        new CaseSensitivePathsPlugin(),
        new WatchMissingNodeModulesPlugin(paths.appNodeModules),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.BannerPlugin('@author ' + pkg.author)
    ]),
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    performance: {
        hints: false
    }
};

function getCssRule(extraRule) {
    var defaultRule = [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                importLoaders: extraRule ? 2 : 1
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'iOS 7',
                            'Firefox ESR',
                            'not ie < 9' // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009'
                    })
                ]
            }
        }
    ];

    if (extraRule) {
        defaultRule.push(extraRule);
    }

    return defaultRule;
}

module.exports = webpackConfig;
