/* eslint @typescript-eslint/no-var-requires: 0 */
const getProcessForPort = require('react-dev-utils/getProcessForPort');
const clearConsole = require('react-dev-utils/clearConsole');
const detect = require('detect-port-alt');
const inquirer = require('react-dev-utils/inquirer');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const forkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const config = require('./webpack.config.dev');
const paths = require('./paths');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const pkg = require(paths.appPackageJson);

const isInteractive = process.stdout.isTTY;

function choosePort(host, defaultPort, spinner) {
    return detect(defaultPort, host).then(
        port =>
            new Promise(resolve => {
                if (port === defaultPort) {
                    return resolve(port);
                }

                spinner.stop();
                clearConsole();

                const existingProcess = getProcessForPort(defaultPort);
                const question = {
                    type: 'confirm',
                    name: 'shouldChangePort',
                    message:
                        '端口（' +
                        chalk.yellow(defaultPort) +
                        '）被占用，可能的程序是： \n  ' +
                        existingProcess +
                        '\n' +
                        '  要换一个端口运行本程序吗？',
                    default: true
                };

                inquirer.prompt(question).then(answer => {
                    if (answer.shouldChangePort) {
                        resolve(port);
                    } else {
                        resolve(null);
                    }
                });
            }),
        err => {
            throw new Error(
                chalk.red(`无法为 ${chalk.bold(host)} 找到可用的端口.`) +
                    '\n' +
                    ('错误信息: ' + err.message || err) +
                    '\n'
            );
        }
    );
}

function createCompiler(webpack, config, appName, urls, devSocket, spinner) {
    let compiler;
    let stime = Date.now();

    try {
        compiler = webpack(config);
    } catch (err) {
        console.log(chalk.red('启动编译失败！'));
        console.log();
        console.log(err.message || err);
        console.log();
        process.exit(1);
    }

    compiler.hooks.invalid.tap('invalid', () => {
        if (isInteractive) {
            clearConsole();
        }

        stime = Date.now();
        spinner.text = chalk.cyan('重新编译...');
    });

    let isFirstCompile = true;
    let tsMessagesPromise;
    let tsMessagesResolver;

    compiler.hooks.beforeCompile.tap('beforeCompile', () => {
        tsMessagesPromise = new Promise(resolve => {
            tsMessagesResolver = msgs => resolve(msgs);
        });
    });

    forkTsCheckerWebpackPlugin.getCompilerHooks(compiler).receive.tap('afterTypeScriptCheck', (diagnostics, lints) => {
        const allMsgs = [...diagnostics, ...lints];
        const format = message => `${message.file}\n${typescriptFormatter(message, true)}`;

        tsMessagesResolver({
            errors: allMsgs.filter(msg => msg.severity === 'error').map(format),
            warnings: allMsgs.filter(msg => msg.severity === 'warning').map(format)
        });
    });

    // "done" event fires when Webpack has finished recompiling the bundle.
    // Whether or not you have warnings or errors, you will get this event.
    compiler.hooks.done.tap('done', async stats => {
        if (isInteractive) {
            clearConsole();
        }

        const useTimer = (isTotal = false) =>
            chalk.grey(`(编译${isTotal ? '总' : '已'}耗时: ${(Date.now() - stime) / 1000}s)`);

        const statsData = stats.toJson({
            all: false,
            warnings: true,
            errors: true
        });

        if (statsData.errors.length === 0) {
            const delayedMsg = setTimeout(() => {
                spinner.text = chalk.cyan('文件已编译，正在TSC检查...') + useTimer();
            }, 100);

            const messages = await tsMessagesPromise;

            clearTimeout(delayedMsg);
            statsData.errors.push(...messages.errors);
            statsData.warnings.push(...messages.warnings);

            stats.compilation.errors.push(...messages.errors);
            stats.compilation.warnings.push(...messages.warnings);

            if (messages.errors.length > 0) {
                devSocket.errors(messages.errors);
            } else if (messages.warnings.length > 0) {
                devSocket.warnings(messages.warnings);
            }

            if (isInteractive) {
                clearConsole();
            }
        }

        const messages = formatWebpackMessages(statsData);
        const isSuccessful = !messages.errors.length && !messages.warnings.length;

        if (isSuccessful && (isInteractive || isFirstCompile)) {
            spinner.succeed(chalk.green('编译通过！' + useTimer(true)));
            console.log();
            spinner.succeed(chalk.green('应用(' + appName + ')已启动:'));
            console.log();

            if (urls.lanUrlForTerminal) {
                console.log(`  ${chalk.bold('本地:')}  ${chalk.cyan(urls.localUrlForTerminal)}`);
                console.log(`  ${chalk.bold('远程:')}  ${chalk.cyan(urls.lanUrlForTerminal)}`);
            } else {
                console.log(`  ${urls.localUrlForTerminal}`);
            }
        }

        isFirstCompile = false;

        // If errors exist, only show errors.
        if (messages.errors.length) {
            if (messages.errors.length > 1) {
                messages.errors.length = 1;
            }

            spinner.fail(chalk.red('编译失败！！' + useTimer(true)));
            console.log();
            console.log(messages.errors.join('\n\n'));
            console.log();
        }

        // Show warnings if no errors were found.
        if (messages.warnings.length) {
            spinner.warn(chalk.yellow('编译有警告产生：' + useTimer(true)));
            console.log();
            console.log(messages.warnings.join('\n\n'));
            console.log();

            // Teach some ESLint tricks.
            console.log('\n搜索相关' + chalk.underline(chalk.yellow('关键词')) + '以了解更多关于警告产生的原因.');

            console.log(
                '如果要忽略警告, 可以将 ' + chalk.cyan('// eslint-disable-next-line') + ' 添加到产生警告的代码行上方\n'
            );
        }

        console.log();
        spinner.text = chalk.cyan('webpack运行中...');
        spinner.render().start();
    });

    return compiler;
}

function createDevServerConfig(proxy, allowedHost) {
    return {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, HEAD, DELETE, FETCH'
        },
        disableHostCheck: !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
        // Enable gzip
        compress: true,
        clientLogLevel: 'none',
        contentBase: paths.appPublic,
        watchContentBase: true,
        hot: true,
        transportMode: 'ws',
        injectClient: false,
        publicPath: config.output.publicPath,
        quiet: true,
        watchOptions: {
            ignored: ignoredFiles(paths.appSrc)
        },
        https: process.env.HTTPS === 'true',
        host: process.env.HOST || '0.0.0.0',
        overlay: false,
        historyApiFallback: pkg.noRewrite
            ? false
            : {
                  disableDotRule: true
              },
        public: allowedHost,
        proxy,
        before(app, server) {
            if (fs.existsSync(paths.proxySetup)) {
                require(paths.proxySetup)(app);
            }

            app.use(evalSourceMapMiddleware(server));
            app.use(errorOverlayMiddleware());
            app.use(noopServiceWorkerMiddleware());
        }
    };
}

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
    if (!proxy) {
        return undefined;
    }

    if (typeof proxy === 'object') {
        return Object.keys(proxy).map(function(path) {
            const opt =
                typeof proxy[path] === 'object'
                    ? proxy[path]
                    : {
                          target: proxy[path]
                      };
            const target = opt.target;

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
                return (
                    req.method !== 'GET' ||
                    (mayProxy(pathname) && req.headers.accept && req.headers.accept.indexOf('text/html') === -1)
                );
            },
            onProxyReq: proxyReq => {
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

module.exports = {
    choosePort,
    prepareProxy,
    createCompiler,
    createDevServerConfig
};
