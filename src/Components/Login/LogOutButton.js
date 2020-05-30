import React from 'react';
import '../../global_colors.css';
import classes from './LoginStyles.module.css';

const LogOutButton = ({logOut, login}) => {
    let onLogOut = () => {
        logOut();
    }

    return (
        <div className={classes.loginInfoWrapper}>
            <span className={`${classes.loginNickname} runnyTheme_nickname`}>{login}</span>
            <div>
                <button className={`${classes.buttonLoginLogout} runnyTheme_header_footerBtn`} onClick={onLogOut}>Log Out</button>
            </div>
        </div>
    )
}

export default LogOutButton;