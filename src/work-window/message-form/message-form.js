import './message-form.scss';
import './send.svg'

import autosize from 'autosize';
import {server} from '../../script.js';






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



export default MessageForm;