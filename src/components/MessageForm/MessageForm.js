import React from 'react';
import Textarea from 'react-autosize-textarea';

import './MessageForm.css';

export const MessageForm = (props) => {
  return (
    <form className="MessageForm">
        <Textarea className="MessageForm__textarea" placeholder="Type message..."/>
        <button className="MessageForm__send">Send</button>
    </form>
  );
};