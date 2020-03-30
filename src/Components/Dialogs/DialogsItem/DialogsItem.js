import React from 'react';
import Dialog from './Dialog/Dialog.js';
import StoreContext from '../../../StoreContext.js';


const DialogsItem = (props) => {



    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();
                    let dialogsElements = state.dialogs.dialogs.map((person) => {
                        return <Dialog name={person.name} id={person.id} avatar={person.avatar} />
                    });

                    return <div>{ dialogsElements }</div>
                }}
        </StoreContext.Consumer>
    )
}

export default DialogsItem;