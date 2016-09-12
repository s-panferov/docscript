var webpack = require('webpack');
var path = require("path");
var fs = require("fs");

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

var isProduction = false;

var ATL_OPTIONS = [
    '&+useCache',
    '&tsconfig=./src/tsconfig.json'
].join('');

var config = {
    entry: {
        docscript: [
            './src/doc/index.ts'
        ]
    },

    target: 'node',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'commonjs2',
    },

    resolve: {
        extensions: ['', '.ts', '.tsx', '.js'],

    },

    node: {
        fs: true
    },

    // Source maps support (or 'inline-source-map' also works)
    devtool: 'source-map',

    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader?" + ATL_OPTIONS
        }, {
            test: /\.json?$/,
            loader: "json-loader"
        }]
    },

    externals: nodeModules,

    plugins: [
        new webpack.BannerPlugin({
			banner: 'require("source-map-support").install();',
			raw: true,
			entryOnly: false
		}),
        new webpack.DllPlugin({
            path: path.join(__dirname, "dist/manifest.json"),
            name: "[name]",
            context: __dirname
        })
    ]
};

if (isProduction) {
    config.plugins = config.plugins.concat([
        new webpack.DefinePlugin({
            DEBUG: false
        })
    ])
} else {
    config.plugins = config.plugins.concat([
        new webpack.DefinePlugin({
            DEBUG: true
        })
    ])
}

module.exports = config;
