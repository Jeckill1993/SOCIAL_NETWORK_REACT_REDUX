import React from 'react';
import classes from './Dialogs.module.css';
import DialogsItem from './DialogsItem/DialogsItem.js';
import MessageItemContainer from './MessagesItem/MessageItemContainer.js'



const Dialogs = (props) => {
    return (
        <div className={classes.dialogs}>
            <DialogsItem />
            <MessageItemContainer />
        </div >
    )
}

export default Dialogs