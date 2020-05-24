import React from 'react';
import Dialog from './Dialog/Dialog.js';
import userPhoto from '../../../assets/images/user.jpg';
import classes from '../Dialogs.module.css';


const DialogsItem = ({dialogs, getMessages, getNewMessages}) => {
    let dialogsElements = dialogs.map((person) => {
        return <Dialog userName={person.userName} key={person.id} id={person.id} getMessages={getMessages}
                       photos={person.photos.small ? person.photos.small : userPhoto}/>
    });

    return (
        <div>{dialogsElements}</div>
    )
}

export default DialogsItem;