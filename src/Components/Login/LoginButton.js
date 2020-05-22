import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './LoginStyles.module.css';

const LoginButton = (props) => {
    return (
        <div className={classes.loginInfoWrapper}>
            <button className={classes.buttonLoginLogout}><NavLink to={'/login'}>Login</NavLink></button>
        </div>

    )
}

export default LoginButton;