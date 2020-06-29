import React, {useEffect} from 'react';
import '../../../global_colors.css';
import Message from './Message/Message';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {Field} from 'redux-form';
import {Textarea} from '../../common/FormsControls/FormsControls';
import {required} from '../../../tools/validators/validators';
import {maxLengthCreator} from '../../../tools/validators/validators';
import classes from '../Dialogs.module.css'
import {MessageType} from "../../../redux/dialogs_reducer";

let maxLength = maxLengthCreator(30);

type OwnPropsType = {
    theme: string
}

const AddMessageForm: React.FC<InjectedFormProps<FormDataType, OwnPropsType> & OwnPropsType> = (props) => {
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

const AddMessageFormRedux = reduxForm<FormDataType, OwnPropsType>({form: "dialogAddMessageForm"})(AddMessageForm);

export type FormDataType = {
    newMessageBody: string
}
type PropsType = {
    messages: Array<MessageType>
    getMessages: (id: number) => void
    sendMessage: (message: { userId: number, body: string }) => void
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
    let addNewMessage = (formData: FormDataType) => {
        sendMessage({userId: currentId, body: formData.newMessageBody});
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