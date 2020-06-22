import React, {useEffect} from 'react';
import '../../../global_colors.css';
import Message from './Message/Message';
import {reduxForm} from 'redux-form';
import {Field} from 'redux-form';
import {Textarea} from '../../common/FormsControls/FormsControls';
import {required} from '../../../tools/validators/validators';
import {maxLengthCreator} from '../../../tools/validators/validators';
import classes from '../Dialogs.module.css'
import {MessageType} from "../../../redux/dialogs_reducer";

let maxLength = maxLengthCreator(30);


const AddMessageForm = (props: any) => {
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

export type NewMessageType = {
    userId: number
    body: string
}
type PropsType = {
    messages: Array<MessageType>
    getMessages: (id: number) => void
    sendMessage: (message: NewMessageType) => void
    currentId: number
    theme: string
}

const MessageItem: React.FC<PropsType> = ({messages, getMessages, sendMessage, currentId, theme}) => {
    useEffect(() => {
        getMessages(currentId)
    }, []);
    let messagesElements = messages.map((message) => {
        return <Message key={message.id} message={message.body} theme={theme}/>
    })
    let addNewMessage = (values: object) => {
        // @ts-ignore
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
                    <AddMessageFormRedux onSubmit={addNewMessage}
                        // @ts-ignore
                                         theme={theme}/>
                </div>
            }
        </div>

    )
}

export default MessageItem;