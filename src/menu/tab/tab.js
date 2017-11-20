import './tab.scss';
import './pic.svg'


const openedRooms = document.getElementById('opened-rooms');

const renderTab = (roomID, name) => {
  const tab = document.createElement('section');
  tab.className = 'tab';
  tab.dataset.type = 'tab';
  tab.dataset.id = roomID;
  tab.dataset.title = `${name}`;
  tab.innerHTML = `
    <img class="tab__img" src="img/pic.svg" alt="logo room">
    <h3 class="tab__title">${name}</h3>`;

  openedRooms.append(tab);
};

export default renderTab;