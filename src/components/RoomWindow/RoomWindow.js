import React from 'react';

import { MessageForm } from '../MessageForm/MessageForm';
import { Message } from '../Message/Message';

import './RoomWindow.css';

export default class RoomsWindow extends React.Component {
  render() {
    return (
      <section className="RoomWindow">
        <h2 className="RoomWindow__title">{this.props.name}</h2>
        <h2 className="RoomWindow__title">{`Room ID: ${this.props.match.params.id}`}</h2>
        <Message text="Test" />
        <Message text="Test" />
        <Message text="Test" />
        <MessageForm />
      </section>
    );
  }
}