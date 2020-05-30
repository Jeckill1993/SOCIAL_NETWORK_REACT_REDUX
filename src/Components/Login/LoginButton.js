import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './LoginStyles.module.css';

const LoginButton = (props) => {
    return (
        <div className={classes.loginInfoWrapper}>
            <NavLink to={'/login'}><button className={`${classes.buttonLoginLogout} runnyTheme_header_footerBtn`}>Sign In</button></NavLink>
        </div>

    )
}

export default LoginButton;