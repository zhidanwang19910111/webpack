/*import A from './a.js';
import B from './b.js';
import C from './c.js';

A();
B();
C();
*/
import React from 'react';
import ReactDOM from 'react-dom';

import './common/style/main.css';


import openImg from './common/img/dan.png';
const pandaImg = require('./common/img/panda.jpg');

ReactDOM.render(
	<div>
		<img src={openImg} />
		<img src={pandaImg} />
	</div>,
	document.getElementById('app')
)