import React from 'react';
import classes from './FormsControls.module.css';
import '../../../global_colors.css';
import store from '../../../redux/redux_store';
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";

let theme = store.getState().app.theme;

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({ meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={classes.formControl + " " + (hasError ? classes.error : '')}>
            <div>{children}</div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, children, ...restProps } = props
    return <FormControl {...props}><textarea className={`${theme}_inputs_textarea`} {...input} {...restProps}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, children, ...restProps } = props
    return <FormControl {...props}><input type='text' className={`${theme}_inputs_textarea`} {...input} {...restProps}/></FormControl>
}
export const InputPassword: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, children, ...restProps } = props
    return <FormControl {...props}><input type='password' className={`${theme}_inputs_textarea`} {...input} {...restProps}/></FormControl>
}