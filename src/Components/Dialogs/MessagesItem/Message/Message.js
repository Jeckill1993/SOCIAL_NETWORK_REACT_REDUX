import React from 'react';
import '../../../../global_colors.css';
import classes from '../../Dialogs.module.css';

const Message = ({message,theme}) => {
    return (
        <div className={`${classes.messageWrapper} ${theme}_content`}>
            <span>{message}</span>
        </div>
    )
}

export default Message;