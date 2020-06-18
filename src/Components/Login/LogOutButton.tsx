import React from 'react';
import '../../global_colors.css';
import classes from './LoginStyles.module.css';

type PropsType = {
    logOut: () => void
    login: string | null
    theme: string
}

const LogOutButton: React.FC<PropsType> = ({logOut, login, theme}) => {
    let onLogOut = () => {
        logOut();
    }
    return (
        <div className={classes.loginInfoWrapper}>
            <span className={`${classes.loginNickname} ${theme}_nickname`}>{login}</span>
            <div>
                <button className={`${classes.buttonLoginLogout} ${theme}_header_footerBtn`} onClick={onLogOut}>Log Out</button>
            </div>
        </div>
    )
}

export default LogOutButton;