import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './LoginStyles.module.css';

const LoginButton = (props) => {
    return (
        <div className={classes.loginInfoWrapper}>
            <button className={classes.buttonLoginLogout}><NavLink to={'/login'}>Sign In</NavLink></button>
        </div>

    )
}

export default LoginButton;