process.env.NODE_ENV = 'production';
process.on('unhandledRejection', err => {
    throw err;
});

require('dotenv').config({
    silent: true
});

var userDevConfig = process.argv[2] === '--dev';
var chalk = require('chalk');
var fs = require('fs-extra');
var path = require('path');
var filesize = require('filesize');
var gzipSize = require('gzip-size').sync;
var webpack = require('webpack');
var config = require(userDevConfig ? './config/webpack.config.dev' : './config/webpack.config.prod');
var paths = require('./config/paths');
var clearConsole = require('react-dev-utils/clearConsole');
var checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
var checkMissDependencies = require('./config/checkMissDependencies');
var recursive = require('recursive-readdir');
var stripAnsi = require('strip-ansi');
var ora = require('ora');
var pkg = require(paths.appPackageJson);

var spinner = ora('webpack启动中...').start();

checkMissDependencies(spinner).then(
    function() {
        recursive(paths.appBuild, (err, fileNames) => {
            var previousSizeMap = (fileNames || [])
                .filter(fileName => /\.(js|css)$/.test(fileName))
                .reduce((memo, fileName) => {
                    var contents = fs.readFileSync(fileName);
                    var key = removeFileNameHash(fileName);
                    memo[key] = gzipSize(contents);
                    return memo;
                }, {});

            clearConsole();

            fs.emptyDirSync(paths.appBuild);

            // Start the webpack build
            build(previousSizeMap);

            // Merge with the public folder
            copyPublicFolder();
        });
    },
    function() {
        console.log();
        console.log();
        process.exit(1);
    }
);

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1);
}

if (userDevConfig) {
    process.env.NODE_ENV = 'development';
    config.output.publicPath = pkg.noRewrite ? './' : '/';
}

// Input: /User/dan/app/build/static/js/main.82be8.js
// Output: /static/js/main.js
function removeFileNameHash(fileName) {
    return fileName.replace(paths.appBuild, '').replace(/\/?(.*)(\.\w+)(\.js|\.css)/, (match, p1, p2, p3) => p1 + p3);
}

// Input: 1024, 2048
// Output: "(+1 KB)"
function getDifferenceLabel(currentSize, previousSize) {
    var FIFTY_KILOBYTES = 1024 * 50;
    var difference = currentSize - previousSize;
    var fileSize = !Number.isNaN(difference) ? filesize(difference) : 0;
    if (difference >= FIFTY_KILOBYTES) {
        return chalk.red('+' + fileSize);
    } else if (difference < FIFTY_KILOBYTES && difference > 0) {
        return chalk.yellow('+' + fileSize);
    } else if (difference < 0) {
        return chalk.green(fileSize);
    } else {
        return '';
    }
}

// Print a detailed summary of build files.
function printFileSizes(stats, previousSizeMap) {
    var assets = stats
        .toJson()
        .assets.filter(asset => /\.(js|css)$/.test(asset.name))
        .map(asset => {
            var fileContents = fs.readFileSync(paths.appBuild + '/' + asset.name);
            var size = gzipSize(fileContents);
            var previousSize = previousSizeMap[removeFileNameHash(asset.name)];
            var difference = getDifferenceLabel(size, previousSize);
            return {
                folder: path.join(path.basename(paths.appBuild), path.dirname(asset.name)),
                name: path.basename(asset.name),
                size: size,
                sizeLabel: filesize(size) + (difference ? ' (' + difference + ')' : '')
            };
        });
    assets.sort((a, b) => b.size - a.size);
    var longestSizeLabelLength = Math.max.apply(null, assets.map(a => stripAnsi(a.sizeLabel).length));
    assets.forEach(asset => {
        var sizeLabel = asset.sizeLabel;
        var sizeLength = stripAnsi(sizeLabel).length;
        if (sizeLength < longestSizeLabelLength) {
            var rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength);
            sizeLabel += rightPadding;
        }
        console.log('  ' + sizeLabel + '  ' + chalk.dim(asset.folder + path.sep) + chalk.cyan(asset.name));
    });
}

// Create the production build and print the deployment instructions.
function build(previousSizeMap) {
    var packText = userDevConfig ? '启动测试环境打包编译...' : '启动生产环境打包压缩...';
    var startTime = Date.now();
    var timer;
    var logProgress = function(stop) {
        var text = packText + '已耗时：' + ((Date.now() - startTime) / 1000).toFixed(3) + 's';

        if (stop) {
            clearTimeout(timer);
            spinner.succeed(chalk.green(text));
        } else {
            spinner.text = chalk.cyan(text);

            timer = setTimeout(logProgress, 100);
        }
    };

    webpack(config).run((err, stats) => {
        logProgress(true); //停止
        console.log();

        if (err) {
            spinner.fail(chalk.red('编译失败！'));
            console.log(err.message || err);
            process.exit(1);
        }

        const messages = formatWebpackMessages(stats.toJson({}, true));

        // If errors exist, only show errors.
        if (messages.errors.length) {
            spinner.fail(chalk.red('编译失败！！'));
            console.log();
            console.log(messages.errors.join('\n\n'));

            process.exit(1);
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
            console.log();
            console.log();
            spinner.fail(chalk.red('请处理所有的错误和警告后再build代码！'));

            console.log();
            console.log();
            process.exit(1);
        }

        spinner.succeed('gzip后可节省大小:');
        console.log();
        printFileSizes(stats, previousSizeMap);
        console.log();

        if (/^http/.test(config.output.publicPath) === false) {
            spinner.succeed(chalk.green('项目打包完成，运行以下命令可即时预览：'));
            console.log();
            if (!paths.serve) {
                console.log(chalk.cyan('npm') + ' install -g serve');
            }
            console.log(chalk.cyan('serve') + ' -s ' + path.relative('.', paths.appBuild));
        } else {
            var publicPath = config.output.publicPath;
            spinner.succeed('项目打包完成，请确保资源已上传到：' + chalk.green(publicPath) + '.');
        }
        console.log();
    });

    logProgress();
}

function copyPublicFolder() {
    fs.copySync(paths.appPublic, paths.appBuild, {
        dereference: true,
        filter: file => {
            var relative = path.relative(paths.appPublic, file);
            var basename = path.basename(file);
            var isDirectory = fs.statSync(file).isDirectory();

            return isDirectory
                ? basename !== 'layout' //layout目录不复制
                : !paths.pageEntries.find(name => name + '.html' === relative);
        }
    });
}
