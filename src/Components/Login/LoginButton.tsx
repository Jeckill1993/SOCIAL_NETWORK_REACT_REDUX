import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './LoginStyles.module.css';

type PropsType = {
    theme: string
}

const LoginButton: React.FC<PropsType> = ({theme}) => {
    return (
        <div className={classes.loginInfoWrapper}>
            <NavLink to={'/login'}><button className={`${classes.buttonLoginLogout} ${theme}_header_footerBtn`}>Sign In</button></NavLink>
        </div>
    )
}

export default LoginButton;