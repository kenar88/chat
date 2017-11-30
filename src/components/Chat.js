import React, { Component } from 'react';

import Menu from './Menu/Menu';
import Workspace from './Workspace/Workspace';

import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: '',
      openedRooms: []
    };
  }

  // componentDidMount() {

  // }

  render() {
    return (
      <section className="Chat">
        <Menu />
        <Workspace />
      </section>
    );
  }
}

export default Chat;
