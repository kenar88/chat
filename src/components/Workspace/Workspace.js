import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import RoomsWindow from '../RoomsWindow/RoomsWindow';
import SettingsWindow from '../SettingsWindow/SettingsWindow';
import RoomWindow from '../RoomWindow/RoomWindow';

import './Workspace.css';

class Workspace extends Component {
  render() {
    return (
      <section className="Workspace">
        <Switch>
          <Route exact path='/rooms' component={RoomsWindow}/>
          <Route exact path='/Settings' component={SettingsWindow}/>
          <Route exact path='/room/:id' component={RoomWindow}/>
        </Switch>
      </section>
    );
  }
}

export default Workspace;