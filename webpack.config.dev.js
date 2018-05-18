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
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['react']
					}
				}]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader' ]
			},
			{
				test: /\.png$/,
				use: ['file-loader']
			}
		]
	},
	//devserver
	devServer: {
        open: true,
        port: 9000
    }
};