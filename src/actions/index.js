const ADD_USER = 'ADD_USER';

export const addUser = (id) => {
  return {
    type: ADD_USER,
    id: id
  }
};

const ADD_ROOM = 'ADD_ROOM';

export const addRoom = (data) => {
  data = data.data;
  return {
    type: ADD_ROOM,
    id: data.room.id,
    name: data.room.name,
    messages: data.messages
  }
};

// const data = {
//   error: false,
//   notice: "roomBuffer",
//   data: {
//     room: {
//       id: "123",
//       name: "qwe" 
//     },
//     messages: [{}, {}, {}]
//   }
// };