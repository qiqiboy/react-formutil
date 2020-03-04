/* eslint @typescript-eslint/no-var-requires: 0 */
const fs = require('fs');
const path = require('path');
const resolve = require('resolve');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const pkg = require(paths.appPackageJson);
const isBuilding = process.env.WEBPACK_BUILDING === 'true';

const publicPath = isBuilding ? path.join(pkg.noRewrite ? '.' : process.env.BASE_NAME || '', '/') : '/';
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);
const injects = [];

// eslint-disable-next-line
const matchScriptStylePattern = /<\!--\s*script:\s*([\w]+)(?:\.[jt]sx?)?\s*-->/g;
const hotDev = require.resolve('react-dev-utils/webpackHotDevClient');
const babelOption = {
    babelrc: false,
    configFile: false,
    compact: false,
    presets: [[require.resolve('babel-preset-react-app/dependencies'), { helpers: true }]],
    cacheDirectory: true,
    cacheCompression: false,
    sourceMaps: false
};

paths.pageEntries.forEach(function(name) {
    var chunks = ['_vendor_'];
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
            inject: true,
            chunksSortMode: 'manual'
        })
    );
});

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: Object.assign(
        {
            _vendor_: [require.resolve('./polyfills'), !isBuilding && hotDev].filter(Boolean).concat(pkg.vendor || [])
        },
        paths.entries
    ),
    output: {
        path: paths.appBuild,
        pathinfo: true,
        filename: 'static/js/[name].[hash:8].js',
        chunkFilename: 'static/js/[name].[hash:8].js',
        publicPath: publicPath,
        crossOriginLoading: 'anonymous',
        devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
        globalObject: 'this'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'async',
            name: false,
            cacheGroups: {
                vendors: {
                    chunks: 'all',
                    test: '_vendor_',
                    name: 'vendor'
                },
                i18n: {
                    chunks: 'all',
                    test: /utils\/i18n|locals\/\w+\.json/,
                    enforce: true,
                    name: 'i18n'
                }
            }
        }
    },
    resolve: {
        modules: ['node_modules', paths.appNodeModules, paths.root].concat(paths.nodePaths),
        extensions: paths.moduleFileExtensions,
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
            { parser: { requireEnsure: false } },

            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            cache: true,
                            formatter: require.resolve('react-dev-utils/eslintFormatter'),
                            eslintPath: require.resolve('eslint'),
                            resolvePluginsRelativeTo: __dirname
                        },
                        loader: require.resolve('eslint-loader')
                    }
                ],
                include: [paths.formutilSrc, paths.appSrc]
            },
            {
                oneOf: [
                    {
                        test: /\.html$/,
                        use: [
                            {
                                loader: require.resolve('babel-loader'),
                                options: babelOption
                            },
                            {
                                loader: require.resolve('html-loader'),
                                options: {
                                    url(url) {
                                        return !/\.(webp|png|jpeg|jpg|gif|svg|mp3|wmv|mp4|ogg|webm|s[ac]ss|css|less|m?[tj]sx?)$/.test(
                                            url
                                        );
                                    },
                                    import: true
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(js|mjs|jsx|ts|tsx)$/,
                        include: [paths.formutilSrc, paths.appSrc],
                        loader: require.resolve('babel-loader'),
                        options: {
                            customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                            plugins: [
                                [
                                    require.resolve('babel-plugin-named-asset-import'),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]'
                                            }
                                        }
                                    }
                                ]
                            ],
                            cacheDirectory: true,
                            cacheCompression: false,
                            rootMode: 'upward'
                        }
                    },
                    {
                        test: /\.(js|mjs)$/,
                        exclude: /@babel(?:\/|\\{1,2})runtime/,
                        loader: require.resolve('babel-loader'),
                        options: babelOption
                    },
                    {
                        test: /\.css$/,
                        exclude: /\.module\.css$/,
                        use: getStyleLoaders({
                            importLoaders: 1
                        })
                    },
                    // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
                    // using the extension .module.css
                    {
                        test: /\.module\.css$/,
                        use: getStyleLoaders({
                            importLoaders: 1,
                            modules: {
                                getLocalIdent: getCSSModuleLocalIdent
                            }
                        })
                    },
                    {
                        test: /\.s[ac]ss$/,
                        exclude: /\.module\.s[ac]ss$/,
                        use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader')
                    },
                    {
                        test: /\.module\.s[ac]ss$/,
                        use: getStyleLoaders(
                            {
                                importLoaders: 2,
                                modules: {
                                    getLocalIdent: getCSSModuleLocalIdent
                                }
                            },
                            'sass-loader'
                        )
                    },
                    {
                        test: /\.less$/,
                        exclude: /\.module\.less$/,
                        use: getStyleLoaders({ importLoaders: 2 }, 'less-loader')
                    },
                    {
                        test: /\.module\.less$/,
                        use: getStyleLoaders(
                            {
                                importLoaders: 2,
                                modules: {
                                    getLocalIdent: getCSSModuleLocalIdent
                                }
                            },
                            'less-loader'
                        )
                    },
                    {
                        test: /\.(txt|htm)$/,
                        loader: require.resolve('raw-loader')
                    },
                    {
                        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)$/,
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    },
                    {
                        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.(txt|htm)$/],
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'static/images/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: injects
        .concat([
            isBuilding &&
                new MiniCssExtractPlugin({
                    filename: 'static/css/[name].[hash:8].css',
                    ignoreOrder: !!pkg.ignoreCssOrderWarnings || process.env.IGNORE_CSS_ORDER_WARNINGS === 'true'
                }),
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
            new ModuleNotFoundPlugin(paths.root),
            new webpack.EnvironmentPlugin(env.raw),
            new CaseSensitivePathsPlugin(),
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/
            }),
            new ForkTsCheckerWebpackPlugin({
                typescript: resolve.sync('typescript', {
                    basedir: paths.appNodeModules
                }),
                async: true,
                useTypescriptIncrementalApi: true,
                checkSyntacticErrors: true,
                tsconfig: paths.appTsConfig,
                compilerOptions: {
                    jsx: 'preserve',
                    checkJs: false
                },
                reportFiles: ['**/*.(ts|tsx)', '!**/__tests__/**', '!**/?(*.)(spec|test).*'],
                silent: true
            }),
            new webpack.BannerPlugin({
                banner: '@author ' + pkg.author,
                entryOnly: true
            })
        ])
        .filter(Boolean),

    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },

    performance: false
};

function getStyleLoaders(cssOptions, preProcessor) {
    const loaders = [
        isBuilding
            ? {
                  loader: MiniCssExtractPlugin.loader,
                  options: { publicPath: '../../', sourceMap: true, esModule: true }
              }
            : require.resolve('style-loader'),
        {
            loader: require.resolve('css-loader'),
            options: Object.assign({ sourceMap: true }, cssOptions)
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                        autoprefixer: {
                            flexbox: 'no-2009'
                        },
                        stage: 3
                    })
                ],
                sourceMap: true
            }
        }
    ];

    if (preProcessor) {
        loaders.push({
            loader: require.resolve(preProcessor),
            options: Object.assign(
                {},
                { sourceMap: true },
                preProcessor === 'less-loader'
                    ? {
                          javascriptEnabled: true
                      }
                    : {
                          implementation: require('sass')
                      }
            )
        });
    }

    return loaders;
}
