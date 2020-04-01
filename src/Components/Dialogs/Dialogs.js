import React from 'react';
import classes from './Dialogs.module.css';
import DialogsItemContainer from './DialogsItem/DialogsItemContainer.js';
import MessageItemContainer from './MessagesItem/MessageItemContainer.js'



const Dialogs = (props) => {
    return (
        <div className={classes.dialogs}>
            <DialogsItemContainer />
            <MessageItemContainer />
        </div >
    )
}

export default Dialogs