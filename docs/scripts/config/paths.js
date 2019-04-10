const path = require('path');
const fs = require('fs');
const glob = require('glob');
const execSync = require('child_process').execSync;

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

const nodePaths = (process.env.NODE_PATH || '')
    .split(path.delimiter)
    .filter(Boolean)
    .map(resolveApp);

const entries = {};

glob.sync(resolveApp('app/!(_)*.{j,t}s?(x)')).forEach(function(file) {
    const basename = path.basename(file).replace(/\.[jt]sx?$/, '');

    entries[basename] = file;
});

const alias = {
    components: resolveApp('app/components'),
    modules: resolveApp('app/modules'),
    utils: resolveApp('app/utils'),
    stores: resolveApp('app/stores'),
    types: resolveApp('app/types'),
    hooks: resolveApp('app/hooks')
};

// config after eject: we're in ./config/
module.exports = {
    dotenv: resolveApp('.env'),
    root: resolveApp(''),
    appBuild: resolveApp('demo'),
    appBuildDev: resolveApp('buildDev'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: Object.values(entries)[0] || resolveApp('app/index.js'),
    appPackageJson: resolveApp('package.json'),
    appSrc: [resolveApp('app'), resolveApp('../src')],
    appTsConfig: resolveApp('tsconfig.json'),
    staticSrc: resolveApp('static'),
    locals: resolveApp('locals'),
    proxySetup: resolveApp('setupProxy.js'),
    appNodeModules: resolveApp('node_modules'),
    ownNodeModules: resolveApp('node_modules'),
    nodePaths: nodePaths,
    alias: alias,
    entries: entries,
    pageEntries: glob.sync(resolveApp('public/!(_)*.html')).map(function(file) {
        return path.basename(file, '.html');
    }),
    moduleFileExtensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx'],
    // 一些命令检测
    serve: hasInstall('serve'),
    cnpm: hasInstall('cnpm'),
    yarn: hasInstall('yarn')
};

function hasInstall(command) {
    try {
        execSync(command + ' --version', {
            stdio: 'ignore'
        });
        return true;
    } catch (e) {
        return false;
    }
}
