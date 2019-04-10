const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const resolve = require('resolve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin-alt');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const pkg = require(paths.appPackageJson);

const relativeRoot = pkg.noRewrite ? '.' : '';
const cdnUrl = pkg.cdn ? pkg.cdn.host + pkg.cdn.path : relativeRoot;
const publicPath = ensureSlash(cdnUrl, true);
const publicUrl = ensureSlash(cdnUrl, false);
const env = getClientEnvironment(publicUrl);

const shouldUseRelativeAssetPaths = !pkg.cdn;
const shouldUseSourceMap = false;
const shouldInlineRuntimeChunk = true;
const shouldUseSW = !!pkg.pwa;

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
    throw new Error('Production builds must have NODE_ENV=production.');
}

// eslint-disable-next-line
const matchScriptStylePattern = /<\!--\s*script:\s*([\w]+)(?:\.[jt]sx?)?\s*-->/g;
const injects = [];
const babelOption = {
    babelrc: false,
    configFile: false,
    compact: false,
    presets: [[require.resolve('babel-preset-react-app/dependencies'), { helpers: true }]],
    cacheDirectory: true,
    cacheCompression: true,
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
            chunksSortMode: 'manual',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        })
    );
});

module.exports = {
    mode: 'production',
    bail: true,
    devtool: shouldUseSourceMap ? 'hidden-source-map' : false,
    entry: Object.assign(
        {
            _vendor_: [require.resolve('./polyfills')].concat(pkg.vendor || [])
        },
        paths.entries
    ),
    output: {
        path: paths.appBuild,
        filename: 'static/js/[name].[chunkhash:8].js',
        chunkFilename: 'static/js/[name].[chunkhash:8].js',
        publicPath: publicPath,
        crossOriginLoading: 'anonymous',
        devtoolModuleFilenameTemplate: info =>
            path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2
                    },
                    mangle: {
                        safari10: true
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true
                    }
                },
                parallel: true,
                cache: true,
                sourceMap: shouldUseSourceMap
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    map: shouldUseSourceMap
                        ? {
                              inline: false,
                              annotation: true
                          }
                        : false
                }
            })
        ],
        splitChunks: {
            chunks: 'async',
            name: false,
            cacheGroups: {
                vendors: {
                    chunks: 'all',
                    test: '_vendor_',
                    name: 'vendor',
                    reuseExistingChunk: true
                }
            }
        },
        runtimeChunk: 'single'
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
                test: /\.(js|mjs|jsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: require.resolve('react-dev-utils/eslintFormatter'),
                            eslintPath: require.resolve('eslint')
                        },
                        loader: require.resolve('eslint-loader')
                    }
                ],
                include: paths.appSrc
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
                                        return !/\.(webp|png|jpeg|jpg|gif|svg|mp3|wmv|mp4|ogg|webm)$/.test(url);
                                    },
                                    import: true
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(js|mjs|jsx|ts|tsx)$/,
                        include: paths.appSrc,
                        loader: require.resolve('babel-loader'),
                        options: {
                            customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                            presets: ['react-app'],
                            plugins: [
                                [
                                    require.resolve('babel-plugin-named-asset-import'),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent: '@svgr/webpack?-prettier,-svgo![path]'
                                            }
                                        }
                                    }
                                ],
                                [
                                    '@babel/plugin-proposal-decorators',
                                    {
                                        legacy: true
                                    }
                                ]
                            ],
                            cacheDirectory: true,
                            cacheCompression: true,
                            compact: true
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
                        loader: getStyleLoaders({
                            importLoaders: 1,
                            sourceMap: shouldUseSourceMap
                        }),
                        sideEffects: true
                    },
                    {
                        test: /\.module\.css$/,
                        loader: getStyleLoaders({
                            importLoaders: 1,
                            sourceMap: shouldUseSourceMap,
                            modules: true,
                            getLocalIdent: getCSSModuleLocalIdent
                        })
                    },
                    {
                        test: /\.s[ac]ss$/,
                        exclude: /\.module\.s[ac]ss$/,
                        loader: getStyleLoaders(
                            {
                                importLoaders: 2,
                                sourceMap: shouldUseSourceMap
                            },
                            'sass-loader'
                        ),
                        sideEffects: true
                    },
                    {
                        test: /\.module\.s[ac]ss$/,
                        loader: getStyleLoaders(
                            {
                                importLoaders: 2,
                                sourceMap: shouldUseSourceMap,
                                modules: true,
                                getLocalIdent: getCSSModuleLocalIdent
                            },
                            'sass-loader'
                        )
                    },
                    {
                        test: /\.less$/,
                        exclude: /\.module\.less$/,
                        loader: getStyleLoaders(
                            {
                                importLoaders: 2,
                                sourceMap: shouldUseSourceMap
                            },
                            'less-loader'
                        ),
                        sideEffects: true
                    },
                    {
                        test: /\.module\.less$/,
                        loader: getStyleLoaders(
                            {
                                importLoaders: 2,
                                sourceMap: shouldUseSourceMap,
                                modules: true,
                                getLocalIdent: getCSSModuleLocalIdent
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
                        query: {
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
            shouldInlineRuntimeChunk && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime\.\w+[.]js/]),
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
            new ModuleNotFoundPlugin(paths.root),
            new webpack.EnvironmentPlugin(env.raw),
            new ImageminPlugin({
                pngquant: {
                    // quality: '95-100'
                }
            }),
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash:8].css'
            }),
            new webpack.HashedModuleIdsPlugin(),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            shouldUseSW &&
                new SWPrecacheWebpackPlugin({
                    cacheId: pkg.name,
                    dontCacheBustUrlsMatching: /\.\w{8}\./,
                    filename: 'service-worker.js',
                    logger(message) {
                        if (message.indexOf('Total precache size is') === 0) {
                            // This message occurs for every build and is a bit too noisy.
                            return;
                        }

                        if (message.indexOf('Skipping static resource') === 0) {
                            // This message obscures real errors so we ignore it.
                            // https://github.com/facebookincubator/create-react-app/issues/2612
                            return;
                        }

                        console.log(message);
                    },
                    minify: true,

                    mergeStaticsConfig: true,
                    staticFileGlobs: 'build/*.html',
                    stripPrefix: 'build/',

                    // For unknown URLs, fallback to the index page
                    navigateFallback: relativeRoot + path.join(pkg.basename || '', '/index.html'),
                    // Ignores URLs starting from /__ (useful for Firebase):
                    // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
                    navigateFallbackWhitelist: [/^(?!\/__).*/],
                    // Don't precache sourcemaps (they're large) and build asset manifest:
                    // /^\/.*\.html$/ 去掉webpack编译阶段由html-webpack-plugin带入的入口html文件
                    // 因为这种文件是绝对路径，以 / 开头的
                    staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/, /^\/.*\.html$/]
                }),
            new ForkTsCheckerWebpackPlugin({
                typescript: resolve.sync('typescript', {
                    basedir: paths.appNodeModules
                }),
                tslint: true,
                async: false,
                checkSyntacticErrors: true,
                tsconfig: paths.appTsConfig,
                compilerOptions: {
                    jsx: 'preserve',
                    checkJs: false
                },
                reportFiles: ['**/*.(ts|tsx)', '!**/__tests__/**', '!**/?(*.)(spec|test).*'],
                watch: paths.appSrc,
                silent: true,
                formatter: typescriptFormatter
            }),
            new webpack.BannerPlugin('@author ' + pkg.author)
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
        {
            loader: MiniCssExtractPlugin.loader,
            options: Object.assign({}, shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined)
        },
        {
            loader: require.resolve('css-loader'),
            options: cssOptions
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
                sourceMap: shouldUseSourceMap
            }
        }
    ];

    if (preProcessor) {
        loaders.push({
            loader: require.resolve(preProcessor),
            options: {
                sourceMap: shouldUseSourceMap,
                javascriptEnabled: true
            }
        });
    }

    return loaders;
}

function ensureSlash(path, needsSlash) {
    var hasSlash = path.endsWith('/');

    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return path + '/';
    }

    return path;
}
