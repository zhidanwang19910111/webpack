const path = require('path');
/*const HtmlWebackPlugin = require('html-webpack-plugin');*/
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");
const packagejson = require("./package.json");
module.exports = {
	//入口
	entry: {
		'home': path.resolve(__dirname, './src/pages/home/main.js'),
		'about': path.resolve(__dirname, './src/pages/about/main.js'),
		'vendor': ['jquery']
	},
	output: {
		/*path: path.resolve(__dirname, './build'),
		filename: '[name].bundle.js'*/
		path: path.resolve(__dirname, './build'),
		filename: 'assets/js/bundle-[name].js',
		chunkFilename: 'assets/abc/[name].chunk.js'
	},
	plugins: [
        /*new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].js'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'abc',
            filename: '[name].js',
            chunks: ['vendor']
        }),*/
        /*new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].js'
        }),*/
        /*new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
            filename: '[name].js',
            chunks: ['vendor']
        }),*/
        new CleanWebpackPlugin(['build']),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor','runtime'],
            filename: '[name].js',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: '[name].js',
            chunks: ['home','about']
        }),
    ]
};