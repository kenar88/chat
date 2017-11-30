import store from './index';
import { initialUser, addRoom } from './actions';
import { getCookie } from './cookie';

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
    const id = data.user.id;

    document.cookie = `ID=${id}`;
    store.dispatch(initialUser(id));
    console.log(store.getState());
  }

  if (data.notice === 'roomBuffer') {
    data = data.data;
    // console.log(data);
    const room = {
      id: data.room.id,
      name: data.room.name,
      messages: data.messages
    }

    store.dispatch(addRoom(room));
    // console.log(store.getState());
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

export default server;