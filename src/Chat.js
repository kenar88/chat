import React, { Component } from 'react';

// import { server } from './server';
import Menu from './components/Menu/Menu';
import Workspace from './components/Workspace/Workspace';

import './Chat.css';

const getCookie = (name) => {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

// const server = new WebSocket('ws://localhost:5000');
// const server = new WebSocket('ws://52.56.249.143:5000');
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

server.onerror = (error) => {
  console.log(`Ошибка ${error.message}`);
};





class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: '',
      openedRooms: []
    };
  }

  componentDidMount() {
    server.onmessage = (event) => {
      let data = JSON.parse(event.data);
      console.log(data);
    
      if (data.notice === 'userInfo') {
        data = data.data;
        // console.log(data);
        const userID = data.user.id;

        document.cookie = `ID=${userID}`;

        this.setState({ userID });
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
  }

  render() {
    return (
      <section className="Chat">
        <Menu />
        <Workspace />
      </section>
    );
  }
}

export default Chat;
