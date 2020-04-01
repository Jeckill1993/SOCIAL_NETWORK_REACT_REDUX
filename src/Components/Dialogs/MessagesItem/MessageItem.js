import React from 'react';
import Message from './Message/Message.js'

const MessageItem = (props) => {

    let messagesElements = props.messages.map((person) => {
        return <Message key={person.id} message={person.message} />
    })

    let sendMessage = () => {
        props.sendMessage();
    }
    let changeTextMessage = (e) => {
        let text = e.target.value;
        props.changeTextMessage(text);
    }

    return (
        <div>
            <div>
                {messagesElements}
            </div>
            <div>
                <textarea onChange={changeTextMessage} placeholder="Enter your message"></textarea>
                <br></br>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>

    )
}

export default MessageItem;