import './top.scss';
import './room.scss';

import {server} from '../script.js';


function Top (data) {
  self = this;

  this.renderTop = function (type) {
    const top = document.createElement('section');
    top.id = type;
    top.className = 'top';
    top.innerHTML = `<h2>${type}</h2>`;
    
    return top;
  }
  // Функция которая вешает обработчик на Top
  this.handlerTop = function (elem) {
    elem.addEventListener('click', function (event) {
      let target = event.target;
      for (target; target != this; target = target.parentElement) {
        if (target.dataset.type == 'room') {
          self.joinRoom(target);
        }
      }
    });
  };

  this.renderRoom = function (id, title) {
    const room = document.createElement('section');
    room.id = id;
    room.className = 'room';

    // Проверим, если комната открыта, то дадим ей класс 'room--opened'
    if (document.getElementById(`window-${id}`)) {
      room.classList.add('room--opened');
    }
    room.dataset.type = 'room';
    room.dataset.id = id;
    room.dataset.title = `${title}`;
    room.innerHTML = `
      <img class="room__img" src="img/pic.svg" alt="img">
      <h3 class="room__title">${title}</h3>`;
  
    return room;
  };

  this.joinRoom = function (event) {
    const id = event.id;

    const data = {
      "method": "joinRoom",
      "data": {
        "room": {
          "id": id
        }
      }
    }
  
    server.send(JSON.stringify(data));
    // Присвоим комнате класс
    event.classList.add('room--opened');
  };
}; 


export default Top;