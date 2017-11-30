import React from 'react';
import './Message.css';

export const Message = (props) => {
  return (
    <section className="Message">
      <p className="Message__text">{props.text}</p>
    </section>
  );
}