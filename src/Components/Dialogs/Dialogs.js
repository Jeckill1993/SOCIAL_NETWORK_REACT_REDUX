import React from 'react';
import classes from './Dialogs.module.css';
import DialogsItem from './DialogsItem/DialogsItem.js';
import MessageItem from './MessagesItem/MessageItem.js'
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect.js';
import {compose} from 'redux';
import {
    getDialogs,
    getMessages,
    sendMessage, setMessagesView,
    startDialog
} from "../../redux/dialogs_reducer";
import {withRouter} from "react-router-dom";


class Dialogs extends React.Component {

    componentDidMount() {
        let friendId = this.props.match.params.userId;
        this.props.startDialog(+friendId);
        this.props.getDialogs();
    }


    render() {
        return (
            <div className={classes.dialogs}>
                <DialogsItem dialogs={this.props.dialogs} getMessages={this.props.getMessages}
                             theme={this.props.theme}/>
                <MessageItem messages={this.props.messages} getMessages={this.props.getMessages}
                             sendMessage={this.props.sendMessage} currentId={this.props.match.params.userId}
                             theme={this.props.theme}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogs.dialogs,
        messages: state.dialogs.messages,
        theme: state.app.theme,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        getDialogs: () => {
            dispatch(getDialogs())
        },
        startDialog: (userId) => {
            dispatch(startDialog(userId))
        },
        getMessages: (userId) => {
            dispatch(getMessages(userId))
        },
        sendMessage: ({userId, body}) => {
            dispatch(sendMessage({userId, body}))
        },
        setMessagesView: (messageId) => {
            dispatch(setMessagesView(messageId))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect,
)(Dialogs);