import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Tab } from '../Tab/Tab';
import server from '../../server';

import './Menu.css';

class Menu extends Component {
  newRoom = () => {
    const name = prompt('Enter thread name', '');

    const data = {
      "method": "newRoom",
      "data": {
        "room": {
          "name": name
        }
      }
    }

    server.send(JSON.stringify(data));
  }

  render() {
    const rooms = this.props.rooms.map((room, index) => {
      return (
        <Tab
          name={room.name}
          path={`/room/${room.id}`}
          key={index}
        />
      );
    });

    return (
      <nav className="Menu">
        {/* <Tab className="Menu__tops-rooms" name="Tops Rooms" path="/rooms"/> */}
        <Link className="Menu__tops-rooms" to="/rooms">Rooms</Link>

        {/* <h2 className="Menu__title">Opened rooms</h2> */}
        <div className="Menu__opened-rooms">
          {rooms}
        </div>

        <button className="Menu__new-room" onClick={this.newRoom} >New room</button>

        {/* <Tab className="Menu__settings" name="Settings" path="/settings"/> */}
        <Link className="Menu__settings" to="/settings">Settings</Link>
      </nav>
    );
  }
}

export default Menu;