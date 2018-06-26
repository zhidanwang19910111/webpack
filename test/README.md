#webpack实践应用


 ### js 模块化方案有哪些
 	AMD                 CMD   =>>>>> 在线编辑模块方案  相当于在页面上加载一个 CMD/AMD 解释器。这样浏览器就认识了 define、exports、module这些
	requireJs           seaJS

	browserify          webpack =>>>>>>> 预编译模块方案 不需要在浏览器中加载解释器，不管是 AMD / CMD / ES6 风格的模块化它都能认识，并且编译成浏览器认识的JS



### 什么是webpack?

``` bash
# 我们想在js更方便的实现html,社区就出现了jsx

# 我们觉得原生的css不够好用，社区就提出了scss,less

# 针对前端项目越来越强的模块化开发需求，社区出现了 AMD,CommonJS,ES2015 import等等方案，
这些方案大多并不直接被浏览器支持

# 我们用babel来转换下一代的js，转换jsx;我们用各种工具转换scss,less为css

# 代码体积越来越大，又要开始寻找各种优化，压缩，分割方案。

# 所以为了满足上面这些前端工程化的需求，我们就用到了webpack，目的就是为了把我们手中有一系列相互关联的文件js,jsx,css,less,jpg，转换为项目最终需要的，浏览器可识别的文件
```

### 2.webpack核心

``` bash
# 模块打包工具，基于JavaScript，有四大核心，分别是 entry、output、loaders 和 plugins。

# entry 你的项目的入口点，作为执行上下文
# output 执行完成后，生成文件的存放位置的属性
# loaders 实现对更多不同的资源进行模块管理和控制的依赖
# plugins 提供对资源模块管理和控制过程中的自定义功能

	## 1.entry
		一般我们的项目都会存在一个或几个主文件，其它的所有的文件（模块）都直接或间接的链接到了这些文件。
		我们在entry项中需要填写的就是这些主文件的信息。通过我们给的主文件路径，通过分析它能构建最合适的依赖关系，
		webpack就可以利用这个信息来创建一个依赖图表，然后通过这个依赖图标将所需依赖按照正确的顺序打包到一个文件中，
		这意味着只有用过的代码才会被打包，比如我们在一个文件中写了五个模块，但是实际只用了其中一个，打包后的代码只会包含引用过的模块。

		Entry 三种形式

		1.entry: ‘./app.js’

		2.entry: [‘./a.js’, ‘./b.js’]

		3.entry:  {
			entry: './app.js',
			'./bulid/utils': './utils'
		}

		### 最先介绍对象形式，是因为这个是最完整的entry配置,其他形式只是它的简化形式而已。
			对象中的每一对属性对，都代表着一个入口文件，因此多页面配置或者我们要抽离出指定的模块做为公共代码，肯定是要用这种形式的entry配置。
				{
					<key>: <value>
				}

			key可以是简单的字符串，output.filename 对应着 配置中的 [name]，也就是key

			key还可以是路径字符串，此时webpack会自动生成路径目录，并将路径的最后作为[name]。这个特性在多页面配置下也是很有用的

			value如果是字符串，而且必须是合理的noderequire函数参数字符串。比如文件路径：
				'./app.js'(require('./app.js'))；

			value如果是数组，则数组中元素需要是上面描述的合理字符串值。数组中的文件一般是没有相互依赖关系的，但是又处于某些原因需要将它们打包在一起。比如：
				entry: {
				    vendor: ['jquery', 'lodash']
				}

				这种形式就等价于 entry: ['jquery', 'lodash']

			value 如果是 字符串
				entry: {
				    main: './app.js'
				}
				这种形式就等价于 entry: './app.js' 主要用于单页面应用

		### 对于复杂点的webpack项目，先决定打包后的目录结构很重要。webpack就像画笔，打包后的目录就像你打算画的画，要朝着目标去画。

			eg: src
				|-- pages
				|	|-- about
				|	|	|--index.html
				|	|	|--main.js
				|	|-- home
				|	|	|--index.html
				|	|	|--main.js
				|
				|-- webpack.config.js

				build
				|-- assets
					|-- js
						|-- home.bundle.js
						|-- about.bundle.js

				entry是webpack的起点,后面所有的文件生成，提取CSS，生成HTML或者是CommonChunk都是在其基础上进行的加工处理。


	## 2.output

		output配置项作用于打包文件的输出阶段，其作用在于告知webpack以何种方式输出打包文件，

		关于output，webpack提供了众多的可配置选项，我们简单介绍下最常用的选项。

		我们都另存过文件，当我们另存一个文件时，我们需要确定另存的文件名和另存的路径，

		webpack将打包后的结果导出的过程就类似于此，此过程由output配置项控制，其最基本配置包括filename和path两项。这两项用于决定上述主js文件的存储行为

			eg: ouput: {
				path: path.join(__dirname, './build'),
				filename: 'assets/js/bundle-[name]-[id]-[hash]-[chunkhash].js',
				chunkFilename: '[name].[chunkhash].chunk.js',//name 是在代码里为创建的 chunk 指定的名字，如果代码中没指定则 													webpack 默认分配 id 作为 name。
			}

		上述代码中用到了占位符[name]，webpack中常见的占位符有多种，常见的如下：

		[name]:代表打包后文件的名称，在entry或代码中(之后会看到)确定；
		[id]:webpack给块分配的内部chunk id，如果你没有隐藏，你能在打包后的命令行中看到；
		[hash]：每次构建过程中，生成的唯一 hash 值;
		[chunkhash]: 依据于打包生成文件内容的 hash 值,内容不变，值不变；
		[ext]: 资源扩展名,如js,jsx,png等等;

			### 1.path: 告诉Webpack结果存储在哪里
				
				2.publicPath: 为项目中的所有资源指定一个基础路径，它被称为公共路径
				指项目中引用css，js，img等资源时候的一个基础路径，这个基础路径要配合具体资源中指定的路径使用

				静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径

				eg: output.publicPath = '/dist/'

				// image
				options: {
				 	name: 'img/img.png'
				}
				// 最终图片的访问路径为
				output.publicPath + 'img/img.png' = '/dist/img/img.png'

				一般设置成 output.publicPath = '/'


				3.chunkFilename: Code Splitting
				当网站规模越来越大的时候，首先出现的问题是 Javascript 
				文件变得巨大，这导致首页渲染的时间让人难以忍受。实际上程序应当只加载当前渲染页所需的 JavaScript，也就是大家说的“代码分拆" ― 将所有的代码分拆成多个小包，在用户浏览过程中按需加载。 

				应用场景： 首页加载的时候有一些资源需要加载，但是首页并没有展示这些资源
					比如应用的首页里面有个按钮，点击后可以打开某个地图。打开地图的话就要用到地图的js,于是我们不得不在首页中把百度地图的js一起打包进去首页
					这些资源有时候会很大，首页打开时间很长，解决方案？

					mapBtn.click(function() {
					  //获取 文档head对象
					  var head = document.getElementsByTagName('head')[0];
					  //构建 <script>
					  var script = document.createElement('script');
					  //设置src属性
					  script.async = true;
					  script.src = "xxxx.js"
					  //加入到head对象中
					  head.appendChild(script);
					})

				#### require.ensure(dependencies, callback, chunkName)
					webpack 提供了一个方法方法，这也是按需加载的核心方法,遵从 CommonJS 规范，在需要的时候才下载依赖的模块。当所有的依赖都被加载完毕，便执行 callback（注：require作为callback的参数）
				
					第一个参数是依赖，第二个是回调函数，第三个就是上面提到的 chunkName，用来指定这个 chunk file 的 name。

				eg: 
					mapBtn.click(
						require.ensure([], function() {
						    var baidumap = require('xxxx.js')
					  	})
					)


				vue 路由的按需加载

				{
		            path: '/aaa',
		            name: 'aaa',
		            component: resolve => require.ensure([], () => resolve(require('../components/PromiseDemo')), 'demo')
		        },
		        {
		            path: '/bbb',
		            name: 'bbb',
		            component: resolve => require.ensure([], () => resolve(require('../components/Hello')), 'demo')
		        }


	## 3.loader
		
		我们知道webpack只能处理js文件，我们的浏览器也可能不支持一些最新的js语法，

		基于此，我们需要对传入的模块进行一定的预处理，这就涉及到webpack的又一核心概念loader，

		使用loader，webpack允许我们打包任何JS之外的静态资源。

		### 1.loader的作用和基本用法
			webpack中，loader的配置主要在module.rules中进行，module.rules是一个数组，我们可以把每一项看做一个Rule，每个Rule主要做了以下两件事
				1.识别文件类型，以确定具体处理该数据的loader，（Rule.test属性）。
				  表示匹配规则，它是一个正则表达式
				2.使用相关loader对文件进行相应的操作转换，（Rule.use属性）。
					表示针对匹配的文件将使用的处理loader，其值可以是字符串，数组和对象，当是对象形式时，我们可以使用options等命令进行进一步的配置。

		### 2.常用的loader
				1.解析 css
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
					# css-loader 是处理css文件中的url()等

					# style-loader 将css插入到页面的style标签

					# exclude: 从哪些文件中匹配，可以优化打包速度

					# css modules
						CSS MODULE是一种css in javascript的方式，当我们把一个css文件import到一个js模块时，这个css文件会暴露一个对象，这个对象映射所有的本地和全局css类名

					# localIdentName
						通常modules参数还要通过localIdentName的配合来设置css的类名。在上文中我们看到没有设置localIdentName的css编译后是一串随机字符串，可读性很差，因此我们还需要对它的类名进行处理，这就用到了localIdentName

						可以通过给类名设置:local或:global来决定它是否是全局的css类。设置了:local的类会被编译，而设置了:global的类则会被当成是全局的类，不会被编译。如上文的css如果我们设置为：

						:local(.title){
						  font-size: 16px;
						}
						:global(.desc){
						  text-align: center;
						}

						编译后为：
						.app---title---103E5{
						  font-size: 16px;
						}
						.desc{
						  text-align: center;
						}

					# loader的加载顺序是从右往左，从下往上
						对不同文件进行不同处理可以使用这种方式

				2.解析 sass , less
					只是比css多一部就是把 sass 转换成 css

					{
						test: /\.scss$/,
						use: ['style-loader','css-loader', 'sass-loader']
					},

				3.file-loader url-loader 解析 img background url

					webpack最终会将各个模块打包成一个文件，因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在的路径的。
					这就会导致图片引入失败。这个问题是用file-loader解决的

					{
						test: /\.(jepg|gif|jpg|ttf|svg)$/i,
						use: {
							loader: 'file-loader',
							options: {
								name: 'img/[name][hash].[ext]'
							}
							
						}
					},

					url-loader 解析为 base64 增强版的file-loader ,可以限定他的长度，超过之后会用file-loader处理文件路径
					{
						test: /\.(png|gif)$/i,
						use: [
							{
								loader: 'url-loader',
								options: {
									name: 'img',
									limit: 100
								}
							}
						]
					}

				4.babel-loader 解析 js ,jsx

					https://babeljs.io/docs/en/plugins#presets

					//jsx loader
					{
						test: /\.js$/,
						use: [{
							loader: 'babel-loader'
						}],
						exclude: [path.resolve(__dirname, "node_modules")]
					},


				转换编译：script-loader/babel-loader/ts-loader/coffee-loader等。

				处理样式：style-loader/css-loader/less-loader/sass-loader/postcss-loader等。

				处理文件：raw-loader/url-loader/file-loader/等。

				处理数据：csv-loader/xml-loader等。

				处理模板语言：html-loader/pug-loader/jade-loader/markdown-loader等。

				清理和测试：mocha-loader/eslint-loader等。

	## 4.plugin

		经过上一阶段的处理，我们的代码其实已经可以输出使用了。不过这样的输出可能还不能让人满意，我们想要抽离公共代码；我们想统一修改所有代码中的某些值；我们还想对代码进行压缩，去除所有的console… , 总之这一阶段的代码还是存在很大的改进空间的，这就是plugin的用武之地了。

			### 1.用法
				plugins是一个数组，数组中的每一项都是某一个plugin的实例，plugins数组甚至可以存在一个插件的多个实例。
				一种插件其实就是一种函数，通过传入不同的参数，插件可按我们的需求实现不同的功能。但是每个插件传入的参数都不同，配置都不同，现学现用
				https://webpack.js.org/plugins/

			### 常用插件

				1. BannerPlugin:给代码添加版权信息，如在plugins数组中添加new BannerPlugin(‘string’)后能在打包生成的所有文件前添加注释详见。


				2.CommonsChunkPlugin
					抽离不同文件的共享代码，减少chunk间的重复代码，有效利用缓存。

					抽离可能整个项目都在使用的第三方模块，比如react react-dom。

					将多个子chunk中的共用代码打包进父chunk或使用异步加载的单独chunk。

					抽离Manifest这类每次打包都会变化的内容，减轻打包时候的压力，提升构建速度。

					new webpack.optimize.CommonsChunkPlugin({
			            name: 'vendor',
			            filename: '[name].js'
			        }),
			        上面代码，我们发现公共部分已经被打包进vendor中了，
			        同时还有webpack的运行文件。总的来说，我们初步的目的达到，提取公共模块，但是我们希望只包含第三方库，不包含自定义的公共模块和webpack运行文件
			        特别是分离出webpack运行文件，因为每次打包webpack运行文件都会变，如果你不分离出webpack运行文件，每次打包生成vendor.js对应的哈希值都会变化，导致vendor.js改变，但实际上你的第三方库其实是没有变，然而浏览器会认为你原来缓存的vendor.js就失效，要重新去服务器中获取，其实只是webpack运行文件变化而已，就要人家重新加载，

			        所以针对上面情况我们
			        	抽离webpack运行文件
			         plugins: [
				        new webpack.optimize.CommonsChunkPlugin({
				            name: 'vendor',
				            filename: '[name].js'
				        }),
				        new webpack.optimize.CommonsChunkPlugin({
				            name: 'runtime',
				            filename: '[name].js',
				            chunks: ['vendor']
				        }),
				    ]
				    	抽离第三方库和自定义公共模块

				    new webpack.optimize.CommonsChunkPlugin({
			            name: ['vendor','runtime'],
			            filename: '[name].js',
			            minChunks: 2
			        }),
			        new webpack.optimize.CommonsChunkPlugin({
			            name: 'common',
			            filename: '[name].js',
			            chunks: ['home','about']
			        }),

			        这样抽离出来的的 vendor 就是纯净的第三方库， runtime 是webpack运行文件  common是自定义公共部分代码

			        在生产环境，要把文件名改成'[name].[chunkhash]'，最大限度的利用浏览器缓存。

			    3.ExtractTextWebpackPlugin 抽离css为单独css

			    	plugins: [
					    new ExtractTextPlugin("[name].css"),
					],

					{
						test: /\.css$/,
						use: ExtractTextPlugin.extract({
				          fallback: "style-loader",
				          use: "css-loader"
				        })
					},

			    4. DefinePlugin:创建一个在编译时可配置的全局常量,如果你自定义了一个全局变量PRODUCTION,可在此设置其值来区分开发还是生产环境。
			    	new webpack.DefinePlugin({
					  PRODUCTION: JSON.stringify(true),
					  VERSION: JSON.stringify('5fa3b9'),
					  BROWSER_SUPPORTS_HTML5: true,
					  TWO: '1+1',
					  'typeof window': JSON.stringify('object')
					});

					if (!PRODUCTION) {
					  console.log('Debug info');
					}

					if (PRODUCTION) {
					  console.log('Production log');
					}

				5. ProvidePlugin：全局自动加载模块，如添加new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'})后,则全局不用在导入jquery就可以直接使用$，ProvidePlugin。


				6.HtmlWebpackPlugin 为你自动生成一个html文件，该文件将自动依据entry的配置引入依赖，

					title 设置生成的 html 文件的标题
					filename 生成 html 文件的文件名。默认为 index.html
					template 根据自己的指定的模板文件来生成特定的 html 文件
					inject 
							true 默认值，script标签位于html文件的 body 底部
							body 同 true
							head script 标签位于 head 标签内
							false 不插入生成的 js 文件，只是单纯的生成一个 html 文件

				7. CleanWebpackPlugin 每次打包时，清空所配置的文件夹

				从输入entry->处理loaders/plugins->输出output，
				我们讲解了webpack的核心功能，不过webpack还提供其它的一些配置项，这些配置项大多从两方面起作用，辅助开发、对构建过程中的一些细节做调整。
				对这些属性，下面只做简单的介绍

	## 辅助开发的相关属性
		### 1. devtool 打包后的代码和原始的代码往往存在较大的差异，此选项控制是否生成，以及如何生成 source map，用以帮助你进行调试
		https://webpack.js.org/configuration/devtool/

		### 2. devServer
			webpack开发服务器，是webpack官方提供的一个辅助开发工具，它可以自动监控项目下的文件，一旦有修改保存操作，开发服务器就会自动运行webpack 打包命令，帮我们自动将开发的代码重新打包。而且，如果需要的话，还能自动刷新浏览器，重新加载资源。

			webpack-dev-server --hot







```

