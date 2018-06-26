/*import A from './a.js';
import B from './b.js';
import C from './c.js';

A();
B();
C();*/

/*var aModule = require('./a.js');

document.getElementById("aBtn").onclick = function() {

  require.ensure([], function() {
    var bModule = require('./b.js')
  }, 'amodule')
}

document.getElementById("bBtn").onclick = function() {

  require.ensure([], function() {
    var cModule = require('./c.js')
  }, 'bmodule')
}
*/


import React from 'react';
import ReactDOM from 'react-dom';


//css模块化写法 ,将类名进行重新编码
import style from './common/style/main.css';
import aac from './common/style/aac.css';

import mousleStyle from './moule.css';
console.log(mousleStyle)
if (!PRODUCTION) {
  console.log('Debug info');
}

if (PRODUCTION) {
  console.log('Production log');
}

import './common/style/main.scss'

// import openImg from './common/img/dan.png';
const pandaImg = require('./common/img/panda.jpg');

ReactDOM.render(
	<div>
		<div className="sass" >react
			
			<img src={pandaImg} alt="" />
		</div>
		<span className={mousleStyle.ot}>2222</span>
		<span className="desc">1111</span>
	</div>,
	document.getElementById('app')
)