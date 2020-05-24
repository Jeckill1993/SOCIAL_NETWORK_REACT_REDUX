import React from 'react';
import Message from './Message/Message.js';
import {reduxForm} from 'redux-form';
import {Field} from 'redux-form';
import {Textarea} from '../../common/FormsControls/FormsControls.js';
import {required} from '../../../tools/validators/validators.js';
import {maxLengthCreator} from '../../../tools/validators/validators.js';
import classes from './MessageItem.module.css'

let maxLength = maxLengthCreator(30);


const AddMessageForm = (props) => {
    return (
        <form className={classes.form} onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="newMessageBody" placeholder="Enter your message"
                       validate={[required, maxLength]}/>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm);

const MessageItem = ({messages, sendMessage, currentId}) => {
    let messagesElements = messages.map((message) => {
        return <Message key={message.id} message={message.body}/>
    })
    let addNewMessage = (values) => {
        console.log({userId: currentId, body: values.newMessageBody});
        sendMessage({userId: currentId, body: values.newMessageBody});
    }
    return (
        <div>
            {currentId === undefined ?
                <span> </span>
                : <div className={classes.messagesContainer}>
                    <div className={classes.messagesList}>
                        {messagesElements}
                    </div>
                    <AddMessageFormRedux onSubmit={addNewMessage}/>
                </div>
            }
        </div>

    )
}

export default MessageItem;