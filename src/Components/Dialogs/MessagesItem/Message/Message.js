import React from 'react';
import classes from './../MessageItem.module.css';

const Message = (props) => {
    return (
        <div className={classes.messageWrapper}>
            <span>{props.message}</span>
        </div>
    )
}

export default Message;