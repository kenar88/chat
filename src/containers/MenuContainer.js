import { connect } from 'react-redux';

import Menu from '../components/Menu/Menu';


const getOpenedRooms = (rooms) => {
  return rooms;
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    rooms: getOpenedRooms(state.rooms)
  }
}

const OpenedRooms = connect(
  mapStateToProps,
  // mapDispatchToProps
)(Menu);


export default OpenedRooms;