'use strict'

// Глобальные переменные

const chat = document.getElementById('chat'),
      menu = document.getElementById('main-nav'),
      menuTabList = menu.querySelector('.main-nav__tabs'),
      innerChatWrapper = chat.querySelector('.chat__wrapper'),
      backBtn = document.getElementById('back-btn'),
      chatWindow = document.getElementById('chat-window');

const answerForm = document.querySelector('.answer-form'),
      answerBtn = answerForm.querySelector('.answer-form__btn'),
      answerText = answerForm.querySelector('.answer-form__text');

// Навигация:

const allTabs = menuTabList.querySelectorAll('.tab'),
      allWindowItems = chatWindow.querySelectorAll('.chat-window__item');

// Включение и выключение вкладок
const toggleTabs = (event) => {
  const requiredWindowItem = document.getElementById('item-' + event.currentTarget.id);

  if (allTabs.length || allWindowItems.length) {
    for (let i = 0; i < allWindowItems.length; i++) {
      allWindowItems[i].classList.remove('chat-window__item--active');
    }
    for (let i = 0; i < allTabs.length; i++) {
      allTabs[i].classList.remove('tab--active');
    }
  }

  event.currentTarget.classList.add('tab--active');
  requiredWindowItem.classList.add('chat-window__item--active');
  // Убираем класс активного состояния у главного меню (работает только на мобильной версии)
  menu.classList.remove('main-nav--active');
  // И добавляем обёртке окна чата
  innerChatWrapper.classList.add('chat__wrapper--active');
  answerText.focus();
};

// Функция возврата назад для мобильной версии
const returnBack = () => {
  menu.classList.toggle('main-nav--active');
  innerChatWrapper.classList.toggle('chat__wrapper--active');  
};

// Добавим обработчик кнопке "Назад"
backBtn.onclick = returnBack;

// Добавим обработчик клика каждой вкладке
for (let i = 0; i < allTabs.length; i++) {
  allTabs[i].onclick = toggleTabs;
}

// ----    ----    ----    ----    ----
//     ----    ----    ----    ----





// Сообщения:

// Конструктор сообщений
function Messsage(roomId, text) {
  const message = document.createElement('section'),
        textMessage = document.createElement('p');

  this.data = {
        "method": "sendMessage",
        "room_id": roomId,
        "message": {
          "text": text
        } 
  };
  this.render = function(elem) {
    message.className = 'message message--user';
    textMessage.className = 'message__text';
    textMessage.textContent = text;
    message.appendChild(textMessage);
    elem.appendChild(message);
  };
};

// Отправка сообщений
const sendMessage = (event) => {
  // Отменяем стандартное поведение <form> при submit
  event.preventDefault();

  // Определяем активный элемент окна чата
  const thread = document.querySelector('.chat-window__item--active');

  // Отслеживаем ввел ли пользователь текст сообщения
  if (!answerText.value || !answerText.value.trim() ) {
    answerText.value = '';
    return answerText.setAttribute('placeholder', 'Enter the message...');
  }

  // Создаём сообщение
  const message = new Messsage(123, answerText.value);

  // Отправка сообщения на сервер
  // connection.send(JSON.stringify(message.data));

  // Рендерим сообщение в активном элементе окна чата
  message.render(thread);

  // Прокручиваем скроллбар вниз
  chatWindow.scrollTop = chatWindow.scrollHeight;
  // Сбрасываем содержимое формы до исходного состояния
  answerText.setAttribute('placeholder', 'Type message...');
  answerText.value = '';
  answerText.focus();
};

// ----    ----    ----    ----    ----
//     ----    ----    ----    ----





// Форма отправки сообщения:

// Автоматическое изменение высоты <textarea>
const textareaResize = (event, lineHeight, minLineCount) => {
  const minLineHeight = minLineCount * lineHeight,
        elem = event.target, 
        div = document.getElementById(elem.id + '-div');

  div.innerHTML = elem.value;

  let elemHeight = div.offsetHeight;

  if (event.ctrlKey && event.keyCode == 13) {
    elemHeight += lineHeight;
  } else if (elemHeight < minLineHeight) {
    elemHeight = minLineHeight;
  }

  if (event.keyCode != 17) {
    elem.style.height = elemHeight + 'px';
  }
};

// Отправка сообщения при отпускании Enter и перевод строки при отпускании Ctrl + Enter в <textarea>
const keyupEnter = (event) => {
  if (!event.ctrlKey && event.keyCode == 13) {
    event.preventDefault();
    sendMessage(event);
  }
  if (event.ctrlKey && event.keyCode == 13) {
    answerText.value += '\n';
  }

  textareaResize(event, 24, 1);
};

// Отмена перевода строки при нажатии на Enter в <textarea>
const keydownEnter = (event) => {
  if (!event.ctrlKey && event.keyCode == 13) {
    event.preventDefault();
  }
};

answerForm.addEventListener('submit', sendMessage);
answerText.addEventListener('keyup', keyupEnter);
answerText.addEventListener('keydown', keydownEnter);

// ----    ----    ----    ----    ----
//     ----    ----    ----    ----