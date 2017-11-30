import React from 'react';
import { Link } from 'react-router-dom';

import './Room.css';

export const Room = (props) => {
  return (
    <Link className={`Room ${props.className}`} to={props.path}>
      <img className="Room__img" alt="Room"/>
      <h3 className="Room__name">{props.name}</h3>
      <button className="Room__close">[x]</button>
    </Link>
  );
};