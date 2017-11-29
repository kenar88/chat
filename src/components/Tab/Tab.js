import React from 'react';

import './Tab.css';

export const Tab = (props) => {
  return (
    <section className={`Tab ${props.className}`}>
      <img className="Tab__img" alt="tab"/>
      <h3 className="Tab__name">{props.name}</h3>
      <button className="Tab__close">[x]</button>
    </section>
  );
};