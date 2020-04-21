import React from 'react';
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import { required } from './../../tools/validators/validators.js';
import { maxLengthCreator } from './../../tools/validators/validators.js';
import { Input } from './../common/FormsControls/FormsControls.js';
import { Redirect } from 'react-router-dom';
import classes from './../common/FormsControls/FormsControls.module.css';

let maxLength = maxLengthCreator(30);


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field placeholder="Email" name="email" component={Input} validate={[required, maxLength]} />
            </div>
            <div>
                <Field placeholder="Password" name="password" component={Input} validate={[required, maxLength]} />
            </div>
            <div>
                <Field type="checkbox" name="rememberMe" component="input" />Remember me
            </div>
            {props.error && <div className={classes.formSummaryError}>{props.error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.setMyLoginData(formData);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
            <h3>{props.userId}</h3>
        </div>
    )
}

export default Login;