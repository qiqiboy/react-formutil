var path = require('path');
var fs = require('fs-extra');
var Rsync = require('rsync');
var chalk = require('chalk');
var lodash = require('lodash');
var glob = require('glob');
var paths = require('./config/paths');
var ora = require('ora');
var pkg = require(paths.appPackageJson);
var throttleDelay = 0;
var spinner;

var staticFileName = 'static.config.json';
var staticConfigFile = path.resolve(paths.root, staticFileName);
var oldStaticConfig = lodash.invert(getStaticConfig(staticConfigFile));
var newStaticConfig = {};

runCDN();

function getStaticConfig(path) {
    try {
        return require(path) || {};
    } catch (e) {
        return {};
    }
}

function removeFileNameHash(fileName) {
    var pipes = fileName.split('.');
    pipes.splice(-2, 1);
    return pipes.join('.');
}

function runCDN() {
    throttleDelay = 0;

    spinner = ora('开始上传').start();

    var exitsNum = 0;
    var allFiles = glob.sync(path.join(paths.appBuild, 'static/**/*'));
    var allSyncPromises = allFiles
        .filter(function(file) {
            var relative = path.relative(paths.appBuild, file);

            //文件夹不处理
            if (fs.statSync(file).isDirectory()) {
                return false;
            }

            newStaticConfig[/js$|css$/.test(relative) ? removeFileNameHash(relative) : relative] = relative;

            //已经存在
            if (oldStaticConfig[relative]) {
                spinner.succeed(chalk.green('已存在：' + relative));
                exitsNum++;
                return false;
            }

            return true;
        })
        .map(createRsync);

    Promise.all(allSyncPromises).then(function(rets) {
        var uploadNum = rets.filter(Boolean).length;
        var failNum = rets.length - uploadNum;

        console.log();
        console.log(
            chalk[failNum ? 'red' : 'cyan'](
                '+++++++++++++++++++++++++++++++\n 文件上传完毕(' +
                    chalk.blue(pkg.cdn.path) +
                    ') \n ' +
                    chalk.magenta('成功: ' + uploadNum) +
                    ' \n ' +
                    chalk.red('失败: ' + failNum) +
                    ' \n ' +
                    chalk.green('重复: ' + exitsNum) +
                    '\n+++++++++++++++++++++++++++++++'
            )
        );

        if (!failNum) {
            fs.outputFile(staticConfigFile, JSON.stringify(newStaticConfig, '\n', 4));
            console.log(chalk.blue('配置文件已经更新: ' + staticConfigFile));
            console.log();
            console.log(chalk.green('项目已经成功编译，运行以下命令可即时预览：'));
            if (!paths.serve) {
                console.log(chalk.cyan('npm') + ' install -g serve');
            }
            console.log(chalk.cyan('serve') + ' -s ' + path.relative('.', paths.appBuild));
        } else {
            console.log(chalk.red('文件未全部上传，请单独运行') + chalk.green(' npm run cdn ') + chalk.red('命令!'));
        }

        console.log();
    });
}

function createRsync(file) {
    return new Promise(resolve => {
        setTimeout(() => {
            var rsync = new Rsync();
            var relative = path.relative(paths.appBuild, file);

            rsync.cwd(paths.appBuild);
            rsync
                .flags('Rz') //相对路径上传、压缩
                .source(relative)
                .destination(path.join(pkg.cdn.server || 'static:/data0/webservice/static', pkg.cdn.path))
                .execute(function(error, code, cmd) {
                    if (error) {
                        resolve(false);
                        spinner.fail(chalk.red('上传失败(' + error + ')：' + relative));
                    } else {
                        resolve(true);
                        spinner.warn(chalk.yellow('已上传：' + relative));
                    }
                });
        }, 100 * throttleDelay++);
    });
}
