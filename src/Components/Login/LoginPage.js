import React from 'react';
import '../../global_colors.css';
import {reduxForm} from 'redux-form';
import {Field} from 'redux-form';
import {required} from '../../tools/validators/validators.js';
import {maxLengthCreator} from '../../tools/validators/validators.js';
import {Input} from '../common/FormsControls/FormsControls.js';
import {Redirect} from 'react-router-dom';
import stylesError from '../common/FormsControls/FormsControls.module.css';
import styles from './LoginStyles.module.css';


let maxLength = maxLengthCreator(30);


const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field className={styles.inputField} placeholder="Email" name="email" component={Input} validate={[required, maxLength]}/>
            </div>
            <div>
                <Field className={styles.inputField} placeholder="Password" name="password" component={Input} validate={[required, maxLength]}/>
            </div>
            <div>
                <Field type="checkbox" name="rememberMe" component="input"/>Remember me
            </div>
            {error && <div className={stylesError.formSummaryError}>{error}</div>}
            <div>
                <button className={`runnyTheme_contentBtn`}>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const LoginPage = ({setMyLoginData, isAuth, userId, theme}) => {
    const onSubmit = (formData) => {
        setMyLoginData(formData);
    }
    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div className={styles.loginForm}>
            <h2>Sign In</h2>
            <LoginReduxForm onSubmit={onSubmit}/>
            <h3>{userId}</h3>
        </div>
    )
}

export default LoginPage;