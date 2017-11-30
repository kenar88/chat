import { combineReducers } from 'redux';

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