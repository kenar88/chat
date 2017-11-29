import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import Chat from './Chat';

import './index.css';

ReactDOM.render(<Chat />, document.getElementById('root'));
registerServiceWorker();
