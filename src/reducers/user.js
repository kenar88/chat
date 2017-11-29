const user = (state = '123', action) => {
  switch (action.type) {
    case 'ADD_USER':
      return action.id;
    default:
      return state;
  }
};

export default user;