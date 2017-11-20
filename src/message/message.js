import './message.scss';

import sha512 from 'js-sha512';
import {getCookie} from '../script.js';





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

export default renderMessage;