import './room.scss';




// Рендер комнат
const renderRoom = (roomID, roomTitle) => {
  const room = document.createElement('section');
  room.id = roomID;
  room.className = 'room';
  room.dataset.type = 'room';
  room.dataset.id = roomID;
  room.dataset.title = `${roomTitle}`;
  room.innerHTML = `<img class="room__img" src="img/pic.svg" alt="img"><h3 class="room__title">${roomTitle}</h3>`;

  return room;
};