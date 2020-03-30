import React from 'react';
import classes from './Message.module.css';

const Message = (props) => {
    return (
        <div>
            <span>{props.message}</span>
            <br></br>
        </div>
    )
}

export default Message;