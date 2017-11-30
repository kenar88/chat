import React, { Component } from 'react';

// import Menu from './Menu/Menu';
import MenuContainer from '../containers/MenuContainer'
import Workspace from './Workspace/Workspace';

import './Chat.css';

class Chat extends Component {
  render() {
    return (
      <section className="Chat">
        <MenuContainer />
        <Workspace />
      </section>
    );
  }
}



export default Chat;
