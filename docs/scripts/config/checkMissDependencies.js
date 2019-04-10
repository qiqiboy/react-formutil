var checkDependencies = require('check-dependencies');
var inquirer = require('react-dev-utils/inquirer');
var spawn = require('cross-spawn');
var chalk = require('chalk');
var paths = require('./paths');

function checkMiss(spinner) {
    return new Promise(function(resolve, reject) {
        checkDependencies({}, function(result) {
            if (result.status) {
                spinner.stop();
                result.error.forEach(function(err) {
                    console.log(err);
                });
                console.log();
                inquirer
                    .prompt([
                        {
                            name: 'reInstall',
                            type: 'confirm',
                            message:
                                '你当前安装的依赖版本和要求的不一致，是否要重新安装所有依赖？\n' +
                                chalk.dim('重新运行 npm install 安装所有依赖项.'),
                            default: true
                        }
                    ])
                    .then(function(answers) {
                        if (answers.reInstall) {
                            install(function(code, command, args) {
                                if (code !== 0) {
                                    console.error('`' + command + ' ' + args.join(' ') + '` 运行失败');
                                    return reject();
                                }

                                spinner.succeed(chalk.green('项目依赖已更新'));

                                resolve();
                            });
                        } else {
                            console.log();
                            spinner.warn(chalk.yellow('你需要按照下面命令操作后才能继续：'));

                            console.log();
                            console.log(chalk.green('   ' + (paths.cnpm ? 'cnpm' : 'npm') + ' install'));

                            reject();
                        }
                    });
            } else {
                resolve();
            }
        });
    });
}

function install(callback) {
    var command;
    var args;

    if (paths.cnpm) {
        command = 'cnpm';
    } else {
        command = 'npm';
    }

    args = ['install'];

    var child = spawn(command, args, {
        stdio: 'inherit'
    });

    child.on('close', function(code) {
        callback(code, command, args);
    });
}

module.exports = checkMiss;
