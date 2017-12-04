import React from 'react';
import { Link } from 'react-router-dom';

import './Room.css';

export const Room = (props) => {
  return (
    <Link className={`Room ${props.className}`} to={props.path}>
      <img className="Room__img" alt="Room"/>
      <div className="Room__wrapper">
        <h3 className="Room__name">{props.name}</h3>
        <p className="Room__descr">
          First room!
        </p>
      </div>
    </Link>
  );
};