import './index.html';
import './style.scss';

import './main-menu/main-menu.js';
//НА ВЫПИЛ
//import renderTab from './main-menu/tab/tab.js';

import menu from './main-menu/main-menu.js';

import './search-form/search-form.js';

import './workspace/workspace.js';

import renderWorkWindow from './work-window/work-window.js';
import renderMessage from './message/message.js';

import './work-window-rooms/work-window-rooms.js';

import Top from './top/top.js';



// // Основные блоки
// const chat = document.getElementById('chat'),
// mainMenu = document.getElementById('main-menu'),
// workspace = document.getElementById('workspace');
// // Элементы основных блоков
// const openedRooms = document.getElementById('opened-rooms'),
// workspaceBackBtn = document.getElementById('back-btn'),
// newRoomBtn = document.getElementById('new-room-btn');
// // Топы и настройки
// const roomsTab = document.getElementById('rooms'),
// settingsTab = document.getElementById('settings');





// Сервер
// const server = new WebSocket('ws://localhost:5000');
const server = new WebSocket('ws://52.56.249.143:5000');

server.onopen = function() {
  console.log('Соединение установлено');
};

server.onclose = function(event) {
  if (event.wasClean) {
    console.log('Соединение закрыто');
  } else {
    console.log('Обрыв соединения');
  }
  console.log('Код: ' + event.code + ' причина: ' + event.reason);
};

server.onmessage = function(event) {
  let data = JSON.parse(event.data);
  console.log(data);

  if (data.notice == 'userInfo') {
    data = data.data;
    // console.log(data);
    document.cookie = `ID=${data.user.id}`;
  }

  if (data.notice == 'roomBuffer') {
    data = data.data;
    // console.log(data);
    const roomID = data.room.id,
          name = data.room.name,
          messages = data.messages;
    // Проверим, отрисована ли уже комната, чтобы не сделать это еще раз
    if (!document.getElementById(`window-${roomID}`)) {
      menu.renderTab(roomID, name);
      renderWorkWindow(roomID);
    }
    for (let i = 0; i < messages.length; i++) {
      renderMessage(roomID, messages[i]);
    }
  }

  if (data.notice == 'sendMessage') {
    data = data.data;
    // console.log(data);
    const roomID = data.room.id,
          message = data.message;
    renderMessage(roomID, message);
  }

  if (data.notice == 'topRooms') {
    data = data.data;
    // console.log(data);
    const roomsContent = document.getElementById('rooms-content'),
          type = data.type,
          rooms = data.rooms;

    // Создадим объект и элемент топа
    let top = new Top(data),
        topElem = top.renderTop(type);
    // Удалим старый топ, перед тем как рендерить новый
    if (document.getElementById(type)) {
      roomsContent.removeChild(document.getElementById(type));
    }
    roomsContent.append(topElem);
    // Зададим поведение топа
    top.handlerTop(topElem);
    // Рендерим комнаты в топе
    for (let i = 0; i < rooms.length; i++) {
      let id = rooms[i].room.id,
          name = rooms[i].room.name,
          room = top.renderRoom(id, name);

      topElem.append(room);
    }
  }
};

server.onerror = function(error) {
  console.log("Ошибка " + error.message);
};

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}





// Присоединяемся к комнате
const joinRoom = (roomID) => {
  const data = {
    "method": "joinRoom",
    "data": {
      "room": {
        "id": roomID
      }
    }
  }

  server.send(JSON.stringify(data));
};





export {server, getCookie};