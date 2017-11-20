import MessageForm from './message-form/message-form.js';
import './work-window.scss';


const workspace = document.getElementById('workspace');


const renderWorkWindow = (roomID) => {
  const workWindow = document.createElement('section');
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





export default renderWorkWindow;