import React, {useEffect} from 'react';
import '../../../global_colors.css';
import Message from './Message/Message.js';
import {reduxForm} from 'redux-form';
import {Field} from 'redux-form';
import {Textarea} from '../../common/FormsControls/FormsControls.js';
import {required} from '../../../tools/validators/validators.js';
import {maxLengthCreator} from '../../../tools/validators/validators.js';
import classes from '../Dialogs.module.css'

let maxLength = maxLengthCreator(30);


const AddMessageForm = (props) => {
    return (
        <form className={classes.form} onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="newMessageBody" placeholder="Enter your message"
                       validate={[required, maxLength]}/>
                <button className={`${props.theme}_contentBtn`}>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm);

const MessageItem = ({messages, getMessages, sendMessage, currentId, theme}) => {
    useEffect(() => {
        getMessages(currentId)
    }, []);
    let messagesElements = messages.map((message) => {
        return <Message key={message.id} message={message.body}/>
    })
    let addNewMessage = (values) => {
        sendMessage({userId: currentId, body: values.newMessageBody});
    }
    return (
        <div>
            {currentId === undefined ?
                <span> </span>
                : <div className={classes.messagesContainer}>
                    <div className={`${classes.messagesList} ${theme}_messagesList`}>
                        {messagesElements}
                    </div>
                    <AddMessageFormRedux onSubmit={addNewMessage} theme={theme}/>
                </div>
            }
        </div>

    )
}

export default MessageItem;