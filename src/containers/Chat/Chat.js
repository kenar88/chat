import React, { Component } from 'react';

import Menu from '../../components/Menu/Menu';
import Workspace from '../../components/Workspace/Workspace';

import './Chat.css';

class Chat extends Component {
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
