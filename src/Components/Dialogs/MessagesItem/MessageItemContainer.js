import React from 'react';
import { createNewMessageActionCreator } from '../../../redux/dialogs_reducer.js';
import { updateTextMessageActionCreator } from '../../../redux/dialogs_reducer.js';
import MessageItem from './MessageItem.js'
import StoreContext from '../../../StoreContext.js';

const MessageItemContainer = (props) => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let sendMessage = () => {
                        store.dispatch(createNewMessageActionCreator());
                    }
                    let changeTextMessage = (e) => {
                        store.dispatch(updateTextMessageActionCreator(e));
                    }

                    return <MessageItem sendMessage={sendMessage} changeTextMessage={changeTextMessage} messages={store.getState().dialogs.messages} />
                }}
        </StoreContext.Consumer>
    )
}

export default MessageItemContainer;