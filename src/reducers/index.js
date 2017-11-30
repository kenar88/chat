import { combineReducers } from 'redux';

// export const reducer = (state, action) => {
//   switch (action.type) {
//     case 'INITIAL_USER':
//       return { ...state, ID: action.payload };

//     case 'ADD_ROOM':
//       return { ...state, rooms: state.rooms.concat(action.payload) };

//     default: 
//       return state;
//   }
// };

const user = (state = {}, action) => {
  switch (action.type) {
    case 'INITIAL_USER':
      return { ...state, id: action.payload };

    default:
      return state;
  }
};

const rooms = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ROOM':
      return [ ...state, action.payload ];

    default:
      return state;
  }
};

const reducer = combineReducers({
    user,
    rooms
});

export default reducer;