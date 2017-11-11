// Определим глобальные переменные
const chat = document.getElementById('chat'),
      mainMenu = document.getElementById('main-menu'),
      openedThreads = document.getElementById('opened-threads'),
      allTabs = document.getElementsByClassName('tab'),
      workspace = document.getElementById('workspace'),
      workspaceBackBtn = document.getElementById('back-btn'),
      allWorkWindow = workspace.getElementsByClassName('window'),
      workWindowThreads = document.getElementById('window-threads'),
      allMessageForm = document.getElementsByClassName('message-form'),
      threads = document.getElementById('threads'),
      createThreadBtn = document.getElementById('create-thread-btn'),
      threadsTops = document.getElementById('threads-tops'),
      allThreadsList = document.getElementById('all-threads-list');

// При входе в чат создаём нового пользователя
function User(userID) {
  this.data = {
    "id": "userID"
  }
}

new User('000')

////   ///   ////
////   ///   ////
////   ///   ////



// Поведение блоков:
// Конструктор действий меню
function Menu(elem) {
  const self = this;

  this.activate = function(elem) {
    // Определим окно соответстувующее вкладке
    const workWindow = document.getElementById('window-' + elem.dataset.id);
    // Снимем класс '--active' с активного окна и вкладки
    for (let i = 0; i < allWorkWindow.length; i++) {
      allWorkWindow[i].classList.remove('window--active');
    }
    for (let i = 0; i < allTabs.length; i++) {
      allTabs[i].classList.remove('tab--active');
    }
    // Добавим класс '--active' окну и вкладке по которой кликаем
    elem.classList.add(elem.dataset.type + '--active');
    workWindow.classList.add(workWindow.dataset.type + '--active');
    // Убираем класс '--active' у меню (класс есть только на мобильных) И добавляем рабочему пространству чата
    mainMenu.classList.remove('main-menu--active');
    workspace.classList.add('workspace--active');
    // И установим фокус на поле ввода сообщения, но только если id это число (id меню и настроек слова)
    if (+workWindow.dataset.id) {
      workWindow.querySelector('textarea').focus();
    }
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



// Конструктор действий рабочего окна
function workWindow(elem) {
  const self = this;

  this.openThread = function(elem) {
    // Проверим, если тред открыт, не открываем его повторно
    for (let i = 0; i < allTabs.length; i++) {
      if (allTabs[i].dataset.id === elem.dataset.id) return; 
    }
    // Создадим для треда вкладку и новое рабочее окно c формой
    const threadID = elem.dataset.id,
          threadTitle = elem.dataset.title,
          tab = renderTab(threadID, threadTitle),
          workWindow = renderWorkWindow(threadID),
          messageForm = renderMessageForm(threadID);
    // Добавим треду класс '--opened'
    // elem.classList.add('thread--opened');
    // Добавим всем нужным тредам модификатор '--opened'
    for (let i = 0; i < threadsTops.children.length; i++) {
      let top = threadsTops.children[i];
      for (let k = 0; k < top.children.length; k++) {
        if (top.children[k].dataset.id === threadID) {
          top.children[k].classList.add('thread--opened');
        }
      }
    }
    
    // Добавим поведение форме
    new MessageForm(messageForm);
    
    // А теперь добавим их на страницу
    openedThreads.append(tab);
    workspace.append(workWindow);
    workWindow.append(messageForm);
    // Вызовем клик на табе, чтобы сразу переключиться на открытый тред
    tab.click();
  };

  // Добавим отслеживание клика всему рабочему окну
  elem.addEventListener('click', function(event) {
    let target = event.target;
    // Найдем необходимый элемент
    for (target; target != this; target = target.parentElement) {
      if (target.dataset.type == 'thread') {
        self.openThread(target);
      }
    }
  });
}

// Сразу создадим поведение для дефолтного окна всех тредов
workWindow(workWindowThreads);



// Конструктор действий для формы
function MessageForm(elem) {
  const self = this,
        textarea = elem.querySelector('textarea');
  // Отправка сообщений при submit
  this.send = function(event) {
    event.preventDefault();
    sendMessage(event.target);
  };
  // Отправка сообщений по нажатию Enter в textarea
  this.sendEnter = function(event) {
    if (!event.ctrlKey && event.keyCode == 13) {
      // Отменяем перевод строки при нажатии на Enter
      event.preventDefault();
      // И отправляем сообщение
      sendMessage(event.target.parentElement);
    }
    // Добавим перевод строки по отпусканию Ctrl + Enter в <textarea>
    if (event.type == 'keyup' && event.ctrlKey && event.keyCode == 13) {
      event.target.value += '\n';
      self.textareaResize(event, 24, 1);
    }
    self.textareaResize(event, 24, 1);
  };
  this.textareaResize = function(event, lineHeight, minLineCount) {
    const minHeight = minLineCount * lineHeight,
          elem = event.target, 
          div = document.getElementById(elem.id + '-div');

          div.innerHTML = elem.value;
          div.style.width = elem.offsetWidth + 'px';

    let elemHeight = div.offsetHeight;

    if (event.ctrlKey && event.keyCode == 13) {
      elemHeight += lineHeight;
    } else if (elemHeight < minHeight) {
      elemHeight = minHeight;
    }

    if(event.keyCode != 17) {
      elem.style.height = elemHeight + 'px';
    }
  };

  // Добавим обработчик submit всей форме
  elem.addEventListener('submit', self.send);
  // Добавим обработчики textarea
  textarea.addEventListener('keyup', self.sendEnter);
  textarea.addEventListener('keydown', self.sendEnter);
}

////   ///   ////
////   ///   ////
////   ///   ////



// Создание тредов:
// Конструктор треда
function Thread(id, title) {
  this.data = {
    "method": "createThread",
    "id": id,
    "title": title
  }
}

// Создание и рендеринг треда
const createThread = () => {
  // Запросим заголовок треда у пользователя, а id возьмём с сервера (пока что рандомно)
  const threadID = Math.round(Math.random() * 100),
        threadTitle = prompt('Enter thread title', '');
  // Создадим тред, его элемент для страницы и остальное
  const thread = new Thread(threadID, threadTitle),
        threadElem = renderThread(threadID, threadTitle),
        tab = renderTab(threadID, threadTitle),
        workWindow = renderWorkWindow(threadID),
        messageForm = renderMessageForm(threadID);
  // Добавим треду класс '--opened'
  threadElem.classList.add('thread--opened');
  // Добавим поведение форме
  new MessageForm(messageForm);

  // Здесь должна быть отправка треда на сервер

  allThreadsList.append(threadElem);
  openedThreads.append(tab);
  workspace.append(workWindow);
  workWindow.append(messageForm);
};
// Повесим обработчик на кнопку создания треда
createThreadBtn.addEventListener('click', createThread);

////   ///   ////
////   ///   ////
////   ///   ////



// Сообщения:
// Конструктор сообщений
function Messsage(threadID, messageText) {
  this.data = {
        "method": "sendMessage",
        "room_id": threadID,
        "message": {
          "text": messageText
        } 
  };
};

// Отправка сообщений
const sendMessage = (event) => {
  // Необходимое рабочее окно будет родителем event, так как только форма передаёт сообщения
  const workWindow = event.parentElement,
        threadID = workWindow.dataset.id,
        messageForm = event,
        textarea = document.getElementById(`textarea-${threadID}`),
        messageText = textarea.value;
  // Отслеживаем ввел ли пользователь текст сообщения
  if (!messageText || !messageText.trim() ) {
    // Если не ввел, то сбросим содержимые пробелы и покажем плейсхолдер
    textarea.value = '';
    textarea.setAttribute('placeholder', 'Enter the message...');
    return;
  }

  // Тут мы должны получить ID сообщения с сервера и возможно еще ответ со временем, но пока так
  const messageID = Math.round(Math.random() * 1000000),
        messageTime = new Date().toLocaleString('ru',
          { hour: 'numeric',
            minute: 'numeric',
            second: 'numeric' });

  // Создаём сообщение и его элемент для страницы
  const message = new Messsage(threadID, messageText),
        messageElem = renderMessage(messageID, messageText, messageTime);

  // Отправка сообщения на сервер
  // connection.send(JSON.stringify(message.data));

  // Вставляем сообщение на страницу перед формой, но перед этим дадим сообщению модификатор '--user', чтобы оно отобразилось с левой стороны
  messageElem.classList.add('message--user');
  messageForm.before(messageElem);
  // Прокручиваем скроллбар окна вниз
  workWindow.scrollTop = workWindow.scrollHeight;
  // Сбрасываем содержимое формы до исходного состояния
  textarea.setAttribute('placeholder', 'Type message...');
  textarea.value = '';
  textarea.focus();
};

////   ///   ////
////   ///   ////
////   ///   ////



// Рендеры элементов интерфейса:
// Рендер треда
const renderThread = (threadID, threadTitle) => {
  const thread = document.createElement('sections');
  thread.id = threadID;
  thread.className = 'thread';
  thread.dataset.type = 'thread';
  thread.dataset.id = threadID;
  thread.dataset.title = `${threadTitle}`;
  thread.innerHTML = `<img class="thread__img" src="img/pic.svg" alt="img"><h3 class="thread__title">${threadTitle}</h3>`;

  return thread;
};
// Рендер табов
const renderTab = (threadID, threadTitle) => {
  const tab = document.createElement('sections');
  tab.id = threadID;
  tab.className = 'tab';
  tab.dataset.type = 'tab';
  tab.dataset.id = threadID;
  tab.innerHTML = `<img class="tab__img" src="img/pic.svg" alt="img"><h3 class="tab__title">${threadTitle}</h3>`;

  return tab;
};
// Рендер рабочего окна
const renderWorkWindow = (threadID) => {
  const workWindow = document.createElement('sections');
  workWindow.id = `window-${threadID}`;
  workWindow.className = 'window window--thread';
  workWindow.dataset.type = 'window';
  workWindow.dataset.id = threadID;

  return workWindow;
};
// Рендер формы сообщения
const renderMessageForm = (threadID) => {
  const messageForm = document.createElement('form');
  messageForm.id = `form-${threadID}`;
  messageForm.className = 'message-form';
  messageForm.dataset.id = `form-${threadID}`;
  messageForm.innerHTML = `
    <label class="message-form__file-label">
      <input class="message-form__file" type="file">
    </label>
    <textarea class="message-form__text" id="textarea-${threadID}" placeholder="Type message..." autofocus></textarea>
    <div class="message-form__help-div" id="textarea-${threadID}-div"></div>
    <button class="message-form__send  btn" type="submit">Send</button>`;

  return messageForm;
};
// Рендер сообщения
const renderMessage = (messageID, messageText, messageTime) => {
  const message = document.createElement('section');
        message.id = `message-${messageID}`;
        message.className = 'message';
        message.dataset.type = 'message';
        message.innerHTML = `
          <div class="message__id">ID ${messageID}</div>
          <p class="message__text">${messageText}</p>
          <div class="message__time">${messageTime}</div>`;

        return message;
};

////   ///   ////
////   ///   ////
////   ///   ////