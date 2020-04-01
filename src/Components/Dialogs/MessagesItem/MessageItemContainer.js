import React from 'react';
import { createNewMessageActionCreator } from '../../../redux/dialogs_reducer.js';
import { updateTextMessageActionCreator } from '../../../redux/dialogs_reducer.js';
import MessageItem from './MessageItem.js'
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
    return {
        messages: state.dialogs.messages
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {dispatch(createNewMessageActionCreator())} ,
        changeTextMessage: (e) => {dispatch(updateTextMessageActionCreator(e))} ,
    }
}

const MessageItemContainer = connect(mapStateToProps, mapDispatchToProps)(MessageItem);

export default MessageItemContainer;