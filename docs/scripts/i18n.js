const fs = require('fs-extra');
const glob = require('glob');
const Parser = require('i18next-scanner').Parser;
const xlsx = require('node-xlsx');
const paths = require('./config/paths');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const pkg = require(paths.appPackageJson);

const spinner = ora();

const xlsxOptions = {
    '!cols': [{ wch: 50 }, { wch: 50 }]
};

const terminalArg = process.argv[2];

if (terminalArg === '--scan') {
    ensureLocalsConfig();
    scanner();
} else if (terminalArg === '--read') {
    ensureLocalsConfig();
    reader();
}

function ensureLocalsConfig() {
    if (Array.isArray(pkg.locals) === false) {
        spinner.fail(chalk.red('未在 package.json 中找到相关语言包配置！'));

        spinner.warn(
            chalk.yellow('需要 package.json 中添加 { "locals": ["zh_CN", "en_US"] } 配置后，才能运行该命令！')
        );
        process.exit(0);
    }
}

/**
 * @description
 * 扫描源代码文件，匹配需要翻译的文案，并输出excel文件待翻译
 */
function scanner() {
    const i18nParser = new Parser({
        lngs: pkg.locals
    });

    fs.ensureDirSync(path.join(paths.locals, 'xlsx'));

    glob.sync(paths.appSrc + '/**/*.{js,jsx,ts,tsx}').forEach(file => {
        const content = fs.readFileSync(file);

        i18nParser.parseFuncFromString(content, { list: ['__'] }, key => {
            if (key) {
                i18nParser.set(key, key);
            }
        });
    });

    const i18nJson = i18nParser.get();

    Object.keys(i18nJson).forEach(key => {
        const jsonDestination = path.join(paths.locals, key + '.json');
        const excelDestination = path.join(paths.locals, 'xlsx', key + '.xlsx');

        const existConfig = fs.existsSync(jsonDestination) ? JSON.parse(fs.readFileSync(jsonDestination)) : {};

        fs.outputFile(
            path.join(paths.locals, key + '.json'),
            JSON.stringify(Object.assign(i18nJson[key].translation, existConfig), '\n', 2)
        );

        convertJson2Excel(Object.assign(i18nJson[key].translation, existConfig), key, path.join(excelDestination));

        spinner.succeed('输出 ' + chalk.bold(chalk.green(key)) + ' 到 ' + chalk.cyan(excelDestination));
    });

    console.log();
    spinner.warn(chalk.yellow('你可以将生成的excel文件进行翻译后，放回原处。然后运行：'));
    console.log(chalk.green('   npm run i18n-read'));
}

/**
 * @description
 * 读取excel文件，并转换为json语言包
 */
function reader() {
    glob.sync(path.join(paths.locals, 'xlsx', '*.xlsx')).forEach(file => {
        const lang = path.basename(file, '.xlsx');
        const jsonDestination = path.join(paths.locals, lang + '.json');

        convertExcel2Json(file, lang, jsonDestination);

        spinner.succeed('输出 ' + chalk.bold(chalk.green(lang)) + ' 到 ' + chalk.cyan(jsonDestination));
    });

    console.log();
    spinner.succeed(chalk.green('语言包转换成功！'));
}

function convertJson2Excel(jsonContent, lang, destination) {
    const sheets = [[pkg.name + ' v' + pkg.version, lang], ['原始文案（禁止修改）', '翻译文案'], []];

    Object.keys(jsonContent).forEach(key => {
        const text = jsonContent[key];

        sheets.push([key, text]);
    });

    const buffer = xlsx.build([{ name: 'locals', data: sheets }], xlsxOptions);

    fs.writeFileSync(destination, buffer);
}

function convertExcel2Json(file, lang, destination) {
    const sheets = xlsx.parse(fs.readFileSync(file));

    const jsonData = {};

    sheets[0].data.slice(2).forEach(item => {
        if (item.length) {
            jsonData[item[0]] = item[1];
        }
    });

    fs.outputFileSync(destination, JSON.stringify(jsonData, '\n', 2));
}

exports.ensureLocals = function() {
    fs.ensureDirSync(path.join(paths.locals));

    if (Array.isArray(pkg.locals)) {
        pkg.locals.forEach(lang => {
            const file = path.join(paths.locals, lang + '.json');

            if (!fs.existsSync(file)) {
                fs.outputJSONSync(file, {});
            }
        });
    }
};
