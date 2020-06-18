import React from 'react';
import classes from './Dialogs.module.css';
import DialogsItem from './DialogsItem/DialogsItem';
import MessageItem, {NewMessageType} from './MessagesItem/MessageItem'
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect.js';
import {compose} from 'redux';
import {
    DialogType,
    getDialogs,
    getMessages, MessageType,
    sendMessage, setMessagesView,
    startDialog
} from "../../redux/dialogs_reducer";
import {withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux_store";


type MapStatePropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    theme: string
}
type MapDispatchPropsType = {
    getDialogs: () => void
    startDialog: (userId: number) => void
    getMessages: (userId: number) => void
    sendMessage: (message: NewMessageType) => void
    setMessagesView: (messageId: number) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class Dialogs extends React.Component<PropsType> {

    componentDidMount() {
        // @ts-ignore
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
                    // @ts-ignore
                             sendMessage={this.props.sendMessage} currentId={this.props.match.params.userId}
                             theme={this.props.theme}/>
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialogs.dialogs,
        // @ts-ignore
        messages: state.dialogs.messages,
        theme: state.app.theme,
    }
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
        // @ts-ignore
        sendMessage: ({userId, body}) => {
            dispatch(sendMessage({userId, body}))
        },
        setMessagesView: (messageId: number) => {
            dispatch(setMessagesView(messageId))
        },
    }
}

export default compose(
    // @ts-ignore
    connect<MapDispatchPropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect,
)(Dialogs);