
export const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIAL_USER':
      return { ...state, ID: action.payload };

    case 'ADD_ROOM':
      return { ...state, rooms: state.rooms.concat(action.payload) }

    default: 
      return state;
  }
};