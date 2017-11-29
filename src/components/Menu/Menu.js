import React, { Component } from 'react';

import { Tab } from '../Tab/Tab';

import './Menu.css';

class Menu extends Component {
  render() {
    return (
      <nav className="Menu">
        <Tab className="Menu__tops-rooms" name="Tops Rooms" />

        <h2 className="Menu__title">Opened rooms</h2>
        <div className="Menu__opened-rooms">
          
        </div>

        <Tab className="Menu__settings" name="Settings" />
      </nav>
    );
  }
}

export default Menu;