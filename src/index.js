import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import { initialUser, addRoom } from './actions';

import Chat from './components/Chat';

import './index.css';





// Store Redux'a, пока тут, переместим позже
const id = '135246';
const room = { 
  id: '098',
  name: 'first',
  messages: [
    { id: 1, text: 'qwerty' }
  ]
};

// const initialState = {
//   ID: '',
//   rooms: []
// };

console.log(reducer);
// const store = createStore(reducer, initialState);
const store = createStore(reducer);
console.log(store.getState());

store.dispatch(initialUser(id));
console.log(store.getState());

store.dispatch(addRoom(room));
console.log(store.getState());





// Работа с WebSocet и API сервера, тоже пока что тут, переместим позже
const getCookie = (name) => {
  const matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

// const server = new WebSocket('ws://localhost:5000');
const server = new WebSocket(`ws://52.56.249.143:5000?ID=${getCookie('ID')}`);

server.onopen = () => {
  console.log('Соединение установлено');
};

server.onclose = (event) => {
  if (event.wasClean) {
    console.log('Соединение закрыто');
  } else {
    console.log('Обрыв соединения');
  }
  console.log(`Код: ${event.code} причина: ${event.reason}`);
};

server.onmessage = (event) => {
  let data = JSON.parse(event.data);
  console.log(data);

  if (data.notice === 'userInfo') {
    data = data.data;
    // console.log(data);
    const userID = data.user.id;

    document.cookie = `ID=${userID}`;
  }

  if (data.notice === 'roomBuffer') {
    data = data.data;
    // console.log(data);
  }

  if (data.notice === 'sendMessage') {
    data = data.data;
    // console.log(data);
  }

  if (data.notice === 'topRooms') {
    data = data.data;
    // console.log(data);
  }
};

server.onerror = (error) => {
  console.log(`Ошибка ${error.message}`);
};





ReactDOM.render(
  <BrowserRouter>
    <Chat />
  </BrowserRouter>,
  document.getElementById('root')
);