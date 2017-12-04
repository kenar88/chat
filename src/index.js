import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';

import './server';
import { getCookie } from './cookie';
import Chat from './components/Chat';

import './index.css';





// Store Redux'a
const initialState = {
  user: {
    id: getCookie('ID')
  }
};

const store = createStore(reducer, initialState);
// const store = createStore(reducer);





ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Chat />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

export default store;