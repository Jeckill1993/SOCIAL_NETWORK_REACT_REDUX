import React from 'react';
import Message from './Message/Message.js';
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import { Textarea } from './../../common/FormsControls/FormsControls.js';
import { required } from './../../../tools/validators/validators.js';
import { maxLengthCreator } from './../../../tools/validators/validators.js';

let maxLength = maxLengthCreator(30);

const MessageItem = (props) => {

    let messagesElements = props.messages.map((person) => {
        return <Message key={person.id} message={person.message} />
    })

    
    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div>
            <div>
                {messagesElements}
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>

    )
}

const AddMessageForm = (props) => {
    
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="newMessageBody" placeholder="Enter your message" validate={[required, maxLength]} />
                <br></br>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm);

export default MessageItem;