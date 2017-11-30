import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import chatApp from './reducers';
import Chat from './components/Chat';

import './index.css';





let store = createStore(chatApp);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Chat />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);