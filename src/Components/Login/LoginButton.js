import React from 'react';
import {NavLink} from "react-router-dom";

const LoginButton = (props) => {
    return (
        <NavLink to={'/login'}>Login</NavLink>
    )
}

export default LoginButton;