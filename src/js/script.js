import sha512 from 'js-sha512';
import autosize from 'autosize';


// Сервер
const server = new WebSocket('ws://localhost:5000');

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
    console.log(data);
    document.cookie = `ID=${data.user.id}`;
  }
  if (data.notice == 'joinRoom') {
    data = data.data;
    // console.log(data);
    const roomID = data.id,
          name = data.name;
    renderTab(roomID, name);
    renderWorkWindow(roomID);
  }
  if (data.notice == 'roomBuffer') {
    data = data.data;
    // console.log(data);
    const roomID = data.room.id,
          name = data.room.name,
          messages = data.messages;
    // Проверим, отрисована ли уже комната, чтобы не сделать это еще раз
    if (!document.getElementById(`window-${roomID}`)) {
      renderTab(roomID, name);
      renderWorkWindow(roomID);
      for (let i = 0; i < messages.length; i++) {
        renderMessage(roomID, messages[i]);
      }
    }
  }
  if (data.notice == 'sendMessage') {
    data = data.data;
    console.log(data);
    const roomID = data.room.id;
    const message = data.message;
    renderMessage(roomID, message);
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

////   ///   ////
////   ///   ////
////   ///   ////





// Основные блоки
const chat = document.getElementById('chat'),
      mainMenu = document.getElementById('main-menu'),
      workspace = document.getElementById('workspace');
// Элементы основных блоков
const openedRooms = document.getElementById('opened-rooms'),
      workspaceBackBtn = document.getElementById('back-btn'),
      newRoomBtn = document.getElementById('new-room-btn');
// Топы и настройки
const roomsTab = document.getElementById('rooms'),
      settingsTab = document.getElementById('settings');

////   ///   ////
////   ///   ////
////   ///   ////





// Конструктор меню
function Menu(elem) {
  const self = this;

  this.activate = function(elem) {
    // Определим окно соответстувующее вкладке
    const workWindow = document.getElementById(`window-${elem.dataset.id}`);
    // Снимем класс '--active' с активного окна и вкладки
    document.querySelector('.window--active').classList.remove('window--active');
    document.querySelector('.tab--active').classList.remove('tab--active');
    // Добавим класс '--active' окну и вкладке по которой кликаем
    elem.classList.add(`${elem.dataset.type}--active`);
    workWindow.classList.add(`${workWindow.dataset.type}--active`);
    // Убираем класс '--active' у меню (класс есть только на мобильных) И добавляем рабочему пространству чата
    mainMenu.classList.remove('main-menu--active');
    workspace.classList.add('workspace--active');
  };
  
  // Добавим отслеживание клика всему главному меню
  elem.addEventListener('click', function(event) {
    let target = event.target;
    // Найдем необходимый элемент
    for (target; target != this; target = target.parentElement) {
      if (target.dataset.type == 'tab') {
        self.activate(target);
      }
    }
  });
}
// И сразу создадим главное меню чата
new Menu (mainMenu);

// Функция возврата назад для мобильной версии
const returnBack = () => {
  mainMenu.classList.toggle('main-menu--active');
  workspace.classList.toggle('workspace--active');  
};
// Добавим обработчик кнопке "Назад"
workspaceBackBtn.addEventListener('click', returnBack);

////   ///   ////
////   ///   ////
////   ///   ////





// Конструктор действий для формы
function MessageForm(elem) {
  const self = this,
        textarea = elem.querySelector('textarea');

  autosize(textarea);
        
  // Отправка сообщений при submit
  this.send = function(event) {
    event.preventDefault();
    sendMessage(event.target);
  };
  // Отменяем перевод строки при нажатии на Enter
  this.enterDown = function(event) {
    if (!event.shiftKey && event.keyCode == 13) {
      event.preventDefault();
    }
  };
  // Отправим сообщение при отпускании Enter
  this.enterUp = function (event) {
    if (!event.shiftKey && event.keyCode == 13) {
      sendMessage(event.target.parentElement);
      textarea.style.height = '24px';
    }
  };

  // Добавим обработчик submit всей форме
  elem.addEventListener('submit', self.send);
  // Добавим обработчики textarea
  textarea.addEventListener('keyup', self.enterUp);
  textarea.addEventListener('keydown', self.enterDown);
}



////   ///   ////
////   ///   ////
////   ///   ////




// Создание комнаты
const newRoom = () => {
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
// Повесим обработчик на кнопку создания треда
newRoomBtn.addEventListener('click', newRoom);

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
////   ///   ////
////   ///   ////
////   ///   ////




// Сообщения:
const sendMessage = (event) => {
  const form = event,
        textarea = form.querySelector('textarea'),
        text = textarea.value,
        ID = form.dataset.id;

  const data = {
    "method" : "sendMessage",
    "data": {
      "room": {"id": ID},
      "message":{
        "text": text
      }
    }
  };

  server.send(JSON.stringify(data));
  // Сбросим контент в текстареа после отправки
  textarea.value = '';
};
////   ///   ////
////   ///   ////
////   ///   ////





// Рендеры элементов интерфейса:
// Рендер треда
// const renderThread = (threadID, threadTitle) => {
//   const thread = document.createElement('sections');
//   thread.id = threadID;
//   thread.className = 'thread';
//   thread.dataset.type = 'thread';
//   thread.dataset.id = threadID;
//   thread.dataset.title = `${threadTitle}`;
//   thread.innerHTML = `<img class="thread__img" src="img/pic.svg" alt="img"><h3 class="thread__title">${threadTitle}</h3>`;

//   return thread;
// };

const renderTab = (roomID, name) => {
  const tab = document.createElement('sections');
  tab.className = 'tab';
  tab.dataset.type = 'tab';
  tab.dataset.id = roomID;
  tab.dataset.title = `${name}`;
  tab.innerHTML = `
    <img class="tab__img" src="img/pic.svg" alt="logo room">
    <h3 class="tab__title">${name}</h3>`;

  openedRooms.append(tab);
};

const renderWorkWindow = (roomID) => {
  const workWindow = document.createElement('sections');
  workWindow.id = `window-${roomID}`;
  workWindow.className = 'window window--room';
  workWindow.dataset.type = 'window';
  workWindow.dataset.id = roomID;

  const messageForm = document.createElement('form');
  messageForm.id = `form-${roomID}`;
  messageForm.className = 'message-form';
  messageForm.dataset.id = roomID;
  messageForm.innerHTML = `
    <label class="message-form__file-label">
      <input class="message-form__file" type="file">
    </label>
    <textarea class="message-form__text" id="textarea-${roomID}" placeholder="Type message..." autofocus></textarea>
    <button class="message-form__send  btn" type="submit">Send</button>`;

  new MessageForm(messageForm);
  
  workWindow.append(messageForm);
  workspace.append(workWindow);
};

const renderMessage = (roomID, data) => {
  const ID = data.id,
        text = data.text,
        time = new Date(data.timestamp * 1000).toLocaleString("ru", {
          timezone: 'UTC',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        }),
        hash = data.hash;
  // Создаем элемент собщения
  const message = document.createElement('section');
        message.id = `message-${ID}`;
        message.className = 'message';
        message.dataset.type = 'message';
        message.innerHTML = `
          <div class="message__id">ID ${ID}</div>
          <p class="message__text">${text}</p>
          <div class="message__time">${time}</div>`;
  // Добавляем сообщение на страницу
  document.getElementById(`form-${roomID}`).before(message);
  // Проверяем хеш сумму, если тру, тогда сообщение пользователя
  if (sha512(roomID + getCookie('ID') + ID) == hash) {
    message.classList.add('message--user');
    // Скролим окно в самый низ, чтобы было видно сообщение
    document.getElementById(`window-${roomID}`).scrollTop = document.getElementById(`window-${roomID}`).scrollHeight;
  }
};