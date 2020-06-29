import React from 'react';
import classes from './Dialogs.module.css';
import DialogsItem from './DialogsItem/DialogsItem';
import MessageItem from './MessagesItem/MessageItem'
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {
    DialogType,
    getDialogs,
    getMessages, MessageType,
    sendMessage, setMessagesView,
    startDialog
} from "../../redux/dialogs_reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux_store";
import {PathParamsType} from "../Profile/ProfileContainer";


type MapStatePropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    theme: string
}
type MapDispatchPropsType = {
    getDialogs: () => void
    startDialog: (userId: number) => void
    getMessages: (userId: number) => void
    sendMessage: (message: { userId: number, body: string }) => void
    setMessagesView: (messageId: number) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>

class Dialogs extends React.Component<PropsType> {
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
                             sendMessage={this.props.sendMessage} currentId={+this.props.match.params.userId}
                             theme={this.props.theme}/>
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialogs.dialogs,
        messages: state.dialogs.messages,
        theme: state.app.theme,
    }
}
type SendNewMessageType = {
    userId: number,
    body: string
}
let mapDispatchToProps = (dispatch: any) => {
    return {
        getDialogs: () => {
            dispatch(getDialogs())
        },
        startDialog: (userId: number) => {
            dispatch(startDialog(userId))
        },
        getMessages: (userId: number) => {
            dispatch(getMessages(userId))
        },
        sendMessage: ({userId, body}: SendNewMessageType) => {
            dispatch(sendMessage({userId, body}))
        },
        setMessagesView: (messageId: number) => {
            dispatch(setMessagesView(messageId))
        },
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect,
)(Dialogs);