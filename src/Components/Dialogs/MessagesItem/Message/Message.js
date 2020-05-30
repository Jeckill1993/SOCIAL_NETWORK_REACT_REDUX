import React from 'react';
import '../../../../global_colors.css';
import classes from '../../Dialogs.module.css';

const Message = (props) => {
    return (
        <div className={`${classes.messageWrapper} runnyTheme_content`}>
            <span>{props.message}</span>
        </div>
    )
}

export default Message;