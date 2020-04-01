import React from 'react';
import DialogsItem from './DialogsItem.js'
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogs.dialogs,
    }
}

const DialogsItemContainer = connect(mapStateToProps)(DialogsItem);

export default DialogsItemContainer;