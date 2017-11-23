import './main-menu.scss';
import './tab/tab.js';

import './group.svg'
import './settings.svg'

import './tab/tab.scss';
import './tab/pic.svg';

import {
  server
} from '../script.js';

// Основные блоки
const mainMenu = document.getElementById('main-menu'),
  workspace = document.getElementById('workspace'),
  newRoomBtn = document.getElementById('new-room-btn'),
  openedRooms = document.getElementById('opened-rooms');


function Menu(elem) {
  const self = this;


  this.newRoom = function () {
    const name = prompt('Enter thread name', '');

    const data = {
      "method": "newRoom",
      "data": {
        "room": {
          "name": name
        }
      }
    }

    server.send(JSON.stringify(data));
  };



  this.renderTab = function (roomId, name) {
    function closeWindow(e) {
      console.log(e);
    }

    const tab = document.createElement('section');
    tab.classList = 'tab';
    tab.dataset.type = 'tab';
    tab.dataset.id = roomId;
    tab.dataset.title = name;
    tab.innerHTML = `
    <img class="tab__img" src="img/pic.svg" alt="logo room">
    <h3 class="tab__title">${name}</h3>
    <button type="button" data-type="tab-remove">X</button>`;

    openedRooms.appendChild(tab);
  };

  this.closeTab = function (target) {
    const roomId = target.parentElement.dataset.id;
    if (target.parentElement.classList.contains('tab--active')) {
      document.querySelector('.window--active').classList.remove('window--active');
      document.querySelector('.tab--active').classList.remove('tab--active');
    }
    target.parentElement.remove();
    document.getElementById(`window-${roomId}`).remove();
  }

  this.activate = function (elem) {
    // Определим окно соответстувующее вкладке
    const workWindow = document.getElementById(`window-${elem.dataset.id}`);
    // Снимем класс '--active' с активного окна и вкладки
    if (document.querySelectorAll('.tab--active').length) {
      document.querySelector('.window--active').classList.remove('window--active');
      document.querySelector('.tab--active').classList.remove('tab--active');
    }
    // Добавим класс '--active' окну и вкладке по которой кликаем
    elem.classList.add(`${elem.dataset.type}--active`);
    workWindow.classList.add(`${workWindow.dataset.type}--active`);
    // Убираем класс '--active' у меню (класс есть только на мобильных) И добавляем рабочему пространству чата
    mainMenu.classList.remove('main-menu--active');
    workspace.classList.add('workspace--active');
  };

  // Добавим отслеживание клика всему главному меню
  elem.addEventListener('click', function (event) {
    let target = event.target;
    // Найдем необходимый элемент
    for (target; target != this; target = target.parentElement) {
      if (target.dataset.type == 'tab-remove') {
        self.closeTab(target);
        return;
      }
      if (target.dataset.type == 'tab') {
        self.activate(target);
      }
      if (target.id == 'new-room-btn') {
        self.newRoom();
      }
    }
  });
}
// И сразу создадим главное меню чата
const menu = new Menu(mainMenu);




export default menu;
