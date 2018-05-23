var path = require('path');
var fs = require('fs-extra');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var eslintFormatter = require('react-dev-utils/eslintFormatter');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
var InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');
var paths = require('./paths');
var getClientEnvironment = require('./env');
var pkg = require(paths.appPackageJson);

function ensureSlash(path, needsSlash) {
    var hasSlash = path.endsWith('/');
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return path + '/';
    } else {
        return path;
    }
}

var relativeRoot = pkg.noRewrite ? '.' : '';
var cdnUrl = pkg.cdn ? pkg.cdn.host + pkg.cdn.path : relativeRoot;
var publicPath = ensureSlash(cdnUrl, true);
var publicUrl = ensureSlash(cdnUrl, false);
// Get environment variables to inject into our app.
var env = getClientEnvironment(publicUrl);

env.SPA = !pkg.noRewrite;

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.NODE_ENV !== 'production') {
    throw new Error('Production builds must have NODE_ENV=production.');
}

var injects = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
    })
];

var matchScriptStylePattern = /<\!--\s*script:\s*([\w]+)(?:\.jsx?)?\s*-->/g;

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
            inject: true,
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

var webpackConfig = {
    bail: true,
    //devtool: 'cheap-module-source-map',
    entry: Object.assign(paths.entries, {
        vendor: [require.resolve('./polyfills')].concat(pkg.vendor || [])
    }),
    output: {
        crossOriginLoading: 'anonymous',
        path: paths.appBuild,
        filename: 'static/js/[name].[chunkhash:8].js',
        chunkFilename: 'static/js/[name].chunk.[chunkhash:8].js',
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
                test: /\.(js|jsx|mjs)$/,
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
                            compact: true
                        }
                    },
                    {
                        test: /\.css$/,
                        loader: getCssRule()
                    },
                    {
                        test: /\.s[ac]ss$/,
                        loader: getCssRule('sass-loader')
                    },
                    {
                        test: /\.less$/,
                        loader: getCssRule('less-loader')
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
        new InlineChunkManifestHtmlWebpackPlugin({
            dropAsset: true
        }),
        new InterpolateHtmlPlugin(env),
        new webpack.HashedModuleIdsPlugin(),
        new ImageminPlugin({
            pngquant: {
                //quality: '95-100'
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.EnvironmentPlugin(env),
        // Minify the code.
        new UglifyJSPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
                compress: {
                    comparisons: false,
                    warnings: false,
                    unused: false
                },
                output: {
                    comments: false,
                    ascii_only: true,
                    beautify: false
                }
            }
        }),
        new ExtractTextPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            allChunks: true
        }),
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
            navigateFallback: relativeRoot + '/index.html',
            // Ignores URLs starting from /__ (useful for Firebase):
            // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
            navigateFallbackWhitelist: [/^(?!\/__).*/],
            // Don't precache sourcemaps (they're large) and build asset manifest:
            // /^\/.*\.html$/ 去掉webpack编译阶段由html-webpack-plugin带入的入口html文件
            // 因为这种文件是绝对路径，以 / 开头的
            staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/, /^\/.*\.html$/]
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.BannerPlugin('@author ' + pkg.author)
    ]),
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};

function getCssRule(extraRule) {
    var defaultRule = [
        {
            loader: 'css-loader',
            options: {
                importLoaders: extraRule ? 2 : 1,
                minimize: true
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

    return ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: defaultRule,
        publicPath: pkg.cdn ? undefined : '../../'
    });
}

module.exports = webpackConfig;
