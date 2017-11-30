import React from 'react';

import { Room } from '../Room/Room';

import './Top.css';

export const Top = (props) => {
  return (
    <section className={`Top ${props.className}`}>
      <Room name="First room" path="/" />
    </section>
  );
};