import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import { initialUser } from './actions';

import './server';
import { getCookie } from './cookie';
import Chat from './components/Chat';

import './index.css';





// Store Redux'a
// const store = createStore(reducer, initialState);
const store = createStore(reducer);

if (getCookie('ID')) {
  store.dispatch(initialUser(getCookie('ID')));
  // console.log(store.getState());
}



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Chat />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

export default store;