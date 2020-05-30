import React from 'react';
import classes from './FormsControls.module.css';
import '../../../global_colors.css';

const FormControl = ({ input, meta: {touched, error}, child, ...props }) => {
    const hasError = touched && error;
    return (
        <div className={classes.formControl + " " + (hasError ? classes.error : '')}>
            <div>{props.children}</div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props
    return <FormControl {...props}><textarea className={`runnyTheme_inputs_textarea`} {...input} {...restProps}/></FormControl>
}

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props
    return <FormControl {...props}><input type='text' className={`runnyTheme_inputs_textarea`} {...input} {...restProps}/></FormControl>
}