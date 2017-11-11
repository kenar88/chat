const chat = document.getElementById('chat'),
      mainMenu = document.getElementById('main-menu'),
      openedThreads = document.getElementById('opened-threads'),
      allTabs = document.getElementsByClassName('tab'),
      workspace = document.getElementById('workspace'),
      workspaceBackBtn = document.getElementById('back-btn'),
      allWorkWindow = workspace.getElementsByClassName('window'),
      allMessageForm = document.getElementsByClassName('message-form'),
      threads = document.getElementById('threads'),
      createThreadBtn = document.getElementById('create-thread-btn');

// Конструктор меню
function Menu (elem) {
  const self = this;

  this.activate = function(elem) {
    // Опрередим окно соответстувующее вкладке
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

////
////
////


// Треды:
// Конструктор тредов
function Thread(id, title) {
  this.data = {
    "method": "createThread",
    "id": id,
    "title": title
  }
}

// Рендер табов
const renderTab = (threadId, title) => {
  const tab = document.createElement('sections');
  tab.id = threadId;
  tab.className = 'tab';
  tab.dataset.type = 'tab';
  tab.dataset.id = threadId;
  tab.innerHTML = `<img class="tab__img" src="img/pic.svg" alt="img"><h3 class="tab__title">${title}</h3>`;

  return tab;
};
// Рендер рабочего окна
const renderWorkWindow = (threadId) => {
  const workWindow = document.createElement('sections');
  workWindow.id = `window-${threadId}`;
  workWindow.className = 'window window--thread';
  workWindow.dataset.type = 'window';
  workWindow.dataset.id = threadId;

  // Рендерим и создаём форму для каждого рабочего окна
  const messageForm = renderMessageForm(threadId);
  new FormMessage(messageForm);
  workWindow.append(messageForm);

  return workWindow;
};
// Рендер формы в рабочем окне
const renderMessageForm = (threadId) => {
  const messageForm = document.createElement('form');
  messageForm.id = `form-${threadId}`;
  messageForm.className = 'message-form';
  messageForm.dataset.id = `form-${threadId}`;
  messageForm.innerHTML = `
    <label class="message-form__file-label">
      <input class="message-form__file" type="file">
    </label>
    <textarea class="message-form__text" id="text-${threadId}" placeholder="Type message..." autofocus></textarea>
    <div class="message-form__help-div" id="text-${threadId}-div"></div>
    <button class="message-form__send  btn" type="submit">Send</button>`;

  return messageForm;
};
// Создаём тред и добавляем его на страницу
const createThread = () => {
  const thread = new Thread(777, 'new!'),
        threadId = thread.data.id,
        threadTitle = thread.data.title,
        tab = renderTab(threadId, threadTitle),
        workWindow = renderWorkWindow(threadId);

  openedThreads.append(tab);
  workspace.append(workWindow);
};

// Повесим обработчик на кнопку создания треда
createThreadBtn.addEventListener('click', createThread);

////
////
////


// Сообщения:
// Конструктор сообщений
function Messsage(roomId, text) {
  this.data = {
        "method": "sendMessage",
        "room_id": roomId,
        "message": {
          "text": text.trim()
        } 
  };
};

// Рендер сообщений
const renderMessage = (elem, text) => {
  // Создаём элементы сообщения
  const message = document.createElement('section'),
        timeMessage = document.createElement('div'),
        textMessage = document.createElement('p'),
        idMessage = document.createElement('div');

  // Даём им необходимые классы
  message.className = 'message message--user';
  timeMessage.className = 'message__time';
  textMessage.className = 'message__text';
  idMessage.className = 'message__id';
  // Задаём время отправки, текст сообщения
  timeMessage.textContent = new Date().toLocaleString('ru', {hour: 'numeric',
                                                             minute: 'numeric',
                                                             second: 'numeric'});
  textMessage.textContent = text;
  // Собираем элементы вместе и добавляем в тред
  message.appendChild(idMessage);
  message.appendChild(textMessage);
  message.appendChild(timeMessage);
  elem.before(message);
}

// Отправка сообщений
const sendMessage = (event) => {
  const workWindow = event.parentElement,
        form = event,
        textarea = form.querySelector('.message-form__text'),
        text = textarea.value,
        threadId = workWindow.dataset.id;
  // Отслеживаем ввел ли пользователь текст сообщения
  if (!text || !text.trim() ) {
    textarea.value = '';
    textarea.setAttribute('placeholder', 'Enter the message...');
    return;
  }
  // Создаём сообщение
  const message = new Messsage(threadId, text);

  // Отправка сообщения на сервер
  // connection.send(JSON.stringify(message.data));

  // Рендерим сообщение в активном элементе окна чата
  renderMessage(form, text);
  // Прокручиваем скроллбар окна вниз
  workWindow.scrollTop = workWindow.scrollHeight;
  // Сбрасываем содержимое формы до исходного состояния
  textarea.setAttribute('placeholder', 'Type message...');
  textarea.value = '';
  textarea.focus();
};

////
////
////


// Форма отправки сообщения:
// Автоматическое изменение высоты <textarea>
const textareaResize = (event, lineHeight, minLineCount) => {
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

  if (event.keyCode != 17) {
    elem.style.height = elemHeight + 'px';
  }
};

// Конструктор формы сообщения
function FormMessage (elem) {
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
      textareaResize(event, 24, 1);
    }
    textareaResize(event, 24, 1);
  };

  // Добавим обработчик submit всей форме
  elem.addEventListener('submit', self.send);
  // Добавим обработчики textarea
  textarea.addEventListener('keyup', self.sendEnter);
  textarea.addEventListener('keydown', self.sendEnter);
}

// Пока что создадим формы в ручную, потом они будут создаваться в конструкторе тредов
const form100 = document.getElementById('form-100'),
      form101 = document.getElementById('form-101');
new FormMessage(form100);
new FormMessage(form101);