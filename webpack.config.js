const path = require('path');
const HtmlWebackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	//入口
	entry: './src/app.js',
	//出口
	output:  {
		path: path.resolve(__dirname, 'dist/assets'),
		filename: 'js/[name].js',
		publicPath: '/'
	},
	//插件将打包后的js 插入到页面中
	plugins: [
		new HtmlWebackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		}),
		new CleanWebpackPlugin(["dist"]),
		new webpack.DefinePlugin({
		  PRODUCTION: JSON.stringify(true),
		  VERSION: JSON.stringify('5fa3b9'),
		  BROWSER_SUPPORTS_HTML5: true,
		  TWO: '1+1',
		  'typeof window': JSON.stringify('object')
		}),
	    new ExtractTextPlugin("[name].css")
	],
	//loader 用于处理文件内容
	module: {
		rules: [
			//jsx loader
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader'
				}],
				exclude: [path.resolve(__dirname, "node_modules")]
			},
			/*{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
		          fallback: "style-loader",
		          use: "css-loader"
		        })
			},*/
			//css loader
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							module: true, //false 就是不使用css模块化，true就是模块化css
							localIdentName: '[path][name]-[local]-[hash:base64:6]'
						}
					}
				],
				exclude: [
					path.resolve(__dirname, 'node_modules'),
					path.resolve(__dirname, 'src/common')
				]
			},
			
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
				include: [
					path.resolve(__dirname, 'node_modules'),
					path.resolve(__dirname, 'src/common')
				]
			},
			/*{
				a{		sass +>> 
					b: ==>>>  a b{} ====>  style ==>inject html 
				}
			}*/
			{
				test: /\.scss$/,
				use: ['style-loader','css-loader', 'sass-loader']
			},
			//using to handle img file
			/*{
				test: /\.(jepg|gif|jpg|ttf|svg)$/i,
				use: {
					loader: 'file-loader',
					options: {
						name: 'img/[name][hash].[ext]'
					}
					
				}
			},*/
			//url-loader 解析为 base64 增强版的file-loader ,可以限定他的长度，超过之后会压缩而不是生成base64
			{
				test: /\.(png|gif|jpg)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: 'img.[ext]',
							limit: 1000
						}
					}
				]
			}
		]
	},
	//devserver
	devServer: {
        open: true,
        port: 8000,
        contentBase: './src/common',
        publicPath: '/',
        inline: true
    }
};