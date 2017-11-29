import React, { Component } from 'react';



import './Menu.css';

class Menu extends Component {
  render() {
    return (
      <nav className="Menu">
        <p>I'm Menu.</p>

        <h2 className="Menu__title">Opened rooms</h2>
        <div className="Menu__opened-rooms">

        </div>

      </nav>
    );
  }
}

export default Menu;