import React from 'react';
import Dialog from './Dialog/Dialog.js';


const DialogsItem = (props) => {
    let dialogsElements = props.dialogs.map((person) => {
        return <Dialog name={person.name} key={person.id} id={person.id} avatar={person.avatar} />
    });

    return (
        <div>{dialogsElements}</div>
    )
    }

    export default DialogsItem;