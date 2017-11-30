import React from 'react';
import { Link } from 'react-router-dom';

import './Tab.css';

export const Tab = (props) => {
  return (
    <Link className={`Tab ${props.className}`} to={props.path}>
      <img className="Tab__img" alt="tab"/>
      <h3 className="Tab__name">{props.name}</h3>
      <button className="Tab__close">[x]</button>
    </Link>
  );
};