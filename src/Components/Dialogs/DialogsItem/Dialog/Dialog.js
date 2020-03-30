import React from 'react';
import classes from './Dialog.module.css';
import { NavLink } from 'react-router-dom';

const Dialog = (props) => {
    return (
        <div className={classes.item}>
            <img src={props.avatar} alt="avatar_friend"></img>
            <div className={classes.dialog}><NavLink activeClassName={classes.active} to={"/dialogs/" + props.id}>{props.name}</NavLink></div>
        </div>

    )
}

export default Dialog;