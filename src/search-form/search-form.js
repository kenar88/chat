import './search-form.scss';

import {server} from '../script.js';





const searchFormElem = document.getElementById('search-form');

// Конструктор формы поиска
function SearchForm(elem) {
  const self = this;

  this.send = function (event) {
    event.preventDefault();

    const input = event.target.querySelector('input'),
          request = input.value;

    const data = {
      "method": "joinRoom",
      "data": {
        "room": {
          "id": request
        }
      }
    }
  
    server.send(JSON.stringify(data));
    input.value = '';
  };

  elem.addEventListener('submit', self.send);
}

new SearchForm (searchFormElem);


