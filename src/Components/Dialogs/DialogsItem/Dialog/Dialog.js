import React from 'react';
import '../../../../global_colors.css';
import classes from '../../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

const Dialog = ({id, userName, photos, getMessages, theme}) => {
    let onGetMessages = () => {
        getMessages(id);
    }
    return (
        <div className={classes.item} onClick={onGetMessages}>
            <img src={photos} alt="avatar_friend"/>
            <div className={`${classes.dialog} ${theme}_linksDialogs`}><NavLink activeClassName='active' to={"/dialogs/" + id}>{userName}</NavLink></div>
        </div>

    )
}

export default Dialog;