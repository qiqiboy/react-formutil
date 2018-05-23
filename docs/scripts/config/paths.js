var path = require('path');
var fs = require('fs');
var glob = require('glob');
var execSync = require('child_process').execSync;

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
var appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

var nodePaths = (process.env.NODE_PATH || '')
    .split(process.platform === 'win32' ? ';' : ':')
    .filter(Boolean)
    .map(resolveApp);

var entries = {};

glob.sync(resolveApp('app/!(_)*.js?(x)')).forEach(function(file) {
    var basename = path.basename(file).replace(/\.jsx?$/, '');
    entries[basename] = file;
});

var alias = {
    components: resolveApp('app/components'),
    modules: resolveApp('app/modules'),
    utils: resolveApp('app/utils')
};

// config after eject: we're in ./config/
module.exports = {
    root: resolveApp(''),
    appBuild: resolveApp('demo'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('app/index.js'),
    appPackageJson: resolveApp('package.json'),
    appSrc: [resolveApp('app'), resolveApp('../src')],
    staticSrc: resolveApp('static'),
    appNodeModules: resolveApp('node_modules'),
    ownNodeModules: resolveApp('node_modules'),
    nodePaths: nodePaths,
    alias: alias,
    entries: entries,
    pageEntries: glob.sync(resolveApp('public/!(_)*.html')).map(function(file) {
        return path.basename(file, '.html');
    }),
    //一些命令检测
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
