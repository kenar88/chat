import React, { Component } from 'react';

import Chat from './containers/Chat/Chat';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Chat />
      </div>
    );
  }
}

export default App;
