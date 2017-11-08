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
        timeMessage = document.createElement('span'),
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
    timeMessage.className = 'message__time';
    textMessage.className = 'message__text';
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    timeMessage.textContent = new Date().toLocaleString('ru', options);
    console.log(timeMessage);
    textMessage.textContent = text;
    message.appendChild(textMessage);
    message.appendChild(timeMessage);
    elem.before(message);
  };
};

// Отправка сообщений
const sendMessage = (event) => {
  // Отменяем стандартное поведение <form> при клике на кнопку
  event.preventDefault();

  // Определяем активный чат
  const thread = document.querySelector('.chat-window__item--active'),
        threadId = thread.id,
        threadForm = thread.querySelector('.answer-form'),
        threadFormText = threadForm.querySelector('.answer-form__text');

  // Отслеживаем ввел ли пользователь текст сообщения
  if (!threadFormText.value || !threadFormText.value.trim() ) {
    threadFormText.value = '';
    return threadFormText.setAttribute('placeholder', 'Enter the message...');
  }

  // Получаем id чата
  let tabId = ''; 
  for (let i = 0; i < threadId.length; i++) {
    if (!isNaN(threadId[i]) ) {
      tabId += threadId[i];
    }
  }

  // Создаём сообщение
  const message = new Messsage(tabId, threadFormText.value);

  // Отправка сообщения на сервер
  // connection.send(JSON.stringify(message.data));

  // Рендерим сообщение в активном элементе окна чата
  message.render(threadForm);

  // Прокручиваем скроллбар вниз
  chatWindow.scrollTop = chatWindow.scrollHeight;
  // Сбрасываем содержимое формы до исходного состояния
  threadFormText.setAttribute('placeholder', 'Type message...');
  threadFormText.value = '';
  threadFormText.focus();
};

// ----    ----    ----    ----    ----
//     ----    ----    ----    ----





// Форма отправки сообщения:

const allAnswerForm = document.getElementsByClassName('answer-form'),
      allAnswerBtn = document.getElementsByClassName('answer-form__btn');

// Автоматическое изменение высоты <textarea>
const textareaResize = (event, lineHeight, minLineCount) => {
  const minLineHeight = minLineCount * lineHeight,
        elem = event.target, 
        div = document.getElementById(elem.id + '-div');

  div.innerHTML = elem.value;
  div.style.width = elem.offsetWidth + 'px';



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
    event.target.value += '\n';
  }

  textareaResize(event, 24, 1);
};

// Отмена перевода строки при нажатии на Enter в <textarea>
const keydownEnter = (event) => {
  if (!event.ctrlKey && event.keyCode == 13) {
    event.preventDefault();
  }
};

// Добавим обработчики всем формам и кнопкам
for (let i = 0; i < allAnswerForm.length; i++) {
  allAnswerForm[i].onkeyup = keyupEnter;
  allAnswerForm[i].onkeydown = keydownEnter;
}
for (let i = 0; i < allAnswerBtn.length; i++) {
  allAnswerBtn[i].onclick = sendMessage;
}

// ----    ----    ----    ----    ----
//     ----    ----    ----    ----