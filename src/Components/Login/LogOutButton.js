import React from 'react';
import classes from './LoginStyles.module.css';

const LogOutButton = ({logOut, login}) => {
    let onLogOut = () => {
        logOut();
    }

    return (
        <div className={classes.loginInfoWrapper}>
            <span className={classes.loginNickname}>{login}</span>
            <div>
                <button className={classes.buttonLoginLogout} onClick={onLogOut}>Log Out</button>
            </div>
        </div>
    )
}

export default LogOutButton;