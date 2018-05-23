const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

module.exports = {
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname)],
        alias: {
            utils: path.resolve(__dirname, 'app/utils'),
            components: path.resolve(__dirname, 'app/components'),
            modules: path.resolve(__dirname, 'app/modules')
        },
        plugins: [
            new DirectoryNamedWebpackPlugin({
                honorIndex: true,
                exclude: /node_modules|libs/
            })
        ]
    }
}

