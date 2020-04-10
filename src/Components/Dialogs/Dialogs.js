import React from 'react';
import classes from './Dialogs.module.css';
import DialogsItemContainer from './DialogsItem/DialogsItemContainer.js';
import MessageItemContainer from './MessagesItem/MessageItemContainer.js'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withAuthRedirect } from './../../hoc/withAuthRedirect.js'


class Dialogs extends React.Component {
    

    render() {

        if(!this.props.isAuth) {
            return <Redirect to={"/login"} />
        }

        return (
            <div className={classes.dialogs}>
                <DialogsItemContainer />
                <MessageItemContainer />
            </div >
        )
    }
}


let DialogsComponent = withAuthRedirect(Dialogs);


export default connect ()(DialogsComponent);