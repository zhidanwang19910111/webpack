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
		new HtmlWebackPlugin()
	]

};