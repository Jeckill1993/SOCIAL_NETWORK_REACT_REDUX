import React from 'react';
import '../../global_colors.css';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {Field} from 'redux-form';
import {required} from '../../tools/validators/validators';
import {maxLengthCreator} from '../../tools/validators/validators';
import {Input} from '../common/FormsControls/FormsControls';
import {InputPassword} from "../common/FormsControls/FormsControls";
import {Redirect} from 'react-router-dom';
import stylesError from '../common/FormsControls/FormsControls.module.css';
import styles from './LoginStyles.module.css';


let maxLength = maxLengthCreator(30);

type OwnProps = {
    theme: string
}

const LoginForm: React.FC<InjectedFormProps<FormDataType, OwnProps> & OwnProps> = ({handleSubmit, error, ...props}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field className={styles.inputField} placeholder="Email" name="email" component={Input} validate={[required, maxLength]}/>
            </div>
            <div>
                <Field className={styles.inputField} placeholder="Password" name="password" component={InputPassword} validate={[required, maxLength]}/>
            </div>
            <div>
                <Field type="checkbox" name="rememberMe" component="input"/>Remember me
            </div>
            {error && <div className={stylesError.formSummaryError}>{error}</div>}
            <div>
                <button className={`${props.theme}_contentBtn`}>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType, OwnProps>({form: 'login'})(LoginForm);

type PropsType = {
    setMyLoginData: (formData: FormDataType) => void
    isAuth: boolean
    userId: number | null
    theme: string
}
type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

const LoginPage: React.FC<PropsType> = ({setMyLoginData, isAuth, userId, theme}) => {
    const onSubmit = (formData: FormDataType) => {
        setMyLoginData(formData);
    }
    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <div className={styles.loginForm}>
            <h2>Sign In</h2>
            <LoginReduxForm onSubmit={onSubmit}
            theme={theme}/>
            <h3>{userId}</h3>
        </div>
    )
}

export default LoginPage;