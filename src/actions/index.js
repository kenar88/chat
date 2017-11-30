export const initialUser = (id) => {
  return {
    type: 'INITIAL_USER',
    payload: id
  };
};

export const addRoom = (room) => {
  return {
    type: 'ADD_ROOM',
    payload: room
  };
};