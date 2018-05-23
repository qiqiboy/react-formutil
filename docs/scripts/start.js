process.env.NODE_ENV = 'development';
process.on('unhandledRejection', err => {
    throw err;
});

require('dotenv').config({
    silent: true
});

var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var webpack = require('webpack');
var address = require('address');
var ora = require('ora');
var WebpackDevServer = require('webpack-dev-server');
var detect = require('detect-port');
var clearConsole = require('react-dev-utils/clearConsole');
var checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
var openBrowser = require('react-dev-utils/openBrowser');
var errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
var inquirer = require('react-dev-utils/inquirer');
var getProcessForPort = require('react-dev-utils/getProcessForPort');
var checkMissDependencies = require('./config/checkMissDependencies');
var config = require('./config/webpack.config.dev');
var paths = require('./config/paths');
var pkg = require(paths.appPackageJson);

var spinner = ora('webpack启动中...').start();
var DEFAULT_PORT = parseInt(process.env.PORT) || 3000;
var compiler;

checkMissDependencies(spinner).then(
    function() {
        detect(DEFAULT_PORT).then(port => {
            if (port === DEFAULT_PORT) {
                run(port);
                return;
            }

            clearConsole();
            var existingProcess = getProcessForPort(DEFAULT_PORT);
            var question = [
                {
                    name: 'shouldChangePort',
                    type: 'confirm',
                    message:
                        '端口（' +
                        chalk.yellow(DEFAULT_PORT) +
                        '）被占用，可能的程序是： \n  ' +
                        existingProcess +
                        '\n' +
                        '  要换一个端口运行本程序吗？',
                    default: true
                }
            ];

            spinner.stop();
            inquirer.prompt(question).then(({ shouldChangePort }) => {
                if (shouldChangePort) {
                    spinner.start();
                    run(port);
                } else {
                    clearConsole();
                    spinner.fail('请关闭占用' + chalk.yellow(DEFAULT_PORT) + '的程序后再运行。');
                    console.log();
                    process.exit(0);
                }
            });
        });
    },
    function() {
        process.kill(process.pid, 'SIGINT');
    }
);

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1);
}

function setupCompiler(host, port, protocol) {
    if (host === '0.0.0.0' || host === '::') {
        host = 'localhost';
    }

    try {
        compiler = webpack(config);
    } catch (err) {
        spinner.fail(chalk.red('编译失败'));
        console.log();
        console.log(err.message || err);
        console.log();
        process.exit(1);
    }

    compiler.plugin('invalid', function() {
        clearConsole();
        spinner.text = chalk.cyan('重新编译...');
    });

    compiler.plugin('done', function(stats) {
        clearConsole();

        var messages = formatWebpackMessages(stats.toJson({}, true));
        if (!messages.errors.length && !messages.warnings.length) {
            spinner.succeed(chalk.green('编译通过！'));
            console.log();
            spinner.succeed(chalk.green('应用(' + pkg.name + ')已启动:'));
            console.log();
            console.log('本地：' + chalk.cyan(protocol + '://' + host + chalk.bold(':' + port) + '/'));

            if (host === 'localhost') {
                console.log('远程：' + chalk.cyan(protocol + '://' + address.ip() + chalk.bold(':' + port) + '/'));
            }
        }

        // If errors exist, only show errors.
        if (messages.errors.length) {
            spinner.fail(chalk.red('编译失败！！'));
            console.log();
            console.log(messages.errors.join('\n\n'));
        }

        // Show warnings if no errors were found.
        if (messages.warnings.length) {
            spinner.warn(chalk.yellow('编译有警告产生：'));
            console.log();
            console.log(messages.warnings.join('\n\n'));
            console.log();

            // Teach some ESLint tricks.
            console.log('搜索相关' + chalk.underline(chalk.yellow('关键词')) + '以了解更多关于警告产生的原因.');
            console.log(
                '如果要忽略警告, 可以将 ' + chalk.cyan('// eslint-disable-next-line') + ' 添加到产生警告的代码行上方'
            );
        }

        console.log();
        spinner.text = chalk.cyan('webpack运行中...');
        spinner.render().start();
    });
}

// We need to provide a custom onError function for httpProxyMiddleware.
// It allows us to log custom error messages on the console.
function onProxyError(proxy) {
    return function(err, req, res) {
        var host = req.headers && req.headers.host;
        console.log(
            chalk.red('代理错误：') +
                '无法将 ' +
                chalk.cyan(req.url) +
                ' 的请求从 ' +
                chalk.cyan(host) +
                ' 转发到 ' +
                chalk.cyan(proxy) +
                '.'
        );
        console.log(
            '点击 https://nodejs.org/api/errors.html#errors_common_system_errors 查看更多信息 (' +
                chalk.cyan(err.code) +
                ').'
        );
        console.log();

        // And immediately send the proper error response to the client.
        // Otherwise, the request will eventually timeout with ERR_EMPTY_RESPONSE on the client side.
        if (res.writeHead && !res.headersSent) {
            res.writeHead(500);
        }
        res.end('代理错误： 无法将 ' + req.url + ' 的请求从 ' + host + ' 转发到 ' + proxy + ' (' + err.code + ').');
    };
}

function mayProxy(pathname) {
    const maybePublicPath = path.resolve(paths.appPublic, pathname.slice(1));
    return !fs.existsSync(maybePublicPath);
}

function prepareProxy(proxy) {
    if (proxy) {
        if (typeof proxy === 'object') {
            return Object.keys(proxy).map(function(path) {
                var opt =
                    typeof proxy[path] === 'object'
                        ? proxy[path]
                        : {
                              target: proxy[path]
                          };
                var target = opt.target;

                return Object.assign({}, opt, {
                    context: function(pathname) {
                        return mayProxy(pathname) && pathname.match(path);
                    },
                    onProxyReq: proxyReq => {
                        if (proxyReq.getHeader('origin')) {
                            proxyReq.setHeader('origin', target);
                        }
                    },
                    onError: onProxyError(target)
                });
            });
        }

        if (!/^http(s)?:\/\//.test(proxy)) {
            console.log(chalk.red('proxy 只能是一个 http:// 或者 https:// 开头的字符串或者一个object配置'));
            console.log(chalk.red('当前 proxy 的类型是 "' + typeof proxy + '"。'));
            console.log(chalk.red('你可以从 package.json 中移除它，或者设置一个字符串地址（目标服务器）'));
            process.exit(1);
        }

        return [
            {
                target: proxy,
                logLevel: 'silent',
                context: function(pathname, req) {
                    return mayProxy(pathname) && req.headers.accept && req.headers.accept.indexOf('text/html') === -1;
                },
                onProxyReq: function(proxyReq, req, res) {
                    if (proxyReq.getHeader('origin')) {
                        proxyReq.setHeader('origin', proxy);
                    }
                },
                onError: onProxyError(proxy),
                secure: false,
                changeOrigin: true,
                ws: true,
                xfwd: true
            }
        ];
    }
}

function runDevServer(host, port, protocol) {
    var devServer = new WebpackDevServer(compiler, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, HEAD, DELETE'
        },
        clientLogLevel: 'none',
        contentBase: paths.appPublic,
        hot: true,
        publicPath: config.output.publicPath,
        quiet: true,
        watchOptions: {
            ignored: /node_modules/
        },
        https: protocol === 'https',
        host: host,
        overlay: false,
        disableHostCheck: true,
        compress: true,
        watchContentBase: true,
        historyApiFallback: pkg.noRewrite
            ? false
            : {
                  disableDotRule: true
              },
        proxy: prepareProxy(pkg.proxy),
        before: function(app) {
            app.use(errorOverlayMiddleware());
        }
    });

    // Launch WebpackDevServer.
    devServer.listen(port, host, function(err, result) {
        if (err) {
            return console.log(err);
        }

        clearConsole();
        spinner.text = chalk.cyan('正在启动测试服务器...');

        if (host === '0.0.0.0' || host === '::') {
            host = 'localhost';
        }
        openBrowser(protocol + '://' + host + ':' + port + '/');
    });

    ['SIGINT', 'SIGTERM'].forEach(function(sig) {
        process.on(sig, function() {
            devServer.close();
            spinner.stop();
            process.exit();
        });
    });
}

function run(port) {
    var protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    var host = process.env.HOST || '0.0.0.0';
    setupCompiler(host, port, protocol);
    runDevServer(host, port, protocol);
}
