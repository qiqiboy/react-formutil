var path = require('path');
var fs = require('fs');
var glob = require('glob');
var chalk = require('chalk');
var _ = require('lodash');

var files = {
    js: glob.sync('./app/**/*.{js,jsx}'),
    css: glob.sync('./{app,static}/**/*.scss'),
    images: glob.sync('./{app,static,public}/**/*.{png,jpg,jpeg,gif,svg,ico}')
};

console.log(chalk.green('---------------------------- js代码情况 --------------------------'));
analysis(files.js);
console.log(chalk.green('---------------------------- scss代码情况 --------------------------'));
analysis(files.css);
console.log(chalk.green('---------------------------- 图片情况 --------------------------'));
analysis(files.images, true);

function analysis(files, noLines) {
    var readFiles = [];
    files.forEach(function(file) {
        var data = fs.readFileSync(file, 'utf8');
        var stat = fs.statSync(file);

        readFiles.push({
            file: file,
            size: stat.size,
            lastTime: stat.ctime,
            createTime: stat.birthtime,
            lines: data.split('\n').length
        });
    });

    var filesSortBySize = _.sortBy(readFiles, 'size');
    var filesSortByLine = _.sortBy(readFiles, 'lines');
    var filesSortByCreatetime = _.sortBy(readFiles, 'createTime');
    var filesSortByLasttime = _.sortBy(readFiles, 'lastTime');

    console.log();
    console.log(
        chalk.cyan('所有文件总size：') +
            chalk.yellow(
                formatSize(
                    readFiles.reduce(function(total, file) {
                        return total + file.size;
                    }, 0)
                )
            )
    );
    console.log(
        chalk.cyan('最大size文件：') +
            chalk.red(filesSortBySize[filesSortBySize.length - 1].file) +
            chalk.yellow('(' + formatSize(filesSortBySize[filesSortBySize.length - 1].size) + ')')
    );
    console.log(
        chalk.cyan('最小size文件：') +
            chalk.red(filesSortBySize[0].file) +
            chalk.yellow('(' + formatSize(filesSortBySize[0].size) + ')')
    );

    if (!noLines) {
        console.log();
        console.log(
            chalk.cyan('所有文件总行数：') +
                chalk.yellow(
                    readFiles.reduce(function(total, file) {
                        return total + file.lines;
                    }, 0)
                )
        );
        console.log(
            chalk.cyan('最多行数文件：') +
                chalk.red(filesSortByLine[filesSortByLine.length - 1].file) +
                chalk.yellow('(' + filesSortByLine[filesSortByLine.length - 1].lines + '行)')
        );
        console.log(
            chalk.cyan('最少行数文件：') +
                chalk.red(filesSortByLine[0].file) +
                chalk.yellow('(' + filesSortByLine[0].lines + '行)')
        );
    }

    console.log();
    console.log(
        chalk.cyan('最后修改的文件：') +
            chalk.red(filesSortByLasttime[filesSortByLasttime.length - 1].file) +
            chalk.yellow('(' + formatTime(filesSortByLasttime[filesSortByLasttime.length - 1].lastTime) + ')')
    );
    console.log();
}

function formatSize(size) {
    return (size / 1000).toFixed(2) + 'KB';
}

function formatTime(date) {
    return (
        [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') +
        ' ' +
        [date.getHours(), date.getMinutes(), date.getSeconds()].join(':')
    );
}
