
export const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIAL_USER':
      return { ...state, ID: action.payload };

    case 'ADD_ROOM':
      return { ...state, rooms: state.rooms.concat(action.payload) }

    case 'CHANGE_THEME':
      return { ...state, theme: (state.theme === 'dark') ? 'light' : 'dark' }

    default: 
      return state;
  }
};