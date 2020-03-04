/* eslint @typescript-eslint/no-var-requires: 0 */
const path = require('path');
const fs = require('fs-extra');
const Rsync = require('rsync');
const OSS = require('ali-oss');
const chalk = require('chalk');
const lodash = require('lodash');
const glob = require('glob');
const paths = require('./config/paths');
const ora = require('ora');
const pkg = require(paths.appPackageJson);

const staticFileName = 'static.config.json';
const staticConfigFile = path.resolve(paths.root, staticFileName);
const oldStaticConfig = lodash.invert(getStaticConfig(staticConfigFile));
const newStaticConfig = {};

const spinner = ora();
let throttleDelay = 0;

if (process.env.SKIP_CDN === 'true') {
    spinner.info(chalk.cyan('本次构建忽略CDN任务'));
} else if (pkg.cdn) {
    if ('server' in pkg.cdn || 'ali-oss' in pkg.cdn) {
        runCDN();
    } else {
        spinner.fail(chalk.red(`未发现CDN服务连接配置信息！`));
        spinner.fail(chalk.red(`如果不需要CDN服务，您可以移除 ${chalk.cyan('package.json')} 中的 cdn 字段；`));
        spinner.fail(chalk.red(`或者，请根据下述信息在 ${chalk.cyan('package.json')} 中补充相关配置：`));

        console.log(
            chalk.grey(`
支持两种cdn配置方式，分别需要在 ${chalk.cyan('package.json')} 中配置相关的cdn字段：

{
    "name": "${pkg.name}",
    "version": "${pkg.version}",
    "cdn": {
        "host": "${pkg.cdn.host || 'https://xxx.com'}",
        "path": "${pkg.cdn.path || '/xxx'}",
        ${chalk.cyan(`"server": "host:path",
        "ali-oss": {
            ...
        }`)}
   },
   ...
}

server和ali-oss字段必选其一配置，别对对应下述两种cdn配置方式：

1. 阿里云的OSS存储服务，对应ali-oss配置（具体需要配置的内容可以参考阿里云文档）
2. 通过ssh的rsync命令传到源服务器上，对应server字段配置，即rsync命令的目标服务器与路径，例如：BEIJING_HOST:/data0/webservice/static
`) // `
        );
    }
} else {
    spinner.info(chalk.cyan('未发现CDN配置信息，已跳过'));
}

function getStaticConfig(path) {
    try {
        return require(path) || {};
    } catch (e) {
        return {};
    }
}

function removeFileNameHash(fileName) {
    const pipes = fileName.split('.');

    pipes.splice(-2, 1);
    return pipes.join('.');
}

function runCDN() {
    throttleDelay = 0;

    spinner.start('开始上传');

    let exitsNum = 0;
    const useOSS = !!pkg.cdn['ali-oss'];
    const allFiles = glob.sync(path.join(paths.appBuild, 'static/**/!(*.map)'));
    const allSyncPromises = allFiles
        .filter(function(file) {
            const relative = path.relative(paths.appBuild, file);

            // 文件夹不处理
            if (fs.statSync(file).isDirectory()) {
                return false;
            }

            newStaticConfig[/js$|css$/.test(relative) ? removeFileNameHash(relative) : relative] = relative;

            // 已经存在
            if (oldStaticConfig[relative]) {
                spinner.succeed(chalk.green('已存在：' + relative));
                exitsNum++;
                return false;
            }

            return true;
        })
        .map(useOSS ? createOSS : createRsync);

    Promise.all(allSyncPromises).then(function(rets) {
        let uploadNum = rets.filter(Boolean).length;
        let failNum = rets.length - uploadNum;

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
            fs.outputFileSync(staticConfigFile, JSON.stringify(newStaticConfig, '\n', 2));
            console.log(chalk.blue('配置文件已经更新: ' + staticConfigFile));
            console.log();
            console.log(chalk.green('项目已经成功编译，运行以下命令可即时预览：'));

            if (!paths.serve) {
                console.log(chalk.cyan('npm') + ' install -g serve');
            }

            console.log(chalk.cyan('serve') + ' -s ' + path.relative('.', paths.appBuild));
        } else {
            console.log(chalk.red('文件未全部上传，请单独运行') + chalk.green(' npm run cdn ') + chalk.red('命令!'));
            process.exit(1);
        }

        console.log();
    });
}

function createRsync(file) {
    return new Promise(resolve => {
        setTimeout(() => {
            const rsync = new Rsync();
            const relative = path.relative(paths.appBuild, file);

            rsync.cwd(paths.appBuild);

            rsync
                .flags('Rz') // 相对路径上传、压缩
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
        }, 200 * throttleDelay++);
    });
}

function createOSS(file) {
    return new Promise(resolve => {
        setTimeout(() => {
            const client = new OSS(pkg.cdn['ali-oss']);
            const objectName = path.relative(paths.appBuild, file);

            client
                .put(path.join(pkg.cdn.path, objectName), file)
                .then(() => {
                    resolve(true);
                    spinner.warn(chalk.yellow('已上传：' + objectName));
                })
                .catch(error => {
                    resolve(false);
                    spinner.fail(chalk.red('上传失败(' + error + ')：' + objectName));
                });
        }, 200 * throttleDelay++);
    });
}
