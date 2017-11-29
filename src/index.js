import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import chatApp from './reducers'
import Chat from './components/Chat';

import registerServiceWorker from './registerServiceWorker';

import './index.css';





let store = createStore(chatApp);

ReactDOM.render(
  <Provider store={store}>
    <Chat />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();