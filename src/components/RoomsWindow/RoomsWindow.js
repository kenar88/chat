import React from 'react';

import { Top } from '../Top/Top';

import './RoomsWindow.css';

export default class RoomsWindow extends React.Component {
  render() {
    return (
      <section className="RoomsWindow">
        <h2 className="RoomsWindow__title">Tops Rooms</h2>
        <Top className="RoomWindow__top" />
      </section>
    );
  }
}