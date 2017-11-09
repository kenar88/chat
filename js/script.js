const chat = document.getElementById('chat'),
      mainMenu = document.getElementById('main-menu'),
      allTabs = document.getElementsByClassName('tab'),
      workspace = document.getElementById('workspace'),
      workspaceBackBtn = workspace.querySelector('.workspace__back-btn');
      allWorkWindow = workspace.getElementsByClassName('window'),
      allMessageForm = document.getElementsByClassName('message-form');

// Навигация:
// Переключение вкладок
const toggleTabs = (event) => {
  // Определяем соответствующее вкладке окно
  const requiredWorkWindow = document.getElementById('window-' + event.currentTarget.id),
        currentTextarea = requiredWorkWindow.querySelector('.message-form__text');

  // Снимаем активное состояние со всех окон и вкладок
  if (allTabs.length || allWorkWindow.length) {
    for (let i = 0; i < allWorkWindow.length; i++) {
      allWorkWindow[i].classList.remove('window--active');
    }
    for (let i = 0; i < allTabs.length; i++) {
      allTabs[i].classList.remove('tab--active');
    }
  }

  // Вешаем активное состояние на вкладку и соответствующее ей окно
  event.currentTarget.classList.add('tab--active');
  requiredWorkWindow.classList.add('window--active');
  // Убираем класс активного состояния у главного меню (работает только на мобильной версии)
  mainMenu.classList.remove('main-menu--active');
  // И добавляем рабочему пространству чата
  workspace.classList.add('workspace--active');
  // Устанавливаем фокус на <textarea>
  currentTextarea.focus();
};

// Функция возврата назад для мобильной версии
const returnBack = () => {
  mainMenu.classList.toggle('main-menu--active');
  workspace.classList.toggle('workspace--active');  
};
// Добавим обработчик клика каждой вкладке
for (let i = 0; i < allTabs.length; i++) {
  allTabs[i].onclick = toggleTabs;
}
// Добавим обработчик кнопке "Назад"
workspaceBackBtn.onclick = returnBack;

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
  // Отменяем стандартное поведение <form>
  event.preventDefault();
  // Необходимо передавать в event имеено детей формы, чтобы константы определились
  const currentWorkWindow = event.target.parentElement.parentElement,
        currentForm = event.target.parentElement,
        currentTextarea = currentForm.querySelector('.message-form__text'),
        textMessage = currentTextarea.value,
        threadId = currentWorkWindow.dataset.threadId; ;

  // Отслеживаем ввел ли пользователь текст сообщения
  if (!textMessage || !textMessage.trim() ) {
    currentTextarea.value = '';
    return textMessage.setAttribute('placeholder', 'Enter the message...');
  }

  // Создаём сообщение
  const message = new Messsage(threadId, textMessage);

  // Отправка сообщения на сервер
  // connection.send(JSON.stringify(message.data));

  // Рендерим сообщение в активном элементе окна чата
  renderMessage(currentForm, message.data.message.text);

  // Прокручиваем скроллбар окна вниз
  currentWorkWindow.scrollTop = currentWorkWindow.scrollHeight;
  // Сбрасываем содержимое формы до исходного состояния
  currentTextarea.setAttribute('placeholder', 'Type message...');
  currentTextarea.value = '';
  currentTextarea.focus();
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

// Отправка сообщений по нажатию Enter
// Отменяем перевод строки при нажатии на Enter в <textarea>
const keydownEnter = (event) => {
  if (!event.ctrlKey && event.keyCode == 13) {
    event.preventDefault();
  }
};


const keyupEnter = (event) => {
  // Добавим перевод строки по отпусканию Ctrl + Enter в <textarea>
  if (event.ctrlKey && event.keyCode == 13) {
    event.target.value += '\n';
  }
  // Отправка сообщения по Enter
  if (!event.ctrlKey && event.keyCode == 13) {
    event.preventDefault();
    sendMessage(event);
  }
 
  textareaResize(event, 24, 1);
};

// Добавим обработчики всем формам и кнопкам
for (let i = 0; i < allMessageForm.length; i++) {
  allMessageForm[i].onkeyup = keyupEnter;
  allMessageForm[i].onkeydown = keydownEnter;
  // allMessageForm[i].submit = sendMessage;
  allMessageForm[i].querySelector('.message-form__send').onclick = sendMessage;
  // allMessageForm[i].querySelector('.message-form__send').onclick = allMessageForm[i].submit;
}