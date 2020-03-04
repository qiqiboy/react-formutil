/* eslint @typescript-eslint/no-var-requires: 0 */
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
    throw err;
});

require('./config/env');

const chalk = require('chalk');
const webpack = require('webpack');
const ora = require('ora');
const WebpackDevServer = require('webpack-dev-server');
const { choosePort, prepareProxy, createCompiler, createDevServerConfig } = require('./config/helper');
const { prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const checkMissDependencies = require('./config/checkMissDependencies');
const config = require('./config/webpack.config.dev');
const paths = require('./config/paths');
const { ensureLocals } = require('./i18n');
const pkg = require(paths.appPackageJson);

const spinner = ora('webpack启动中...').start();
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const isInteractive = process.stdout.isTTY;

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    console.log();
    process.exit(1);
}

ensureLocals();

checkMissDependencies(spinner)
    .then(() => {
        return choosePort(HOST, DEFAULT_PORT, spinner).then(port => {
            if (port === null) {
                console.log();

                spinner.fail(
                    '请关闭占用 ' +
                        chalk.bold(chalk.yellow(DEFAULT_PORT)) +
                        ' 端口的程序后再运行；或者指定一个新的端口：' +
                        chalk.bold(chalk.yellow('PORT=4000 npm start'))
                );

                console.log();
                process.exit(0);
            } else {
                spinner.start();

                const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
                const appName = pkg.name;
                const urls = prepareUrls(protocol, HOST, port);
                const devSocket = {
                    warnings: warnings => devServer.sockWrite(devServer.sockets, 'warnings', warnings),
                    errors: errors => devServer.sockWrite(devServer.sockets, 'errors', errors)
                };
                const compiler = createCompiler(webpack, config, appName, urls, devSocket, spinner);
                const proxyConfig = prepareProxy(process.env.PROXY || pkg.proxy, paths.appPublic);
                const serverConfig = createDevServerConfig(proxyConfig, urls.lanUrlForConfig);
                const devServer = new WebpackDevServer(compiler, serverConfig);

                // Launch WebpackDevServer.
                devServer.listen(port, HOST, err => {
                    if (err) {
                        return console.log(err);
                    }

                    if (isInteractive) {
                        clearConsole();
                    }

                    spinner.text = chalk.cyan('正在启动测试服务器...');
                    openBrowser(urls.localUrlForBrowser);
                });

                ['SIGINT', 'SIGTERM'].forEach(function(sig) {
                    process.on(sig, function() {
                        devServer.close();
                        spinner.stop();
                        process.exit();
                    });
                });
            }
        });
    })
    .catch(function(err) {
        if (err) {
            console.log(err.message || err);
            console.log();
        }

        process.kill(process.pid, 'SIGINT');
    });
