import React from 'react';
import { connect } from 'react-redux';
import { setMyLoginDataThunkCreator } from './../../redux/auth_reducer.js';
import { logOutThunkCreator } from './../../redux/auth_reducer.js';
import Login from './login.js';




let mapStateTpProps = (state) => {
    return {
        userId: state.auth.userId,
        isAuth: state.auth.isAuth,
    }
}
const LoginContainer = connect(mapStateTpProps, { setMyLoginData: setMyLoginDataThunkCreator, logOut: logOutThunkCreator })(Login);

export default LoginContainer;