const path = require('path');
const HtmlWebackPlugin = require('html-webpack-plugin');
module.exports = {
	//入口
	entry: './src/app.js',
	//出口
	output:  {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js'
	},
	//插件将打包后的js 插入到页面中
	plugins: [
		new HtmlWebackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		})
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
			//css loader
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							module: true, //false 就是不使用css模块化，true就是模块化css
							localIdentName: '[path]-[name]-[local]-[hash:base64:6]'
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
			{
				test: /\.scss$/,
				use: ['style-loader','css-loader', 'sass-loader']
			},
			//using to handle img file
			{
				test: /\.(jepg|gif|jpg|ttf|svg)$/i,
				use: ['file-loader']
			},
			//url-loader 解析为 base64 增强版的file-loader ,可以限定他的长度，超过之后会压缩而不是生成base64
			{
				test: /\.(png|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 500000
						}
					}
				]
			}
		]
	},
	//devserver
	devServer: {
        open: true,
        port: 9000
    }
};