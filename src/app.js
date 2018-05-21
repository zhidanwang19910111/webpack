/*import A from './a.js';
import B from './b.js';
import C from './c.js';

A();
B();
C();
*/
import React from 'react';
import ReactDOM from 'react-dom';


//css模块化写法 ,将类名进行重新编码
import style from './common/style/main.css';
import aac from './common/style/aac.css';

import mousleStyle from './moule.css';

import './common/style/main.scss'

import openImg from './common/img/dan.png';
const pandaImg = require('./common/img/panda.jpg');

ReactDOM.render(
	<div>
		<div className="sass">react
			<span>50px{pandaImg}</span>
		</div>
	</div>,
	document.getElementById('app')
)