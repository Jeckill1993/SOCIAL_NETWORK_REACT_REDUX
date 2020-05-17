import React from 'react';
import classes from './Dialogs.module.css';
import DialogsItemContainer from './DialogsItem/DialogsItemContainer.js';
import MessageItemContainer from './MessagesItem/MessageItemContainer.js'
import { connect } from 'react-redux';
import { withAuthRedirect } from './../../hoc/withAuthRedirect.js';
import { compose } from 'redux';


class Dialogs extends React.Component {
    

    render() {
        return (
            <div className={classes.dialogs}>
                <DialogsItemContainer />
                <MessageItemContainer />
            </div >
        )
    }
}

export default compose(
    connect(),
    withAuthRedirect,
)(Dialogs);