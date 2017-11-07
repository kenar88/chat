'use strict'

// Навигация:

// Очистка главного окна чата
const clearChatWindow = () => {
  const chatWindow = document.querySelector('.chat__window'),
        chatWindowContents = chatWindow.children;

  for (let i = 0; i < chatWindowContents.length; i++) {
    let elem = chatWindowContents[i];

    for (let k = 0; k < elem.classList.length; k++) {
      if (elem.classList.contains(elem.classList[k] + '--active') ) {
        elem.classList.remove(elem.classList[k] + '--active');
      }
    }
  }
};

// Переключение комнат
const roomActive = (event) => {
  const room = event.currentTarget,
        thread = document.getElementById('thread-' + room.id),
        threadActive = document.getElementsByClassName('thread--active');

  if (thread.classList.contains('thread--active') ) {
    thread.classList.remove('thread--active');
  } else {
    clearChatWindow();
    thread.classList.add('thread--active');
    thread.setAttribute('data-state', 'active');
    answerText.focus();
  }
};

// ----    ----    ----    ----    ----
//     ----    ----    ----    ----





// Сообщения:
const answerForm = document.querySelector('.answer-form'),
      sendMessage = answerForm.querySelector('.answer-form__btn'),
      answerText = answerForm.querySelector('.answer-form__text');

// Конструктор сообщений
function Messsage(text) {
  const message = document.createElement('section'),
        textMessage = document.createElement('p');

  message.className = 'message message--user';
  textMessage.className = 'message__text';
  textMessage.textContent = text;
  message.appendChild(textMessage);

  return message;
};

// Рендеринг сообщений
const renderMessage = (event) => {
  event.preventDefault();

  if (!answerText.value || !answerText.value.trim() ) {
    answerText.value = '';
    return answerText.setAttribute('placeholder', 'Enter the message...');
  }

  const thread = document.getElementsByClassName('thread--active')[0],             chatWindow = document.querySelector('.chat__window'),
        message = new Messsage(answerText.value);
  
  // const message = document.createElement('section');
  // message.className = 'message message--user';

  // const textMessage = document.createElement('p');
  // textMessage.className = 'message__text';
  // textMessage.textContent = answerText.value;
  // message.appendChild(textMessage);

  thread.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  answerText.value = '';
  answerText.focus();
  answerText.setAttribute('placeholder', 'Type message...');
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
    renderMessage(event);
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

answerForm.addEventListener('submit', renderMessage);
answerText.addEventListener('keyup', keyupEnter);
answerText.addEventListener('keydown', keydownEnter);

// ----    ----    ----    ----    ----
//     ----    ----    ----    ----